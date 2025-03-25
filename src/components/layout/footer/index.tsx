export const Footer = () => {
  return (
    <footer className="mt-4 w-full max-w-4xl mx-auto border-t border-zinc-800 pt-8 pb-3 text-center">
      <p className="text-sm text-zinc-400">
        Powered by{" "}
        <a
          href="https://github.com/huggingface/huggingface.js"
          target="_blank"
          className="font-mono text-amber-500 hover:text-amber-400"
        >
          huggingface.js
        </a>{" "}
        and{" "}
        <a
          href="https://huggingface.co/Shakker-Labs/FLUX.1-dev-LoRA-Logo-Design"
          target="_blank"
          className="font-mono text-zinc-100 hover:text-white"
        >
          Shakker-Labs/FLUX.1-dev-LoRA-Logo-Design
        </a>
      </p>
    </footer>
  );
};
