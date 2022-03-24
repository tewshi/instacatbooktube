import classNames from "classnames";
import React from "react";

interface LayoutProps {
  text: string;
  disabled: boolean | undefined;
  onClick: Function;
}

export default function Button({
  text,
  disabled,
  onClick,
}: LayoutProps): JSX.Element {
  return (
    <button
      onClick={() => onClick()}
      className={classNames(
        "text-white h-12 w-full",
        disabled ? " bg-disabled" : "bg-textValid"
      )}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
