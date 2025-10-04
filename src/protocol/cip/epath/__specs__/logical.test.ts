import { assertEquals, assertThrows } from "@std/assert";
import { Buffer } from "node:buffer";
import { build, types } from "../logical.ts";

Deno.test("EPATH", async (t) => {
  await t.step("LOGICAL Segment Build Utility", async (t) => {
    await t.step("Generates Appropriate Output", () => {
      let test = build(types.ClassID, 5, false);
      // Expected buffer from snapshot 1
      const expected1 = new Uint8Array([32, 5]);
      assertEquals(test, Buffer.from(expected1));

      test = build(types.InstanceID, 2, false);
      // Expected buffer from snapshot 2
      const expected2 = new Uint8Array([36, 2]);
      assertEquals(test, Buffer.from(expected2));

      test = build(types.AttributeID, 1, false);
      // Expected buffer from snapshot 3
      const expected3 = new Uint8Array([48, 1]);
      assertEquals(test, Buffer.from(expected3));

      test = build(types.InstanceID, 500, false);
      // Expected buffer from snapshot 4
      const expected4 = new Uint8Array([37, 244, 1]);
      assertEquals(test, Buffer.from(expected4));

      test = build(types.InstanceID, 500);
      // Expected buffer from snapshot 5
      const expected5 = new Uint8Array([37, 0, 244, 1]);
      assertEquals(test, Buffer.from(expected5));

      test = build(types.AttributeID, 1);
      // Expected buffer from snapshot 6
      const expected6 = new Uint8Array([48, 1]);
      assertEquals(test, Buffer.from(expected6));

      test = build(types.InstanceID, 2);
      // Expected buffer from snapshot 7
      const expected7 = new Uint8Array([36, 2]);
      assertEquals(test, Buffer.from(expected7));
    });

    await t.step("Throws with Bad Input", () => {
      // Note: Type validation is now handled at compile time with TypeScript enum
      // Runtime validation only checks address parameter
      assertThrows(() => build(types.AttributeID, -1));
      assertThrows(() => build(types.AttributeID, { hey: "you" } as any));
      assertThrows(() => build(types.ClassID, -1));

      // Valid cases that should not throw
      build(types.ClassID, 5);
      build(types.ClassID, 0); // Address 0 is now allowed
    });
  });
});
