import { assertEquals } from "@std/assert";
import { Buffer } from "node:buffer";
import { build, generateEncodedTimeout } from "../unconnected-send.ts";
import { build as messageRouterBuild } from "../message-router.ts";
import { build as portBuild } from "../epath/port.ts";

Deno.test("Unconnected Send Service", async (t) => {
  await t.step("Timeout Encoding Utility", () => {
    const fn = (arg: number) => generateEncodedTimeout(arg);

    assertEquals(fn(2304), { time_tick: 8, ticks: 9 });
    assertEquals(fn(2400), { time_tick: 5, ticks: 75 });
    assertEquals(fn(2000), { time_tick: 4, ticks: 125 });
  });

  await t.step("Message Build Utility", () => {
    const readTag_Path = "sometag";
    const readTag_Data = Buffer.alloc(2);
    readTag_Data.writeUInt16LE(1, 0);
    const mr = messageRouterBuild(
      0x4c,
      Buffer.from(readTag_Path),
      readTag_Data,
    );

    const test = build(mr, portBuild(1, 5));

    // Expected buffer from snapshot
    const expected = new Uint8Array([
      82,
      2,
      32,
      6,
      36,
      1,
      4,
      125,
      12,
      0,
      76,
      4,
      115,
      111,
      109,
      101,
      116,
      97,
      103,
      0,
      1,
      0,
      1,
      0,
      1,
      5,
    ]);

    assertEquals(test, Buffer.from(expected));
  });
});
