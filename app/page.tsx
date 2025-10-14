"use client";

import { Form } from "./_components/form";
import { FileProvider } from "./_components/file-provider";
import { FileInput } from "./_components/file-input";
import { FileList } from "./_components/file-list";
import { Button } from "@devup-ui/components";
import { VStack, Box } from "@devup-ui/react";
import { FileListConverted } from "./_components/file-list-converted";

export default function Home() {
  return (
    <Box as="main" p="4" minH="100dvh">
      <FileProvider>
        <Form>
          <VStack maxW="50%" mx="auto">
            <FileInput />
            <FileList contextValueKey="files" />
            <Button variant="primary" type="submit">
              변환
            </Button>
            <FileListConverted contextValueKey="convertedFiles" />
          </VStack>
        </Form>
      </FileProvider>
    </Box>
  );
}
