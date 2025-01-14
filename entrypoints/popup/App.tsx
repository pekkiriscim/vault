import vault from "@/assets/vault.svg";

import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

function App() {
  return (
    <main className="w-96">
      <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-zinc-200">
        <div className="flex flex-col gap-y-0.5">
          <h1 className="text-base font-medium text-zinc-900">Add link</h1>
          <p className="text-sm text-zinc-600">mustafa’s vault</p>
        </div>
        <img src={vault} alt="vault" />
      </div>
      <div className="flex flex-col gap-y-6 px-5 pt-4 pb-5">
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col gap-y-1">
            <Label htmlFor="title">title</Label>
            <Input placeholder="link title" id="title" />
          </div>
          <div className="flex flex-col gap-y-1">
            <Label htmlFor="url">url</Label>
            <Input placeholder="link url" id="url" />
          </div>
        </div>
        <div className="flex gap-x-2">
          <Button variant="secondary" className="w-full">
            cancel
          </Button>
          <Button variant="primary" className="w-full">
            add
          </Button>
        </div>
      </div>
    </main>
  );
}

export default App;
