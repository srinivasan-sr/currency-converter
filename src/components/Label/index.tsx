import { LabelProps } from "./LabelProps.types";
export const Label = ({ text, classes }: LabelProps) => {
  return <div className={classes}>{text}</div>;
};
