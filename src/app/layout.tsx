import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppBar position="static" sx={{ backgroundColor: "#AFD6C4" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "black" }}>
              News
            </Typography>
          </Toolbar>
        </AppBar>
        {children}
      </body>
    </html>
  );
}