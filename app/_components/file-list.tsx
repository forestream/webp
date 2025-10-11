"use client";

import { Box, Text } from "@devup-ui/react";
import { useFile } from "./file-provider";
import clsx from "clsx";

export function FileList() {
  const { files } = useFile();
  return (
    <Box
      as="ul"
      listStyle="none"
      border="1px solid $blue800"
      borderRadius="4px"
      transition="height 1s ease-in-out"
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
        <Text as="li" key={file.name} my="4px">
          {file.name}
        </Text>
      ))}
    </Box>
  );
}
