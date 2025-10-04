import { assert, assertEquals, assertThrows } from "@std/assert";
import { Buffer } from "node:buffer";
import { build } from "../data.ts";

Deno.test("EPATH", async (t) => {
  await t.step("DATA Segment Build Utility", async (t) => {
    await t.step("Generates Appropriate Output", () => {
      let test = build("TotalCount");
      // Expected buffer from snapshot 1
      const expected1 = new Uint8Array([
        145,
        10,
        84,
        111,
        116,
        97,
        108,
        67,
        111,
        117,
        110,
        116,
      ]);
      assertEquals(test, Buffer.from(expected1));

      test = build(Buffer.from([0x1001, 0x2002, 0x3003]), false);
      // Expected buffer from snapshot 2
      const expected2 = new Uint8Array([128, 2, 1, 2, 3, 0]);
      assertEquals(test, Buffer.from(expected2));

      test = build("SomeTag"); // test symbolic build
      // Expected buffer from snapshot 3
      const expected3 = new Uint8Array([
        145,
        7,
        83,
        111,
        109,
        101,
        84,
        97,
        103,
        0,
      ]);
      assertEquals(test, Buffer.from(expected3));

      test = build("0"); // test element build
      // Expected buffer from snapshot 4
      const expected4 = new Uint8Array([40, 0]);
      assertEquals(test, Buffer.from(expected4));

      test = build("255"); // test 8bit upper boundary
      // Expected buffer from snapshot 5
      const expected5 = new Uint8Array([40, 255]);
      assertEquals(test, Buffer.from(expected5));

      test = build("256"); // test 16 bit lower boundary
      // Expected buffer from snapshot 6
      const expected6 = new Uint8Array([41, 0, 0, 1]);
      assertEquals(test, Buffer.from(expected6));

      test = build("257"); // test 16 bit endian
      // Expected buffer from snapshot 7
      const expected7 = new Uint8Array([41, 0, 1, 1]);
      assertEquals(test, Buffer.from(expected7));

      test = build("65535"); // test 16 bit upper boundary
      // Expected buffer from snapshot 8
      const expected8 = new Uint8Array([41, 0, 255, 255]);
      assertEquals(test, Buffer.from(expected8));

      test = build("65536"); // test 32 bit lower boundary
      // Expected buffer from snapshot 9
      const expected9 = new Uint8Array([42, 0, 0, 0, 1, 0]);
      assertEquals(test, Buffer.from(expected9));

      test = build("65537"); // test 32 bit endian
      // Expected buffer from snapshot 10
      const expected10 = new Uint8Array([42, 0, 1, 0, 1, 0]);
      assertEquals(test, Buffer.from(expected10));
    });

    await t.step("Throws with Bad Input", () => {
      // Valid cases that should not throw
      build("hello");
      build(Buffer.from("hello world"));
      build(Buffer.from("hello world"), false);

      // Invalid cases that should throw
      assertThrows(() => build(32 as any));
      assertThrows(() => build({ prop: 76 } as any));
      assertThrows(() => build(1 as any, -1 as any));
      assertThrows(() => build(1 as any, { hey: "you" } as any));
    });
  });
});
