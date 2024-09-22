"use client";

import { useState } from "react";

import { Form } from "@/_types";
import { generate } from "@/app/_actions/generate";

import { Brand } from "./step/brand";
import { Steps } from "./step/list";
import { Industry } from "./step/industry";
import { Description } from "./step/description";
import classNames from "classnames";
import { toast } from "react-toastify";

export const Generation = () => {
  const [form, setForm] = useState<Form>({
    brand_name: "",
    display_name: false,
    description: "",
    industry: "",
    style: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<number | undefined>(undefined);

  const handleGenerate = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await generate(form);
      setResult(response.data);
    } catch (err) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="generation" className="w-full py-10 lg:py-20">
      <h3 className="max-w-4xl text-2xl lg:text-3xl text-[#aaaaaa] font-semibold mb-12 text-center mx-auto">
        Start your <span className="text-white">generation</span> here.
      </h3>
      <Steps form={form} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-20">
        <Brand form={form} setForm={setForm} />
        <Description form={form} setForm={setForm} />
        <Industry form={form} setForm={setForm} />
        <div className="lg:col-span-3 flex items-center justify-center">
          <button
            className={classNames(
              "max-lg:w-full rounded-full bg-white text-zinc-950 font-medium text-sm px-6 py-3 hover:bg-opacity-80 transition-all duration-150 disabled:bg-zinc-500 disabled:text-zinc-700",
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
          <div className="lg:col-span-3 flex items-center justify-center rounded-3xl">
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
