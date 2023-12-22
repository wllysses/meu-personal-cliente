"use client";

import { DumbbellIcon } from "lucide-react";
import { Button } from "./button";
import { signOut } from "next-auth/react";

export function Header() {
  async function handleSignOut() {
    await signOut();
  }

  return (
    <header className="w-full flex items-center justify-between p-4 container mx-auto">
      <div className="flex items-center gap-2">
        <DumbbellIcon size={25} />
        <h1 className="text-2xl font-bold">
          MEU<span className="text-primary">PERSONAL</span>
        </h1>
      </div>
      <Button variant="destructive" onClick={handleSignOut}>
        Sair
      </Button>
    </header>
  );
}
