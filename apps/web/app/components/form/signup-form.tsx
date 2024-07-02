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

const SignupForm = () => {
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

  const handleSubmit = (values: {
    emailOrPhone: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    // Handle form submission logic
    console.log("Email or Phone:", values.emailOrPhone);
    console.log("Username:", values.username);
    console.log("Password:", values.password);
    console.log("Confirm Password:", values.confirmPassword);
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
          <ButtonForm variant="filled" type="submit" mt="md">
            Signup
          </ButtonForm>
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

export default SignupForm;
