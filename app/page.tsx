// /app/page.tsx (root homepage)
'use client';
import { useEffect, useState } from 'react';
import Wallet from './components/Wallet';
import StockList from './components/StockList';
import ROIChart from './components/ROIChart';
import { useInvestments } from './hooks/useInvestments';

export default function HomePage() {
  const [userId, setUserId] = useState<string>('demo-user'); // In a real app, this would come from auth
  const { investments, wallet, loading, buyStock, addFunds } = useInvestments(userId);

  if (loading) {
    return <div className="min-h-screen bg-black text-white">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <h1 className="text-4xl font-extrabold text-center mb-6 tracking-tight font-mono">Fractional Investing Simulator</h1>
      <Wallet wallet={wallet} onAddFunds={addFunds} />
      <StockList 
        wallet={wallet} 
        investments={investments} 
        buyStock={buyStock}
      />
      <ROIChart investments={investments} />
    </main>
  );
}
