import { resetCss } from "@devup-ui/reset-css";
import type { Metadata } from "next";
import { globalCss } from "@devup-ui/react";

resetCss();

globalCss({
  html: {
    // @ts-expect-error - interpolateSize is not supported in devup-ui yet
    interpolateSize: "allow-keywords",
  },
  body: {
    bg: "var(--slate50)",
  },
  ul: {
    p: "0",
  },
  "li,span,a,p,h1,h2,h3,h4,h5,h6": {
    color: "var(--blue800)",
  },
});

export const metadata: Metadata = {
  title: "webp converter",
  description: "convert images to webp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
