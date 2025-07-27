"use client";

import { useState } from "react";

import { FolderClosed, Puzzle, Search } from "lucide-react";

import cn from "@/utils/cn";

export default function HowItWorks() {
  const steps = [
    {
      icon: FolderClosed,
      text: "set up your vault",
      supportingText: "create a vault, add folders, start saving",
      video: "/set-up-your-vault.mp4",
    },
    {
      icon: Puzzle,
      text: "save from your browser",
      supportingText: "add links, notes, images with the extension",
      video: "/save-from-your-browser.mp4",
    },
    {
      icon: Search,
      text: "search & manage",
      supportingText: "find, rename, and pin your saved items",
      video: "/search-and-manage.mp4",
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
            collect, organize, and access your links, notes, and images with
            ease.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-x-6 w-full max-sm:grid-cols-1 max-sm:gap-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className={cn(
                  "flex flex-col w-full p-5 h-full border-b border-transparent",
                  index === stepIndex && "border-zinc-300"
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
      <div className="flex items-center justify-center w-full aspect-[1024/788]">
        <video
          src={steps[stepIndex].video}
          className="border border-zinc-200 rounded-[0.625rem] w-full h-full pointer-events-none"
          loop
          muted
          playsInline
          autoPlay
        ></video>
      </div>
    </section>
  );
}
