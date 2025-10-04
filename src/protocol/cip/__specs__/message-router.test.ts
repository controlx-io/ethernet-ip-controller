import { assertEquals } from "@std/assert";
import { Buffer } from "node:buffer";
import { build, parse } from "../message-router.ts";

Deno.test("Message Router", async (t) => {
  await t.step("Builder", async (t) => {
    await t.step("Produces the Correct Output Buffer", () => {
      const test = build(
        0x41,
        Buffer.from("Hello World"),
        Buffer.from("Hello World"),
      );

      // Expected buffer from snapshot
      const expected = new Uint8Array([
        65,
        6,
        72,
        101,
        108,
        108,
        111,
        32,
        87,
        111,
        114,
        108,
        100,
        0,
        72,
        101,
        108,
        108,
        111,
        32,
        87,
        111,
        114,
        108,
        100,
      ]);

      assertEquals(test, Buffer.from(expected));
    });
  });

  await t.step("Parser", async (t) => {
    await t.step("Parses MR Object Correctly", () => {
      const buf = Buffer.from([
        0x41, // service
        0x00, // Reserved - Set to 0
        0x0a, // General Status Code
        0x03, // Extended Status Length
        0x01, // Extended Status
        0x03,
        0x05,
        0x01,
        0x03,
        0x05,
        0x01, // Reply Service Data
        0x02,
        0x03,
        0x04,
        0x05,
      ]);

      const test = parse(buf);

      // Expected parsed structure from snapshot
      assertEquals(test.service, 65);
      assertEquals(test.generalStatusCode, 10);
      assertEquals(test.extendedStatusLength, 3);
      assertEquals(test.extendedStatus, [769, 261, 1283]);
      assertEquals(test.data, Buffer.from([1, 2, 3, 4, 5]));
    });
  });
});
