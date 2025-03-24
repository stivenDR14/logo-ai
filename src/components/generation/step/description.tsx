import { Form } from "@/src/types";

export const Description = ({
  form,
  setForm,
}: {
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
}) => {
  return (
    <div className="w-full">
      <label htmlFor="description" className="text-zinc-300 mb-1 block text-sm">
        Short Description
      </label>
      <input
        type="text"
        id="description"
        placeholder="A platform for building and sharing models"
        value={form.description}
        className="border bg-zinc-900 border-zinc-800 rounded-lg py-2 px-4 text-gray-200 outline-none w-full placeholder:text-gray-600"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
    </div>
  );
};
