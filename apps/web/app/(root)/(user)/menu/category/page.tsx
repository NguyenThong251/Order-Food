"use client";
import React from "react";
import { useState, useEffect, Container, Grid } from "@repo/ui";
import Link from "next/link";
import request from "../../../../utils/request";
import CardCategory from "../../../../components/client/components/ui/CardCategory";
interface Category {
  image: string;
  name: string;
}
export default function page() {
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
      <Container>
        <Grid>
          {data.map((item) => (
            <Grid.Col span={2.4}>
              <CardCategory image={item.image} title={item.name} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </>
  );
}
