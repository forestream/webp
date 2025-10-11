"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

const FileContext = createContext<{
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  convertedFiles: string[];
  setConvertedFiles: Dispatch<SetStateAction<string[]>>;
} | null>(null);

export function useFile() {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFile must be used within a FileProvider");
  }
  return context;
}

export function FileProvider({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<File[]>([]);
  const [convertedFiles, setConvertedFiles] = useState<string[]>([]);
  return (
    <FileContext.Provider
      value={{ files, setFiles, convertedFiles, setConvertedFiles }}
    >
      {children}
    </FileContext.Provider>
  );
}
