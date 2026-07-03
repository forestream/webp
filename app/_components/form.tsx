"use client";

import { useFile } from "./file-provider";

export function Form(props: React.ComponentProps<"form">) {
  const { files, setConvertedFiles } = useFile();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) return;
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      const response = await fetch("/converter", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Error while fetching converted files");
      }
      const data = await response.json();
      setConvertedFiles(data);
    } catch (error) {
      console.log(error);
    }
  };

  return <form onSubmit={handleSubmit} {...props} />;
}
