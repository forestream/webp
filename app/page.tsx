"use client";

import { Form } from "./_components/form";
import { FileProvider } from "./_components/file-provider";
import { FileInput } from "./_components/file-input";
import { FileList } from "./_components/file-list";
import { Button } from "@devup-ui/components";
import { VStack, Box, Text, Flex } from "@devup-ui/react";

import { FileListConverted } from "./_components/file-list-converted";
import { QualityProvider } from "./_components/quality-provider";
import { QualityRange } from "./_components/quality-range";
import { QualityValue } from "./_components/quality-value";

export default function Home() {
  return (
    <Box as="main" p="4" minH="100dvh">
      <FileProvider>
        <Form>
          <VStack maxW="50%" mx="auto" gap="4">
            <FileInput />
            <FileList contextValueKey="files" />
            <QualityProvider>
              <Flex gap="2" alignItems="center">
                <Text whiteSpace="nowrap">품질</Text>
                <QualityRange />
                <Text whiteSpace="nowrap">
                  <QualityValue />
                </Text>
              </Flex>
            </QualityProvider>
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
