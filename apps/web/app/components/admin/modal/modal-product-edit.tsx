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
  IconEdit,
  Tooltip,
} from "@repo/ui";
import { FC } from "react";
import request from "../../../utils/request";
interface ProductFormValues {
  name: string;
  price_old: number;
  price: number;
  category_id: number;
  description: string;
  thumbnail: string;
}
interface ModalUpdateProductProps {
  productId: number;
  onUpdate: () => void;
}
const ModalUpdateProduct: FC<ModalUpdateProductProps> = ({
  productId,
  onUpdate,
}) => {
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

  const fetchProductData = async () => {
    try {
      const response = await request.get(`/products/?id=${productId}`);
      const product = response.data[0];
      form.setValues({
        name: product.name,
        price_old: product.price_old,
        price: product.price,
        description: product.description,
        category_id: product.category_id,
        thumbnail: product.thumbnail.join(","),
      });
    } catch (err) {
      console.error("Error fetching product data:", err);
    }
  };

  useEffect(() => {
    if (opened) {
      fetchProductData();
    }
  }, [opened]);

  const handleUpdateProduct = async (values: ProductFormValues) => {
    const { name, price_old, price, description, category_id, thumbnail } =
      values;
    const updatedProduct = {
      name,
      //   thumbnail: files.map((file) => URL.createObjectURL(file)),
      thumbnail: thumbnail.split(",").map((url) => url.trim()),
      price: Number(price),
      price_old: Number(price_old),
      description,
      category_id: Number(category_id),
    };
    try {
      const response = await request.put(
        `/products/${productId}`,
        updatedProduct
      );
      if (response.status === 200) {
        alert("success");
        // setNotification({
        //   title: "Success",
        //   message: "Product updated successfully!",
        //   color: "teal",
        //   icon: <FiCheckCircle size={18} />,
        // });
        // form.reset(); // Reset the form
        // setFiles([]); // Reset the files
        close(); // Close the modal
        onUpdate(); // Callback to refresh the product list
      }
    } catch (err) {
      alert(err);
      //   setNotification({
      //     title: "Error",
      //     message:
      //       "An error occurred while updating the product. Please try again.",
      //     color: "red",
      //     icon: <MdOutlineClear size={18} />,
      //   });
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
        <form onSubmit={form.onSubmit(handleUpdateProduct)}>
          <Text fw={700} fz={20}>
            Update Product
          </Text>
          <Grid>
            <Grid.Col span={12}>
              <TextInput
                label="Product Name"
                placeholder="Product Name"
                {...form.getInputProps("name")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                label="Old Price"
                placeholder="Old Price"
                {...form.getInputProps("price_old")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                label="Price"
                placeholder="Price"
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
                  {(props) => <Button {...props}>Upload Image</Button>}
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
              </Group> */}
              <Textarea
                autosize
                minRows={3}
                maxRows={10}
                {...form.getInputProps("thumbnail")}
                label="Thumbnail"
                placeholder="Thumbnail"
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Group justify="end">
                <Button type="submit">Update Product</Button>
              </Group>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>
      <Tooltip onClick={open} label="Edit" withArrow>
        <IconEdit size={20} />
      </Tooltip>
    </>
  );
};

export default ModalUpdateProduct;
