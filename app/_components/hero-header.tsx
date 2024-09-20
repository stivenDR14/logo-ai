"use client";

import classNames from "classnames";
import { useState } from "react";
import { useInterval } from "react-use";

export const HeroHeader = () => {
  const [selectedWord, setSelectedWord] = useState("Think.");

  useInterval(() => {
    setSelectedWord((prev) => {
      switch (prev) {
        case "Think.":
          return "Customize.";
        case "Customize.":
          return "Generate.";
        case "Generate.":
          return "Think.";
        default:
          return "Think.";
      }
    });
  }, 2000);

  return (
    <header className="py-20 grid grid-cols-1 gap-5">
      <h1 className="text-5xl font-semibold text-[#aaaaaa] max-w-max mx-auto text-center">
        <span
          className={classNames("transition-all duration-300 text-opacity-0", {
            "text-white !text-opacity-100": selectedWord === "Think.",
          })}
        >
          Think.
        </span>{" "}
        <span
          className={classNames("transition-all duration-300 text-opacity-0", {
            "text-white !text-opacity-100": selectedWord === "Customize.",
          })}
        >
          Customize.
        </span>{" "}
        <br />
        and{" "}
        <span
          className={classNames("transition-all duration-300 text-opacity-0", {
            "text-white !text-opacity-100": selectedWord === "Generate.",
          })}
        >
          Generate.
        </span>
      </h1>
      <h2 className="text-lg font-light text-center text-[#898989] max-w-sm mx-auto">
        An AI powered tool that helps you create a logo for your brand.
      </h2>
      <div className="flex items-center justify-center gap-6 mt-3">
        <a
          href="#generation"
          className="rounded-full bg-white text-zinc-950 font-medium text-base px-6 py-3 hover:bg-opacity-80 transition-all duration-150"
        >
          Start generation
        </a>
        <a
          href="#gallery"
          className="rounded-full text-zinc-300 bg-zinc-900 font-medium text-base px-6 py-3 hover:bg-opacity-80 transition-all duration-150"
        >
          View examples
        </a>
      </div>
    </header>
  );
};
