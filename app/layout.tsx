"use client";

import { Providers } from "./providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { CardBody, Card } from "@nextui-org/react";
import SimpleNavbar from "./components/SimpleNavbar";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} dark text-foreground bg-background`}>
        <Providers>
          <SimpleNavbar />
          <Card className="m-5">
            <CardBody>{children}</CardBody>
          </Card>
        </Providers>
      </body>
    </html>
  );
}
