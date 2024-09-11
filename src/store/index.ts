import { configureStore } from "@reduxjs/toolkit";
import {
    changeBaseCurrency, 
    changeDestinationCurrency,
    setConversionRate,
    swapCurrencies,
    currencyReducer,
} from './slices/currencySlice';

const store = configureStore({
    reducer: {
        currency: currencyReducer
    },
});
store.subscribe(() => {
    console.log('Current store state');
    console.log(store.getState());
})
export {
    store,
    changeBaseCurrency,
    changeDestinationCurrency,
    setConversionRate,
    swapCurrencies,
};
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
