export default function FAQ() {
  const items = [
    {
      id: 0,
      question: "is vault free to use?",
      answer: "yes, vault is open source and free.",
    },
    {
      id: 1,
      question: "where is my data stored?",
      answer:
        "all your data is stored locally on your computer inside your vault folder.",
    },
    {
      id: 2,
      question: "does vault track or collect my data?",
      answer:
        "no. vault doesn’t collect or track anything. your data stays with you.",
    },
    {
      id: 3,
      question: "do i need an internet connection to use vault?",
      answer: "no. vault works entirely offline on your computer.",
    },
    {
      id: 4,
      question: "does vault support sync?",
      answer:
        "no. vault doesn’t have built-in sync, but you can manually sync your vault folder using cloud storage if you prefer.",
    },
    {
      id: 5,
      question: "how does the browser extension work?",
      answer:
        "the extension sends links, notes, and images to your local vault via a local api.",
    },
    {
      id: 6,
      question: "can i import my bookmarks?",
      answer:
        "yes. you can import and export bookmarks from browsers like chrome.",
    },
    {
      id: 7,
      question: "can i create multiple vaults?",
      answer: "yes. you can create and manage as many vaults as you need.",
    },
    {
      id: 8,
      question: "can i back up or move my vault?",
      answer:
        "yes. vaults are just folders on your computer. you can copy, move, or back them up anywhere.",
    },
    {
      id: 9,
      question: "what platforms does vault support?",
      answer: "vault is available for mac, windows, and linux.",
    },
    {
      id: 10,
      question: "do images lose quality when added?",
      answer:
        "no. images are saved in their original quality without compression.",
    },
    {
      id: 11,
      question: "how can i contribute or report bugs?",
      answer:
        "you can contribute or report issues on vault’s github repository.",
    },
  ];

  return (
    <section className="flex flex-col items-center py-20 gap-y-12 w-full">
      <div className="flex flex-col items-center max-w-[45rem]">
        <h2 className="mb-4 text-center text-3xl font-semibold text-zinc-900 text-balance">
          frequently asked questions
        </h2>
        <p className="text-center text-lg text-zinc-600 text-balance">
          learn more about how vault works and what you can do with it.
        </p>
      </div>
      <div className="flex flex-col items-center w-full max-w-[45rem] gap-y-8">
        {items.map((item) => {
          return (
            <div key={item.id} className="flex flex-col w-full gap-y-1">
              <p className="text-sm font-semibold text-zinc-900 text-balance">
                {item.question}
              </p>
              <p className="text-sm text-zinc-600 text-balance">
                {item.answer}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
