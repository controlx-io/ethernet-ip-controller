import { Controller } from "@controlx-io/ethernet-ip-controller";

// prompt the user for the IP address
const ipAddress = await prompt("Enter the IP address of the PLC:");
if (!ipAddress) throw new Error("IP address is required");
const ipAddressRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
if (!ipAddressRegex.test(ipAddress)) throw new Error("Invalid IP address");

const plc = new Controller(true);

await plc.connect(ipAddress);
const dintTagInfo = plc.state.tagList.tags.find(
  (t) => t.type.typeName === "DINT",
);
if (!dintTagInfo) throw new Error("No DINT tags found");

console.log(dintTagInfo);

console.log("Starting polling for DINT tag for 5 seconds");
const tagToRead = plc.newTag(dintTagInfo.name, dintTagInfo.program);

let count = 0;
const tId = setInterval(async () => {
  count += 1;
  if (count > 5) {
    clearInterval(tId);
    console.log("Disconnecting from PLC");
    return plc.disconnect();
  }

  await plc.readTag(tagToRead);
  console.log(tagToRead.value);
}, 1000);
