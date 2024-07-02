"use client";

import {
  Container,
  Grid,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import ButtonForm from "../ui/ButtonFrom";
import { useForm } from "@mantine/form";
import GoogleLoginButton from "../ui/GoogleLoginButton";
import FacebookLoginButton from "../ui/FacebookLoginButton";

const LoginForm = () => {
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

  const handleSubmit = (values: { emailOrPhone: string; password: string }) => {
    // Handle form submission logic
    console.log("Email:", values.emailOrPhone);
    console.log("Password:", values.password);
  };

  return (
    <Container size={420} my={40}>
      <Title align="center">Signup</Title>
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
          <ButtonForm variant="filled">Login</ButtonForm>
        </form>
        <Grid>
          <Grid.Col span={6}>
            <GoogleLoginButton />
          </Grid.Col>
          <Grid.Col span={6}>
            <FacebookLoginButton />
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
};

export default LoginForm;
