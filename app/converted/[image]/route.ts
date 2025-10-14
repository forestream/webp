import { createReadStream, existsSync, unlink } from "fs";
import { NextResponse } from "next/server";
import { join } from "path";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ image: string }> },
) {
  try {
    const { image } = await params;
    const path = join(process.cwd(), "output", image);

    // 파일 존재 여부 확인
    if (!existsSync(path)) {
      return new NextResponse("File not found", { status: 404 });
    }

    // 파일 스트림 생성
    const fileStream = createReadStream(path);
    const chunks: Buffer[] = [];

    // 스트림에서 데이터 읽기
    for await (const chunk of fileStream) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    // 응답을 반환한 후 파일 삭제
    // queueMicrotask를 사용하여 응답이 완전히 전송된 후 삭제
    queueMicrotask(() => {
      unlink(path, (err) => {
        if (err) {
          console.error(`Failed to delete file ${image}:`, err);
        } else {
          console.log(`Successfully deleted file: ${image}`);
        }
      });
    });

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
