import { JsonExt } from '@argonprotocol/apps-core';
import type IBasicsRecord from "@/interfaces/IBasicsRecord";
import type IArgonCirculationRecord from "@/interfaces/IArgonCirculationRecord";

export enum NetworkName {
  mainnet = 'mainnet',
  testnet = 'testnet',
}

const CHAIN_NAME: NetworkName = 'mainnet' as NetworkName;

export default class Data {

  static async fetchArgonCirculation(): Promise<IArgonCirculationRecord> {
    const res = await fetch(`/data/argonCirculation.${CHAIN_NAME}.json`);
    return JsonExt.parse(await res.text());
  }

  static async fetchBasics(chainName?: NetworkName): Promise<IBasicsRecord> {
    const res = await fetch(`/data/argonBasics.${chainName || CHAIN_NAME}.json`);
    return JsonExt.parse(await res.text());
  }
}