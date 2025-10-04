/**
 * CIP Error Codes as defined by ODVA (Open DeviceNet Vendors Association)
 * Common Industrial Protocol (CIP) Error Codes and Messages
 */

export const ERROR = {
  0x00: {
    0x00: "Success",
  },
  0x01: {
    0x00: "Connection failure",
    0x01: "Resource unavailable",
    0x02: "Invalid segment value",
    0x03: "Invalid attribute value",
    0x04: "Invalid service",
    0x05: "Invalid class",
    0x06: "Invalid instance",
    0x07: "Invalid connection point",
    0x08: "Invalid connection ID",
    0x09: "Connection timeout",
    0x0A: "Connection already exists",
    0x0B: "Connection does not exist",
    0x0C: "Connection in use",
    0x0D: "Connection not established",
    0x0E: "Connection failed",
    0x0F: "Connection lost",
  },
  0x02: {
    0x00: "Resource unavailable",
    0x01: "Invalid segment value",
    0x02: "Invalid attribute value",
    0x03: "Invalid service",
    0x04: "Invalid class",
    0x05: "Invalid instance",
    0x06: "Invalid connection point",
    0x07: "Invalid connection ID",
    0x08: "Connection timeout",
    0x09: "Connection already exists",
    0x0A: "Connection does not exist",
    0x0B: "Connection in use",
    0x0C: "Connection not established",
    0x0D: "Connection failed",
    0x0E: "Connection lost",
  },
  0x03: {
    0x00: "Value invalid",
    0x01: "Invalid segment value",
    0x02: "Invalid attribute value",
    0x03: "Invalid service",
    0x04: "Invalid class",
    0x05: "Invalid instance",
    0x06: "Invalid connection point",
    0x07: "Invalid connection ID",
    0x08: "Connection timeout",
    0x09: "Connection already exists",
    0x0A: "Connection does not exist",
    0x0B: "Connection in use",
    0x0C: "Connection not established",
    0x0D: "Connection failed",
    0x0E: "Connection lost",
  },
  0x04: {
    0x00: "Malformed data",
    0x01: "Invalid segment value",
    0x02: "Invalid attribute value",
    0x03: "Invalid service",
    0x04: "Invalid class",
    0x05: "Invalid instance",
  },
  0x05: {
    0x00: "Insufficient data",
    0x01: "Invalid segment value",
    0x02: "Invalid attribute value",
    0x03: "Invalid service",
  },
  0x06: {
    0x00: "Attribute not supported",
    0x01: "Invalid segment value",
    0x02: "Invalid attribute value",
    0x03: "Invalid service",
  },
  0x07: {
    0x00: "Too much data",
    0x01: "Invalid segment value",
    0x02: "Invalid attribute value",
  },
  0x08: {
    0x00: "Object does not exist",
    0x01: "Invalid segment value",
    0x02: "Invalid attribute value",
  },
  0x09: {
    0x00: "No stored attribute data",
    0x01: "Invalid segment value",
  },
  0x0A: {
    0x00: "Store operation failure",
    0x01: "Invalid segment value",
  },
  0x0B: {
    0x00: "Routing failure, request packet too large",
    0x01: "Routing failure, response packet too large",
    0x02: "Routing failure, invalid segment value",
    0x03: "Routing failure, invalid attribute value",
  },
  0x0C: {
    0x00: "Routing failure, request packet too large",
    0x01: "Routing failure, response packet too large",
    0x02: "Routing failure, invalid segment value",
    0x03: "Routing failure, invalid attribute value",
  },
  0x0D: {
    0x00: "Routing failure, request packet too large",
    0x01: "Routing failure, response packet too large",
    0x02: "Routing failure, invalid segment value",
    0x03: "Routing failure, invalid attribute value",
  },
  0x0E: {
    0x00: "Routing failure, request packet too large",
    0x01: "Routing failure, response packet too large",
    0x02: "Routing failure, invalid segment value",
    0x03: "Routing failure, invalid attribute value",
  },
  0x0F: {
    0x00: "Routing failure, request packet too large",
    0x01: "Routing failure, response packet too large",
    0x02: "Routing failure, invalid segment value",
    0x03: "Routing failure, invalid attribute value",
  },
  0x10: {
    0x00: "Routing failure, request packet too large",
    0x01: "Routing failure, response packet too large",
    0x02: "Routing failure, invalid segment value",
    0x03: "Routing failure, invalid attribute value",
  },
  0x11: {
    0x00: "Routing failure, request packet too large",
    0x01: "Routing failure, response packet too large",
    0x02: "Routing failure, invalid segment value",
    0x03: "Routing failure, invalid attribute value",
  },
  0x12: {
    0x00: "Routing failure, request packet too large",
    0x01: "Routing failure, response packet too large",
    0x02: "Routing failure, invalid segment value",
    0x03: "Routing failure, invalid attribute value",
  },
  0x13: {
    0x00: "Routing failure, request packet too large",
    0x01: "Routing failure, response packet too large",
    0x02: "Routing failure, invalid segment value",
    0x03: "Routing failure, invalid attribute value",
  },
  0x14: {
    0x00: "Routing failure, request packet too large",
    0x01: "Routing failure, response packet too large",
    0x02: "Routing failure, invalid segment value",
    0x03: "Routing failure, invalid attribute value",
  },
  0x15: {
    0x00: "Routing failure, request packet too large",
    0x01: "Routing failure, response packet too large",
    0x02: "Routing failure, invalid segment value",
    0x03: "Routing failure, invalid attribute value",
  },
  0x16: {
    0x00: "Routing failure, request packet too large",
    0x01: "Routing failure, response packet too large",
    0x02: "Routing failure, invalid segment value",
    0x03: "Routing failure, invalid attribute value",
  },
  0x17: {
    0x00: "Routing failure, request packet too large",
    0x01: "Routing failure, response packet too large",
    0x02: "Routing failure, invalid segment value",
    0x03: "Routing failure, invalid attribute value",
  },
  0x18: {
    0x00: "Routing failure, request packet too large",
    0x01: "Routing failure, response packet too large",
    0x02: "Routing failure, invalid segment value",
    0x03: "Routing failure, invalid attribute value",
  },
  0x19: {
    0x00: "Routing failure, request packet too large",
    0x01: "Routing failure, response packet too large",
    0x02: "Routing failure, invalid segment value",
    0x03: "Routing failure, invalid attribute value",
  },
  0x1A: {
    0x00: "Routing failure, request packet too large",
    0x01: "Routing failure, response packet too large",
    0x02: "Routing failure, invalid segment value",
    0x03: "Routing failure, invalid attribute value",
  },
  0x1B: {
    0x00: "Routing failure, request packet too large",
    0x01: "Routing failure, response packet too large",
    0x02: "Routing failure, invalid segment value",
    0x03: "Routing failure, invalid attribute value",
  },
  0x1C: {
    0x00: "Routing failure, request packet too large",
    0x01: "Routing failure, response packet too large",
    0x02: "Routing failure, invalid segment value",
    0x03: "Routing failure, invalid attribute value",
  },
  0x1D: {
    0x00: "Routing failure, request packet too large",
    0x01: "Routing failure, response packet too large",
    0x02: "Routing failure, invalid segment value",
    0x03: "Routing failure, invalid attribute value",
  },
  0x1E: {
    0x00: "Routing failure, request packet too large",
    0x01: "Routing failure, response packet too large",
    0x02: "Routing failure, invalid segment value",
    0x03: "Routing failure, invalid attribute value",
  },
  0x1F: {
    0x00: "Routing failure, request packet too large",
    0x01: "Routing failure, response packet too large",
    0x02: "Routing failure, invalid segment value",
    0x03: "Routing failure, invalid attribute value",
  },
  0x20: {
    0x00: "General error",
    0x01: "Invalid segment value",
    0x02: "Invalid attribute value",
    0x03: "Invalid service",
    0x04: "Invalid class",
    0x05: "Invalid instance",
  },
};

export class CIPError {
  static getError(
    generalStatusCode: number,
    extendedStatus: number[],
    service?: string,
  ): {
    generalStatusCode: number;
    extendedStatus: number[];
    msg: string[];
    service?: string;
  } {
    const generalStatus = ERROR[generalStatusCode as keyof typeof ERROR];
    const messages: string[] = [];

    if (generalStatus) {
      for (const status of extendedStatus) {
        const msg = generalStatus[status as keyof typeof generalStatus] ||
          `Unknown extended status code 0x${
            status.toString(16).padStart(2, "0")
          }`;
        messages.push(msg);
      }
      return {
        generalStatusCode,
        extendedStatus,
        msg: messages,
        ...(service && { service }),
      };
    } else {
      for (const status of extendedStatus) {
        messages.push(
          `Unknown general status code 0x${
            generalStatusCode.toString(16).padStart(2, "0")
          } - Extended: 0x${status.toString(16).padStart(2, "0")}`,
        );
      }
      return {
        generalStatusCode,
        extendedStatus,
        msg: messages,
        ...(service && { service }),
      };
    }
  }
}
