import { configureStore, combineReducers } from "@reduxjs/toolkit";
import registerReducer from "./features/registerSlice";
import loginReducer from "./features/loginSlice";
import { baseApi } from "./api/baseApi";
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "./features/userSlice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

// Configuration for persisting the user slice
const persistUserConfig = {
  key: "user", // Key under which the persisted state will be stored
  storage, // Storage option, in this case localStorage
};

// If you plan to persist more slices, consider combining reducers here
const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  register: registerReducer,
  login: loginReducer,
  user: persistReducer(persistUserConfig, userReducer), // Persisted user reducer
});

// Apply persistReducer on the entire rootReducer if you plan to persist multiple slices
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      baseApi.middleware
    ),
});

// Persistor for store
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
