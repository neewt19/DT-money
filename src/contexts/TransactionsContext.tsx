import { ReactNode, createContext, useEffect, useState } from 'react'
import { api } from '../lib/axios'

interface Transactions {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
}

interface TransactionsContextType {
  transactions: Transactions[];
  loadTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}


export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([])
  async function loadTransactions(query?: string) {
    const response = await api.get('transaction', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })
    setTransactions(response.data)
  }

  async function createTransaction(data:CreateTransactionInput) {
    const {description, category, price, type} = data

    const response = await api.post('transaction', {
      description,
      category,
      price,
      type,
      createdAt: new Date(),
    })

    setTransactions(state => [response.data,...state])
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ 
      transactions,
      loadTransactions,
      createTransaction, 
      }}>
      {children}
    </TransactionsContext.Provider>
  )
}
