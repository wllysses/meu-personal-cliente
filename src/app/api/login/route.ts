import { NextResponse } from "next/server";
import { prismaClient } from "@/lib/prisma";

export async function POST(request: Request) {
  const req = await request.json();

  const { access_code } = req;

  const client = await prismaClient.client.findUnique({
    where: {
      id: access_code,
    },
  });

  if (!client) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: "Nenhum usuário encontrado",
      }),
      { status: 400 }
    );
  }

  return new NextResponse(
    JSON.stringify({
      message: "Usuário encontrado com sucesso",
      user: client,
    }),
    { status: 200 }
  );
}
