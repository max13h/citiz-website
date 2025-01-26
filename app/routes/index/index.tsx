import type { Route } from "./+types/";
import { Banner } from "./banner";
import { CarDivider } from "./carDivider";
import { Navbar } from "./navbar";
import { Location } from "./location";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <Navbar/>
      <Banner/>
      <CarDivider/>
      <Location/>
    </>
  )
}
