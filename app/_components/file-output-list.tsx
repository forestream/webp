"use client";

import Link from "next/link";
import { useFile } from "./file-provider";

export function FileOutputList() {
  const { convertedFiles } = useFile();
  return (
    <ul>
      {convertedFiles.map((file) => (
        <li key={file}>
          <Link href={`/converted/${file}`} download>
            {file}
          </Link>
        </li>
      ))}
    </ul>
  );
}
