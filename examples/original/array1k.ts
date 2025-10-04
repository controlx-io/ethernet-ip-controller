import { machine } from "node:os";
import { Controller, Structure, Tag } from "../../src/main.ts";

let c = new Controller();

try {
  await c.connect("192.168.111.11");
  let tag = new Tag("array1kREAL", "MainProgram", undefined, 0, 1, 1000);
  await c.readTag(tag, 1000);
  console.log(tag.value.length, `Value at index 999: ${tag.value[999]}`);

  tag.value[999] = 1.23;
  console.log(tag.value.length, `Value at index 999: ${tag.value[999]}`);
  await c.writeTag(tag);
  console.log(c.state.tagList.tags.map((t) => t.name));

  let tag2 = new Structure("BigStruct", c.state.tagList, "MainProgram");

  await c.readTag(tag2);
  tag2.value.STUFF1[0] = Math.floor(Math.random() * 100);
  console.log(tag2.value);

  await c.writeTag(tag2);
} catch (error) {
  console.error(error);
}

await c.disconnect();

// fixed the Uititly clear timeout to stop a hang before the process exit
process.on("exit", () => {
  console.log("Process exiting", new Date().toISOString());
});
