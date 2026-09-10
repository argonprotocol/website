import { JsonExt } from '@argonprotocol/apps-core';
import { type IBasicsRecord } from "@/interfaces/IBasicsRecord";
import type IArgonCirculationRecord from "@/interfaces/IArgonCirculationRecord";
import NetworkName from '@/lib/NetworkName';

export { default as NetworkName } from '@/lib/NetworkName';

const CHAIN_NAME = NetworkName.mainnet;

export default class Data {
  private static _basics: IBasicsRecord | undefined;
  private static _basicsPromise: Promise<IBasicsRecord> | undefined;

  static async load(): Promise<void> {
    await this.fetchBasics();
  }

  static get basics(): IBasicsRecord {
    if (!this._basics) {
      throw new Error('Data.load() must complete before accessing basics');
    }

    return this._basics;
  }

  static async fetchArgonCirculation(): Promise<IArgonCirculationRecord> {
    const res = await fetch(`/data/argonCirculation.${CHAIN_NAME}.json`);
    return JsonExt.parse(await res.text());
  }

  static async fetchBasics(): Promise<IBasicsRecord> {
    if (this._basics) return this._basics;
    if (this._basicsPromise) return this._basicsPromise;

    this._basicsPromise = fetch(`/data/argonBasics.${CHAIN_NAME}.json`)
      .then(async res => {
        if (!res.ok) {
          throw new Error(`Unable to load Argon basics (${res.status} ${res.statusText})`);
        }

        const basics = JsonExt.parse(await res.text()) as IBasicsRecord;
        this._basics = basics;
        return basics;
      })
      .finally(() => {
        this._basicsPromise = undefined;
      });

    return this._basicsPromise;
  }
}
