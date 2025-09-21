"use client";

import { useFile } from "./FileProvider";

export function FileList() {
  const { files } = useFile();
  return (
    <ul>
      {files.map((file) => (
        <li key={file.name}>{file.name}</li>
      ))}
    </ul>
  );
}
