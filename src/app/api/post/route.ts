import { postProps } from "@/Types/types";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.post.findMany({
      // include: {
      //   Author: true,
      // },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        Author: true,
      },
      orderBy: [
        {
          id: "asc",
        },
      ],
    });

    console.log("prisma data", data);

    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error }));
  }
}

export async function POST(req: NextRequest) {
  try {
    const post: postProps = await req.json();

    if (post.title === "") {
      return new NextResponse(
        JSON.stringify({ message: "Don't leave this empty" })
      );
    }

    const data = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        published: post.published,
        Author: {
          connect: {
            id: post.authorId,
          },
        },
        // authorId: post.authorId,
      },
    });

    console.log("data", data);

    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error }));
  }
}

export async function PATCH(req: NextRequest) {
  const url = new URL(req.url);
  const publishedQuery = url.searchParams.get("type");
  const post: postProps = await req.json();

  try {
    if (publishedQuery === "published") {
      const data = await prisma.post.update({
        where: {
          id: post.id,
        },
        data: {
          published: post.published,
        },
      });

      return new NextResponse(JSON.stringify(data));
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error }));
  }
}
