import Cards from "@/components/cards";

export default function Home() {
  return (
    <div className="flex flex-row justify-center items-center gap-10 h-screen">
      <Cards t1="Veicoli" t2="macchina o moto?" img="/veicoli.png" link="/macchina-moto" />
      <Cards t1="Animali" t2="cane o gatto?" img="/animali.png" link="/cane-gatto" />
    </div>
  );
}
