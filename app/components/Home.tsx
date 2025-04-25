import { useState } from "react";
import { Button } from './ui/Button';

const stocks = [
  { symbol: "AAPL", name: "Apple", price: 180 },
  { symbol: "GOOGL", name: "Google", price: 2800 },
  { symbol: "TSLA", name: "Tesla", price: 700 },
];

export default function Home() {
  const [wallet, setWallet] = useState(100);
  const [investments, setInvestments] = useState<{ symbol: string; amount: number; shares: number }[]>([]);

  const invest = (stock: typeof stocks[0], amount: number) => {
    if (wallet < amount) return;
    const shares = amount / stock.price;
    setInvestments((prev) => [...prev, { symbol: stock.symbol, amount, shares }]);
    setWallet(wallet - amount);
  };

  return (
    <div className="min-h-screen p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Fractional Investing Simulator</h1>
      <p className="mb-4">Wallet Balance: ${wallet.toFixed(2)}</p>
      <div className="grid gap-4">
        {stocks.map((stock) => (
          <div key={stock.symbol} className="border rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold">{stock.name} ({stock.symbol})</h2>
            <p>Price: ${stock.price}</p>
            <div className="flex gap-2 mt-2">
              {[5, 10, 50].map((amt) => (
                <Button key={amt} onClick={() => invest(stock, amt)}>
                  Invest ${amt}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Your Investments</h2>
        {investments.length === 0 ? (
          <p>No investments yet.</p>
        ) : (
          <ul className="list-disc pl-5">
            {investments.map((inv, i) => (
              <li key={i}>{inv.symbol}: {inv.shares.toFixed(4)} shares for ${inv.amount}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
