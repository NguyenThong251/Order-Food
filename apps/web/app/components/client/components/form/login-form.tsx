"use client";

import {
  Button,
  Container,
  Grid,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  useForm,
  FaFacebook,
  FcGoogle,
  Center,
  useState,
  useEffect,
  Notification,
  FiCheckCircle,
  MdOutlineClear,
  bcrypt,
} from "@repo/ui";
import { useRouter } from "next/navigation";
import request from "../../../../utils/request";

const LoginForm = () => {
  const router = useRouter();
  const [notification, setNotification] = useState<{
    title: string;
    message: string;
    color: string;
    icon: JSX.Element;
  } | null>(null);
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const form = useForm({
    initialValues: {
      emailOrPhone: "",
      password: "",
    },

    validate: {
      emailOrPhone: (value) =>
        /^\S+@\S+$/.test(value) || /^\d{10}$/.test(value)
          ? null
          : "Invalid email or phone number",
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        )
          ? null
          : "Password must be 8+ chars, with uppercase, lowercase, number, and special character.",
    },
  });

  const handleSubmit = async (values: {
    emailOrPhone: string;
    password: string;
  }) => {
    try {
      const response = await request.get("/users");
      console.log(response);
      if (response.status === 200 && response.data.length > 0) {
        const user = response.data[0];

        const isPasswordValid = await bcrypt.compare(
          values.password,
          user.password
        );

        if (isPasswordValid) {
          localStorage.setItem("user", JSON.stringify(user));
          router.push("/");
          setNotification({
            title: "Success",
            message: "You have successfully logged in!",
            color: "teal",
            icon: <FiCheckCircle size={18} />,
          });
        } else {
          setNotification({
            title: "Error",
            message: "Invalid email or password. Please try again.",
            color: "red",
            icon: <MdOutlineClear size={18} />,
          });
        }
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      setNotification({
        title: "Error",
        message: "An error occurred during login. Please try again.",
        color: "red",
        icon: <MdOutlineClear size={18} />,
      });
    }
  };

  return (
    <Container size={420} my={40}>
      {notification && (
        <Notification
          icon={notification.icon}
          color={notification.color}
          title={notification.title}
          onClose={() => setNotification(null)}
        >
          {notification.message}
        </Notification>
      )}
      <Center>
        <Title>Login</Title>
      </Center>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email or Phone"
            placeholder="you@mantine.dev or phone"
            required
            {...form.getInputProps("emailOrPhone")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <Button
            fullWidth
            mt="xl"
            type="submit"
            variant="filled"
            color="teal"
            size="md"
          >
            Login
          </Button>
        </form>
        <Grid>
          <Grid.Col span={6}>
            <Button fullWidth variant="filled" color="black" mt="md">
              <FcGoogle size={18} />
            </Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button fullWidth variant="filled" color="black" mt="md">
              <FaFacebook size={18} />
            </Button>
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
};

export default LoginForm;
