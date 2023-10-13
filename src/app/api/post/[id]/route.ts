import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = parseInt(params.id);

    const data = await prisma.post.findUnique({
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        Author: true,
      },
      where: {
        id: postId,
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
    const postId = parseInt(params.id);
    const post = await req.json();

    const data = await prisma.post.update({
      data: {
        title: post.title,
        content: post?.content,
        published: post?.published,
        Author: {
          connect: {
            id: post.authorId,
          },
        },
      },
      where: {
        id: postId,
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
    const postId = parseInt(params.id);

    const data = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error }));
  }
}
