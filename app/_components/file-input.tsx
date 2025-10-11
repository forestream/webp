"use client";

import { Input } from "@devup-ui/react";
import { useFile } from "./file-provider";

export function FileInput() {
  const { setFiles } = useFile();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(e.target.files || []));
  };

  return (
    <Input
      type="file"
      multiple
      name="image"
      accept="image/png, image/jpeg"
      onChange={handleChange}
    />
  );
}
