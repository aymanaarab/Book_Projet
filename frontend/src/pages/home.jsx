import React from "react";
import { Header } from "../components/header";
import { Hero } from "../components/hero";

export default function Home() {
  return (
    <div className=" flex flex-col max-h-screen">
      <Header />
      <Hero />
    </div>
  );
}
