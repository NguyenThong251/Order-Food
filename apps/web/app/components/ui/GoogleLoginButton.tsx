import { Button } from "@mantine/core";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    // Handle Google login logic here
  };

  return (
    <Button
      fullWidth
      onClick={handleGoogleLogin}
      variant="filled"
      color="black"
      mt="md"
    >
      <FcGoogle size={18} />
    </Button>
  );
};

export default GoogleLoginButton;
