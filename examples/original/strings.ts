import { Controller, Structure, Tag } from "../../src/main.ts";

let c = new Controller(true);

await c.connect("192.168.111.11");
let tag = c.newTag("TestString", "MainProgram");
await c.readTag(tag);
console.log(tag.value);

tag.value = "America... F*** YEAH!";
await c.writeTag(tag);

await c.readTag(tag);
console.log(tag.value);

c.disconnect();
