import { Buffer } from "node:buffer";
import { isIPv4 } from "node:net";
import Controller, { IControllerOptions } from "./controller.ts";
import TagGroup from "./tag-group.ts";
import Tag from "./tag.ts";
import { Structure } from "./structure.ts";
import { delay } from "../utils/utilities.ts";

export interface IBasicPLCOptions extends IControllerOptions {
  delayBetweenWriteRead_ms?: number;
  scanRate?: number;
  connectedMessaging?: boolean;
}

export type TagInfo = {
  name: string;
  program?: string;
  arrayDims?: number;
  arraySize?: number;
};

export class BasicPLC extends Controller {
  group: TagGroup;
  delayBetweenWriteRead_ms: number = 10;
  scanRate: number = 100;

  initialized: boolean = false;
  isPolling: boolean = false;

  constructor(
    private readonly ipAddress: string,
    opts: IBasicPLCOptions = {},
  ) {
    if (!ipAddress) throw new Error("IP address is required");
    if (!isIPv4(ipAddress)) throw new Error("Invalid IP address");
    super(opts.connectedMessaging ?? true, opts);

    this.ipAddress = ipAddress;
    this.opts = opts;
    this.group = new TagGroup();

    this.delayBetweenWriteRead_ms = opts.delayBetweenWriteRead_ms ??
      this.delayBetweenWriteRead_ms;
  }

  async init(tagsToPoll: TagInfo[]) {
    const slotIdxOrPath: number | Buffer =
      Array.isArray(this.opts.slotIdxOrPath)
        ? Buffer.from(this.opts.slotIdxOrPath as number[])
        : this.opts.slotIdxOrPath ?? 0;

    await this.connect(this.ipAddress, slotIdxOrPath, true);

    for (const tagInfo of tagsToPoll) {
      const tagListData = this.state.tagList.getTag(
        tagInfo.name,
        tagInfo.program,
      );

      const template = this.state.tagList.getTemplateByTag(
        tagInfo.name,
        tagInfo.program,
      );

      const tag = template
        ? new Structure(
          tagInfo.name,
          this.state.tagList,
          tagInfo.program,
          undefined,
          undefined,
        )
        : new Tag(
          tagInfo.name,
          tagInfo.program,
          tagListData?.type.code ?? undefined,
          undefined,
          tagInfo.arrayDims,
          tagInfo.arraySize,
        );

      this.group.add(tag);
    }

    this.initialized = true;
    this.startPolling();
  }

  async startPolling() {
    if (!this.initialized) throw new Error("PLC not initialized");
    if (this.isPolling) return;

    this.isPolling = true;

    while (this.isPolling) {
      if (this.state.connection.established) {
        await this._writeTagGroup(this.group);
        await delay(this.delayBetweenWriteRead_ms);
        await this._readTagGroup(this.group);
      }
      await delay(this.scanRate);
    }
  }

  setTagValue(tagId: string, value: any) {
    const tag = this.group.state.tags[tagId];
    if (!tag) return;
    tag.value = value;
  }

  stopPolling() {
    this.isPolling = false;
  }

  override async disconnect(): Promise<string> {
    this.stopPolling();
    return await super.disconnect();
  }
}
