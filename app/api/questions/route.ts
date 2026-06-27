    import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createQuestionSchema } from "@/features/questions/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result =
      createQuestionSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    const question =
      await prisma.question.create({
        data: result.data,
      });

    return NextResponse.json({
      success: true,
      question,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const questions =
    await prisma.question.findMany({
      include: {
        category: true,
      },
    });

  return NextResponse.json(questions);
}