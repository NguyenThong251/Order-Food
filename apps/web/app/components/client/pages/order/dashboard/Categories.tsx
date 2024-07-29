"use client";
import { useEffect, useState } from "@repo/ui";
import request from "../../../../../utils/request";
import { Category } from "../../../../../interface";
import CardCategory from "../../../components/ui/CardCategory";

const Categories = () => {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const res = await request.get("/categories");
      setData(res.data);
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
      {data.map((item) => (
        <CardCategory image={item.image} title={item.name} />
      ))}
    </>
  );
};

export default Categories;
