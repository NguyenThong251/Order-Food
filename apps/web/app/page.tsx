"use client";
// import { ButtonMain } from "@repo/ui/button";
// import styles from "./page.module.css";
// import ButtonMain from "./components/Button";
// import { Button, Container } from "@mantine/core";
import { Button, Container } from "@repo/ui";
import Link from "next/link";
import Navbar from "./components/client/pages/Header";
import { Footer } from "./components/client/pages/Footer";
import { Hero } from "./components/client/pages/Hero";

// import { Container } from "@mantine/core";

export default function Home() {
  return (
    <>
    <div className="bg-slate-50">
      
      <Navbar />
      <main className=" ">
        <Hero />
        
        {/* <Container size="xl">
        <Button>
        <Link href={"/menu/product"}> 123</Link>
        </Button>
        <h2 className="text-red-500">123</h2>
        </Container> */}
      </main>
      <Footer />
        </div>
    </>
  );
}
