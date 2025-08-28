import React from 'react'
import Cards from "@/components/cards";

export default function DHome() {
  return (
    <div className="flex flex-row justify-center items-center gap-10 h-screen">
      <Cards t1="Vehicles" t2="plane or car?" img="/veicoli.png" link="/role1/plane-car" />
      <Cards t1="Animals" t2="bird or deer?" img="/animali.png" link="/role1/bird-deer" />
    </div>
  );
}
