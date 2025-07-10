"use client";

import { useState } from "react";

import { FolderPlus, Puzzle, Search } from "lucide-react";

import cn from "@/utils/cn";

export default function HowItWorks() {
  const steps = [
    {
      icon: FolderPlus,
      text: "set up your vault",
      supportingText:
        "create a vault, add folders, and start saving your first links",
      video: "/screenshot.png",
    },
    {
      icon: Puzzle,
      text: "save from your browser",
      supportingText:
        "use the browser extension to add links, notes, and images directly into folders",
      video: "/screenshot.png",
    },
    {
      icon: Search,
      text: "search & manage your content",
      supportingText:
        "quickly find saved items, pin important links, and stay organized",
      video: "/screenshot.png",
    },
  ];

  const [stepIndex, setStepIndex] = useState(0);

  return (
    <section className="flex flex-col items-center py-20 gap-y-12 w-full">
      <div className="flex flex-col items-center gap-y-12 w-full">
        <div className="flex flex-col items-center max-w-[45rem]">
          <h2 className="mb-4 text-center text-3xl font-semibold text-zinc-900 text-balance">
            how it works
          </h2>
          <p className="text-center text-lg text-zinc-600 text-balance">
            vault is a desktop app to collect and organize links, notes, and
            images. it’s open source, private, and everything is stored locally.
          </p>
        </div>
        <div className="flex gap-x-6 w-full items-start">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className={cn(
                  "flex flex-col w-full p-5 h-full",
                  index === stepIndex && "border-b border-zinc-300"
                )}
                onClick={() => setStepIndex(index)}
              >
                <Icon className="size-5 text-zinc-900 mb-4" />
                <p className="text-lg font-semibold text-zinc-900 mb-1 text-balance">
                  {step.text}
                </p>
                <p className="text-sm text-zinc-600 text-balance">
                  {step.supportingText}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <img
        src={steps[stepIndex].video}
        alt="screenshot"
        className="border border-zinc-200 rounded-[0.625rem] shadow-3xl"
      />
    </section>
  );
}
