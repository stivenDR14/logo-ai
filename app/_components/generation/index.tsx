"use client";

import { useState } from "react";

import { Form } from "@/_types";
import { generate } from "@/app/_actions/generate";

import { Brand } from "./step/brand";
import { Steps } from "./step/list";
import { Industry } from "./step/industry";
import { Description } from "./step/description";
import classNames from "classnames";

export const Generation = () => {
  const [form, setForm] = useState<Form>({
    brand_name: "",
    display_name: false,
    description: "",
    industry: "",
    style: "",
  });

  const [step, setStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<number | undefined>(undefined);

  const handleGenerate = async () => {
    if (loading) return;
    setLoading(true);
    const response = await generate(form);
    if (response.data) {
      setResult(response.data);
    } else {
      console.log("Error: ", response.error);
    }
    setLoading(false);
  };

  return (
    <main id="generation" className="w-full py-20">
      <h3 className="max-w-4xl text-3xl text-[#aaaaaa] font-semibold mb-12 text-center mx-auto">
        Start your <span className="text-white">generation</span> here.
      </h3>
      <Steps step={step} form={form} />
      <div className="grid grid-cols-3 gap-20">
        <Brand form={form} setForm={setForm} />
        <Description form={form} setForm={setForm} />
        <Industry form={form} setForm={setForm} />
        <div className="col-span-3 flex items-center justify-center">
          <button
            className={classNames(
              "rounded-full bg-white text-zinc-950 font-medium text-sm px-6 py-3 hover:bg-opacity-80 transition-all duration-150 disabled:bg-zinc-500 disabled:text-zinc-700",
              {
                "animate-pulse": loading,
              }
            )}
            disabled={!form.brand_name || !form.description || !form.industry}
            onClick={handleGenerate}
          >
            {loading ? "Generating..." : "Generate my Logo"}
          </button>
        </div>
        {result && (
          <div className="col-span-3 flex items-center justify-center">
            <img
              src={`/api/images/${result}`}
              alt="Generated logo"
              className="h-[300px]"
            />
          </div>
        )}
      </div>
    </main>
  );
};
