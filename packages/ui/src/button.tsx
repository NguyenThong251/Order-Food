"use client";

import { ReactNode } from "react";
import { Button } from "@mantine/core";

interface ButtonProps {
  children?: ReactNode;
  variant?: "filled" | "outline" | "light" | "default" | "subtle";
}

export const ButtonM = ({ children, variant }: ButtonProps) => {
  return (
    <Button variant={variant} color="red" size="md">
      {children}
    </Button>
  );
};
