import { assertEquals, assertThrows } from "@std/assert";
import { Buffer } from "node:buffer";
import Controller from "../controller.ts";
import { delay } from "../../utils/utilities.ts";

Deno.test("Controller Class", async (t) => {
  await t.step("Properties Accessors", async (t) => {
    await t.step("Scan Rate", () => {
      const plc = new Controller();
      assertEquals(plc.scan_rate, 200);

      plc.scan_rate = 45;
      assertEquals(plc.scan_rate !== 200, true);
      assertEquals(plc.scan_rate, 45);

      plc.scan_rate = 41.9999999;
      assertEquals(plc.scan_rate !== 45, true);
      assertEquals(plc.scan_rate, 41);

      assertThrows(() => {
        plc.scan_rate = null as any;
      });

      assertThrows(() => {
        plc.scan_rate = undefined as any;
      });

      assertThrows(() => {
        plc.scan_rate = "hello" as any;
      });
    });

    await t.step("Scanning", async () => {
      const plc = new Controller();
      assertEquals(plc.scanning, false);

      plc.scan();
      assertEquals(plc.scanning, true);

      plc.pauseScan();
      assertEquals(plc.scanning, false);

      // this is to ensure the scan is complete
      // so the test doesn't fail with "Leak Detection"
      await delay(plc.state.scan_rate);
    });

    await t.step("Connected Messaging", () => {
      const plc = new Controller();
      assertEquals(plc.connectedMessaging, true);

      plc.connectedMessaging = false;
      assertEquals(plc.connectedMessaging, false);

      assertThrows(() => {
        plc.connectedMessaging = 3 as any;
      });

      assertThrows(() => {
        plc.connectedMessaging = "connected" as any;
      });

      assertThrows(() => {
        plc.connectedMessaging = null as any;
      });
    });

    await t.step("Controller Properties", () => {
      const plc = new Controller();

      // Expected properties from Jest snapshot
      const expectedProperties = {
        faulted: false,
        io_faulted: false,
        majorRecoverableFault: false,
        majorUnrecoverableFault: false,
        minorRecoverableFault: false,
        minorUnrecoverableFault: false,
        name: null,
        path: null,
        program: false,
        run: false,
        serial_number: null,
        slot: null,
        status: null,
        time: null,
        version: null,
      };

      assertEquals(plc.properties, expectedProperties);
    });

    await t.step("Time", () => {
      const plc = new Controller();
      plc.state.controller.time = new Date("January 5, 2016");

      // Expected time format from Jest snapshot
      const expectedTime = "January 05, 2016 - 12:00:00 AM";
      assertEquals(plc.time, expectedTime);
    });

    await t.step("Default Unconnected Send timeout", () => {
      const plc = new Controller();
      assertEquals(plc.state.unconnectedSendTimeout, 2000);
    });

    await t.step("Custom Unconnected Send timeout", () => {
      const plc = new Controller(true, { unconnectedSendTimeout: 5064 });
      assertEquals(plc.state.unconnectedSendTimeout, 5064);
    });
  });

  await t.step("SendRRDataReceived Handler", async (t) => {
    await t.step("Forward Open", () => {
      const plc = new Controller();

      // Mock the emit method
      const emitCalls: any[] = [];
      const originalEmit = plc.emit;
      plc.emit = function (event: string, ...args: any[]) {
        emitCalls.push({ event, args });
        //@ts-ignore: Testing mock override
        return originalEmit.call(this, event, ...args);
      };

      const srrdBuf = Buffer.from([
        212,
        0,
        0,
        0,
        65,
        2,
        188,
        0,
        34,
        34,
        34,
        34,
        66,
        66,
        51,
        51,
        55,
        19,
        0,
        0,
        16,
        39,
        0,
        0,
        16,
        39,
        0,
        0,
        0,
        0,
      ]);
      const srrd = [
        { TypeID: 0, data: Buffer.from([]) },
        { TypeID: 178, data: srrdBuf },
      ];
      plc._handleSendRRDataReceived(srrd);

      const retBuf = Buffer.from([
        65,
        2,
        188,
        0,
        34,
        34,
        34,
        34,
        66,
        66,
        51,
        51,
        55,
        19,
        0,
        0,
        16,
        39,
        0,
        0,
        16,
        39,
        0,
        0,
        0,
        0,
      ]);

      assertEquals(emitCalls.length, 1);
      assertEquals(emitCalls[0].event, "Forward Open");
      assertEquals(emitCalls[0].args[0], null);
      assertEquals(emitCalls[0].args[1], retBuf);
    });

    await t.step("Forward Close", () => {
      const plc = new Controller();

      // Mock the emit method
      const emitCalls: any[] = [];
      const originalEmit = plc.emit;
      plc.emit = function (event: string, ...args: any[]) {
        emitCalls.push({ event, args });
        //@ts-ignore: Testing mock override
        return originalEmit.call(this, event, ...args);
      };

      const srrdBuf = Buffer.from([
        206,
        0,
        0,
        0,
        66,
        66,
        51,
        51,
        55,
        19,
        0,
        0,
        0,
        0,
      ]);
      const srrd = [
        { TypeID: 0, data: Buffer.from([]) },
        { TypeID: 178, data: srrdBuf },
      ];
      plc._handleSendRRDataReceived(srrd);

      const retBuf = Buffer.from([66, 66, 51, 51, 55, 19, 0, 0, 0, 0]);

      // Check that Forward Close event was emitted (may be multiple events)
      const forwardCloseCall = emitCalls.find((call) =>
        call.event === "Forward Close"
      );
      assertEquals(forwardCloseCall !== undefined, true);
      assertEquals(forwardCloseCall.args[0], null);
      assertEquals(forwardCloseCall.args[1], retBuf);
    });

    await t.step("Multiple Service Packet", () => {
      const plc = new Controller();

      // Mock the emit method
      const emitCalls: any[] = [];
      const originalEmit = plc.emit;
      plc.emit = function (event: string, ...args: any[]) {
        emitCalls.push({ event, args });
        //@ts-ignore: Testing mock override
        return originalEmit.call(this, event, ...args);
      };

      const srrdBuf = Buffer.from([
        138,
        0,
        0,
        0,
        2,
        0,
        6,
        0,
        14,
        0,
        204,
        0,
        0,
        0,
        195,
        0,
        241,
        216,
        204,
        0,
        0,
        0,
        195,
        0,
        64,
        34,
      ]);
      const srrd = [
        { TypeID: 0, data: Buffer.from([34, 34, 34, 34]) },
        { TypeID: 178, data: srrdBuf },
      ];
      plc._handleSendRRDataReceived(srrd);

      const respObj = [
        {
          service: 204,
          generalStatusCode: 0,
          extendedStatusLength: 0,
          extendedStatus: [],
          data: Buffer.from([0xc3, 0x00, 0xf1, 0xd8]),
        },
        {
          service: 204,
          generalStatusCode: 0,
          extendedStatusLength: 0,
          extendedStatus: [],
          data: Buffer.from([0xc3, 0x00, 0x40, 0x22]),
        },
      ];

      assertEquals(emitCalls.length, 1);
      assertEquals(emitCalls[0].event, "Multiple Service Packet");
      assertEquals(emitCalls[0].args[0], null);
      assertEquals(emitCalls[0].args[1], respObj);
    });
  });

  await t.step("SendUnitDataReceived Handler", async (t) => {
    await t.step("Get Attribute All", () => {
      const plc = new Controller();

      // Mock the emit method
      const emitCalls: any[] = [];
      const originalEmit = plc.emit;
      plc.emit = function (event: string, ...args: any[]) {
        emitCalls.push({ event, args });
        //@ts-ignore: Testing mock override
        return originalEmit.call(this, event, ...args);
      };

      const sudBuf = Buffer.from([
        1,
        0,
        129,
        0,
        0,
        0,
        1,
        0,
        14,
        0,
        77,
        0,
        17,
        4,
        112,
        32,
        232,
        2,
        61,
        64,
        22,
        49,
        55,
        54,
        57,
        45,
        76,
        51,
        50,
        69,
        47,
        65,
        32,
        76,
        79,
        71,
        73,
        88,
        53,
        51,
        51,
        50,
        69,
      ]);
      const sud = [
        { TypeID: 161, data: Buffer.from([34, 34, 34, 34]) },
        { TypeID: 177, data: sudBuf },
      ];
      plc._handleSendUnitDataReceived(sud);

      const retBuf = Buffer.from([
        1,
        0,
        14,
        0,
        77,
        0,
        17,
        4,
        112,
        32,
        232,
        2,
        61,
        64,
        22,
        49,
        55,
        54,
        57,
        45,
        76,
        51,
        50,
        69,
        47,
        65,
        32,
        76,
        79,
        71,
        73,
        88,
        53,
        51,
        51,
        50,
        69,
      ]);

      assertEquals(emitCalls.length, 1);
      assertEquals(emitCalls[0].event, "Get Attribute All");
      assertEquals(emitCalls[0].args[0], null);
      assertEquals(emitCalls[0].args[1], retBuf);
    });

    await t.step("Read Tag", () => {
      const plc = new Controller();

      // Mock the emit method
      const emitCalls: any[] = [];
      const originalEmit = plc.emit;
      plc.emit = function (event: string, ...args: any[]) {
        emitCalls.push({ event, args });
        //@ts-ignore: Testing mock override
        return originalEmit.call(this, event, ...args);
      };

      const sudBuf = Buffer.from([2, 0, 204, 0, 0, 0, 195, 0, 241, 216]);
      const sud = [
        { TypeID: 161, data: Buffer.from([34, 34, 34, 34]) },
        { TypeID: 177, data: sudBuf },
      ];
      plc._handleSendUnitDataReceived(sud);

      const retBuf = Buffer.from([195, 0, 241, 216]);

      assertEquals(emitCalls.length, 1);
      assertEquals(emitCalls[0].event, "Read Tag");
      assertEquals(emitCalls[0].args[0], null);
      assertEquals(emitCalls[0].args[1], retBuf);
    });

    await t.step("Multiple Service Packet", () => {
      const plc = new Controller();

      // Mock the emit method
      const emitCalls: any[] = [];
      const originalEmit = plc.emit;
      plc.emit = function (event: string, ...args: any[]) {
        emitCalls.push({ event, args });
        //@ts-ignore: Testing mock override
        return originalEmit.call(this, event, ...args);
      };

      const sudBuf = Buffer.from([
        2,
        0,
        138,
        0,
        0,
        0,
        2,
        0,
        6,
        0,
        14,
        0,
        204,
        0,
        0,
        0,
        195,
        0,
        241,
        216,
        204,
        0,
        0,
        0,
        195,
        0,
        64,
        34,
      ]);
      const sud = [
        { TypeID: 161, data: Buffer.from([34, 34, 34, 34]) },
        { TypeID: 177, data: sudBuf },
      ];
      plc._handleSendUnitDataReceived(sud);

      const respObj = [
        {
          service: 204,
          generalStatusCode: 0,
          extendedStatusLength: 0,
          extendedStatus: [],
          data: Buffer.from([0xc3, 0x00, 0xf1, 0xd8]),
        },
        {
          service: 204,
          generalStatusCode: 0,
          extendedStatusLength: 0,
          extendedStatus: [],
          data: Buffer.from([0xc3, 0x00, 0x40, 0x22]),
        },
      ];

      assertEquals(emitCalls.length, 1);
      assertEquals(emitCalls[0].event, "Multiple Service Packet");
      assertEquals(emitCalls[0].args[0], null);
      assertEquals(emitCalls[0].args[1], respObj);
    });
  });
});
