import { authorProps } from "@/Types/types";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.author.findMany();

    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error }));
  }
}

export async function POST(req: NextRequest) {
  try {
    const author: authorProps = await req.json();

    if (author.name === "") {
      return new NextResponse(
        JSON.stringify({ status: 500, message: "Don't leave this empty" })
      );
    }

    const data = await prisma.author.create({
      data: { name: author.name },
    });

    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    console.log("error", error);
    return new NextResponse(JSON.stringify({ status: 500, error: error }));
  }
}
