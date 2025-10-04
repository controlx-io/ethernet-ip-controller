import { assert, assertEquals } from "@std/assert";
import { getTypeCodeString, isValidTypeCode, Types } from "../data-types.ts";

Deno.test("CIP Data Types", async (t) => {
  await t.step("Data Type Validator", () => {
    const fn = (num: number) => isValidTypeCode(num);

    assert(fn(0xc1));
    assert(fn(0xcb));
    assert(fn(0xd1));
    assert(fn(213));

    assert(!fn(0xa1));
    assert(!fn(0x01));
    assert(!fn(0xe1));
    assert(!fn(100));
    assert(!fn("string" as any));
  });

  await t.step("Data Type Retriever", () => {
    const fn = (num: number) => getTypeCodeString(num);

    for (const type of Object.keys(Types)) {
      assertEquals(fn(Types[type as keyof typeof Types]), type);
    }

    assertEquals(fn(0), null);
    assertEquals(fn("string" as any), null);
  });
});
