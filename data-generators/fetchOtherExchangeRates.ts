import * as Fs from 'node:fs';
import * as Path from 'node:path';
import { fileURLToPath } from 'node:url';
import fetch from 'node-fetch';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { JsonExt } from '@argonprotocol/apps-core';

dayjs.extend(utc);

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

interface IOtherExchangeRates {
  timeLastUpdate: string;
  timeNextUpdate: string;
  rates: {
    [key: string]: number;
  };
}

export default async function run() {  
  // Write data to JSON file
  const dataDir = Path.join(__dirname, '..', 'public', 'data');
  const filePath = Path.join(dataDir, `otherExchangeRates.json`);

  if (!Fs.existsSync(dataDir)) {
    console.log(`Creating directory: ${dataDir}`);
    Fs.mkdirSync(dataDir, { recursive: true });
  }

  const response = await fetch('https://open.er-api.com/v6/latest/USD');
  const rawData: any = await response.json();

  const data: IOtherExchangeRates = {
    timeLastUpdate: rawData.time_last_update_utc,
    timeNextUpdate: rawData.time_next_update_utc,
    rates: rawData.rates,
  };

  Fs.writeFileSync(filePath, JsonExt.stringify(data, 2));
  console.log(`Successfully saved Other Exchange Rates`);
}
