"use server";

import { exec } from "child_process";
import path, { join } from "path";
import { mkdir, writeFile } from "fs/promises";

export async function getImage(formData: FormData) {
  console.log("start");
  const images = formData.get("image") as File;
  if (!images) return;

  // Create directories
  const uploadsDir = join(process.cwd(), "uploads");
  const outputDir = join(process.cwd(), "output");
  await mkdir(uploadsDir, { recursive: true });
  await mkdir(outputDir, { recursive: true });

  const arrayBuffer = await images.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Generate unique filename
  const timestamp = Date.now();
  const originalName = images.name;
  const filename = `${timestamp}-${originalName}`;
  const filepath = join(uploadsDir, filename);
  await writeFile(filepath, buffer);

  // Convert to WebP if it's an image
  const extension = originalName.split(".").pop();
  if (["jpg", "jpeg", "png"].includes(extension?.toLowerCase() || "")) {
    const webpPath = join(outputDir, `${filename}.webp`);
    const cwebpPath = join(process.cwd(), "converter", "bin", "cwebp.exe");

    exec(
      `"${cwebpPath}" -q 80 "${filepath}" -o "${webpPath}"`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(error);
        }
        console.log(stdout);
        console.log(stderr);
      },
    );
  }

  console.log("end");
}
