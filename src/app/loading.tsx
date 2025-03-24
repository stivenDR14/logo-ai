import { FaSpinner } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="min-h-[50vh] w-full flex flex-col items-center justify-center gap-4">
      <div className="animate-spin size-10 border-4 border-white border-t-transparent rounded-full"></div>
      <p className="text-zinc-400 text-lg">Loading logos...</p>
    </div>
  );
}
