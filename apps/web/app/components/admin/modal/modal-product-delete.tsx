import { FC } from "react";
import {
  useDisclosure,
  Modal,
  Button,
  Box,
  Tooltip,
  IconEdit,
  Text,
  Center,
  Flex,
  IconTrash,
  FiCheckCircle,
  useState,
  useEffect,
  Notification,
} from "@repo/ui";
import request from "../../../utils/request";

interface ModalDeleteProductProps {
  productId: number;
  onDelete: () => void;
}

const ModalDeleteProduct: FC<ModalDeleteProductProps> = ({
  productId,
  onDelete,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
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
  const handleDelete = async () => {
    try {
      const response = await request.delete(`/products/${productId}`);
      console.log(productId);
      console.log(response);
      if (response.status === 200) {
        setNotification({
          title: "Success",
          message: "Product Delete successfully!",
          color: "teal",
          icon: <FiCheckCircle size={18} />,
        });
        onDelete(); // Callback to refresh the product list
        close();
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("An error occurred while deleting the product. Please try again.");
    }
  };
  console.log(notification);

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
      <Modal opened={opened} onClose={close}>
        <Text fz={28} fw={700}>
          <Center>Are you sure?</Center>
        </Text>
        <Center mt={10}>
          <Flex gap={10}>
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button color="red" onClick={handleDelete}>
              Submit
            </Button>
          </Flex>
        </Center>
      </Modal>
      <Tooltip label="Delete" withArrow>
        <IconTrash size={20} onClick={open} />
      </Tooltip>
    </>
  );
};

export default ModalDeleteProduct;
