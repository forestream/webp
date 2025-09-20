"use server";

import { mkdir } from "fs/promises";

export function createDirectory(path: string) {
  return mkdir(path, { recursive: true });
}
