"use client";
import { useEffect, useState } from "@repo/ui";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>Products</h1>
    </div>
  );
};

export default Page;
