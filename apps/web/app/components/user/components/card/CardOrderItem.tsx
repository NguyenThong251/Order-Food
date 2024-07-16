import {
  AiFillDelete,
  AiOutlineMinus,
  AiOutlinePlus,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Image,
  NumberInput,
  SimpleGrid,
  Text,
  Title,
} from "@repo/ui";

const CardOrderItem = () => {
  return (
    <>
      <Grid>
        <Grid.Col span={4}>
          <Image
            className="h-20"
            radius="md"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdzPwtTZ1F-BAHPEsZokFxgpJOLJ-g0WGDbA&s"
            alt="abc"
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Box>
            <Flex justify="space-between" align="center">
              <Title fz={16}>Phở 2</Title>
              <Text>Category</Text>
            </Flex>
            <Text>Price:123.000VNĐ</Text>
            <Box>
              <Flex align="center">
                <AiOutlineMinus size={20} style={{ cursor: "pointer" }} />

                <NumberInput
                  value={1}
                  hideControls
                  styles={{
                    input: {
                      border: "none",
                      textAlign: "center",
                      width: 60,
                    },
                  }}
                />
                <AiOutlinePlus size={20} style={{ cursor: "pointer" }} />
              </Flex>
            </Box>
          </Box>
        </Grid.Col>
        <Grid.Col span={2}>
          <Flex align="end" justify="end">
            <AiFillDelete
              style={{ cursor: "pointer" }}
              size={20}
              color="rgba(255, 0, 0, 1)"
            />
          </Flex>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default CardOrderItem;
