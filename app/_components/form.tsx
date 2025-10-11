"use client";

import { useFile } from "./file-provider";

export function Form(props: React.ComponentProps<"form">) {
  const { files, setConvertedFiles } = useFile();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("image", file);
    });
    const response = await fetch("/converter", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setConvertedFiles(data);
  };
  return <form onSubmit={handleSubmit} {...props} />;
}
