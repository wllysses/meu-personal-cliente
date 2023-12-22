"use client";

import { FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { DumbbellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement | null>(null);

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();

    if (!inputRef.current?.value) {
      alert("Preencha o campo.");
      return;
    }

    const response = await signIn("credentials", {
      access_code: inputRef.current?.value,
      redirect: false,
    });

    if (response?.ok) {
      router.replace("/meus-treinos");
    }
  }

  return (
    <main className="h-screen w-full flex items-center justify-center flex-col">
      <header className="fixed top-6 right-6">
        <ThemeToggle />
      </header>
      <div className="max-w-lg w-full flex items-center flex-col p-4">
        <div className="w-full text-center">
          <h1 className="uppercase font-bold text-5xl flex items-center justify-center gap-2 max-[460px]:text-4xl">
            <DumbbellIcon size={30} />
            Meu<span className="text-primary">personal</span>
          </h1>
          <p className="text-muted-foreground text-sm max-[460px]:text-xs">
            Acesse seus treinos personalizados e acompanhe os resultados
          </p>
        </div>
        <form className="mt-4 w-full p-4" onSubmit={(e) => handleSignIn(e)}>
          <div className="flex flex-col">
            <label className="font-regular">Código de acesso</label>
            <Input
              type="text"
              id="access_code"
              placeholder="ex: 889asda879273"
              ref={inputRef}
            />
          </div>
          <Button type="submit" className="mt-4 w-full">
            Acessar
          </Button>
        </form>
      </div>
      <span className="text-muted-foreground text-sm fixed bottom-6">
        Módulo Cliente
      </span>
    </main>
  );
}
