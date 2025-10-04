import {
  assert,
  assertEquals,
  assertStringIncludes,
  assertThrows,
} from "@std/assert";
import { Buffer } from "node:buffer";
import * as encapsulation from "../encapsulation.ts";

// Deno.test("Encapsulation Command Validator", async (t) => {
//   const { validateCommand } = encapsulation;
//   const {
//     RegisterSession,
//     UnregisterSession,
//     SendRRData,
//     SendUnitData,
//   } = encapsulation.commands;

//   await t.step("Rejects Invalid Commands", () => {
//     assert(!validateCommand(0x99));
//     assert(!validateCommand("hello" as any));
//     assert(!validateCommand(0x02));
//   });

//   await t.step("Accepts Proper Commands", () => {
//     assert(validateCommand(0x66));
//     assert(validateCommand(102));
//     assert(validateCommand(RegisterSession));
//     assert(validateCommand(UnregisterSession));
//     assert(validateCommand(SendRRData));
//     assert(validateCommand(SendUnitData));
//   });
// });

Deno.test("Encapsulation Status Parser", async (t) => {
  const { parseStatus } = encapsulation;

  await t.step("Rejects Non-Number Inputs", () => {
    assertThrows(() => parseStatus("test" as any));
    assertThrows(() => parseStatus(null as any));
    assertThrows(() => parseStatus(undefined as any));
  });

  await t.step("Returns Proper Human Readable String", () => {
    assertEquals(parseStatus(0), "SUCCESS");
    assertStringIncludes(parseStatus(0x01), "FAIL");
    assertStringIncludes(parseStatus(1), "FAIL");
    assertStringIncludes(parseStatus(0x45), "FAIL");
  });
});

Deno.test("Encapsulation Header Building Utility", async (t) => {
  const {
    header: { build },
    commands: { RegisterSession },
  } = encapsulation;

  await t.step("Builds Correct Encapsulation Buffer", () => {
    const snap = build(RegisterSession, 0x00, [0x01, 0x00, 0x00, 0x00]);

    // Expected buffer from snapshot: RegisterSession command with specific data
    const expected = new Uint8Array([
      101,
      0,
      4,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
    ]);

    assertEquals(snap, Buffer.from(expected));
  });
});

Deno.test("Encapsulation Header Parsing Utility", async (t) => {
  const {
    header: { parse, build },
    commands: { SendRRData },
  } = encapsulation;

  await t.step("Builds Correct Encapsulation Buffer", () => {
    const data = build(SendRRData, 98705, [0x01, 0x00, 0x00, 0x00]);
    const snap = parse(data);

    // Expected values from snapshot
    assertEquals(snap.command, "SendRRData");
    assertEquals(snap.commandCode, 111);
    assertEquals(snap.length, 4);
    assertEquals(snap.options, 0);
    assertEquals(snap.session, 98705);
    assertEquals(snap.status, "SUCCESS");
    assertEquals(snap.statusCode, 0);
    assert(snap.data instanceof Buffer);
    assertEquals(snap.data.length, 4);
    assertEquals(snap.data.readUInt32LE(0), 0x00000001);
  });
});

Deno.test("Test Encapsulation Generator Functions", async (t) => {
  const { registerSession, unregisterSession, sendRRData, sendUnitData } =
    encapsulation;

  await t.step("Register Session Returns Correct Encapsulation String", () => {
    const data = registerSession();

    // Expected buffer from snapshot
    const expected = new Uint8Array([
      101,
      0,
      4,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
    ]);

    assertEquals(data, Buffer.from(expected));
  });

  await t.step(
    "Unregister Session Returns Correct Encapsulation String",
    () => {
      const data = unregisterSession(98705);

      // Expected buffer from snapshot
      const expected = new Uint8Array([
        102,
        0,
        0,
        0,
        145,
        129,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ]);

      assertEquals(data, Buffer.from(expected));
    },
  );

  await t.step("SendRRData Returns Correct Encapsulation String", () => {
    const data = sendRRData(98705, Buffer.from("hello world"));

    // Expected buffer from snapshot
    const expected = new Uint8Array([
      111,
      0,
      27,
      0,
      145,
      129,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      10,
      0,
      2,
      0,
      0,
      0,
      0,
      0,
      178,
      0,
      11,
      0,
      104,
      101,
      108,
      108,
      111,
      32,
      119,
      111,
      114,
      108,
      100,
    ]);

    assertEquals(data, Buffer.from(expected));
  });

  await t.step("SendUnitData Returns Correct Encapsulation String", () => {
    const data = sendUnitData(98705, Buffer.from("hello world"), 32145, 456);

    // Expected buffer from snapshot
    const expected = new Uint8Array([
      112,
      0,
      33,
      0,
      145,
      129,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      2,
      0,
      161,
      0,
      4,
      0,
      145,
      125,
      0,
      0,
      177,
      0,
      13,
      0,
      200,
      1,
      104,
      101,
      108,
      108,
      111,
      32,
      119,
      111,
      114,
      108,
      100,
    ]);

    assertEquals(data, Buffer.from(expected));
  });
});
Deno.test("Test Common Packet Format Helper Functions", async (t) => {
  const {
    CPF: { parse, build, ItemIDs },
  } = encapsulation;

  // await t.step("Invalid CPF Commands causes an Error to be Thrown", () => {
  //   const { Null, ListIdentity, ConnectionBased, UCMM } = ItemIDs;

  //   assert(isCmd(Null));
  //   assert(isCmd(ListIdentity));
  //   assert(isCmd(ConnectionBased));
  //   assert(isCmd(UCMM));
  //   assert(isCmd(0x8001));
  //   assert(!isCmd(0x01));
  //   assert(!isCmd(0x8003));
  //   assert(!isCmd(0xc1));
  // });

  await t.step("Build Helper Function Generates Correct Output", () => {
    const test1 = [
      { TypeID: ItemIDs.Null, data: Buffer.from([]) },
      { TypeID: ItemIDs.UCMM, data: Buffer.from("hello world") },
    ];

    const test2 = [
      { TypeID: ItemIDs.Null, data: Buffer.from([]) },
      { TypeID: ItemIDs.UCMM, data: Buffer.from("hello world") },
      { TypeID: ItemIDs.ConnectionBased, data: Buffer.from("This is a test") },
    ];

    const result1 = build(test1);
    const result2 = build(test2);

    // Expected buffers from snapshots
    const expected1 = new Uint8Array([
      2,
      0,
      0,
      0,
      0,
      0,
      178,
      0,
      11,
      0,
      104,
      101,
      108,
      108,
      111,
      32,
      119,
      111,
      114,
      108,
      100,
    ]);

    const expected2 = new Uint8Array([
      3,
      0,
      0,
      0,
      0,
      0,
      178,
      0,
      11,
      0,
      104,
      101,
      108,
      108,
      111,
      32,
      119,
      111,
      114,
      108,
      100,
      161,
      0,
      14,
      0,
      84,
      104,
      105,
      115,
      32,
      105,
      115,
      32,
      97,
      32,
      116,
      101,
      115,
      116,
    ]);

    assertEquals(result1, Buffer.from(expected1));
    assertEquals(result2, Buffer.from(expected2));
  });

  await t.step("Parse Helper Function Generates Correct Output", () => {
    const test1 = build([
      { TypeID: ItemIDs.Null, data: Buffer.from([]) },
      { TypeID: ItemIDs.UCMM, data: Buffer.from("hello world") },
    ]);

    const test2 = build([
      { TypeID: ItemIDs.Null, data: Buffer.from([]) },
      { TypeID: ItemIDs.UCMM, data: Buffer.from("hello world") },
      { TypeID: ItemIDs.ConnectionBased, data: Buffer.from("This is a test") },
    ]);

    const result1 = parse(test1);
    const result2 = parse(test2);

    // Expected parsed structure from snapshots
    assertEquals(result1.length, 2);
    assertEquals(result1[0].TypeID, 0); // Null TypeID
    assertEquals(result1[0].length, 0); // Empty data
    assertEquals(result1[0].data.length, 0); // Empty buffer
    assertEquals(result1[1].TypeID, 178); // UCMM TypeID (0xB2)
    assertEquals(result1[1].length, 11); // "hello world" length
    assertEquals(result1[1].data.toString(), "hello world"); // Data content

    assertEquals(result2.length, 3);
    assertEquals(result2[0].TypeID, 0); // Null TypeID
    assertEquals(result2[0].length, 0); // Empty data
    assertEquals(result2[1].TypeID, 178); // UCMM TypeID (0xB2)
    assertEquals(result2[1].length, 11); // "hello world" length
    assertEquals(result2[1].data.toString(), "hello world"); // Data content
    assertEquals(result2[2].TypeID, 161); // ConnectionBased TypeID (0xA1)
    assertEquals(result2[2].length, 14); // "This is a test" length
    assertEquals(result2[2].data.toString(), "This is a test"); // Data content
  });
});
