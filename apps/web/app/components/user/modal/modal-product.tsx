import React from "react";
import {
  Box,
  Button,
  Card,
  Image,
  Group,
  Text,
  Badge,
  SimpleGrid,
  Modal,
  Flex,
  rem,
  TextInput,
  AiOutlineMinus,
  AiOutlinePlus,
} from "@repo/ui";
import { AiOutlineClose } from "react-icons/ai";

const images = [
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png",
];

interface ProductModalProps {
  opened: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ opened, onClose }) => {
  return (
    <Modal
      padding={0}
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
    >
      <Box>
        <Card>
          <Card.Section style={{ position: "relative" }}>
            <Image
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
              height={200}
              width={100}
              alt="Norway"
            />
            <Button
              onClick={onClose}
              variant="filled"
              color="rgba(255, 0, 0, 1)"
              style={{ position: "absolute", right: 10, top: 10 }}
            >
              <AiOutlineClose />
            </Button>
          </Card.Section>
          <Card.Section inheritPadding mt="sm" pb="md">
            <SimpleGrid cols={3}>
              {images.map((image) => (
                <Image
                  style={{ cursor: "pointer" }}
                  src={image}
                  key={image}
                  radius="sm"
                />
              ))}
            </SimpleGrid>
          </Card.Section>
          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>Norway Fjord Adventures</Text>
            <Badge color="pink">Seller</Badge>
          </Group>
          <Text fw={500}>Price: 20000VNĐ</Text>
          <Text fw={400}>Category: Pho</Text>
          <Text mt={2} size="sm" c="dimmed">
            With Fjord Tours you can explore more of the magical fjord
            landscapes with tours and activities on and around the fjords of
            Norway
          </Text>
          <Flex justify="center" align="center">
            <Box w={150}>
              <Flex justify="space-between" align="center">
                <Button
                  variant="outline"
                  color="red"
                  style={{
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: rem(40),
                    height: rem(40),
                  }}
                >
                  <AiOutlineMinus size={20} />
                </Button>
                <TextInput
                  value={1}
                  min={0}
                  max={99}
                  step={1}
                  styles={{
                    input: {
                      width: rem(60),
                      textAlign: "center",
                      border: "none",
                      outline: "none",
                      boxShadow: "none",
                      fontSize: rem(16),
                    },
                  }}
                />
                <Button
                  variant="outline"
                  color="red"
                  style={{
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: rem(40),
                    height: rem(40),
                  }}
                >
                  <AiOutlinePlus size={20} />
                </Button>
              </Flex>
            </Box>
          </Flex>
          <Button color="red" fullWidth mt="md" radius="md">
            Add to cart - 38000VNĐ
          </Button>
        </Card>
      </Box>
    </Modal>
  );
};

export default ProductModal;
