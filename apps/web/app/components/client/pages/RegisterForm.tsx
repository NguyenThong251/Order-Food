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
  Checkbox,
  Anchor,
  Stack,
  Container,
  Box,
  Image,
  bcrypt,
  FiCheckCircle,
  useState,
  FiAlertCircle,
  Swal,
} from "@repo/ui";
import { GoogleButton } from "../components/ui/GoogleButton";
import { TwitterButton } from "../components/ui/TwitterButton";
import Link from "next/link";
import request from "../../../utils/request";
import Notification from "../components/ui/Notification";
import { User } from "../../../interface";
import { useRouter } from "next/navigation";

export function RegisterForm(props: PaperProps) {
  const router = useRouter();
  const [notification, setNotification] = useState<{
    title: string;
    message: string;
    color: string;
    icon: JSX.Element;
  } | null>(null);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      point: 0,
      isAdmin: 0,
    },

    validate: {
      name: (val) => (val.trim() === "" ? "Name cannot be empty" : null),
      phone: (val) => (/^\d{10}$/.test(val) ? null : "Invalid phone number"),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
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
      const hashPassword = await bcrypt.hash(values.password, 10);
      const data = {
        email: values.email,
        username: values.name,
        phone: values.phone,
        password: hashPassword,
        point: values.point,
        isAdmin: values.isAdmin,
      };
      const getdata = await request.get("/users");
      const existingUser = getdata.data.find(
        (user: User) =>
          user.phone === values.phone || user.email === values.email
      );
      if (existingUser) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          title: "Email or phone number already exists.",
        });
        return;
      }
      // console.log(existingUser);

      const res = await request.post("/users", data);
      if (res.status === 201) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Successfully signed up!",
        });
        router.push("/auth/login");
        form.reset();
      }
    } catch (err) {
      console.log(err);
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
          Welcome to Order Food, register with
        </Text>
        <form className="mt-3" onSubmit={form.onSubmit(handleSubmit)}>
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
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              error={form.errors.name && "Invalid name"}
              radius="md"
            />

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />
            <TextInput
              required
              label="Phone"
              placeholder="Phone Number"
              value={form.values.phone}
              onChange={(event) =>
                form.setFieldValue("phone", event.currentTarget.value)
              }
              error={form.errors.phone && "Invalid phone"}
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

          <Group justify="space-between" mt="lg">
            <Anchor component="button" type="button" c="dimmed" size="xs">
              <Link href="./login">Already have an account? Login</Link>
            </Anchor>
          </Group>
          <Button className="w-full mt-5" color="red" type="submit" radius="md">
            Register
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
