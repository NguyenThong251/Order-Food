"use client";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Image,
  NumberInput,
  Select,
  TextInput,
  useEffect,
  useState,
} from "@repo/ui";
import request from "../../../../utils/request";
import { Category, Products } from "../../../../interface";
import CardProduct from "../../../../components/client/components/ui/CardProduct";

export default function Page() {
  const [data, setData] = useState<Products[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Products[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [fromPrice, setFromPrice] = useState<number | undefined>(undefined);
  const [toPrice, setToPrice] = useState<number | undefined>(undefined);

  const fetchData = async () => {
    try {
      const res = await request.get("/products");
      setData(res.data);
      setFilteredData(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await request.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleFilter = () => {
    let filtered: Products[] = data;

    if (fromPrice !== undefined && toPrice !== undefined) {
      filtered = filtered.filter(
        (product) => product.price >= fromPrice && product.price <= toPrice
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category._id === selectedCategory
      );
    }

    // if (sortOption) {
    //   switch (sortOption) {
    //     case "name-asc":
    //       filtered.sort((a, b) => a.name.localeCompare(b.name));
    //       break;
    //     case "name-desc":
    //       filtered.sort((a, b) => b.name.localeCompare(a.name));
    //       break;
    //     case "price-asc":
    //       filtered.sort((a, b) => a.price - b.price);
    //       break;
    //     case "price-desc":
    //       filtered.sort((a, b) => b.price - a.price);
    //       break;
    //     default:
    //       break;
    //   }
    // }

    setFilteredData(filtered);
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setFromPrice(0);
    setToPrice(0);
    setSortOption(null);
    setFilteredData(data);
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  //   useEffect(() => {
  //     handleFilter();
  //   }, [searchQuery, selectedCategory, fromPrice, toPrice, sortOption]);
  useEffect(() => {
    setFilteredData(
      data.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box>
        <TextInput
          placeholder="Search products"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
        />
        <Select
          checkIconPosition="right"
          data={[
            { label: "All Products", value: "" },
            ...categories.map((category) => ({
              label: category.name,
              value: category._id,
            })),
          ]}
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value)}
          label="Category"
          placeholder="Select a category"
        />
        <Flex align="end" gap={5}>
          <NumberInput
            value={fromPrice}
            onChange={(value) => setFromPrice(value as number)}
            label="From Price"
          />
          <NumberInput
            value={toPrice}
            onChange={(value) => setToPrice(value as number)}
            label="To Price"
          />
          {/* <Select
            checkIconPosition="right"
            label="Sort By"
            placeholder="Select an option"
            value={sortOption}
            data={[
              { value: "name-asc", label: "Name (A-Z)" },
              { value: "name-desc", label: "Name (Z-A)" },
              { value: "price-asc", label: "Price (Low to High)" },
              { value: "price-desc", label: "Price (High to Low)" },
            ]}
            onChange={(value) => setSortOption(value)}
          /> */}
          <Button onClick={handleFilter} variant="filled" color="red">
            Filter
          </Button>
          <Button onClick={handleReset} variant="outline" color="red">
            Reset
          </Button>
        </Flex>
      </Box>
      <Container>
        {filteredData.length === 0 ? (
          <Box className="flex items-center justify-center h-screen">
            <Image
              src="https://www.tamirapharmacy.com/assets/img/No_Product_Found.png"
              alt="No products found"
              width={200}
            />
          </Box>
        ) : (
          <Grid>
            {filteredData.map((item) => (
              <Grid.Col key={item._id} span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
                <CardProduct
                  image={
                    item.thumbnails[0] ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJRS-4chjWMRAmrtz7ivK53K_uygrgjzw9Uw&s"
                  }
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  seller={item.seller}
                  productId={item._id}
                />
              </Grid.Col>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}
