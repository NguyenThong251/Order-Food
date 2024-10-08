import { Head, Html, Main, NextScript } from "next/document";
// import { ColorSchemeScript } from "@mantine/core";
import { ColorSchemeScript } from "@repo/ui";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
