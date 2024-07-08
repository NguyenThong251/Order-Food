import {
  AiOutlinePlus,
  Button,
  rem,
  useDisclosure,
  Modal,
  TextInput,
  Grid,
  Text,
  Textarea,
  Group,
  FileButton,
  useState,
  useForm,
  useEffect,
  NumberInput,
  FiCheckCircle,
  MdOutlineClear,
  Box,
  Notification,
} from "@repo/ui";
import request from "../../../utils/request";
interface ProductFormValues {
  name: string;
  price_old: number;
  price: number;
  category_id: number;
  description: string;
  thumbnail: string;
}
const ModalAddProduct = () => {
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
  const [files, setFiles] = useState<File[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      name: "",
      price_old: 0,
      price: 0,
      description: "",
      category_id: 0,
      thumbnail: "",
    },
  });
  const handleCreatePro = async (values: ProductFormValues) => {
    const { name, price_old, price, description, category_id, thumbnail } =
      values;
    const newProduct = {
      id: Date.now(),
      name,
      // thumbnail: files.map((file) => URL.createObjectURL(file)),
      thumbnail: thumbnail.split(",").map((url) => url.trim()),
      price: Number(price),
      price_old: Number(price_old),
      description,
      category_id: Number(category_id),
    };
    try {
      const response = await request.post("/products", newProduct);
      if (response.status === 201) {
        setNotification({
          title: "Success",
          message: "You have successfully signed up!",
          color: "teal",
          icon: <FiCheckCircle size={18} />,
        });
        form.reset(); // Reset the form
        setFiles([]); // Reset the files
        close(); // Close the modal
      }
    } catch (err) {
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
      <Box>
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
      </Box>
      <Modal opened={opened} onClose={close} withCloseButton={false} size="50%">
        <form onSubmit={form.onSubmit(handleCreatePro)}>
          <Text fw={700} fz={20}>
            Add product
          </Text>
          <Grid>
            <Grid.Col span={12}>
              <TextInput
                label="Name product"
                placeholder="Name product"
                {...form.getInputProps("name")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                label="Price old product"
                placeholder="Price old product"
                {...form.getInputProps("price_old")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                label="Price product"
                placeholder="Price product"
                {...form.getInputProps("price")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                label="Description"
                placeholder="Description"
                {...form.getInputProps("description")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <NumberInput
                label="Category"
                placeholder="Category"
                {...form.getInputProps("category_id")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              {/* <Group justify="center">
                <FileButton
                  onChange={setFiles}
                  accept="image/png,image/jpeg"
                  multiple
                >
                  {(props) => <Button {...props}>Upload image</Button>}
                </FileButton>
                {files.length > 0 && (
                  <Text size="sm" mt="sm">
                    Picked files:
                  </Text>
                )}

                <ul>
                  {files.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </Group>    */}
              <Textarea
                label="Thumbnail"
                placeholder="Thumbnail"
                {...form.getInputProps("thumbnail")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Group justify="end">
                <Button type="submit">Create Product</Button>
              </Group>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>
      <Button
        onClick={open}
        leftSection={
          <AiOutlinePlus style={{ width: rem(16), height: rem(16) }} />
        }
      >
        Add Products
      </Button>
    </>
  );
};

export default ModalAddProduct;
