import "./index.css";
import { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/use-typed-hooks";
import {
  changeBaseCurrency,
  changeDestinationCurrency,
  setConversionRate,
  swapCurrencies,
} from "../../store";
import { LeftContainer } from "../LeftContainer";
import { RightContainer } from "../RightContainer";
import CURRENCY_CODES from "../../constants/currencyCodes";
import { MdOutlineSwapHoriz } from "react-icons/md";
import { fetchCurrencyConversionRate } from "../../helpers/APICallHelper";
import { ConversionRate } from "../ConversionRate";
import { DropdownList } from "../LeftContainer/index.types";

export const NewContainer = () => {
  const dispatch = useAppDispatch();
  const { baseCurrency, destinationCurrency } = useAppSelector(
    (state) => state.currency
  );

  const [baseCurrencyAmount, setBaseCurrencyAmount] = useState("");
  const list = CURRENCY_CODES.map((item) => {
    return { id: item.id, value: `${item.value} (${item.id})` };
  });

  const handleBaseCurrencyChange = (item: DropdownList) => {
    dispatch(changeBaseCurrency(item));
  };
  const handleDestinationCurrencyChange = (item: DropdownList) => {
    dispatch(changeDestinationCurrency(item));
  };
  const handleCurrencySwap = () => {
    dispatch(swapCurrencies());
  };

  const handleCurrencyConversion = useCallback(async () => {
    const response = await fetchCurrencyConversionRate(
      baseCurrency,
      destinationCurrency
    );
    if (response?.data) {
      dispatch(setConversionRate(response.data[destinationCurrency.id]));
    }
  }, [baseCurrency, dispatch, destinationCurrency]);

  useEffect(() => {
    if (
      baseCurrency.id !== "" &&
      baseCurrency.id !== "-1" &&
      destinationCurrency.id !== "" &&
      destinationCurrency.id !== "-1"
    ) {
      handleCurrencyConversion();
    }
  }, [baseCurrency, destinationCurrency, handleCurrencyConversion]);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between mx-10">
        <>
          <LeftContainer
            list={list}
            inputOnChangeHandler={(value: string) =>
              setBaseCurrencyAmount(value)
            }
            defaultSelection={
              baseCurrency.id !== ""
                ? baseCurrency
                : { id: "-1", value: "Select" }
            }
            dropdownChangeHandler={handleBaseCurrencyChange}
          />
        </>
        <div>
          <MdOutlineSwapHoriz
            className="text-4xl spin"
            onClick={handleCurrencySwap}
          />
        </div>
        <>
          <RightContainer
            list={list}
            baseCurrencyAmount={baseCurrencyAmount}
            dropdownChangeHandler={handleDestinationCurrencyChange}
            defaultSelection={
              destinationCurrency.id !== ""
                ? destinationCurrency
                : { id: "-1", value: "Select" }
            }
          />
        </>
      </div>
      <div>
        <ConversionRate />
      </div>
    </div>
  );
};
