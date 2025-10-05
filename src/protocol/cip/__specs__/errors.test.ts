import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.208.0/assert/mod.ts";
import { CIPError, ERROR } from "../errors.ts";

Deno.test("CIPError - Success case (0x00)", () => {
  const result = CIPError.getError(0x00, [0x00]);

  assertEquals(result.generalStatusCode, 0x00);
  assertEquals(result.extendedStatus, [0x00]);
  assertEquals(
    result.msg,
    "Success. Extended: Success",
  );
  assertEquals(result.service, undefined);
});

Deno.test("CIPError - Connection failure (0x01)", () => {
  const result = CIPError.getError(0x01, [0x00], "ReadTag");

  assertEquals(result.generalStatusCode, 0x01);
  assertEquals(result.extendedStatus, [0x00]);
  assertEquals(
    result.msg,
    "Connection failure. Extended: Connection failure",
  );
  assertEquals(result.service, "ReadTag");
});

Deno.test("CIPError - Multiple extended status codes", () => {
  const result = CIPError.getError(0x01, [0x00, 0x01, 0x02], "WriteTag");

  assertEquals(result.generalStatusCode, 0x01);
  assertEquals(result.extendedStatus, [0x00, 0x01, 0x02]);
  assertEquals(
    result.msg,
    "Connection failure. Extended: Connection failure; Resource unavailable; Invalid segment value",
  );
  assertEquals(result.service, "WriteTag");
});

Deno.test("CIPError - Value invalid (0x03) with multiple codes", () => {
  const result = CIPError.getError(0x03, [0x00, 0x01, 0x02]);

  assertEquals(result.generalStatusCode, 0x03);
  assertEquals(result.extendedStatus, [0x00, 0x01, 0x02]);
  assertEquals(
    result.msg,
    "Value invalid. Extended: Value invalid; Invalid segment value; Invalid attribute value",
  );
  assertEquals(result.service, undefined);
});

Deno.test("CIPError - Unknown general status code", () => {
  const result = CIPError.getError(0xFF, [0x00, 0x01]);

  assertEquals(result.generalStatusCode, 0xFF);
  assertEquals(result.extendedStatus, [0x00, 0x01]);
  assertEquals(
    result.msg,
    "Unknown general status code 0xff",
  );
  assertEquals(result.service, undefined);
});

Deno.test("CIPError - Known general status with unknown extended status", () => {
  const result = CIPError.getError(0x01, [0x00, 0xFF]);

  assertEquals(result.generalStatusCode, 0x01);
  assertEquals(result.extendedStatus, [0x00, 0xFF]);
  assertEquals(
    result.msg,
    "Connection failure. Extended: Connection failure; 0xff is UNKNOWN",
  );
  assertEquals(result.service, undefined);
});

Deno.test("CIPError - Empty extended status array", () => {
  const result = CIPError.getError(0x01, [], "TestService");

  assertEquals(result.generalStatusCode, 0x01);
  assertEquals(result.extendedStatus, []);
  assertEquals(
    result.msg,
    "Connection failure",
  );
  assertEquals(result.service, "TestService");
});

Deno.test("CIPError - Malformed data (0x04)", () => {
  const result = CIPError.getError(0x04, [0x00, 0x01, 0x02]);

  assertEquals(result.generalStatusCode, 0x04);
  assertEquals(result.extendedStatus, [0x00, 0x01, 0x02]);
  assertEquals(
    result.msg,
    "Malformed data. Extended: Malformed data; Invalid segment value; Invalid attribute value",
  );
});

Deno.test("CIPError - Insufficient data (0x05)", () => {
  const result = CIPError.getError(0x05, [0x00, 0x01, 0x02, 0x03]);

  assertEquals(result.generalStatusCode, 0x05);
  assertEquals(result.extendedStatus, [0x00, 0x01, 0x02, 0x03]);
  assertEquals(
    result.msg,
    "Insufficient data. Extended: Insufficient data; Invalid segment value; Invalid attribute value; Invalid service",
  );
});

Deno.test("CIPError - Attribute not supported (0x06)", () => {
  const result = CIPError.getError(0x06, [0x00, 0x01, 0x02, 0x03]);

  assertEquals(result.generalStatusCode, 0x06);
  assertEquals(result.extendedStatus, [0x00, 0x01, 0x02, 0x03]);
  assertEquals(
    result.msg,
    "Attribute not supported. Extended: Attribute not supported; Invalid segment value; Invalid attribute value; Invalid service",
  );
});

Deno.test("CIPError - Too much data (0x07)", () => {
  const result = CIPError.getError(0x07, [0x00, 0x01, 0x02]);

  assertEquals(result.generalStatusCode, 0x07);
  assertEquals(result.extendedStatus, [0x00, 0x01, 0x02]);
  assertEquals(
    result.msg,
    "Too much data. Extended: Too much data; Invalid segment value; Invalid attribute value",
  );
});

Deno.test("CIPError - Object does not exist (0x08)", () => {
  const result = CIPError.getError(0x08, [0x00, 0x01, 0x02]);

  assertEquals(result.generalStatusCode, 0x08);
  assertEquals(result.extendedStatus, [0x00, 0x01, 0x02]);
  assertEquals(
    result.msg,
    "Object does not exist. Extended: Object does not exist; Invalid segment value; Invalid attribute value",
  );
});

Deno.test("CIPError - Routing failure (0x0B)", () => {
  const result = CIPError.getError(0x0B, [0x00, 0x01, 0x02, 0x03]);

  assertEquals(result.generalStatusCode, 0x0B);
  assertEquals(result.extendedStatus, [0x00, 0x01, 0x02, 0x03]);
  assertEquals(
    result.msg,
    "Routing failure, request packet too large. Extended: Routing failure, request packet too large; Routing failure, response packet too large; Routing failure, invalid segment value; Routing failure, invalid attribute value",
  );
});

Deno.test("CIPError - General error (0x20)", () => {
  const result = CIPError.getError(0x20, [0x00, 0x01, 0x02, 0x03, 0x04, 0x05]);

  assertEquals(result.generalStatusCode, 0x20);
  assertEquals(result.extendedStatus, [0x00, 0x01, 0x02, 0x03, 0x04, 0x05]);
  assertEquals(
    result.msg,
    "General error. Extended: General error; Invalid segment value; Invalid attribute value; Invalid service; Invalid class; Invalid instance",
  );
});

Deno.test("ERROR constant structure validation", () => {
  // Test that ERROR constant exists and has expected structure
  assertExists(ERROR);
  assertExists(ERROR[0x00]);
  assertExists(ERROR[0x01]);
  assertExists(ERROR[0x02]);
  assertExists(ERROR[0x03]);
  assertExists(ERROR[0x04]);
  assertExists(ERROR[0x05]);
  assertExists(ERROR[0x06]);
  assertExists(ERROR[0x07]);
  assertExists(ERROR[0x08]);
  assertExists(ERROR[0x20]);

  // Test specific error messages
  assertEquals(ERROR[0x00][0x00], "Success");
  assertEquals(ERROR[0x01][0x00], "Connection failure");
  assertEquals(ERROR[0x01][0x01], "Resource unavailable");
  assertEquals(ERROR[0x03][0x00], "Value invalid");
  assertEquals(ERROR[0x04][0x00], "Malformed data");
  assertEquals(ERROR[0x05][0x00], "Insufficient data");
});
