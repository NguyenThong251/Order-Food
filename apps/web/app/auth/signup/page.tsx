import Image from "next/image";
// import { ButtonMain } from "@repo/ui/button";
// import styles from "./page.module.css";
// import ButtonMain from "./components/Button";
import { Button, Container } from "@mantine/core";
import SignupForm from "../../components/form/signup-form";

export default function Home() {
  return (
    <>
      <Container size="xl">
        <SignupForm />
      </Container>
    </>
  );
}
