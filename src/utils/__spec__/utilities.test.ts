import { assertEquals } from "@std/assert";
import { dateFormat, delay, promiseTimeout } from "../utilities.ts";

Deno.test("Utilities", async (t) => {
  await t.step("Promise Timeout Utility", async (t) => {
    await t.step("Resolves and Rejects as Expected", async () => {
      const fn = (ms: number, arg?: any) => {
        return promiseTimeout(
          new Promise((resolve) => {
            setTimeout(() => {
              if (arg) resolve(arg);
              resolve(undefined);
            }, ms);
          }),
          100,
          "error",
        );
      };

      // Test timeout rejection (string error)
      try {
        await fn(200);
        assertEquals(true, false, "Should have timed out");
      } catch (error) {
        assertEquals(error, "error");
      }

      try {
        await fn(110);
        assertEquals(true, false, "Should have timed out");
      } catch (error) {
        assertEquals(error, "error");
      }

      assertEquals(await fn(90), undefined);
      assertEquals(await fn(50), undefined);
      assertEquals(await fn(50, "hello"), "hello");
      assertEquals(await fn(50, { a: 5, b: 6 }), { a: 5, b: 6 });
    });
  });

  await t.step("Delay Utility", async (t) => {
    await t.step("Resolves and Rejects as Expected", async () => {
      const fn = (ms: number) => {
        return promiseTimeout(
          delay(ms),
          100,
          "error",
        );
      };

      // Test timeout rejection (string error)
      try {
        await fn(200);
        assertEquals(true, false, "Should have timed out");
      } catch (error) {
        assertEquals(error, "error");
      }

      try {
        await fn(110);
        assertEquals(true, false, "Should have timed out");
      } catch (error) {
        assertEquals(error, "error");
      }

      assertEquals(await fn(90), undefined);
      // Wait for 10ms to ensure the delay has resolved
      await delay(100 - 90);

      assertEquals(await fn(50), undefined);
      // Wait for 10ms to ensure the delay has resolved
      await delay(100 - 50);
    });
  });

  await t.step("Date Format Utility", async (t) => {
    await t.step(
      "Formats date with 'mmmm dd, yyyy - hh:MM:ss TT' format",
      () => {
        const testDate = new Date(2024, 0, 15, 14, 30, 45, 123);

        const result = dateFormat(testDate, "mmmm dd, yyyy - hh:MM:ss TT");
        assertEquals(result, "January 15, 2024 - 02:30:45 PM");
      },
    );

    await t.step(
      "Formats date with 'mm/dd/yyyy-HH:MM:ss.l' format",
      () => {
        const testDate = new Date(2024, 0, 15, 14, 30, 45, 123);

        const result = dateFormat(testDate, "mm/dd/yyyy-HH:MM:ss.l");
        assertEquals(result, "01/15/2024-14:30:45.123");
      },
    );

    await t.step("Handles AM/PM correctly for first format", () => {
      const morningDate = new Date(2024, 0, 15, 9, 30, 45, 123);
      const eveningDate = new Date(2024, 0, 15, 21, 30, 45, 123);

      const morningResult = dateFormat(
        morningDate,
        "mmmm dd, yyyy - hh:MM:ss TT",
      );
      const eveningResult = dateFormat(
        eveningDate,
        "mmmm dd, yyyy - hh:MM:ss TT",
      );

      assertEquals(morningResult, "January 15, 2024 - 09:30:45 AM");
      assertEquals(eveningResult, "January 15, 2024 - 09:30:45 PM");
    });

    await t.step("Pads single digits correctly", () => {
      const testDate = new Date(2024, 0, 5, 5, 5, 5, 5);

      const result1 = dateFormat(testDate, "mmmm dd, yyyy - hh:MM:ss TT");
      const result2 = dateFormat(testDate, "mm/dd/yyyy-HH:MM:ss.l");

      assertEquals(result1, "January 05, 2024 - 05:05:05 AM");
      assertEquals(result2, "01/05/2024-05:05:05.005");
    });

    await t.step(
      "Handles edge cases like leap year and month boundaries",
      () => {
        const leapYearDate = new Date(2024, 1, 29, 12, 0, 0, 0);
        const yearEndDate = new Date(2023, 11, 31, 23, 59, 59, 999);

        const leapResult = dateFormat(
          leapYearDate,
          "mmmm dd, yyyy - hh:MM:ss TT",
        );
        const yearEndResult = dateFormat(yearEndDate, "mm/dd/yyyy-HH:MM:ss.l");

        assertEquals(leapResult, "February 29, 2024 - 12:00:00 PM");
        assertEquals(yearEndResult, "12/31/2023-23:59:59.999");
      },
    );

    await t.step("Handles midnight correctly", () => {
      const midnightDate = new Date(2024, 0, 15, 0, 0, 0, 0);

      const result1 = dateFormat(midnightDate, "mmmm dd, yyyy - hh:MM:ss TT");
      const result2 = dateFormat(midnightDate, "mm/dd/yyyy-HH:MM:ss.l");

      assertEquals(result1, "January 15, 2024 - 12:00:00 AM");
      assertEquals(result2, "01/15/2024-00:00:00.000");
    });
  });
});
