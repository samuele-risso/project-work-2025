import React from 'react';
import Cards from "@/components/cards";

export default function Service() {  
  return (
    <div className="flex flex-row justify-center items-center gap-10 h-screen">
      <Cards t1="Vehicles" t2="ship or truck?" img="/veicoli.png" link="/picto/service/ship-truck" />
      <Cards t1="Animals" t2="dog or cat?" img="/animali.png" link="/picto/service/cat-dog" />
    </div>
  );
}
