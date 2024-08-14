import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Transaction {
  id: number;
  type: string;
  date: string;
  amount: number;
  category: string;
  comment?: string | undefined;
}

export interface TransactionsState {
  transactions: Transaction[];
}

const initialState: TransactionsState = {
  transactions: [],
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    deleteTransaction: (state, action: PayloadAction<number>) => {
      state.transactions = state.transactions.filter(
        (tx) => tx.id !== action.payload
      );
    },
    editTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(
        (tx) => tx.id === action.payload.id
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
  },
});

export const { addTransaction, deleteTransaction, editTransaction } =
  transactionsSlice.actions;

export const selectTransactions = (state: {
  transactions: TransactionsState;
}) => state.transactions.transactions;

export default transactionsSlice.reducer;
