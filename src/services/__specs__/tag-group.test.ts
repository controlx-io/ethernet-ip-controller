import { assertEquals } from "@std/assert";
import { Buffer } from "node:buffer";
import TagGroup from "../tag-group.ts";
import Tag from "../tag.ts";
import { Types } from "../../protocol/cip/data-types.ts";

Deno.test("Tag Class", async (t) => {
  await t.step("Generate Read Requests Method", async (t) => {
    await t.step("Generates Appropriate Output", () => {
      const tag1 = new Tag("helloTag1", "prog", Types.DINT);
      const tag2 = new Tag("helloTag2", "prog", Types.DINT);
      const tag3 = new Tag("helloTag3", "prog", Types.DINT);
      const tag4 = new Tag("helloTag4", "prog", Types.DINT);
      const tag5 = new Tag("helloTag5", "prog", Types.DINT);

      const group = new TagGroup();

      group.add(tag1);
      group.add(tag2);
      group.add(tag3);
      group.add(tag4);
      group.add(tag5);

      const result = group.generateReadMessageRequests();

      // Expected data from Jest snapshot
      const expectedData = new Uint8Array([
        10,
        2,
        32,
        2,
        36,
        1,
        5,
        0,
        12,
        0,
        42,
        0,
        72,
        0,
        102,
        0,
        132,
        0,
        76,
        13,
        145,
        12,
        80,
        114,
        111,
        103,
        114,
        97,
        109,
        58,
        112,
        114,
        111,
        103,
        145,
        9,
        104,
        101,
        108,
        108,
        111,
        84,
        97,
        103,
        49,
        0,
        1,
        0,
        76,
        13,
        145,
        12,
        80,
        114,
        111,
        103,
        114,
        97,
        109,
        58,
        112,
        114,
        111,
        103,
        145,
        9,
        104,
        101,
        108,
        108,
        111,
        84,
        97,
        103,
        50,
        0,
        1,
        0,
        76,
        13,
        145,
        12,
        80,
        114,
        111,
        103,
        114,
        97,
        109,
        58,
        112,
        114,
        111,
        103,
        145,
        9,
        104,
        101,
        108,
        108,
        111,
        84,
        97,
        103,
        51,
        0,
        1,
        0,
        76,
        13,
        145,
        12,
        80,
        114,
        111,
        103,
        114,
        97,
        109,
        58,
        112,
        114,
        111,
        103,
        145,
        9,
        104,
        101,
        108,
        108,
        111,
        84,
        97,
        103,
        52,
        0,
        1,
        0,
        76,
        13,
        145,
        12,
        80,
        114,
        111,
        103,
        114,
        97,
        109,
        58,
        112,
        114,
        111,
        103,
        145,
        9,
        104,
        101,
        108,
        108,
        111,
        84,
        97,
        103,
        53,
        0,
        1,
        0,
      ]);

      // Test structure
      assertEquals(result.length, 1);
      assertEquals(result[0].data, Buffer.from(expectedData));
      assertEquals(result[0].tag_ids.length, 5);

      // Test that tag_ids are strings (UUIDs)
      result[0].tag_ids.forEach((id: string) => {
        assertEquals(typeof id, "string");
        assertEquals(id.length, 32); // MD5 hash length
      });
    });
  });

  await t.step("Generate Write Requests Method", async (t) => {
    await t.step("Generates Appropriate Output", () => {
      const tag1 = new Tag("helloTag1", "prog", Types.DINT);
      const tag2 = new Tag("helloTag2", "prog", Types.DINT);
      const tag3 = new Tag("helloTag3", "prog", Types.DINT);
      const tag4 = new Tag("helloTag4", "prog", Types.DINT);
      const tag5 = new Tag("helloTag5", "prog", Types.DINT);

      const group = new TagGroup();

      group.add(tag1);
      group.add(tag2);
      group.add(tag3);
      group.add(tag4);
      group.add(tag5);

      const result = group.generateWriteMessageRequests();

      // Expected empty array from Jest snapshot
      assertEquals(result, []);
    });
  });

  await t.step("Get Tag By ID Method", async (t) => {
    await t.step("Returns the correct tag when given a valid ID", () => {
      const tag1 = new Tag("testTag1", "prog", Types.DINT);
      const tag2 = new Tag("testTag2", "prog", Types.DINT);
      const tag3 = new Tag("testTag3", "prog", Types.DINT);

      const group = new TagGroup();

      group.add(tag1);
      group.add(tag2);
      group.add(tag3);

      // Get tag by its instance_id
      const retrievedTag = group.getTagById(tag1.instance_id);

      assertEquals(retrievedTag, tag1);
      assertEquals(retrievedTag?.name, "testTag1");
    });

    await t.step("Returns undefined when given an invalid ID", () => {
      const tag1 = new Tag("testTag1", "prog", Types.DINT);
      const group = new TagGroup();

      group.add(tag1);

      // Try to get a tag with a non-existent ID
      const retrievedTag = group.getTagById("non-existent-id");

      assertEquals(retrievedTag, undefined);
    });
  });
});
