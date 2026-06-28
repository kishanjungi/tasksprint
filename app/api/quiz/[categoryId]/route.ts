import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  const { categoryId } = await params;

  const questions = await prisma.question.findMany({
    where: {
      categoryId,
    },
    take: 10,
  });

  return NextResponse.json(questions);
}