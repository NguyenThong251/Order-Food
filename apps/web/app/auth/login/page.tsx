import Image from "next/image";
// import { ButtonMain } from "@repo/ui/button";
// import styles from "./page.module.css";
// import ButtonMain from "./components/Button";
import { Container } from "@repo/ui";
import LoginForm from "../../components/form/login-form";

export default function Home() {
  return (
    <>
      <Container size="xl">
        <LoginForm />
      </Container>
    </>
  );
}
