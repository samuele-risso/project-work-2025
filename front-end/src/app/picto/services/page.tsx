import Cards from "@/components/cards";

export default function Services() {
  const servizi = [
    { t1: "Vehicles", t2: "ship or truck?", img: "/veicoli.png", slug: "ship-truck" },
    { t1: "Animals", t2: "dog or cat?", img: "/animali.png", slug: "cat-dog" },
  ];

  return (
    <div className="flex flex-row justify-center items-center gap-10 h-screen">
      {servizi.map((s) => (
        <Cards
          key={s.slug}
          t1={s.t1}
          t2={s.t2}
          img={s.img}
          link={`/picto/service/${s.slug}`}
        />
      ))}
    </div>
  );
}
