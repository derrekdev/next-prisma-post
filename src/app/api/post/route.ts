import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.post.findMany();

    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error }));
  }
}

type postProps = {
  title: string;
};

export async function POST(req: NextRequest) {
  try {
    const post: any = await req.json();

    console.log("post");
    console.log(post.title);

    if (post.title === "") {
      return new NextResponse(
        JSON.stringify({ message: "Don't leave this empty" })
      );
    }

    const data = await prisma.post.create({
      data: {
        title: post.title,
      },
    });

    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error }));
  }
}
