import { Buffer } from "node:buffer";
import { Interface } from "node:readline";

/**
 * Wraps a Promise with a Timeout
 *
 * @param promise - Promise to add timeout to
 * @param ms - Timeout Length (ms)
 * @param error - Error to Emit if Timeout Occurs
 * @returns promise that rejects if not completed by timeout length
 */
const promiseTimeout = (
  promise: Promise<any>,
  ms: number,
  error: Error | string = new Error("ASYNC Function Call Timed Out!!!"),
): Promise<any> => {
  return new Promise((resolve, reject) => {
    // Store timeout ID so we can clear it if promise resolves/rejects early
    const timeoutId = setTimeout(() => reject(error), ms);
    promise
      .then((result) => {
        // Clear timeout to prevent memory leak and process hanging
        clearTimeout(timeoutId);
        resolve(result);
      })
      .catch((err) => {
        // Clear timeout to prevent memory leak and process hanging
        clearTimeout(timeoutId);
        reject(err);
      });
  });
};

/**
 * Delays X ms
 *
 * @param ms - Delay Length (ms)
 * @returns Promise resolved after delay length
 */
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Helper Funcs to process strings
 *
 * @param buff - Buffer with encoded string length
 * @returns String
 */
const bufferToString = (buff: Buffer): string => {
  const newBuff = Buffer.from(buff);
  const len = newBuff.readUInt32LE();
  return newBuff.subarray(4, len + 4).toString();
};

/**
 * Helper Funcs to process strings
 *
 * @param str - Text string
 * @param len - Buffer Length to be encode string on to
 * @returns Buffer
 */
const stringToBuffer = (str: string, len: number = 88): Buffer => {
  const buf = Buffer.alloc(len);
  buf.writeUInt32LE(str.length);
  Buffer.from(str).copy(buf, 4);
  return buf;
};

type structureString = {
  DATA: Buffer;
  LEN: number;
};
/**
 * Convert string stucture object to string
 *
 * @param obj - string structure object
 * @returns
 */
const objToString = (obj: structureString): string => {
  return String.fromCharCode(...obj.DATA.subarray(0, obj.LEN));
};

/**
 * Convert string to string structure object
 *
 * @param str - String to encode
 * @param len - Buffer length
 * @returns
 */
const stringToObj = (str: string, len = 82): structureString => {
  const array = Array(len).fill(0);
  [...str].forEach((c, k) => {
    array[k] = c.charCodeAt(0);
  });

  return {
    LEN: str.length,
    DATA: Buffer.from(array),
  };
};

const dateFormat = (
  date: Date,
  format: "mmmm dd, yyyy - hh:MM:ss TT" | "mm/dd/yyyy-HH:MM:ss.l",
): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (format === "mmmm dd, yyyy - hh:MM:ss TT") {
    const monthName = monthNames[month - 1];
    const paddedDay = day.toString().padStart(2, "0");

    // Convert to 12-hour format
    let displayHours = hours;
    if (hours === 0) {
      displayHours = 12; // 12 AM for midnight
    } else if (hours > 12) {
      displayHours = hours - 12; // 1-11 PM
    }
    const paddedHours = displayHours.toString().padStart(2, "0");
    const paddedMinutes = minutes.toString().padStart(2, "0");
    const paddedSeconds = seconds.toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    return `${monthName} ${paddedDay}, ${year} - ${paddedHours}:${paddedMinutes}:${paddedSeconds} ${ampm}`;
  } else if (format === "mm/dd/yyyy-HH:MM:ss.l") {
    const paddedMonth = month.toString().padStart(2, "0");
    const paddedDay = day.toString().padStart(2, "0");
    const paddedHours = hours.toString().padStart(2, "0");
    const paddedMinutes = minutes.toString().padStart(2, "0");
    const paddedSeconds = seconds.toString().padStart(2, "0");
    const paddedMilliseconds = milliseconds.toString().padStart(3, "0");

    return `${paddedMonth}/${paddedDay}/${year}-${paddedHours}:${paddedMinutes}:${paddedSeconds}.${paddedMilliseconds}`;
  }

  throw new Error(`Unsupported format: ${format}`);
};

export {
  bufferToString,
  dateFormat,
  delay,
  objToString,
  promiseTimeout,
  stringToBuffer,
  stringToObj,
};
