"use client";
import { Grid, SimpleGrid } from "@repo/ui";
import { Header } from "../../../components/client/pages/menu/Header";
import Order from "../../../components/client/pages/menu/Order";
import { Navbar } from "../../../components/client/pages/menu/Navbar";

export default function LayoutMenu({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 12, sm: 2, lg: 2, xl: 1.2 }}>
          <Navbar />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 6, xl: 7.8 }}>
          <section>
            <Header />
            {children}
          </section>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4, lg: 4, xl: 3 }}>
          <Order />
        </Grid.Col>
      </Grid>
    </>
  );
}
