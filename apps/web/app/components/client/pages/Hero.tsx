import { Button, Image } from "@repo/ui";
import Link from "next/link";

export const Hero = () => {
  return (
    <>
      <section className="w-[90%] md:w-4/5 mx-auto overflow-y-hidden ">
        <div className="flex flex-col items-center h-full justify-evenly">
          <div className="flex flex-col gap-5">
            <h1 className="mt-20 text-3xl font-medium text-center sm:text-4xl lg:text-6xl font-inter">
              Welcome to my restaurant <br />
              <span className="inline-block bg-gradient-to-r from-[#e54144] via-secondary to-accent font-bold text-transparent bg-clip-text p-2 animate-gradient bg-300% text-5xl md:text-6xl lg:text-7xl py-4">
                Order food
              </span>
              right away
            </h1>
            <div className="flex items-center justify-center my-16 ">
              <Image
                src="https://i.pinimg.com/564x/60/54/b9/6054b94e43b7c8f3908b559cf0a2261f.jpg"
                w={350}
                alt="img"
              ></Image>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-col items-center justify-center gap-5 mt-3 sm:flex-row">
        <Link href="/order/dashboard">
          <Button variant="filled" size="lg" w={250} color="red">
            Order Now
          </Button>
        </Link>
        <Link href="/auth/login">
          <Button variant="outline" size="lg" w={250} color="red">
            Login to receive offers
          </Button>
        </Link>
        {/* <Button className="min-w-[150px] rounded-xl">Contact</Button>
          <Button variant={"secondary"} className="min-w-[150px] rounded-xl">
            Download CV
          </Button> */}
      </div>
    </>
  );
};
