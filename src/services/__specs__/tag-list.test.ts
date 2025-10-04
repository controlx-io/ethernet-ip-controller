import { assertEquals } from "@std/assert";
import { Buffer } from "node:buffer";
import TagList from "../tag-list.ts";

const responseData = Buffer.from(
  "e70e00001e00486f774c6f6e6743616e596f754d616b65416e496e74656765724e616d65c400d1180000060054696d657232838ffa1b00000c004d61703a4c6f63616c454e4269103f2000000800496e746567657236c400202400000e004d61703a436f6e74726f6c6c65726910822500000900416e616c6f674f6e65ca00e92b00000800496e746567657233c4006831000006004269744f6e65c100b435000010004c6f6e67496e74656765724e616d6531c3003d3800000800496e746567657235c4002e3f0000280054686973496e74656765724e616d6549734576656e4c6f6e6765725468616e546865466972737431c400a54100000f004c6f6e67537472696e674e616d6531ce8f734a00000700537472696e6732ce8fec5000000a00546865496e7465676572c30024590000130050726f6772616d3a4d61696e50726f6772616d6810b96600002800546869734973416e6f746865724d6178696d756d4c656e6774685461674e616d6531313131313131c4004b7c00000800496e746567657234c400f8820000140050726f6772616d3a4d61696e50726f6772616d326810978a0000060042697454776fc100b09b00000700537472696e6731ce8f0ab400000700537472696e6733ce8f23b7000009004d61703a4c6f63616c6910",
  "hex",
);

Deno.test("Tag List", async (t) => {
  await t.step("Generate List Message Requests Method", async (t) => {
    await t.step("Generates Appropriate Output Instance 0", () => {
      const tagList = new TagList();

      const result = tagList._generateListMessageRequest(0);

      // Expected data from Jest snapshot
      const expectedData = new Uint8Array([
        85,
        3,
        32,
        107,
        37,
        0,
        0,
        0,
        2,
        0,
        1,
        0,
        2,
        0,
      ]);

      assertEquals(result, Buffer.from(expectedData));
    });
  });

  await t.step("Parse Tag List Response Message", async (t) => {
    await t.step("Generates Appropriate Output", () => {
      const tagList = new TagList();

      tagList._parseAttributeListResponse(responseData);

      // Expected tags from Jest snapshot
      const expectedTags = [
        {
          id: 3815,
          name: "HowLongCanYouMakeAnIntegerName",
          program: "",
          type: {
            arrayDims: 0,
            code: 196,
            reserved: false,
            sintPos: null,
            structure: false,
            typeName: null,
          },
        },
        {
          id: 6353,
          name: "Timer2",
          program: "",
          type: {
            arrayDims: 0,
            code: 3971,
            reserved: false,
            sintPos: null,
            structure: true,
            typeName: null,
          },
        },
        {
          id: 7162,
          name: "Map:LocalENB",
          program: "",
          type: {
            arrayDims: 0,
            code: 105,
            reserved: true,
            sintPos: null,
            structure: false,
            typeName: null,
          },
        },
        {
          id: 8255,
          name: "Integer6",
          program: "",
          type: {
            arrayDims: 0,
            code: 196,
            reserved: false,
            sintPos: null,
            structure: false,
            typeName: null,
          },
        },
        {
          id: 9248,
          name: "Map:Controller",
          program: "",
          type: {
            arrayDims: 0,
            code: 105,
            reserved: true,
            sintPos: null,
            structure: false,
            typeName: null,
          },
        },
        {
          id: 9602,
          name: "AnalogOne",
          program: "",
          type: {
            arrayDims: 0,
            code: 202,
            reserved: false,
            sintPos: null,
            structure: false,
            typeName: null,
          },
        },
        {
          id: 11241,
          name: "Integer3",
          program: "",
          type: {
            arrayDims: 0,
            code: 196,
            reserved: false,
            sintPos: null,
            structure: false,
            typeName: null,
          },
        },
        {
          id: 12648,
          name: "BitOne",
          program: "",
          type: {
            arrayDims: 0,
            code: 193,
            reserved: false,
            sintPos: 0,
            structure: false,
            typeName: null,
          },
        },
        {
          id: 13748,
          name: "LongIntegerName1",
          program: "",
          type: {
            arrayDims: 0,
            code: 195,
            reserved: false,
            sintPos: null,
            structure: false,
            typeName: null,
          },
        },
        {
          id: 14397,
          name: "Integer5",
          program: "",
          type: {
            arrayDims: 0,
            code: 196,
            reserved: false,
            sintPos: null,
            structure: false,
            typeName: null,
          },
        },
        {
          id: 16174,
          name: "ThisIntegerNameIsEvenLongerThanTheFirst1",
          program: "",
          type: {
            arrayDims: 0,
            code: 196,
            reserved: false,
            sintPos: null,
            structure: false,
            typeName: null,
          },
        },
        {
          id: 16805,
          name: "LongStringName1",
          program: "",
          type: {
            arrayDims: 0,
            code: 4046,
            reserved: false,
            sintPos: null,
            structure: true,
            typeName: null,
          },
        },
        {
          id: 19059,
          name: "String2",
          program: "",
          type: {
            arrayDims: 0,
            code: 4046,
            reserved: false,
            sintPos: null,
            structure: true,
            typeName: null,
          },
        },
        {
          id: 20716,
          name: "TheInteger",
          program: "",
          type: {
            arrayDims: 0,
            code: 195,
            reserved: false,
            sintPos: null,
            structure: false,
            typeName: null,
          },
        },
        {
          id: 22820,
          name: "Program:MainProgram",
          program: "",
          type: {
            arrayDims: 0,
            code: 104,
            reserved: true,
            sintPos: null,
            structure: false,
            typeName: null,
          },
        },
        {
          id: 26297,
          name: "ThisIsAnotherMaximumLengthTagName1111111",
          program: "",
          type: {
            arrayDims: 0,
            code: 196,
            reserved: false,
            sintPos: null,
            structure: false,
            typeName: null,
          },
        },
        {
          id: 31819,
          name: "Integer4",
          program: "",
          type: {
            arrayDims: 0,
            code: 196,
            reserved: false,
            sintPos: null,
            structure: false,
            typeName: null,
          },
        },
        {
          id: 33528,
          name: "Program:MainProgram2",
          program: "",
          type: {
            arrayDims: 0,
            code: 104,
            reserved: true,
            sintPos: null,
            structure: false,
            typeName: null,
          },
        },
        {
          id: 35479,
          name: "BitTwo",
          program: "",
          type: {
            arrayDims: 0,
            code: 193,
            reserved: false,
            sintPos: 0,
            structure: false,
            typeName: null,
          },
        },
        {
          id: 39856,
          name: "String1",
          program: "",
          type: {
            arrayDims: 0,
            code: 4046,
            reserved: false,
            sintPos: null,
            structure: true,
            typeName: null,
          },
        },
        {
          id: 46090,
          name: "String3",
          program: "",
          type: {
            arrayDims: 0,
            code: 4046,
            reserved: false,
            sintPos: null,
            structure: true,
            typeName: null,
          },
        },
        {
          id: 46883,
          name: "Map:Local",
          program: "",
          type: {
            arrayDims: 0,
            code: 105,
            reserved: true,
            sintPos: null,
            structure: false,
            typeName: null,
          },
        },
      ];

      assertEquals(tagList.tags.length, expectedTags.length);

      // Test each tag structure
      for (let i = 0; i < expectedTags.length; i++) {
        assertEquals(tagList.tags[i].id, expectedTags[i].id);
        assertEquals(tagList.tags[i].name, expectedTags[i].name);
        assertEquals(tagList.tags[i].program, expectedTags[i].program);
        assertEquals(tagList.tags[i].type, expectedTags[i].type);
      }
    });
  });

  await t.step("Get Program Names", async (t) => {
    await t.step("Generates Appropriate Output", () => {
      const tagList = new TagList();

      tagList._parseAttributeListResponse(responseData);

      // Expected programs from Jest snapshot
      const expectedPrograms = ["MainProgram", "MainProgram2"];

      assertEquals(tagList.programs, expectedPrograms);
    });
  });
});
