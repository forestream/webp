import { openAsBlob } from "fs";
import { NextResponse } from "next/server";
import { join } from "path";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ image: string }> },
) {
  try {
    const { image } = await params;
    const path = join(process.cwd(), "output", image);
    const webpBuffer = await openAsBlob(path);
    return new NextResponse(webpBuffer, {
      headers: {
        "Content-Type": "image/webp",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("File not found", { status: 404 });
  }
}
