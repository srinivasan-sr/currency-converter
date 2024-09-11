import { useAppSelector } from "../../hooks/use-typed-hooks";
export const ConversionRate = () => {
  const { baseCurrency, destinationCurrency, conversionRate } = useAppSelector(
    (state) => state.currency
  );
  return (
    conversionRate !== 0 && (
      <div>
        <div className="text-gray-500 mx-10 my-2">{`1 ${
          baseCurrency.value
        } = ${conversionRate.toFixed(2)} ${destinationCurrency.value}`}</div>
      </div>
    )
  );
};
