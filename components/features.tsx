import {
  BadgeInfo,
  FolderClosed,
  Highlighter,
  Import,
  Puzzle,
  Search,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      id: 0,
      icon: FolderClosed,
      text: "folders & multiple vaults",
      supportingText: "organize your content with folders and separate vaults",
    },
    {
      id: 1,
      icon: Search,
      text: "search",
      supportingText: "find anything in your saved links and notes instantly",
    },
    {
      id: 2,
      icon: Puzzle,
      text: "browser extension",
      supportingText:
        "save links, notes, and images directly from your browser",
    },
    {
      id: 3,
      icon: Highlighter,
      text: "markdown support",
      supportingText:
        "write notes with formatting, lists, code blocks, and more",
    },
    {
      id: 4,
      icon: Import,
      text: "import & export",
      supportingText: "move bookmarks in and out, including from Chrome",
    },
    {
      id: 5,
      icon: BadgeInfo,
      text: "metadata parsing",
      supportingText:
        "auto-fetch titles, read time, or product info when saving links",
    },
  ];

  return (
    <section className="grid grid-cols-3 py-20 gap-x-6 gap-y-12 w-full max-sm:grid-cols-1">
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <div key={feature.id} className="flex flex-col items-center w-full">
            <div className="flex items-center justify-center size-10 mb-4">
              <Icon className="size-5 text-zinc-900" />
            </div>
            <p className="text-lg font-semibold text-zinc-900 mb-1 text-center text-balance">
              {feature.text}
            </p>
            <p className="text-sm text-zinc-600 text-center text-balance max-sm:max-w-80">
              {feature.supportingText}
            </p>
          </div>
        );
      })}
    </section>
  );
}
