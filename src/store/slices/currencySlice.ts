import { createSlice } from "@reduxjs/toolkit";
import {ListItem} from '../../components/Dropdown/types';
import { RootState } from "../index";
interface currencySliceState{
    baseCurrency: ListItem,
    destinationCurrency: ListItem,
    conversionRate: number,
}

const initialState: currencySliceState = {
    baseCurrency: {id: '', value: ''},
    destinationCurrency: {id: '', value: ''},
    conversionRate: 0
};

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        changeBaseCurrency(state, action){
            state.baseCurrency = action.payload;
        },
        changeDestinationCurrency(state, action){
            state.destinationCurrency = action.payload;
        },
        setConversionRate(state, action){
            state.conversionRate = action.payload;
        },
        
        swapCurrencies(state){
            const currentBaseCurrency = state.baseCurrency;
            state.baseCurrency = state.destinationCurrency;
            state.destinationCurrency = currentBaseCurrency;
        },
    }
});
export const currencyReducer = currencySlice.reducer;
export const selectCurrency = (state: RootState) => state.currency;
export const {
    changeBaseCurrency,
    changeDestinationCurrency,
    setConversionRate,
    swapCurrencies,
} = currencySlice.actions;