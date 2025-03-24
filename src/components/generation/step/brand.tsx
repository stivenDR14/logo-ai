import { sanitizeInput } from "@/src/lib/helpers";
import { Form } from "@/src/types";

export const Brand = ({
  form,
  setForm,
}: {
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = sanitizeInput(e.target.value);
    setForm({ ...form, brand_name: sanitizedValue });
  };

  return (
    <div className="w-full">
      <label htmlFor="brand_name" className="text-zinc-300 mb-1 block text-sm">
        Brand name
      </label>
      <input
        type="text"
        id="brand_name"
        placeholder="Hugging Face"
        value={form.brand_name}
        className="border bg-zinc-900 border-zinc-800 rounded-lg py-2 px-4 text-gray-200 outline-none w-full placeholder:text-gray-600"
        onChange={handleOnChange}
      />
    </div>
  );
};
