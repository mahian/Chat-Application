import React from "react";
import { classNames } from "../utils";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return (
    <input
      {...props}
      className={classNames(
        "w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600",
        props.className || ""
      )}
    />
  );
};

export default Input;
