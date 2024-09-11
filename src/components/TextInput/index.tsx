import { useState } from "react";
import { TextInputProps } from "./TextInput.types";
export const TextInput = ({
  classes,
  defaultValue,
  handleChange,
  placeholder,
  readOnly,
  props,
}: TextInputProps) => {
  console.log(`Default value`, defaultValue);
  const [value, setValue] = useState(defaultValue);
  const handleValueChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    setValue(event.currentTarget.value);
    handleChange(event.currentTarget.value);
  };
  if (value !== defaultValue) {
    setValue(defaultValue);
  }
  return (
    <input
      type="text"
      className={classes}
      value={value}
      placeholder={placeholder}
      readOnly={readOnly}
      onChange={handleValueChange}
      {...props}
    />
  );
};
