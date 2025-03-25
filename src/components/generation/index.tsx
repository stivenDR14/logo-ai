"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Brand } from "./step/brand";
import { Stepper } from "./step/stepper";
import { Industry } from "./step/industry";
import { Description } from "./step/description";
import classNames from "classnames";
import { toast } from "react-toastify";
import Image from "next/image";
import { Form } from "@/src/types";
import { generate } from "@/src/lib/actions/generate";
import { FaSpinner } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { useSSEProgress } from "@/src/hooks/useSSEProgress";
import { ImageWithLoader } from "../ui/image-with-loader";

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
  const [sessionId, setSessionId] = useState<string>("");

  // Using our new custom hook
  const { progress, message, isComplete } = useSSEProgress(
    sessionId,
    loading,
    form,
    setResult
  );

  useEffect(() => {
    if (isComplete) {
      setLoading(false);
    }
  }, [isComplete]);

  const handleGenerate = async () => {
    if (loading) return;
    setLoading(true);

    // Generate a new session ID for this process
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
  };

  const ProgressIndicator = () => (
    <div className="lg:col-span-3 mt-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-zinc-800 rounded-lg p-4">
        <div className="mb-2 flex justify-between items-center">
          <span className="text-zinc-300 text-sm">
            {progress === 100 ? "Compeleted!" : message}
          </span>
          <span className="text-zinc-400 text-xs">{progress}%</span>
        </div>
        <div className="w-full bg-zinc-700 rounded-full h-2.5">
          <div
            className="bg-white h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <main id="generation" className="w-full py-10 lg:py-20">
      <h3 className="max-w-4xl text-2xl lg:text-3xl text-[#aaaaaa] font-semibold mb-6 lg:mb-12 text-center mx-auto">
        Start your <span className="text-white">generation</span> here.
      </h3>
      <Stepper form={form} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-20">
        <Brand form={form} setForm={setForm} />
        <Description form={form} setForm={setForm} />
        <Industry form={form} setForm={setForm} />
        <div className="lg:col-span-3 flex items-center justify-center">
          <button
            className={classNames(
              "max-lg:w-full rounded-full bg-white text-zinc-950 font-medium text-sm px-6 py-3 hover:bg-opacity-80 transition-all duration-150 disabled:bg-zinc-500 disabled:text-zinc-700",
              {
                "opacity-80": loading,
              }
            )}
            disabled={
              !form.brand_name || !form.description || !form.industry || loading
            }
            onClick={handleGenerate}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <FaSpinner className="animate-spin" />
                Generating...
              </span>
            ) : (
              "Generate my Logo"
            )}
          </button>
        </div>

        {loading && <ProgressIndicator />}

        {!loading ? (
          result && (
            <div className="lg:col-span-3 flex items-center justify-center rounded-3xl">
              <ImageWithLoader
                src={`/api/images/${result}`}
                alt="Generated logo"
                width={400}
                height={400}
                className="h-[300px]"
              />
            </div>
          )
        ) : (
          <div></div>
        )}
      </div>
    </main>
  );
};
