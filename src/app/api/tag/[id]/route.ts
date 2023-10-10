import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tagId = parseInt(params.id);

    const data = await prisma.tag.findUnique({
      where: {
        id: tagId,
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
    const tagId = parseInt(params.id);
    const tag = await req.json();

    const data = await prisma.tag.update({
      data: {
        tagName: tag.tagName,
      },
      where: {
        id: tagId,
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
    const tagId = parseInt(params.id);

    const data = await prisma.tag.delete({
      where: {
        id: tagId,
      },
    });

    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error }));
  }
}
