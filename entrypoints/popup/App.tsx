import vault from "@/assets/vault.svg";

import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

import cn from "@/utils/cn";

import { useScrollContainer } from "react-indiana-drag-scroll";

function App() {
  const [link, setLink] = useState<AddLinkProps>({
    url: "",
    title: "",
    iconUrl: null,
    folderId: null,
  });

  const [folders, setFolders] = useState<Folder[]>([]);

  const scrollContainer = useScrollContainer();

  useEffect(() => {
    const getCurrentTab = async () => {
      try {
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });

        if (tab.url && tab.title) {
          setLink((prev) => ({
            ...prev,
            url: tab.url || "",
            title: tab.title || "",
            iconUrl: tab.favIconUrl || null,
          }));
        }
      } catch (error) {
        console.error("Failed to get current tab.");
      }
    };

    const getFolders = async () => {
      try {
        const response = await fetch("http://localhost:8001/folders");

        const { data } = await response.json();

        setFolders(data);
      } catch (error) {
        console.error("Failed to get folders.");
      }
    };

    getCurrentTab();

    getFolders();
  }, []);

  const addLink = async () => {
    try {
      const response = await fetch("http://localhost:8001/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(link),
      });

      if (!response.ok) {
        throw new Error();
      }

      window.close();
    } catch (error) {
      console.error("Failed to add link.");
    }
  };

  return (
    <main className="w-96">
      <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-zinc-200">
        <div className="flex flex-col gap-y-0.5">
          <h1 className="text-base font-medium text-zinc-900">Add link</h1>
          <p className="text-sm text-zinc-600">mustafa's vault</p>
        </div>
        <img
          src={link.iconUrl ? link.iconUrl : vault}
          alt="vault"
          className="size-10 rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-y-6 px-5 pt-4 pb-5">
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col gap-y-1">
            <Label htmlFor="title">title</Label>
            <Input
              placeholder="link title"
              id="title"
              value={link.title ?? ""}
              onChange={(e) =>
                setLink((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <Label>folder</Label>
            <div
              ref={scrollContainer.ref}
              className="flex gap-x-1 overflow-x-auto no-scrollbar"
            >
              {folders.map((folder) => (
                <Button
                  key={folder.id}
                  className={cn(
                    link.folderId !== folder.id && "bg-zinc-100 text-zinc-700"
                  )}
                  onClick={() => {
                    if (link.folderId === folder.id) {
                      setLink((prev) => ({ ...prev, folderId: null }));
                    } else {
                      setLink((prev) => ({ ...prev, folderId: folder.id }));
                    }
                  }}
                >
                  {folder.name}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <Label htmlFor="url">url</Label>
            <Input
              placeholder="link url"
              id="url"
              value={link.url ?? ""}
              onChange={(e) =>
                setLink((prev) => ({ ...prev, url: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="flex gap-x-2">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => window.close()}
          >
            cancel
          </Button>
          <Button
            variant="primary"
            className="w-full"
            onClick={addLink}
            disabled={!link.url || !link.title}
          >
            add
          </Button>
        </div>
      </div>
    </main>
  );
}

export default App;
