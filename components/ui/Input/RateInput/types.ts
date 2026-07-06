import { HTMLAttributes, RefObject } from "react";
import { SharedInputProps, InputRef } from "../types";

export type RateInputProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "value"> &
  SharedInputProps & {

    ref?: RefObject<InputRef<"rate">>;
    type?: "rate";

    count?: number;
    value?: number;
    defaultValue?: number;
    allowHalf?: boolean;
    disabled?: boolean;
    onChange?: (value: number) => void;
    character?: React.ReactNode;
  };
