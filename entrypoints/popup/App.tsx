import vault from "@/assets/vault.svg";

import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

import cn from "@/utils/cn";

import { useScrollContainer } from "react-indiana-drag-scroll";

import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";

function App() {
  const [type, setType] = useState<"link" | "note" | "image">("link");

  const [link, setLink] = useState<AddLinkProps>({
    url: "",
    title: "",
    iconUrl: null,
    folderId: null,
  });

  const [note, setNote] = useState<AddNoteProps>({
    content: "",
    folderId: null,
  });

  const [image, setImage] = useState<{
    url: string;
    folderId?: number | null;
  }>({
    url: "",
    folderId: null,
  });

  const [folders, setFolders] = useState<Folder[]>([]);

  const scrollContainer = useScrollContainer();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "note content" }),
    ],
    content: note.content,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none prose-zinc outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      setNote((prev) => ({ ...prev, content: editor.getHTML() }));
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const itemType = params.get("type") as "link" | "note" | "image" | null;

    if (itemType === "link") {
      const url = params.get("url");

      const title = params.get("title");

      const iconUrl = params.get("iconUrl");

      setType("link");

      setLink((prev) => ({
        ...prev,
        url: url || "",
        title: title || "",
        iconUrl: iconUrl || null,
      }));
    } else if (itemType === "note") {
      const content = params.get("content");

      setType("note");

      setNote((prev) => ({
        ...prev,
        content: content || "",
      }));

      editor?.commands.setContent(content || "");
    } else if (itemType === "image") {
      const imageUrl = params.get("url");

      setType("image");

      setImage((prev) => ({
        ...prev,
        url: imageUrl || "",
      }));
    } else {
      getCurrentTab();
    }

    getFolders();
  }, [editor]);

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

  const addContent = async () => {
    try {
      let endpoint = "";
      let data = null;

      switch (type) {
        case "link":
          endpoint = "links";
          data = link;

          break;
        case "note":
          endpoint = "notes";
          data = note;

          break;
        case "image":
          endpoint = "images";
          data = image;

          break;
      }

      const response = await fetch(`http://localhost:8001/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error();
      }

      window.close();
    } catch (error) {
      console.error(`Failed to add ${type}.`);
    }
  };

  return (
    <main className="w-96">
      <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-zinc-200">
        <div className="flex flex-col gap-y-0.5">
          <h1 className="text-base font-medium text-zinc-900">Add {type}</h1>
          <p className="text-sm text-zinc-600">mustafa's vault</p>
        </div>
        {type === "link" && (
          <img
            src={link.iconUrl ? link.iconUrl : vault}
            alt="vault"
            className="size-10 rounded-lg"
          />
        )}
      </div>
      <div className="flex flex-col gap-y-6 px-5 pt-4 pb-5">
        <div className="flex flex-col gap-y-3">
          {type === "link" && (
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
          )}
          {type === "note" && (
            <div className="flex flex-col gap-y-1">
              <EditorContent editor={editor} />
            </div>
          )}
          {type === "image" && (
            <img
              src={image.url}
              alt="preview"
              className="w-full max-h-64 rounded-lg object-cover"
            />
          )}
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
                    (() => {
                      switch (type) {
                        case "link":
                          return (
                            link.folderId !== folder.id &&
                            "bg-zinc-100 text-zinc-700"
                          );
                        case "note":
                          return (
                            note.folderId !== folder.id &&
                            "bg-zinc-100 text-zinc-700"
                          );
                        case "image":
                          return (
                            image.folderId !== folder.id &&
                            "bg-zinc-100 text-zinc-700"
                          );
                      }
                    })()
                  )}
                  onClick={() => {
                    switch (type) {
                      case "link":
                        setLink((prev) => ({
                          ...prev,
                          folderId:
                            prev.folderId === folder.id ? null : folder.id,
                        }));

                        break;
                      case "note":
                        setNote((prev) => ({
                          ...prev,
                          folderId:
                            prev.folderId === folder.id ? null : folder.id,
                        }));

                        break;
                      case "image":
                        setImage((prev) => ({
                          ...prev,
                          folderId:
                            prev.folderId === folder.id ? null : folder.id,
                        }));

                        break;
                    }
                  }}
                >
                  {folder.name}
                </Button>
              ))}
            </div>
          </div>
          {type === "link" && (
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
          )}
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
            onClick={addContent}
            disabled={
              type === "link"
                ? !link.url
                : type === "note"
                ? !editor?.getText()
                : type === "image"
                ? !image.url
                : false
            }
          >
            add
          </Button>
        </div>
      </div>
    </main>
  );
}

export default App;
