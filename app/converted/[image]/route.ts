import { openAsBlob } from "fs";
import { unlink } from "fs/promises";
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
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("File not found", { status: 404 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ image: string }> },
) {
  try {
    const { image } = await params;
    const path = join(process.cwd(), "output", image);
    await unlink(path);
    console.log(`Successfully deleted file: ${image}`);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`Failed to delete file:`, error);
    return new NextResponse("Failed to delete file", { status: 500 });
  }
}
