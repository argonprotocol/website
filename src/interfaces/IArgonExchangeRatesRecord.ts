export default interface IArgonExchangeRatesRecord {
  frameId: number | null;
  date: string;
  microgonsForUsd: number;
  microgonsForUsdTarget: number;
  microgonsForArgnt: number;
  microgonsForBtc: number;
}