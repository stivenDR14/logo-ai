import { FaSpinner } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="min-h-[50vh] w-full flex flex-col items-center justify-center gap-4">
      <FaSpinner className="animate-spin text-2xl text-white" />
      <p className="text-zinc-400 text-lg">Loading logos...</p>
    </div>
  );
}
