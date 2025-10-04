import { assertEquals, assertThrows } from "@std/assert";
import { Buffer } from "node:buffer";
import Tag from "../tag.ts";
import { Types } from "../../protocol/cip/data-types.ts";

Deno.test("Tag Class", async (t) => {
  await t.step("New Instance", async (t) => {
    await t.step("Throws Error on Invalid Inputs", () => {
      const fn = (tagname: any, prog?: any, type = Types.UDINT) => {
        return () => new Tag(tagname, prog, type);
      };

      assertThrows(fn(1234));
      fn("hello"); // Should not throw
      assertThrows(fn("someTag", "prog", 0x31));
      fn("someTag", "prog", Types.EPATH); // Should not throw
      fn("someTag", "prog", 0xc1); // Should not throw
      assertThrows(fn("tag[0].0", null, Types.BIT_STRING));
    });
  });

  await t.step("Tagname Validator", async (t) => {
    await t.step("Accepts and Rejects Appropriate Inputs", () => {
      const fn = (test: any) => Tag.isValidTagname(test);

      assertEquals(fn("_sometagname"), true);
      assertEquals(fn(12345), false);
      assertEquals(fn(null), false);
      assertEquals(fn(undefined), false);
      assertEquals(fn(`hello${311}`), true);
      assertEquals(fn("hello.how3"), true);
      assertEquals(fn("randy.julian.bubbles"), true);
      assertEquals(fn("a.b.c"), true);
      assertEquals(fn("1.1.1"), false);
      assertEquals(fn({ prop: "value" }), false);
      assertEquals(fn("fffffffffffffffffffffffffffffffffffffffff"), false);
      assertEquals(fn("ffffffffffffffffffffffffffffffffffffffff"), true);
      assertEquals(fn("4hello"), false);
      assertEquals(fn("someTagArray[12]"), true);
      assertEquals(fn("someTagArray[1a]"), false);
      assertEquals(fn("hello[f]"), false);
      assertEquals(fn("someOtherTag[0]a"), false);
      assertEquals(fn("tagname"), true);
      assertEquals(fn("tag_with_underscores45"), true);
      assertEquals(fn("someTagArray[0]"), true);
      assertEquals(fn("a"), true);
      assertEquals(fn("tagBitIndex.0"), true);
      assertEquals(fn("tagBitIndex.31"), true);
      assertEquals(fn("tagBitIndex.0a"), false);
      assertEquals(fn("tagBitIndex.-1"), false);
      assertEquals(fn("tagArray[0,0]"), true);
      assertEquals(fn("tagArray[0,0,0]"), true);
      assertEquals(fn("tagArray[-1]"), false);
      assertEquals(fn("tagArray[0,0,-1]"), false);
      assertEquals(fn("Program:program.tag"), true);
      assertEquals(fn("Program:noProgramArray[0].tag"), false);
      assertEquals(fn("notProgram:program.tag"), false);
      assertEquals(fn("Program::noDoubleColon.tag"), false);
      assertEquals(fn("Program:noExtraColon:tag"), false);
      assertEquals(fn("Program:program.tag.singleDimMemArrayOk[0]"), true);
      assertEquals(fn("Program:program.tag.noMultiDimMemArray[0,0]"), false);
      assertEquals(
        fn(
          "Program:program.tag.memberArray[0]._0member[4]._another_1member.f1nal_member.5",
        ),
        true,
      );
      assertEquals(fn("Program:9noNumberProgram.tag"), false);
      assertEquals(fn("tag.9noNumberMember"), false);
      assertEquals(fn("tag.noDouble__underscore1"), false);
      assertEquals(fn("tag.__noDoubleUnderscore2"), false);
      assertEquals(fn("tag.noEndInUnderscore_"), false);
      assertEquals(fn("tag._member_Length_Ok_And_ShouldPassAt40Char"), true);
      assertEquals(fn("tag._memberLengthTooLongAndShouldFailAt41Char"), false);
      assertEquals(fn("tag..noDoubleDelimitters"), false);
      assertEquals(fn("Local:1:I.Data"), true);
      assertEquals(fn("Local:1:I.Data.3"), true);
      assertEquals(fn("Remote_Rack:I.Data[1].5"), true);
      assertEquals(fn("Remote_Rack:O.Data[1].5"), true);
      assertEquals(fn("Remote_Rack:C.Data[1].5"), true);
      assertEquals(fn("Remote_Rack:1:I.0"), true);
    });
  });

  await t.step("Read Message Generator Method", async (t) => {
    await t.step("Generates Appropriate Buffer", () => {
      const tag1 = new Tag("tag", null, Types.DINT);
      const tag2 = new Tag("tag", null, Types.BOOL);
      const tag3 = new Tag("tag", null, Types.REAL);
      const tag4 = new Tag("tag", null, Types.SINT);
      const tag5 = new Tag("tag", null, Types.INT);
      const tag6 = new Tag("tag.0", null, Types.DINT); // test bit index
      const tag7 = new Tag("tag[0]", null, Types.DINT); // test single dim array
      const tag8 = new Tag("tag[0,0]", null, Types.DINT); // test 2 dim array
      const tag9 = new Tag("tag[0,0,0]", null, Types.DINT); // test 3 dim array

      // Expected values from Jest snapshots
      const expected1 = new Uint8Array([76, 3, 145, 3, 116, 97, 103, 0, 1, 0]);
      const expected2 = new Uint8Array([76, 3, 145, 3, 116, 97, 103, 0, 1, 0]);
      const expected3 = new Uint8Array([76, 3, 145, 3, 116, 97, 103, 0, 1, 0]);
      const expected4 = new Uint8Array([76, 3, 145, 3, 116, 97, 103, 0, 1, 0]);
      const expected5 = new Uint8Array([76, 3, 145, 3, 116, 97, 103, 0, 1, 0]);
      const expected6 = new Uint8Array([76, 3, 145, 3, 116, 97, 103, 0, 1, 0]);
      const expected7 = new Uint8Array([
        76,
        4,
        145,
        3,
        116,
        97,
        103,
        0,
        40,
        0,
        1,
        0,
      ]);
      const expected8 = new Uint8Array([
        76,
        5,
        145,
        3,
        116,
        97,
        103,
        0,
        40,
        0,
        40,
        0,
        1,
        0,
      ]);
      const expected9 = new Uint8Array([
        76,
        6,
        145,
        3,
        116,
        97,
        103,
        0,
        40,
        0,
        40,
        0,
        40,
        0,
        1,
        0,
      ]);

      assertEquals(tag1.generateReadMessageRequest(), Buffer.from(expected1));
      assertEquals(tag2.generateReadMessageRequest(), Buffer.from(expected2));
      assertEquals(tag3.generateReadMessageRequest(), Buffer.from(expected3));
      assertEquals(tag4.generateReadMessageRequest(), Buffer.from(expected4));
      assertEquals(tag5.generateReadMessageRequest(), Buffer.from(expected5));
      assertEquals(tag6.generateReadMessageRequest(), Buffer.from(expected6));
      assertEquals(tag7.generateReadMessageRequest(), Buffer.from(expected7));
      assertEquals(tag8.generateReadMessageRequest(), Buffer.from(expected8));
      assertEquals(tag9.generateReadMessageRequest(), Buffer.from(expected9));
    });
  });

  await t.step("Write Message Generator Method", async (t) => {
    await t.step("Generates Appropriate Buffer", () => {
      const tag1 = new Tag("tag", null, Types.DINT);
      const tag2 = new Tag("tag", null, Types.BOOL);
      const tag3 = new Tag("tag", null, Types.REAL);
      const tag4 = new Tag("tag", null, Types.SINT);
      const tag5 = new Tag("tag", null, Types.INT);
      const tag6 = new Tag("tag.0", null, Types.DINT); // test bit index
      const tag7 = new Tag("tag[0]", null, Types.DINT); // test single dim array
      const tag8 = new Tag("tag[0,0]", null, Types.DINT); // test 2 dim array
      const tag9 = new Tag("tag[0,0,0]", null, Types.DINT); // test 3 dim array

      // Expected values from Jest snapshots
      const expected1 = new Uint8Array([
        77,
        3,
        145,
        3,
        116,
        97,
        103,
        0,
        196,
        0,
        1,
        0,
        100,
        0,
        0,
        0,
      ]);
      const expected2 = new Uint8Array([
        77,
        3,
        145,
        3,
        116,
        97,
        103,
        0,
        193,
        0,
        1,
        0,
        1,
      ]);
      const expected3 = new Uint8Array([
        77,
        3,
        145,
        3,
        116,
        97,
        103,
        0,
        202,
        0,
        1,
        0,
        93,
        126,
        0,
        66,
      ]);
      const expected4 = new Uint8Array([
        77,
        3,
        145,
        3,
        116,
        97,
        103,
        0,
        194,
        0,
        1,
        0,
        4,
      ]);
      const expected5 = new Uint8Array([
        77,
        3,
        145,
        3,
        116,
        97,
        103,
        0,
        195,
        0,
        1,
        0,
        246,
        255,
      ]);
      const expected6 = new Uint8Array([
        78,
        3,
        145,
        3,
        116,
        97,
        103,
        0,
        4,
        0,
        1,
        0,
        0,
        0,
        255,
        255,
        255,
        255,
      ]);
      const expected7 = new Uint8Array([
        77,
        4,
        145,
        3,
        116,
        97,
        103,
        0,
        40,
        0,
        196,
        0,
        1,
        0,
        99,
        0,
        0,
        0,
      ]);
      const expected8 = new Uint8Array([
        77,
        5,
        145,
        3,
        116,
        97,
        103,
        0,
        40,
        0,
        40,
        0,
        196,
        0,
        1,
        0,
        99,
        0,
        0,
        0,
      ]);
      const expected9 = new Uint8Array([
        77,
        6,
        145,
        3,
        116,
        97,
        103,
        0,
        40,
        0,
        40,
        0,
        40,
        0,
        196,
        0,
        1,
        0,
        99,
        0,
        0,
        0,
      ]);

      assertEquals(
        tag1.generateWriteMessageRequest(100),
        Buffer.from(expected1),
      );
      assertEquals(
        tag2.generateWriteMessageRequest(true),
        Buffer.from(expected2),
      );
      assertEquals(
        tag3.generateWriteMessageRequest(32.1234),
        Buffer.from(expected3),
      );
      assertEquals(tag4.generateWriteMessageRequest(4), Buffer.from(expected4));
      assertEquals(
        tag5.generateWriteMessageRequest(-10),
        Buffer.from(expected5),
      );
      assertEquals(
        tag6.generateWriteMessageRequest(true),
        Buffer.from(expected6),
      );
      assertEquals(
        tag7.generateWriteMessageRequest(99),
        Buffer.from(expected7),
      );
      assertEquals(
        tag8.generateWriteMessageRequest(99),
        Buffer.from(expected8),
      );
      assertEquals(
        tag9.generateWriteMessageRequest(99),
        Buffer.from(expected9),
      );
    });
  });

  await t.step("keepAlive parameter", async (t) => {
    await t.step("should allow a number input", () => {
      const testTag = new Tag("testkeepalive", undefined, undefined, 10);
      assertEquals(testTag instanceof Tag, true);
    });

    await t.step("should throw an error on non-number types", () => {
      assertThrows(
        () => {
          new Tag("testkeepalive", undefined, undefined, "apple" as any);
        },
        Error,
        "Tag expected keepAlive of type <number> instead got type <string>",
      );
    });

    await t.step("should throw an error if keepAlive is less than 0", () => {
      assertThrows(
        () => {
          new Tag("testkeepalive", undefined, undefined, -20);
        },
        Error,
        "Tag expected keepAlive to be greater than 0, got -20",
      );
    });
  });

  await t.step("bitIndex parameter", async (t) => {
    await t.step("should be null if no bit index is in tag name", () => {
      const testTag = new Tag("tag");
      assertEquals(testTag.bitIndex, null);
    });

    await t.step("should equal bit index", () => {
      const testTag = new Tag("tag.5");
      assertEquals(testTag.bitIndex, 5);
    });
  });
});
