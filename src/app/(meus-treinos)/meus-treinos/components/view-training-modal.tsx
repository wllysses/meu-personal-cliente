"use client";

import { FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Exercise } from "@prisma/client";

interface ModalProps {
  exercises: Exercise[];
}

export function ViewTrainingModal({ exercises }: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Visualizar exercícios">
          <FolderOpen />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-semibold border-b pb-2 text-lg">
            Exercícios do treino
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-4">
          {!exercises.length && <span>Nenhum exercício cadastrado</span>}
          {exercises &&
            exercises.map((exercise) => (
              <Card key={exercise.id} className="p-4">
                <div>
                  <h4 className="font-semibold">{exercise.name}</h4>
                  <p className="text-muted-foreground text-sm">
                    {exercise.description}
                  </p>
                </div>
                <div className="mt-2 w-full flex items-center gap-3">
                  <span className="text-xs">
                    Repetições: {exercise.repetitions}
                  </span>{" "}
                  |<span className="text-xs">Carga: {exercise.weight}kg</span> |
                  <span className="text-xs">Séries: {exercise.series}</span> |
                  <span className="text-xs">
                    Descanso: {exercise.pause_time}s
                  </span>
                </div>
              </Card>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
