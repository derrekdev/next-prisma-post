import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.post.findMany({
      orderBy: [
        {
          id: "asc",
        },
      ],
    });

    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error }));
  }
}

type postProps = {
  id?: number;
  title: string;
  content?: string;
  published?: boolean;
};

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
        content: post?.content,
        published: post?.published,
      },
    });

    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error }));
  }
}

export async function PUT(req: NextRequest) {
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

  // return new NextResponse(JSON.stringify({ message: "update test" }));
}
