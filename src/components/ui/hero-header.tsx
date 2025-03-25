"use client";

import classNames from "classnames";
import { useState } from "react";
import { useInterval } from "react-use";

export const HeroHeader = () => {
  const [selectedWord, setSelectedWord] = useState("Think.");

  useInterval(() => {
    setSelectedWord((prev) => {
      const wordMap: { [key: string]: string } = {
        "Think.": "Customize.",
        "Customize.": "Generate.",
        "Generate.": "Think.",
      };
      return wordMap[prev] || "Think.";
    });
  }, 2000);

  return (
    <header className="py-14 lg:py-20 grid grid-cols-1 gap-5">
      <h1 className="text-4xl lg:text-5xl font-semibold text-[#aaaaaa] max-w-max mx-auto text-center">
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
      <div className="max-lg:max-w-xs w-full max-lg:mx-auto max-lg:grid lg:flex lg:items-center lg:justify-center gap-6 mt-3 ">
        <a
          href="#generation"
          className="rounded-full bg-white text-zinc-950 font-medium text-base px-6 py-3 hover:bg-opacity-80 transition-all duration-150 text-center max-lg:w-full"
        >
          Start generation
        </a>
        <a
          href="#gallery"
          className="rounded-full text-zinc-300 bg-zinc-900 font-medium text-base px-6 py-3 hover:bg-opacity-80 transition-all duration-150 text-center max-lg:w-full"
        >
          View examples
        </a>
      </div>
    </header>
  );
};
