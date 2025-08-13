import React from 'react'
import Cards from "@/components/cards";

export default function Role1() {
  return (
    <div className="flex flex-row justify-center items-center gap-10 h-screen">
      <Cards t1="Vehicles" t2="ship or truck?" img="/veicoli.png" link="/role1/bird-deer" />
    </div>
  );
}
