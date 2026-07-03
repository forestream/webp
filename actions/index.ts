"use server";

import { exec } from "child_process";
import { join } from "path";
import { mkdir, unlink, writeFile } from "fs/promises";
import { logError } from "@/utils/logger";
import os from "os";

export async function convertImages(formData: FormData) {
  const images = formData.getAll("image") as File[];
  const quality = formData.get("quality") ?? "80";
  if (images.length === 0 || isNaN(Number(quality))) {
    throw new Error("Invalid files or quality");
  }

  const filenames: string[] = Array.from({ length: images.length });

  // Create directories
  const uploadsDir = join(process.cwd(), "uploads");
  const outputDir = join(process.cwd(), "output");
  await mkdir(uploadsDir, { recursive: true });
  await mkdir(outputDir, { recursive: true });

  const results = await Promise.all(
    images.map(
      (image, index) =>
        new Promise(async (resolve, reject) => {
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
          if (
            !["jpg", "jpeg", "png"].includes(extension?.toLowerCase() || "")
          ) {
            await unlink(filepath);
            return reject(new Error("Unsupported file type"));
          }

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
                  return reject(error);
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
                  return reject(error);
                }
                console.log(stdout);
                console.log(stderr);

                filenames[index] = webpName;
                resolve(void 0);
              },
            );
          } else {
            return reject(new Error(`Unsupported platform: ${platform}`));
          }
        }),
    ),
  );

  if (results.some((result) => result instanceof Error)) {
    filenames.forEach(async (fileName) => {
      await unlink(join(outputDir, fileName));
    });
    throw results.find((result) => result instanceof Error);
  }

  return filenames;
}
