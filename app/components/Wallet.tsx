import React, { useState } from 'react'

interface WalletProps {
  wallet: number;
  onAddFunds: (amount: number) => void;
}

const Wallet: React.FC<WalletProps> = ({ wallet, onAddFunds }) => {
  const [amount, setAmount] = useState('');

  const handleAddFunds = () => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      onAddFunds(numAmount);
      setAmount('');
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white">Your Wallet</h2>
          <p className="text-2xl font-bold text-white">${wallet.toFixed(2)}</p>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Add Funds"
            className="w-32 px-3 py-2 border rounded bg-gray-700 text-white border-gray-600 placeholder-gray-400"
            min="0"
            step="0.01"
          />
          <button
            onClick={handleAddFunds}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 active:bg-gray-500 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default Wallet