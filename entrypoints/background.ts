export default defineBackground(() => {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "addLink",
      title: "Add link",
      contexts: ["all"],
    });

    chrome.contextMenus.create({
      id: "addNote",
      title: "Add note",
      contexts: ["selection"],
    });

    chrome.contextMenus.create({
      id: "addImage",
      title: "Add image",
      contexts: ["image"],
    });
  });

  chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (!tab?.id) return;

    const currentTab = await chrome.tabs.get(tab.id);

    const createPopup = async (searchParams: URLSearchParams) => {
      const url = "popup.html?" + searchParams.toString();

      await chrome.windows.create({
        url,
        type: "popup",
        width: 384,
        height: 600,
      });
    };

    if (info.menuItemId === "addLink") {
      const params = new URLSearchParams({
        type: "link",
        url: currentTab.url || "",
        title: currentTab.title || "",
      });

      await createPopup(params);
    }

    if (info.menuItemId === "addNote") {
      try {
        const result = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            const selection = window.getSelection();
            const container = document.createElement("div");

            if (selection && selection.rangeCount > 0) {
              const range = selection.getRangeAt(0);

              container.appendChild(range.cloneContents());

              return container.innerHTML;
            }

            return "";
          },
        });

        const params = new URLSearchParams({
          type: "note",
          content: result[0]?.result || info.selectionText || "",
          url: currentTab.url || "",
        });

        await createPopup(params);
      } catch (error) {
        console.error("Failed to get selected HTML:", error);

        const params = new URLSearchParams({
          type: "note",
          content: info.selectionText || "",
          url: currentTab.url || "",
        });

        await createPopup(params);
      }
    }

    if (info.menuItemId === "addImage" && info.srcUrl) {
      try {
        const params = new URLSearchParams({
          type: "image",
          url: info.srcUrl,
        });

        await createPopup(params);
      } catch (error) {
        console.error("Failed to get image data:", error);
      }
    }
  });
});
