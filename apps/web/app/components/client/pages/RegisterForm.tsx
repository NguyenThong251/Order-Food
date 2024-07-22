'use client'
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
} from '@repo/ui';
import { GoogleButton } from '../components/ui/GoogleButton';
import { TwitterButton } from '../components/ui/TwitterButton';


export function RegisterForm(props: PaperProps) {
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  return (
    <Box className='h-screen flex items-center justify-center'>
      <Paper radius="md" p="xl" className='shadow-none sm:shadow-md' {...props}>
        <Box className='flex items-center justify-center'>
          <Image alt='img' w={55} src="http://localhost:3000/_next/image?url=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20220708%2Fourmid%2Fpngtree-fast-food-logo-png-image_5763171.png&w=64&q=75" />
        </Box>
        <Text size="lg" fw={500}>
          Welcome to Order Food, register with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
              radius="md"
            />

            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" size="xs">
              Already have an account? Login
            </Anchor>
          </Group>
            <Button className='w-full' color='red' type="submit" radius="md">
              Register
            </Button>
        </form>
      </Paper>
    </Box>
  );
}
