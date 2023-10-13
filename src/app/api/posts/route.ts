import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        Author: true,
      },
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
