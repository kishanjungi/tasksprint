import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCategorySchema } from "@/features/category/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result =
      createCategorySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    const category =
      await prisma.category.create({
        data: result.data,
      });

    return NextResponse.json({
      success: true,
      category,
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
  const categories =
    await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  return NextResponse.json(categories);
}