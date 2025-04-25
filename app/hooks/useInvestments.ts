import { useState, useEffect } from 'react'

// Supabase implementation (commented out)
// import { supabase } from '@/lib/supabase'

// Firebase implementation (commented out)
// import { initializeApp } from 'firebase/app'
// import { getFirestore, collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore'

interface Investment {
  symbol: string;
  shares: number;
  amount: number;
}

export function useInvestments(userId: string) {
  const [investments, setInvestments] = useState<{ [key: string]: number }>({})
  const [wallet, setWallet] = useState(100)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadInvestments()
  }, [userId])

  const loadInvestments = async () => {
    try {
      // LocalStorage implementation
      const savedData = localStorage.getItem(`investments_${userId}`)
      if (savedData) {
        const { investments: savedInvestments, wallet: savedWallet } = JSON.parse(savedData)
        setInvestments(savedInvestments)
        setWallet(savedWallet)
      }

      // Supabase implementation (commented out)
      /*
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', userId)

      if (error) throw error

      const investmentsMap = data?.reduce((acc: { [key: string]: number }, inv: Investment) => {
        acc[inv.symbol] = inv.shares
        return acc
      }, {}) || {}

      setInvestments(investmentsMap)
      setWallet(data?.[0]?.wallet || 100)
      */

      // Firebase implementation (commented out)
      /*
      const db = getFirestore()
      const q = query(collection(db, 'investments'), where('userId', '==', userId))
      const querySnapshot = await getDocs(q)
      
      const investmentsMap: { [key: string]: number } = {}
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        investmentsMap[data.symbol] = data.shares
      })
      
      setInvestments(investmentsMap)
      setWallet(querySnapshot.docs[0]?.data().wallet || 100)
      */
    } catch (error) {
      console.error('Error loading investments:', error)
    } finally {
      setLoading(false)
    }
  }

  const addFunds = (amount: number) => {
    const newWallet = wallet + amount;
    setWallet(newWallet);
    saveToStorage(newWallet, investments);
  };

  const buyStock = async (symbol: string, amount: number) => {
    if (wallet < amount) {
      alert('Insufficient funds!');
      return;
    }

    const stock = stocks.find(s => s.symbol === symbol)
    if (!stock) return;

    const shares = amount / stock.price;
    const newShares = (investments[symbol] || 0) + shares;
    const newWallet = wallet - amount;

    try {
      // LocalStorage implementation
      const newInvestments = {
        ...investments,
        [symbol]: newShares
      };
      
      saveToStorage(newWallet, newInvestments);
      setInvestments(newInvestments);
      setWallet(newWallet);

      // Supabase implementation (commented out)
      /*
      const { error } = await supabase
        .from('investments')
        .upsert({
          user_id: userId,
          symbol,
          shares: newShares,
          amount,
          wallet: newWallet,
          updated_at: new Date().toISOString()
        })

      if (error) throw error
      */

      // Firebase implementation (commented out)
      /*
      const db = getFirestore()
      await setDoc(doc(db, 'investments', `${userId}_${symbol}`), {
        userId,
        symbol,
        shares: newShares,
        amount,
        wallet: newWallet,
        updatedAt: new Date()
      })
      */
    } catch (error) {
      console.error('Error buying stock:', error);
    }
  };

  const saveToStorage = (newWallet: number, newInvestments: { [key: string]: number }) => {
    localStorage.setItem(`investments_${userId}`, JSON.stringify({
      investments: newInvestments,
      wallet: newWallet
    }));
  };

  return { investments, wallet, loading, buyStock, addFunds }
}

const stocks = [
  { symbol: 'AAPL', name: 'Apple', price: 180 },
  { symbol: 'GOOGL', name: 'Google', price: 2800 },
  { symbol: 'TSLA', name: 'Tesla', price: 700 },
] 