import { Browser, BrowserEvent, type IBrowserDevice } from "../src/main.ts";

const br = new Browser(undefined, "192.168.111.211", false, 1000);
console.log(`Starting Ethernet/IP Discovery on: ${br.originatorIPaddress}`);

br.on(
  BrowserEvent.NewDevice,
  (device) =>
    console.log(
      "==> New Device: " +
        device.productName +
        " at " +
        device.socketAddress.sin_addr,
    ),
);

br.on(
  BrowserEvent.BroadcastRequest,
  () => console.log("Broadcast Request"),
);

br.on(
  BrowserEvent.DeviceDisconnected,
  (devices) =>
    console.log("Device Disconnected, still connected: ", devices.length),
);

br.on(
  BrowserEvent.DeviceListUpdated,
  (devices) =>
    console.log(
      "Device List Updated: ",
      devices.map((device: IBrowserDevice) => device.productName),
    ),
);

br.start();
setTimeout(() => {
  console.log("Stopping Ethernet/IP Discovery");
  br.stop();
}, 10000);
