import { create } from "zustand";
import { Transaction } from "../interface/transaction";

interface Store {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updates: Transaction) => void;
}

const useTransactionStore = create<Store>((set) => ({
  transactions: [],
  addTransaction: (transaction: Transaction) =>
    set(
      (state) => ({ transactions: [...state.transactions, transaction] } as any)
    ),
  updateTransaction: (id: string, updates: Transaction) =>
    set((state) => ({
      transactions: state.transactions.map((tx) =>
        tx.id === id ? { ...tx, ...updates } : tx
      ),
    })),
}));

export default useTransactionStore;
