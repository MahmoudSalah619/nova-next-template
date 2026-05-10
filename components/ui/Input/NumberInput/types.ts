import { InputHTMLAttributes, Ref } from "react";
import { GeneralInputProps, InputRef } from "../types";

export type NumberInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "prefix" | "type"
> &
  GeneralInputProps & {
    ref?: Ref<InputRef<"number">>;
    type: "number";
  };
