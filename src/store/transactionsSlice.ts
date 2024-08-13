import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Transaction {
  id: number;
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
  },
});

export const { addTransaction } = transactionsSlice.actions;

export const selectTransactions = (state: {
  transactions: TransactionsState;
}) => state.transactions.transactions;

export default transactionsSlice.reducer;
