import Link from "next/link";

export default function Footer() {
  return (
    <section className="flex flex-col items-center py-12 gap-y-6 w-full">
      <img
        src="/vault.svg"
        alt="vault"
        className="size-10 pointer-events-none"
        draggable="false"
      />
      <Link
        href="https://x.com/pekkiriscim"
        className="text-center text-sm text-zinc-600 text-balance focus:outline-none cursor-default"
        draggable="false"
      >
        vault is open source. built by pekkiriscim.
      </Link>
    </section>
  );
}
