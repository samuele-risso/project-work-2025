import NavBar from "@/components/navBar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="home-layout">
        <NavBar />
        {children}
    </div>
  )
}