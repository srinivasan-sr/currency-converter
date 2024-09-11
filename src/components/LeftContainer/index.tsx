import { Label } from "../Label";
import { Dropdown } from "../Dropdown";
import { LeftContainerProps } from "./index.types";
export const LeftContainer = ({
  list,
  inputOnChangeHandler,
  defaultSelection,
  dropdownChangeHandler,
}: LeftContainerProps) => {
  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    inputOnChangeHandler(event.currentTarget.value);
  };
  return (
    <div className="grid grid-cols-6 gap-1">
      <div className="col-span-1">
        <Label text="Convert from: " />
      </div>
      <div className="col-span-2">
        <Dropdown
          list={list}
          defaultSelection={defaultSelection}
          handleSelection={(item) => {
            dropdownChangeHandler(item);
          }}
        />
      </div>
      <div className="col-span-2">
        <input
          type="text"
          defaultValue=""
          placeholder="Amount to convert"
          className="shadow border line-clamp-1 px-1 py-0.5"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};
