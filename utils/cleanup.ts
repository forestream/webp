import { existsSync } from "fs";
import { mkdir, readdir, stat, unlink } from "fs/promises";
import { join } from "path";

/**
 * output 폴더의 모든 파일을 삭제합니다.
 */
export async function cleanupFolder(targetDir: "output" | "uploads") {
  const { existsSync } = await import("fs");
  const { mkdir, readdir, stat, unlink } = await import("fs/promises");
  const { join } = await import("path");

  try {
    const dir = join(process.cwd(), targetDir);

    // output 폴더가 없으면 생성
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
      console.log("Output directory created");
      return 0;
    }

    const files = await readdir(dir);

    let deletedCount = 0;
    for (const file of files) {
      try {
        const filePath = join(dir, file);
        const fileStat = await stat(filePath);

        if (fileStat.isFile()) {
          await unlink(filePath);
          deletedCount++;
          console.log(`Deleted: ${file}`);
        }
      } catch (error) {
        console.error(`Failed to delete ${file}:`, error);
      }
    }

    console.log(`Cleanup completed. Total files deleted: ${deletedCount}`);
    return deletedCount;
  } catch (error) {
    console.error("Cleanup failed:", error);
    return 0;
  }
}

/**
 * 특정 시간(분) 이상 된 파일만 삭제합니다.
 */
export async function cleanupOldFiles(
  targetDir: "output" | "uploads",
  maxAgeMinutes: number = 30,
) {
  try {
    const dir = join(process.cwd(), targetDir);

    // output 폴더가 없으면 생성
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
      console.log("Output directory created");
      return 0;
    }

    const files = await readdir(dir);
    const now = Date.now();
    const maxAge = maxAgeMinutes * 60 * 1000; // 분을 밀리초로 변환

    let deletedCount = 0;
    for (const file of files) {
      try {
        const filePath = join(dir, file);
        const fileStat = await stat(filePath);

        if (fileStat.isFile()) {
          const fileAge = now - fileStat.mtimeMs;

          if (fileAge > maxAge) {
            await unlink(filePath);
            deletedCount++;
            console.log(
              `Deleted old file: ${file} (age: ${Math.round(fileAge / 60000)} minutes)`,
            );
          }
        }
      } catch (error) {
        console.error(`Failed to delete ${file}:`, error);
      }
    }

    console.log(
      `Old files cleanup completed. Total files deleted: ${deletedCount}`,
    );
    return deletedCount;
  } catch (error) {
    console.error("Old files cleanup failed:", error);
    return 0;
  }
}
