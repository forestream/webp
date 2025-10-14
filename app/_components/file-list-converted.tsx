"use client";

import { FileList } from "./file-list";
import { ComponentProps } from "react";
import Link from "next/link";

export function FileListConverted({
  contextValueKey,
}: Pick<ComponentProps<typeof FileList>, "contextValueKey">) {
  return (
    <FileList
      contextValueKey={contextValueKey}
      renderChild={({ file, key }) => (
        <Link href={`/converted/${file}`} download>
          {file}
        </Link>
      )}
    />
  );
}
