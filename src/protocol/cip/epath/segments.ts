import * as PORT from "./port.ts";
import * as LOGICAL from "./logical.ts";
import * as DATA from "./data.ts";

enum SegmentTypes {
  PORT = 0 << 5, // Communication Port to Leave Node (Shall be 1 for a Backplane), Link Address of Next Device
  LOGICAL = 1 << 5,
  NETWORK = 2 << 5,
  SYMBOLIC = 3 << 5,
  DATA = 4 << 5,
  DATATYPE_1 = 5 << 5,
  DATATYPE_2 = 6 << 6,
}

export { DATA, LOGICAL, PORT, SegmentTypes };
