import { Button } from "@mantine/core";
import { ReactNode } from "react";
interface ButtonProps {
  children?: ReactNode;
  variant?: "filled" | "outline" | "light" | "default" | "subtle";
}
const ButtonForm = ({ children, variant }: ButtonProps) => {
  return (
    <Button
      fullWidth
      mt="xl"
      type="submit"
      variant={variant}
      color="teal"
      size="md"
    >
      {children}
    </Button>
  );
};

export default ButtonForm;
