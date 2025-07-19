export default function Footer() {
  return (
    <section className="flex flex-col items-center py-12 gap-y-6 w-full">
      <img src="/vault.svg" alt="vault" className="size-10" />
      <p className="text-center text-sm text-zinc-600 text-balance">
        vault is open source. built by pekkiriscim.
      </p>
    </section>
  );
}
