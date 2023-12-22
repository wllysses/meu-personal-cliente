"use client";

import { FormEvent, useState } from "react";
import { MessageSquareTextIcon } from "lucide-react";
import { sendFeedback } from "@/actions/send-feedback";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

interface ModalProps {
  clientId: string;
  trainingId: string;
}

export function SendFeedbackModal({ clientId, trainingId }: ModalProps) {
  const router = useRouter();

  const [textarea, setTextarea] = useState("");

  async function handleSendFeedback(e: FormEvent) {
    e.preventDefault();

    const feedback = await sendFeedback({
      client_id: clientId,
      training_id: trainingId,
      comment: textarea,
    });

    if (!feedback) {
      alert("Algo deu errado");
      return;
    }

    alert("Feedback enviado com sucesso!");
    router.refresh();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <MessageSquareTextIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-semibold text-lg border-b pb-2">
            Enviar Feedback
          </DialogTitle>
        </DialogHeader>
        <form
          className="mt-2 flex flex-col gap-2"
          onSubmit={(e) => handleSendFeedback(e)}
        >
          <Textarea
            className="resize-none"
            placeholder="Escreva o seu feedback"
            onChange={(e) => setTextarea(e.target.value)}
          />
          <Button className="w-fit self-end mt-2">Enviar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
