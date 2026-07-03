"use client";
import { Box } from "@devup-ui/react";
import { ComponentProps, useCallback } from "react";
import { useFile } from "./file-provider";

export function FileDropZone(props: ComponentProps<typeof Box<"div">>) {
  const { setFiles } = useFile();

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setFiles(Array.from(e.dataTransfer?.files));
    },
    [setFiles],
  );

  return <Box onDragOver={handleDragOver} onDrop={handleDrop} {...props} />;
}
