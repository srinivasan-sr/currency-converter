import {BASE_URL, API_KEY, BASE_CURRENCY, DESTINATION_CURRENCIES, HTTP_METHODS} from '../constants/apiConstants';
import {ListItem} from '../components/Dropdown/types';
export const fetchCurrencyConversionRate = async(baseCurrency: ListItem, destinationCurrency: ListItem) => {
    const fetchOptions = {
        method: HTTP_METHODS.GET,
    }
    const url = `${BASE_URL}${API_KEY}${DESTINATION_CURRENCIES}${destinationCurrency.id}${BASE_CURRENCY}${baseCurrency.id}`;
    const response = await fetch(url, fetchOptions);
    if(!response.ok){
        console.error("Error occurred when trying to fetch currency conversion rates");
        throw new Error("Error occurred while fetching data");
    }
    const data = await response.json();
    return data;
}