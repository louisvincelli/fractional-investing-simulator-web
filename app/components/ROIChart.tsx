import React from 'react'

interface ROIChartProps {
  investments: { [ticker: string]: number };
}

const stocks = [
  { symbol: 'AAPL', name: 'Apple', price: 180 },
  { symbol: 'GOOGL', name: 'Google', price: 2800 },
  { symbol: 'TSLA', name: 'Tesla', price: 700 },
];

const ROIChart: React.FC<ROIChartProps> = ({ investments }) => {
  const getInvestmentValue = (symbol: string, shares: number) => {
    const stock = stocks.find(s => s.symbol === symbol);
    return stock ? shares * stock.price : 0;
  };

  const totalValue = Object.entries(investments).reduce(
    (sum, [symbol, shares]) => sum + getInvestmentValue(symbol, shares),
    0
  );

  return (
    <div className="bg-gray-900 p-4 rounded-lg mt-6">
      <h2 className="text-xl font-semibold mb-4 text-white">Your Investments</h2>
      {Object.entries(investments).length === 0 ? (
        <p className="text-gray-400">No investments yet.</p>
      ) : (
        <div className="space-y-2">
          {Object.entries(investments).map(([symbol, shares]) => (
            <div key={symbol} className="flex justify-between text-white">
              <span>{symbol}: {shares.toFixed(4)} shares</span>
              <span>${getInvestmentValue(symbol, shares).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-gray-700 pt-2 mt-2 font-bold text-white">
            <span>Total Value: ${totalValue.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ROIChart