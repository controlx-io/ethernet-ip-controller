import { Buffer } from "node:buffer";
import { Controller } from "../../src/main.ts";

let c = new Controller(false);

// Ethernet IP Device Get Parameter (reading name of PLC 1769-L32E)
c.connect("192.168.111.11", Buffer.from([]), false).then(async () => {
  // Get parameter value:
  // Class ID 0x01 (Identity) with Instance 0x01 and read the "Name" Attribute (0x07)
  let value = await c.getAttributeSingle(0x01, 0x01, 0x07).catch((e) => {
    console.log(e);
  });
  console.log(value?.toString());

  c.disconnect();
});
