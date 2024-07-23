"use client";
import {
  TextInput,
  useForm,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Anchor,
  Stack,
  Container,
  Box,
  Image,
  useState,
  FiAlertCircle,
  FiCheckCircle,
  bcrypt,
} from "@repo/ui";

import Link from "next/link";
import { GoogleButton } from "../components/ui/GoogleButton";
import { TwitterButton } from "../components/ui/TwitterButton";
import request from "../../../utils/request";
import Notification from "../../admin/components/ui/Notification";
import { useRouter } from "next/navigation";
import { useUserStore } from "../../../store";

export function LoginForm(props: PaperProps) {
  const { setUser } = useUserStore((state) => state);
  const router = useRouter();
  const [notification, setNotification] = useState<{
    title: string;
    message: string;
    color: string;
    icon: JSX.Element;
  } | null>(null);
  const form = useForm({
    initialValues: {
      phone: "",
      password: "",
    },

    validate: {
      phone: (val) => (/^\d{10}$/.test(val) ? null : "Invalid phone number"),
      password: (val) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          val
        )
          ? null
          : "Password must be 8+ chars, with uppercase, lowercase, number, and special character.",
    },
  });
  const handleSubmit = async (values: typeof form.values) => {
    try {
      const { phone, password } = values;

      const response = await request.get("/users");
      const users = response.data;

      const user = users.find((user: { phone: string }) => user.phone == phone);
      if (!user) {
        setNotification({
          title: "Error",
          message: "User not found.",
          color: "red",
          icon: <FiAlertCircle size={18} />,
        });
        return;
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        setNotification({
          title: "Error",
          message: "Incorrect password.",
          color: "red",
          icon: <FiAlertCircle size={18} />,
        });
        return;
      }

      // Success: Redirect or show success notification
      setNotification({
        title: "Success",
        message: "Login successful!",
        color: "teal",
        icon: <FiCheckCircle size={18} />,
      });
      router.push("/menu/product");
      setUser(user);
    } catch (error) {
      console.error(error);
      setNotification({
        title: "Error",
        message: "An error occurred. Please try again.",
        color: "red",
        icon: <FiAlertCircle size={18} />,
      });
    }
  };
  return (
    <Box className="flex items-center justify-center h-screen">
      <Paper radius="md" p="xl" className="shadow-none sm:shadow-md" {...props}>
        <Box className="flex items-center justify-center">
          <Image
            alt="img"
            w={55}
            src="http://localhost:3000/_next/image?url=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20220708%2Fourmid%2Fpngtree-fast-food-logo-png-image_5763171.png&w=64&q=75"
          />
        </Box>
        <Text size="lg" fw={500}>
          Welcome to Order Food, login with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          {notification && (
            <Notification
              icon={notification.icon}
              message={notification.message}
              color={notification.color}
              title={notification.title}
              onClose={() => setNotification(null)}
            />
          )}
          <Stack>
            <TextInput
              required
              label="Phone number"
              placeholder="Phone number"
              value={form.values.phone}
              onChange={(event) =>
                form.setFieldValue("phone", event.currentTarget.value)
              }
              error={form.errors.phone && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" size="xs">
              <Link href="./signup">Don't have an account? Register</Link>
            </Anchor>
            <Link
              className="text-sm font-medium text-blue-500"
              href="./auth/forgotpass"
            >
              Forgot password
            </Link>
          </Group>
          <Button className="w-full mt-5" color="red" type="submit" radius="md">
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
