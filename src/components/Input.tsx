import React from "react";
import classNames from "classnames";

interface LayoutProps {
  value: string;
  setValue: Function;
  valid: boolean;
  failed: boolean;
}

export default function Input({
  value,
  setValue,
  valid,
  failed,
}: LayoutProps): JSX.Element {
  return (
    <input
      className={classNames(
        "w-full border-gray-200 border h-[40px] px-[14px] rounded outline-1 outline-gray-300 focus-visible:outline-none mb-6 mt-10",
        value.length === 36 &&
          (!valid || failed
            ? "focus-within:outline-failed outline outline-1 text-failed"
            : "focus-within:outline-valid outline outline-1 text-textValid"),
        failed && "failed-input"
      )}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter your API key..."
    />
  );
}
