import { combineReducers, configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "@/store/transactionsSlice";

const reducers = combineReducers({
  transactions: transactionsReducer,
});

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error when loading state from localStorage:", err);
  }
};

const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.error("Error when saving state to localStorage:", err);
  }
};

const persistedState = loadState();

export const store = configureStore({
  reducer: reducers,
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
