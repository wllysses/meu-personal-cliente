import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/ui/header";
import { ViewTrainingModal } from "./components/view-training-modal";
import { SendFeedbackModal } from "./components/send-feedback-modal";

export default async function MyTrainings() {
  const session = await getServerSession(nextAuthOptions);

  const trainings = await prismaClient.training.findMany({
    where: {
      client_id: session?.user.id,
    },
    include: {
      client: true,
      Exercise: true,
    },
  });

  return (
    <>
      <Header />
      <main className="mt-8 w-full container mx-auto">
        <h2 className="font-semibold text-xl">Meus treinos</h2>
        <div className="mt-4 w-full flex flex-col gap-4">
          {!trainings.length && (
            <span className="text-muted-foreground text-sm">
              Nenhum treino cadastrado
            </span>
          )}
          {trainings &&
            trainings.map((training) => (
              <Card
                key={training.id}
                className="p-4 w-full flex items-center justify-between"
              >
                <span className="font-semibold">
                  {training.name} ({training.client.name})
                </span>
                <div className="flex items-center gap-2">
                  <ViewTrainingModal exercises={training.Exercise} />
                  <SendFeedbackModal
                    clientId={session?.user.id!}
                    trainingId={training.id}
                  />
                </div>
              </Card>
            ))}
        </div>
      </main>
    </>
  );
}
