import express, { Request, Response } from 'express';

import appLogger from './middleware/appLogger';

interface SearchResult {
  name: string;
  symbol: string;
  type: string;
}

// For Result API
type Asset = {
  name: string;
  symbol: string;
  type: "Stocks" | "Crypto" | "Fx";
  price: number;
  volume: number;
  marketCap: number;
  description: string;
};
//

//for SearchResult
const stocksData: SearchResult[] = [
  { name: 'Apple Inc.', symbol: 'AAPL', type: 'Stocks' },
  { name: 'Microsoft Corporation', symbol: 'MSFT', type: 'Stocks' },
  { name: 'Amazon.com, Inc.', symbol: 'AMZN', type: 'Stocks' },
];

const cryptoData: SearchResult[] = [
  { name: 'Bitcoin', symbol: 'BTC', type: 'Crypto' },
  { name: 'Ethereum', symbol: 'ETH', type: 'Crypto' },
  { name: 'Cardano', symbol: 'ADA', type: 'Crypto' },
];

const fxData: SearchResult[] = [
  { name: 'United States Dollar', symbol: 'USD', type: 'Fx' },
  { name: 'Euro', symbol: 'EUR', type: 'Fx' },
  { name: 'Japanese Yen', symbol: 'JPY', type: 'Fx' },
];
//


//For Result API
const Stocks: Asset[] = [
  {
    name: "Apple Inc.",
    symbol: "AAPL",
    type: "Stocks",
    price: 120.99,
    volume: 39469214,
    marketCap: 2034.85,
    description: "Apple designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories."
  },
  // ... more stocks data
];

const Crypto: Asset[] = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    type: "Crypto",
    price: 50000,
    volume: 7600,
    marketCap: 940,
    description: "Bitcoin is a decentralized digital currency without a central bank or single administrator."
  },
  // ... more crypto data
];

const Fx: Asset[] = [
  {
    name: "US Dollar / Euro",
    symbol: "USD/EUR",
    type: "Fx",
    price: 0.86,
    volume: 13000,
    marketCap: 0,
    description: "The value of the US Dollar against the Euro."
  },
  // ... more fx data
];
//

const app = express();
const port = 3000;

app.use(appLogger);
app.use(express.json());


//for SearchResult
app.get('/search', (req: Request, res: Response) => {
  const { text, type } = req.query;
  let results: SearchResult[] = [];

  switch (type) {
    case 'Stocks':
      results = stocksData.filter((stock) => stock.name.toLowerCase().includes(text.toString().toLowerCase()));
      break;
    case 'Crypto':
      results = cryptoData.filter((crypto) => crypto.name.toLowerCase().includes(text.toString().toLowerCase()));
      break;
    case 'Fx':
      results = fxData.filter((fx) => fx.name.toLowerCase().includes(text.toString().toLowerCase()));
      break;
    default:
      res.status(400).send('Invalid type');
      return;
  }

  res.json(results);
});
//


// TypeScript code for a result API
app.get("/result/:type/:symbol", (req, res) => {
  const { type, symbol } = req.params;
  let asset: Asset | undefined;

  switch (type) {
    case "Stocks":
      asset = Stocks.find((stock) => stock.symbol === symbol);
      break;
    case "Crypto":
      asset = Crypto.find((crypto) => crypto.symbol === symbol);
      break;
    case "Fx":
      asset = Fx.find((fx) => fx.symbol === symbol);
      break;
    default:
      res.status(400).json({ error: "Invalid type input" });
      return;
  }

  if (!asset) {
    res.status(404).json({ error: "Asset not found" });
    return;
  }

  res.json(asset);
});





app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
