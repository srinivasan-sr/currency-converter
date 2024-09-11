import { useEffect, useCallback, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/use-typed-hooks";

import CURRENCY_CODES from "../../constants/currencyCodes";
import {
  CONTAINER_TYPE,
  TYPE_FROM,
  TYPE_TO,
} from "../../constants/textConstants";
import { Dropdown } from "../Dropdown";
import { TextInput } from "../TextInput";
import { ContainerProps } from "./types";
import {
  changeBaseCurrency,
  changeDestinationCurrency,
  setConversionRate,
  swapCurrencies,
} from "../../store";
import { MdOutlineSwapHoriz } from "react-icons/md";
import { ListItem } from "../Dropdown/types";
import { fetchCurrencyConversionRate } from "../../helpers/APICallHelper";
import { ConversionRate } from "../ConversionRate";

export const Container = ({ type }: ContainerProps) => {
  const dispatch = useAppDispatch();
  const { baseCurrency, destinationCurrency, conversionRate } = useAppSelector(
    (state) => {
      return state.currency;
    }
  );
  const [baseCurrencyAmount, setBaseCurrencyAmount] = useState("1");

  const list = CURRENCY_CODES.map((item) => {
    return { id: item.id, value: `${item.value} (${item.id})` };
  });

  const handleDropdownSelection = (item: ListItem) => {
    switch (type) {
      case TYPE_FROM:
        dispatch(changeBaseCurrency(item));
        return;
      case TYPE_TO:
        dispatch(changeDestinationCurrency(item));
        return;
    }
  };

  const handleSwapIconClick = () => {
    dispatch(swapCurrencies());
  };

  const handleTextInputChange = (value: string) => {
    try {
      parseFloat(value);
      switch (type) {
        case TYPE_FROM:
          setBaseCurrencyAmount(value);
          return;
      }
    } catch (ex) {
      console.error(`Error occurred`, ex);
    }
  };

  const handleCurrencyConversionClick = useCallback(async () => {
    const data = await fetchCurrencyConversionRate(
      baseCurrency,
      destinationCurrency
    );
    if (data?.data) {
      dispatch(setConversionRate(data.data[destinationCurrency.id]));
    }
  }, [baseCurrency, destinationCurrency, dispatch]);

  useEffect(() => {
    if (
      baseCurrency.id !== "" &&
      baseCurrency.id !== "-1" &&
      destinationCurrency.id !== "" &&
      destinationCurrency.id !== "-1"
    ) {
      handleCurrencyConversionClick();
    }
  }, [baseCurrency, destinationCurrency, handleCurrencyConversionClick]);

  const swapItems = (
    <div className="col-span-2 text-center">
      <MdOutlineSwapHoriz
        className="text-4xl text-center cursor-pointer"
        onClick={handleSwapIconClick}
      />
    </div>
  );

  const showConversionRates = type === TYPE_FROM && (
    <div>
      <ConversionRate />
    </div>
  );

  return (
    <div>
      <div className="grid grid-cols-12 gap-1 mt-5 auto-cols-max">
        {type === TYPE_TO && swapItems}
        <label
          className={`text-lg ${
            type == TYPE_TO ? `col-span-1` : `col-span-3`
          } text-right`}
        >
          {type && CONTAINER_TYPE[type]}&nbsp;
        </label>
        <div className="col-span-4">
          <Dropdown
            list={list}
            handleSelection={handleDropdownSelection}
            defaultSelection={
              type === TYPE_FROM ? baseCurrency : destinationCurrency
            }
          />
        </div>
        <div className="col-span-3">
          <TextInput
            placeholder="Amount to convert"
            defaultValue={
              type === TYPE_TO
                ? parseFloat(baseCurrencyAmount) * conversionRate
                : baseCurrencyAmount
            }
            classes="ml-2 border shadow p-1 leading-tight w-11/12"
            handleChange={handleTextInputChange}
          />
        </div>
      </div>
      {showConversionRates}
    </div>
  );
};
