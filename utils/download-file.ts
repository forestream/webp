"use client";

export async function downloadFile(fileName: string) {
  try {
    // 파일 다운로드
    const response = await fetch(`/converted/${fileName}`);
    if (!response.ok) throw new Error("Download failed");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    return fileName;
  } catch (error) {
    console.error("Download error:", error);
    throw error;
  }
}
