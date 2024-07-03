"use client";

import {
  Button,
  Center,
  Container,
  FaFacebook,
  FcGoogle,
  FiCheckCircle,
  Grid,
  MdOutlineClear,
  Notification,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  useEffect,
  useForm,
  useState,
  bcrypt,
} from "@repo/ui";
import request from "../../utils/request";

const SignupForm = () => {
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
  });
  const form = useForm({
    initialValues: {
      emailOrPhone: "",
      username: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      emailOrPhone: (value) =>
        /^\S+@\S+$/.test(value) || /^\d{10}$/.test(value)
          ? null
          : "Invalid email or phone number",
      username: (value) =>
        value.length >= 3
          ? null
          : "Username must be at least 3 characters long",
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        )
          ? null
          : "Password must be 8+ chars, with uppercase, lowercase, number, and special character.",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });

  const handleSubmit = async (values: {
    emailOrPhone: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const hashedPassword = await bcrypt.hash(values.password, 10);
      const response = await request.post("/users", {
        emailOrPhone: values.emailOrPhone,
        username: values.username,
        password: hashedPassword,
      });

      if (response.status === 201) {
        setNotification({
          title: "Success",
          message: "You have successfully signed up!",
          color: "teal",
          icon: <FiCheckCircle size={18} />,
        });
      }
    } catch (error) {
      console.error(error);
      setNotification({
        title: "Error",
        message: "An error occurred during signup. Please try again.",
        color: "red",
        icon: <MdOutlineClear size={18} />,
      });
    }
  };

  return (
    <>
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
        {/* <Notification title="Default notification">
          This is default notification with title and body
        </Notification> */}
        {/* align="center" */}
        <Center>
          <Title>Signup</Title>
        </Center>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Email or Phone"
              placeholder="you@mantine.dev or phone"
              required
              {...form.getInputProps("emailOrPhone")}
            />
            <TextInput
              label="Username"
              placeholder="Your username"
              required
              mt="md"
              {...form.getInputProps("username")}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              {...form.getInputProps("password")}
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              required
              mt="md"
              {...form.getInputProps("confirmPassword")}
            />

            <Button
              fullWidth
              mt="xl"
              type="submit"
              variant="filled"
              color="teal"
              size="md"
            >
              Signup
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
    </>
  );
};

export default SignupForm;
