"use client";

import { Input, Text } from "@devup-ui/react";
import { useFile } from "./file-provider";

export function FileInput() {
  const { setFiles } = useFile();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(e.target.files || []));
  };

  return (
    <Text
      bg="white"
      as="label"
      border="1px solid $blue800"
      borderRadius="4px"
      _hover={{ borderColor: "$blue600", cursor: "pointer" }}
      transition="all 0.1s ease-in-out"
      minH="40px"
      display="flex"
      alignItems="center"
      p="8px"
      role="group"
    >
      <Input
        type="file"
        multiple
        name="image"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        w="0"
        h="0"
        opacity="0"
      />
      <Text
        color="$blue800"
        _groupHover={{ color: "$blue600" }}
        transition="inherit"
        fontSize="14px"
        fontWeight="bold"
      >
        파일 선택
      </Text>
    </Text>
  );
}
