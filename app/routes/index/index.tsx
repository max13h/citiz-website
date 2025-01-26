import type { Route } from "./+types/";
import { Banner } from "./banner";
import { CarDivider } from "./carDivider";
import { Navbar } from "./navbar";
import { Location } from "./location";
import { Autopartage } from "./autopartage";
import { Simulateur } from "./simulateur";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Citiz Website" },
    { name: "description", content: "Welcome to my website prototype for Citiz" },
  ];
}

export default function Home() {
  return (
    <main className="relative flex flex-col gap-8">
      <Navbar/>
      <Banner/>
      <CarDivider/>
      <Location/>
      <Autopartage/>
      <Simulateur/>
    </main>
  )
}
