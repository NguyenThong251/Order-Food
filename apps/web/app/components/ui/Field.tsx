import { Button, TextInput } from "@mantine/core";
// import { useField } from "@mantine/form";

const Field = () => {
  return (
    <>
      <TextInput withAsterisk label="Email" placeholder="your@email.com" />
      {/* key={form.key("email")}
        {...form.getInputProps("email")} */}
    </>
  );
};

export default Field;
