import { TiLightbulb } from "react-icons/ti";
import { MdWorkOutline } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlinePermIdentity } from "react-icons/md";
import classNames from "classnames";

import { Form } from "@/_types";

const STEPS = [
  {
    title: "Brand",
    description: "Tell us about your brand.",
    icon: MdOutlinePermIdentity,
    active: "bg-amber-500 !border-amber-500",
    key: "brand_name",
  },
  {
    title: "Concept",
    description: "What's your brand about?",
    icon: TiLightbulb,
    active: "bg-violet-500 !border-violet-500",
    key: "description",
  },
  {
    title: "Industry",
    description: "What industry are you in?",
    icon: MdWorkOutline,
    active: "bg-emerald-500 !border-emerald-500",
    key: "industry",
  },
];

export const Steps = ({ step, form }: { step: number; form: Form }) => {
  return (
    <div className="w-full flex items-center justify-center gap-2 mb-12">
      {STEPS.map((s, i) => (
        <>
          <div
            key={i}
            className={classNames(
              "text-center flex flex-col items-center min-w-60 cursor-pointer",
              {
                "opacity-40": form[s.key as keyof typeof form] === "",
              }
            )}
          >
            <div
              className={classNames(
                "size-7 border border-white text-white flex items-center justify-center rounded-2xl mb-3",
                {
                  [s.active]: form[s.key as keyof typeof form],
                }
              )}
            >
              {form[s.key as keyof typeof form] ? (
                <IoMdCheckmark className="text-xl" />
              ) : (
                <s.icon className="text-base" />
              )}
            </div>
            <p className="text-white text-xl font-semibold">{s.title}</p>
            <p className="text-white text-sm font-mono">{s.description}</p>
          </div>
          {i !== STEPS.length - 1 && (
            <div
              key={"linear_" + i}
              className="h-0 flex-1 border-gray-100/20 border-dashed border-b"
            />
          )}
        </>
      ))}
    </div>
  );
};
