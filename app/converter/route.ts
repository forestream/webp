import { convertImages } from "@/actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  try {
    const filenames = await convertImages(formData);
    return new NextResponse(JSON.stringify(filenames), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new NextResponse(JSON.stringify({ error: message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
