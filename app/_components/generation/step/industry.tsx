import { Form } from "@/_types";

import { INDUSTRIES } from "@/_utils";

export const Industry = ({
  form,
  setForm,
}: {
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
}) => {
  return (
    <div className="">
      <label htmlFor="industry" className="text-zinc-300 mb-1 block text-sm">
        Industry
      </label>
      <select
        id="industry"
        className="border bg-zinc-900 border-zinc-800 rounded-lg py-3 px-4 text-gray-200 outline-none w-full"
        onChange={(e) => setForm({ ...form, industry: e.target.value })}
      >
        <option value="">Select an industry</option>
        {INDUSTRIES.map((industry, i) => (
          <option key={i} value={industry.name}>
            {/* <industry.icon className="mr-2 inline-block" /> */}
            {industry.name}
          </option>
        ))}
      </select>
    </div>
  );
};
