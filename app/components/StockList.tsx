import React, { useState } from 'react'

interface StockListProps {
  wallet: number;
  investments: { [ticker: string]: number };
  buyStock: (symbol: string, amount: number) => Promise<void>;
}

const stocks = [
  { symbol: 'AAPL', name: 'Apple', price: 180 },
  { symbol: 'GOOGL', name: 'Google', price: 2800 },
  { symbol: 'TSLA', name: 'Tesla', price: 700 },
];

const StockList: React.FC<StockListProps> = ({ wallet, investments, buyStock }) => {
  const [customAmounts, setCustomAmounts] = useState<{ [key: string]: string }>({});
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>({});

  const handleCustomInvest = (symbol: string) => {
    const amount = parseFloat(customAmounts[symbol] || '0');
    if (isNaN(amount) || amount <= 0) {
      setErrorMessages(prev => ({ ...prev, [symbol]: 'Please enter a valid amount' }));
      return;
    }
    if (amount > wallet) {
      setErrorMessages(prev => ({ ...prev, [symbol]: 'Not enough currency in wallet' }));
      return;
    }
    setErrorMessages(prev => ({ ...prev, [symbol]: '' }));
    buyStock(symbol, amount);
    setCustomAmounts(prev => ({ ...prev, [symbol]: '' }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Available Stocks</h2>
      <div className="grid gap-4">
        {stocks.map(stock => (
          <div key={stock.symbol} className="border rounded-lg p-4 bg-gray-900 border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-white">{stock.name} ({stock.symbol})</h3>
                <p className="text-gray-400">Price: ${stock.price}</p>
                <div className="mt-2 space-x-2">
                  {[5, 10, 50].map(amount => (
                    <button
                      key={amount}
                      onClick={() => buyStock(stock.symbol, amount)}
                      disabled={wallet < amount}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 active:bg-gray-500 disabled:bg-gray-700 disabled:text-gray-400 transition-colors"
                    >
                      Invest ${amount}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    value={customAmounts[stock.symbol] || ''}
                    onChange={(e) => setCustomAmounts(prev => ({ ...prev, [stock.symbol]: e.target.value }))}
                    placeholder="Custom amount"
                    className="w-32 px-3 py-2 border rounded bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                    min="0"
                    step="0.01"
                  />
                  <button
                    onClick={() => handleCustomInvest(stock.symbol)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 active:bg-gray-500 transition-colors"
                  >
                    Invest
                  </button>
                </div>
                {errorMessages[stock.symbol] && (
                  <p className="text-red-500 text-sm">{errorMessages[stock.symbol]}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StockList