import { TiLightbulb } from "react-icons/ti";
import { MdWorkOutline } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlinePermIdentity } from "react-icons/md";
import classNames from "classnames";

import { Form } from "@/src/types";

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

export const Stepper = ({ form }: { form: Form }) => {
  return (
    <>
      <div className="hidden lg:flex w-full items-center justify-center gap-2 mb-12">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center">
            <div
              key={"step_" + i}
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
          </div>
        ))}
      </div>

      <div className="lg:hidden w-full grid grid-cols-3 gap-3 mb-8">
        {STEPS.map((s, i) => (
          <div
            key={i}
            className={classNames(
              "text-center flex flex-col items-center p-2 rounded-lg cursor-pointer",
              {
                "opacity-40 bg-zinc-900":
                  form[s.key as keyof typeof form] === "",
                "bg-zinc-800": form[s.key as keyof typeof form] !== "",
              }
            )}
          >
            <div
              className={classNames(
                "size-6 border border-white text-white flex items-center justify-center rounded-2xl mb-2",
                {
                  [s.active]: form[s.key as keyof typeof form],
                }
              )}
            >
              {form[s.key as keyof typeof form] ? (
                <IoMdCheckmark className="text-lg" />
              ) : (
                <s.icon className="text-sm" />
              )}
            </div>
            <p className="text-white text-sm font-semibold">{s.title}</p>
          </div>
        ))}
      </div>
    </>
  );
};
