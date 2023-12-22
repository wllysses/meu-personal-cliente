"use server";

import { prismaClient } from "@/lib/prisma";

export async function sendFeedback({
  client_id,
  comment,
  training_id,
}: {
  client_id: string;
  comment: string;
  training_id: string;
}) {
  try {
    const feedback = await prismaClient.feedback.create({
      data: {
        client_id,
        training_id,
        comment,
      },
    });

    return feedback;
  } catch (err) {
    console.log(err);
  }
}
