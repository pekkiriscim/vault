import { Button } from "@/components/button";

export default function Header() {
  return (
    <section className="flex flex-col items-center py-20 gap-y-12 w-full">
      <div className="flex flex-col items-center max-w-[45rem]">
        <img src="/vault.svg" alt="vault" className="mb-12 size-20" />
        <h1 className="mb-4 text-center text-3xl font-semibold text-zinc-900 text-balance">
          save links, notes, and images. private & open source.
        </h1>
        <p className="mb-6 text-center text-lg text-zinc-600 text-balance">
          vault is a desktop app to collect and organize links, notes, and
          images. it’s open source, private, and everything is stored locally.
        </p>
        <div className="flex gap-x-3">
          <Button variant="secondary">view on github</Button>
          <Button variant="primary">download for free</Button>
        </div>
      </div>
      <img
        src="/screenshot.png"
        alt="screenshot"
        className="border border-zinc-200 rounded-[0.625rem] shadow-3xl"
      />
    </section>
  );
}
