import Link from "next/link";
import React, { Fragment } from "react";

type Props = {
  text?: string;
  handleClick?: () => void;
  position?: "left" | "right";
  icon?: React.ReactNode;
  link?: boolean;
  href?: string;
  fullWidth?: boolean;
};

export const PrimaryButton = ({
  text,
  handleClick,
  position,
  icon,
  link = false,
  href = "/",
  fullWidth = false,
}: Props) => {
  return (
    <Fragment>
      {link ? (
        <Link className={`${fullWidth && "w-full"}`} href={href}>
          <div
            className={`bg-gray-500 hover:bg-gray-700 text-white font-semibold text-sm py-2 px-4 rounded duration-150 flex items-center gap-2 ${
              fullWidth && "w-full flex justify-center items-center"
            }`}
          >
            {position === "left" && icon}
            <p>{text}</p>
            {position === "right" && icon}
          </div>
        </Link>
      ) : (
        <button
          onClick={handleClick}
          className={`bg-gray-500 hover:bg-gray-700 text-white font-semibold text-sm py-2 px-4 rounded duration-150 flex items-center gap-2 ${
            fullWidth && "w-full flex justify-center items-center"
          }`}
        >
          {position === "left" && icon}
          {text}
          {position === "right" && icon}
        </button>
      )}
    </Fragment>
  );
};
