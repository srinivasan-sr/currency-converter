import { Dropdown } from "../Dropdown";
import { Label } from "../Label";
import { useAppSelector } from "../../hooks/use-typed-hooks";
import { RightContainerProps } from "./index.types";
export const RightContainer = ({
  list,
  baseCurrencyAmount,
  dropdownChangeHandler,
  defaultSelection,
}: RightContainerProps) => {
  const { conversionRate } = useAppSelector((state) => state.currency);
  const destinationAmount =
    conversionRate && baseCurrencyAmount
      ? (parseFloat(baseCurrencyAmount) * conversionRate).toFixed(2).toString()
      : "";
  return (
    <div className="grid grid-cols-6 gap-1 min-w-80">
      <div className="col-span-1">
        <Label text="to: " />
      </div>
      <div className="col-span-3">
        <Dropdown
          list={list}
          handleSelection={(item) => {
            dropdownChangeHandler(item);
          }}
          defaultSelection={defaultSelection}
        />
      </div>
      <div className="col-span-2">
        <Label
          text={destinationAmount}
          classes="shadow border min-w-24 min-h-7"
        />
      </div>
    </div>
  );
};
