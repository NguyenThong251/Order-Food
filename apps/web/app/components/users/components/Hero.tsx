import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <section className="w-[90%] md:w-4/5 mx-auto h-[calc(100vh-72px)]">
      <div className="flex flex-col items-center h-full justify-evenly">
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-medium text-center sm:text-4xl lg:text-6xl font-inter">
            Welcome to my <br />
            <span className="inline-block bg-gradient-to-r from-green-400 via-secondary to-accent font-bold text-transparent bg-clip-text p-2 animate-gradient bg-300% text-5xl md:text-6xl lg:text-7xl py-4">
              Front-end Developer
            </span>
            Portfolio
          </h1>
        </div>

        <div className="flex flex-col items-center gap-5 sm:flex-row">
          <Button className="min-w-[150px] rounded-xl">Contact</Button>
          <Button variant={"secondary"} className="min-w-[150px] rounded-xl">
            Download CV
          </Button>
        </div>
      </div>
    </section>
  );
};
