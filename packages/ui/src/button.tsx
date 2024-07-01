"use client";

import { ReactNode } from "react";
import { Button } from "@mantine/core";
interface ButtonProps {
  children: ReactNode;
  // className?: string;
  variant: "filled" | "outline" | "light" | "default" | "subtle";
}

export const ButtonMain = ({ children, variant }: ButtonProps) => {
  return (
    // <button
    //   className={className}
    //   onClick={() => alert(`Hello from your ${appName} app!`)}
    // >
    //   {children}
    // </button>
    <Button variant={variant} color="red" size="md">
      {children}
    </Button>
  );
};
