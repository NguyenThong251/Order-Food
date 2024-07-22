import Image from "next/image";
// import { ButtonMain } from "@repo/ui/button";
// import styles from "./page.module.css";
// import ButtonMain from "./components/Button";
import { Container } from "@repo/ui";
import { RegisterForm } from "../../components/client/pages/RegisterForm";
// import SignupForm from "../../components/form/signup-form";

export default function Home() {
  return (
    <>
      <Container size="xl">
        <RegisterForm />
      </Container>
    </>
  );
}
