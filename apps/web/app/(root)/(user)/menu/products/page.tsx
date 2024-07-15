"use client";
import {
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Image,
  Text,
  NumberInput,
  useEffect,
  useState,
} from "@repo/ui";
import CardProduct from "../../../../components/user/components/card/CardProduct";
import request from "../../../../utils/request";
interface Products {
  _id: string;
  name: string;
  price: string;
  description: string;
  seller: number;
  quantity: number;
  category: {
    _id: string;
    name: string;
    image: string;
  };
  thumbnails: string[];
}
export default function page() {
  const [data, setData] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const res = await request.get("/products");
      setData(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Container>
        <Grid>
          {data.map((item) => (
            <Grid.Col key={item._id} span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
              <CardProduct
                image={item.thumbnails[0] || "default-image-url.jpg"}
                name={item.name}
                price={item.price}
                description={item.description}
                seller={item.seller}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </>
  );
}
