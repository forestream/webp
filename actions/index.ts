"use server";

import { exec } from "child_process";
import { join } from "path";
import { mkdir, writeFile } from "fs/promises";
import { logError } from "@/utils/logger";
import os from "os";

export async function convertImages(formData: FormData) {
  const images = formData.getAll("image") as File[];
  const quality = formData.get("quality") ?? "80";
  // @todo error handling
  if (images.length === 0 || isNaN(Number(quality))) return;

  const filenames: string[] = Array.from({ length: images.length });

  // Create directories
  const uploadsDir = join(process.cwd(), "uploads");
  const outputDir = join(process.cwd(), "output");
  await mkdir(uploadsDir, { recursive: true });
  await mkdir(outputDir, { recursive: true });

  await Promise.all(
    images.map(
      (image, index) =>
        new Promise(async (resolve) => {
          const arrayBuffer = await image.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          // Generate unique filename
          const timestamp = Date.now();
          const originalName = image.name;
          const stampedOriginalName = `${timestamp}-${originalName}`;
          const filepath = join(uploadsDir, stampedOriginalName);
          await writeFile(filepath, buffer);

          // Convert to WebP if it's an image
          const nameArr = stampedOriginalName.split(".");
          const filename = nameArr.slice(0, -1).join(".");
          const extension = nameArr.at(-1);
          if (!["jpg", "jpeg", "png"].includes(extension?.toLowerCase() || ""))
            return;

          const webpName = `${filename}.webp`;
          const webpPath = join(outputDir, webpName);
          const cwebpPath = join(
            process.cwd(),
            "converter",
            "bin",
            "cwebp.exe",
          );

          const platform = os.platform();
          if (platform === "win32") {
            exec(
              `"${cwebpPath}" -q ${quality} "${filepath}" -o "${webpPath}"`,
              async (error, stdout, stderr) => {
                if (error) {
                  await logError(
                    error,
                    `Image conversion failed: ${originalName}`,
                  );
                  return;
                }
                console.log(stdout);
                console.log(stderr);

                filenames[index] = webpName;
                resolve(void 0);
              },
            );
          } else if (platform === "linux") {
            exec(
              `wine "${cwebpPath}" -q ${quality} "${filepath}" -o "${webpPath}"`,
              async (error, stdout, stderr) => {
                if (error) {
                  await logError(
                    error,
                    `Image conversion failed: ${originalName}`,
                  );
                  return;
                }
                console.log(stdout);
                console.log(stderr);

                filenames[index] = webpName;
                resolve(void 0);
              },
            );
          } else {
            console.error(`Unsupported platform: ${platform}`);
          }
        }),
    ),
  );

  return filenames;
}
