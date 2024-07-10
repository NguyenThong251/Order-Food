"use client";
import { Container, Grid, useEffect, useState } from "@repo/ui";
import { useRouter } from "next/navigation";
import CardProduct from "../../../components/ui/CardProduct";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   } else {
  //     router.push("/auth/login");
  //   }
  // }, [router]);

  // if (!user) {
  //   return null;
  // }

  return (
    <div>
      <Container size="xl">

      <h1>Products</h1>
      <Grid>
    <Grid.Col span={3}>
<CardProduct/>

    </Grid.Col>
    <Grid.Col span={3}>
<CardProduct/>

    </Grid.Col>
    <Grid.Col span={3}>
<CardProduct/>

    </Grid.Col>
    <Grid.Col span={3}>
<CardProduct/>

    </Grid.Col>
  
      </Grid>
      </Container>
    </div>
  );
};

export default Page;
