import { assertEquals, assertThrows } from "@std/assert";
import { Buffer } from "node:buffer";
import { build } from "../port.ts";

Deno.test("EPATH", async (t) => {
  await t.step("PORT Segment Build Utility", async (t) => {
    await t.step("Generates Appropriate Output", () => {
      let test = build(2, 6);
      // Expected buffer from snapshot 1
      const expected1 = new Uint8Array([2, 6]);
      assertEquals(test, Buffer.from(expected1));

      test = build(18, 1);
      // Expected buffer from snapshot 2
      const expected2 = new Uint8Array([15, 18, 0, 1]);
      assertEquals(test, Buffer.from(expected2));

      test = build(5, "130.151.137.105");
      // Expected buffer from snapshot 3
      const expected3 = new Uint8Array([
        21,
        15,
        49,
        51,
        48,
        46,
        49,
        53,
        49,
        46,
        49,
        51,
        55,
        46,
        49,
        48,
        53,
        0,
      ]);
      assertEquals(test, Buffer.from(expected3));

      test = build(1, 5);
      // Expected buffer from snapshot 4
      const expected4 = new Uint8Array([1, 5]);
      assertEquals(test, Buffer.from(expected4));
    });

    await t.step("Throws with Bad Input", () => {
      assertThrows(() => build("hello" as any, 5));
      assertThrows(() => build(0, 5));
      assertThrows(() => build(-5, 5));
      // build(1, 5) should not throw
      build(1, 5);
      assertThrows(() => build(1, -1));
      assertThrows(() => build(1, { hey: "you" } as any));
    });
  });
});
