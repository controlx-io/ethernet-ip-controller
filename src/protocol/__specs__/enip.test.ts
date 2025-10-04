import { assertEquals, assertThrows } from "@std/assert";
import { ENIP } from "../enip.ts";

Deno.test("ENIP Class", async (t) => {
  await t.step("Properties Accessors", async (t) => {
    await t.step("error", () => {
      const enip = new ENIP();
      const error = { code: 0x41, msg: "this failed for some reason" };
      enip.state.error = error;

      assertEquals(enip.error, error);
    });

    await t.step("establishing", () => {
      const enip = new ENIP();

      assertEquals(enip.establishing, false);
    });

    await t.step("established", () => {
      const enip = new ENIP();

      assertEquals(enip.established, false);
    });

    await t.step("session_id", () => {
      const enip = new ENIP();
      assertEquals(enip.session_id, 0);

      enip.state.session.id = 23455;
      assertEquals(enip.session_id, 23455);
    });

    await t.step("establishing_conn", () => {
      const enip = new ENIP();
      assertEquals(enip.establishing_conn, false);

      enip.state.connection.establishing = true;
      assertEquals(enip.establishing_conn, true);

      enip.establishing_conn = false;
      assertEquals(enip.state.connection.establishing, false);

      assertThrows(() => {
        enip.establishing_conn = "establishing" as any;
      });
    });

    await t.step("established_conn", () => {
      const enip = new ENIP();
      assertEquals(enip.established_conn, false);

      enip.state.connection.established = true;
      assertEquals(enip.established_conn, true);

      enip.established_conn = false;
      assertEquals(enip.state.connection.established, false);

      assertThrows(() => {
        enip.established_conn = "established" as any;
      });
    });

    await t.step("id_conn", () => {
      const enip = new ENIP();
      assertEquals(enip.id_conn, 0);

      enip.state.connection.id = 0x1337;
      assertEquals(enip.id_conn, 0x1337);

      enip.id_conn = 0x00;
      assertEquals(enip.state.connection.id, 0x00);

      assertThrows(() => {
        enip.id_conn = "myTestID" as any;
      });
    });

    await t.step("seq_conn", () => {
      const enip = new ENIP();
      assertEquals(enip.seq_conn, 0x00);

      enip.state.connection.seq_num = 0x01;
      assertEquals(enip.seq_conn, 0x01);

      enip.seq_conn = 0x02;
      assertEquals(enip.state.connection.seq_num, 0x02);

      assertThrows(() => {
        enip.seq_conn = "mySeqNo" as any;
      });
    });
  });
});
