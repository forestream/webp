"use client";

import { Box, Text } from "@devup-ui/react";
import { useFile } from "./file-provider";
import clsx from "clsx";

export function FileList({
  contextValueKey,
  renderChild,
}: {
  contextValueKey: Extract<
    keyof ReturnType<typeof useFile>,
    "files" | "convertedFiles"
  >;
  renderChild?: (props: { file: string; key: string }) => React.ReactNode;
}) {
  const contextValue = useFile();
  const files = contextValue[contextValueKey].map((file) =>
    file instanceof File ? file.name : file,
  );
  return (
    <Box
      as="ul"
      listStyle="none"
      border="1px solid $blue800"
      borderRadius="4px"
      transition="height 0.5s ease-in-out"
      h="0"
      selectors={{
        "&.expanded": {
          h: "calc-size(auto, size)",
        },
      }}
      pl="8px"
      bg="white"
      overflow="hidden"
      className={clsx(files.length > 0 && "expanded")}
    >
      {files.map((file) => (
        <Text as="li" key={file} my="4px">
          {renderChild ? renderChild({ file, key: file }) : file}
        </Text>
      ))}
    </Box>
  );
}
