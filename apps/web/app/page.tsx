import Image from "next/image";
import { ButtonMain } from "@repo/ui/button";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div className="">Hello</div>
      <ButtonMain variant="filled">Login</ButtonMain>
    </>
  );
}
