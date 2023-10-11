import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authorId = parseInt(params.id);

    const data = await prisma.author.findUnique({
      where: {
        id: authorId,
      },
    });

    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error }));
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authorId = parseInt(params.id);
    const author = await req.json();

    const data = await prisma.author.update({
      data: {
        name: author.name,
      },
      where: {
        id: authorId,
      },
    });

    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error }));
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authorId = parseInt(params.id);

    const data = await prisma.author.delete({
      where: {
        id: authorId,
      },
    });

    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error }));
  }
}
