import { assertEquals, assertThrows } from "@std/assert";
import { Buffer } from "node:buffer";
import * as manager from "../connection-manager.ts";

Deno.test("Connection Manager Building", async (t) => {
  const { build_forwardOpen, build_forwardClose } = manager;

  await t.step(
    "Produces the Correct Output Buffer for ForwardOpen Request",
    () => {
      const test = build_forwardOpen(
        10000,
        undefined,
        undefined,
        undefined,
        undefined,
        1234567,
      );

      // Expected buffer from snapshot
      const expected = new Uint8Array([
        3,
        125,
        0,
        0,
        0,
        0,
        135,
        214,
        18,
        0,
        66,
        66,
        51,
        51,
        55,
        19,
        0,
        0,
        3,
        0,
        0,
        0,
        16,
        39,
        0,
        0,
        244,
        67,
        16,
        39,
        0,
        0,
        244,
        67,
        163,
      ]);

      assertEquals(test, Buffer.from(expected));
    },
  );

  await t.step(
    "Produces the Correct Output Buffer for ForwardClose Request",
    () => {
      const test = build_forwardClose();

      // Expected buffer from snapshot
      const expected = new Uint8Array([
        3,
        125,
        66,
        66,
        51,
        51,
        55,
        19,
        0,
        0,
      ]);

      assertEquals(test, Buffer.from(expected));
    },
  );
});

Deno.test("Connection Manager Connection Parameters", async (t) => {
  const {
    build_connectionParameters,
    owner,
    priority,
    fixedVar,
    connectionType,
  } = manager;

  await t.step(
    "Produces the Correct Output number for connection parameters",
    () => {
      const test = build_connectionParameters(
        owner["Exclusive"],
        connectionType["PointToPoint"],
        priority["Low"],
        fixedVar["Variable"],
        500,
      );

      // Expected value from snapshot
      assertEquals(test, 17396);
    },
  );

  await t.step("Error-cases: owner", () => {
    assertThrows(() => {
      build_connectionParameters(
        "1000" as any,
        connectionType["PointToPoint"],
        priority["Low"],
        fixedVar["Variable"],
        500,
      );
    });
  });

  await t.step("Error-cases: connectionType", () => {
    assertThrows(() => {
      build_connectionParameters(
        owner["Exclusive"],
        "1000" as any,
        priority["Low"],
        fixedVar["Variable"],
        500,
      );
    });
  });

  await t.step("Error-cases: priority", () => {
    assertThrows(() => {
      build_connectionParameters(
        owner["Exclusive"],
        connectionType["PointToPoint"],
        "1000" as any,
        fixedVar["Variable"],
        500,
      );
    });
  });

  await t.step("Error-cases: fixedVar", () => {
    assertThrows(() => {
      build_connectionParameters(
        owner["Exclusive"],
        connectionType["PointToPoint"],
        priority["Low"],
        "1000" as any,
        500,
      );
    });
  });

  await t.step("Error-cases: size", () => {
    assertThrows(() => {
      build_connectionParameters(
        owner["Exclusive"],
        connectionType["PointToPoint"],
        priority["Low"],
        fixedVar["Variable"],
        999999,
      );
    });
  });
});
