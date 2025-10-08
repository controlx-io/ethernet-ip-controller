import { Controller } from "../../src/main.ts";

const ipAddress = await prompt("Enter the IP address of the PLC:");
if (!ipAddress) throw new Error("IP address is required");

const eipDevice = new Controller(false);

// Ethernet IP Device Get Parameter (reading name of PLC 1769-L32E)
eipDevice.connectDevice(ipAddress).then(async () => {
  // Get parameter value:
  // Class ID 0x01 (Identity) with Instance 0x01 and read the "Name" Attribute (0x07)
  const value = await eipDevice
    .getAttributeSingle(0x01, 0x01, 0x07)
    .catch((e) => console.log(e));

  console.log("Value: ", value?.toString());

  eipDevice.disconnect();
});
