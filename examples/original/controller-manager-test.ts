import { extController } from "../../src/main.ts";

/**
 * Description of this file:
 * This file is a test file for the controller manager.
 * This script requires a PLC to be connected on IP 192.168.111.11, slot 0, rpi 50.
 *
 * It erequires to following tags to be present:
 * - MainProgram: TestUDT2[0] - DINT array
 * - MainProgram: TestUDT22[0] - DINT array
 * - Controller's scope: string1 - STRING
 * - Controller's scope: string2 - STRING
 */

let c = new extController("192.168.111.11", 0, 50);

c.connect();

c.on("TagChanged", (tag, prevValue) => {
  console.log(tag.name, "changed from", prevValue, "=>", tag.value);
});

let tagTests: any[] = [
  {
    name: "TestUDT2[0]",
    program: "MainProgram",
  },
  {
    name: "TestUDT22[0]",
    program: "MainProgram",
  },
  {
    name: "string1",
  },
  {
    name: "string2",
  },
];

tagTests.forEach((tagTest) => {
  c.addTag(
    tagTest.name,
    tagTest.program,
    tagTest.arrayDims,
    tagTest.arraySize,
  );
});

c.on("Connected", (thisCont) => {
  console.log("Connected", thisCont.ipAddress);
});

c.on("Disconnected", () => {
  console.log("Disconnected");
});

c.on("Error", (e) => {
  console.log(e);
});

c.on("TagUnknown", (t) => {
  console.log("TagUnknown", t.name);
  //Remove Unknown Tag
  c.removeTag(t.name, t.program);
});
