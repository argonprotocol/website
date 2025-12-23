import './_globals.ts';
// import fetchBitcoinPrices from './fetchBitcoinPrices.ts';
// import fetchBitcoinFees from './fetchBitcoinFees.ts';
import importFrames from './importFrames.ts';
import fetchBasics from './fetchBasics.ts';
import fetchArgonCirculation from './fetchArgonCirculation';
import fetchArgonExchangeRates from './fetchArgonExchangeRates';
import fetchOtherExchangeRates from './fetchOtherExchangeRates';

async function main() {
  console.log('Starting data fetch process...');

  try {
    // console.log('Importing Frames...');
    // await importFrames();

    console.log('Fetching Argon Basic Data...');
    await fetchBasics();

    // console.log('Fetching Argon Circulation...');
    // await fetchArgonCirculation();

    // console.log('Fetching Argon Exchange Rates...');
    // await fetchArgonExchangeRates();

    // console.log('Fetching Other Exchange Rates...');
    // await fetchOtherExchangeRates();

    console.log('All data fetch operations completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error in data fetch process:', error);
    process.exit(1);
  }
}

// Execute the main function
main();
