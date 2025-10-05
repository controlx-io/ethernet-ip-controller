# BETA VERSION - NOT FOR PRODUCTION YET

# Ethernet/IP Controller Library

This library implements controller Ethernet/IP functionalities: **Explicit
Message Client** and **I/O Scanner** written to support reads and writes to PLCs
using Ethernt/IP protocol. Supports IO Scanner to interact with Ethernet/IP
adapters.

## Installation

Pick your command:

```bash
# Deno
deno add jsr:@controlx-io/ts-ethernet-ip

# npm (NodeJS)
npx jsr add @controlx-io/ts-ethernet-ip

# pnpm
pnpm i jsr:@controlx-io/ts-ethernet-ip

# yarn
yarn add jsr:@controlx-io/ts-ethernet-ip

# bun
bunx jsr add @controlx-io/ts-ethernet-ip
```

## Example

Polling tag value, run

```
deno --allow-net https://jsr.io/@controlx-io/ethernet-ip-controller/0.1.2-beta/examples/basic.ts
# or
deno --allow-net https://jsr.io/@controlx-io/ethernet-ip-controller/0.1.2-beta/examples/discovery.ts
```

Or create a file `main.ts` with the content below and run
`deno --allow-net main.ts`:

```typescript
import { Controller } from "@controlx-io/ethernet-ip-controller";

const ipAddress = await prompt("Enter the IP address of the PLC:");
if (!ipAddress) throw new Error("IP address is required");

const plc = new Controller(true);

await plc.connect(ipAddress);
const dintTagInfo = plc.state.tagList.tags.find(
  (t) => t.type.typeName === "DINT",
);
console.log(dintTagInfo);
const tagToRead = plc.newTag(dintTagInfo.name, dintTagInfo.program);

let count = 0;
const tId = setInterval(async () => {
  count += 1;
  if (count > 5) {
    clearInterval(tId);
    return plc.disconnect();
  }

  await plc.readTag(tagToRead);
  console.log(tagToRead.value);
}, 1000);
```

## Inspirations

This project uses the following to achive the desired.

```
https://github.com/cmseaton42/node-ethernet-ip
https://github.com/SerafinTech/ST-node-ethernet-ip
https://www.odva.org/wp-content/uploads/2020/05/PUB00213R0_EtherNetIP_Developers_Guide.pdf
```
