import { Button } from "@mantine/core";
import { FaFacebook } from "react-icons/fa";

const FacebookLoginButton = () => {
  const handleFacebookLogin = () => {
    // Handle Facebook login logic here
  };

  return (
    <Button
      fullWidth
      onClick={handleFacebookLogin}
      variant="filled"
      color="black"
      mt="md"
    >
      <FaFacebook size={18} />
    </Button>
  );
};

export default FacebookLoginButton;
