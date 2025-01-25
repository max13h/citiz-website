import type { Route } from "./+types/";
import { Banner } from "./banner";
import { Navbar } from "./navbar";

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
    </>
  )
}
