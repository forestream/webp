import { convertImages } from "@/actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const filenames = await convertImages(formData);
  return new NextResponse(JSON.stringify(filenames), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
