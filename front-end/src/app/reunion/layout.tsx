'use client'

import Link from "next/link";
import Image from "next/image";
import { useKeycloakInstance } from "@/hooks/KeycloackIstance";
import { useAuth } from "@/hooks/keycloackAuth";
import { useKeycloakActions } from "@/hooks/keycloakActions";
import UserDropdown from '@/components/userDropdown';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const kc = useKeycloakInstance();
  const authenticated = useAuth(kc);
  const { login, logout } = useKeycloakActions(kc);

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur w-full">
        <div className="mx-auto flex max-w-6xl items-center justify-between pr-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-5">
            <Image
              src="/reunion_logo.png"
              alt="Reunion Logo"
              width={150}
              height={50}
              className='mt-1'
            />
            <span className="hidden text-sm text-gray-500 sm:inline">Microservices Hub</span>
          </div>

          {/* Navbar */}
          <nav className="flex items-center gap-4">
            <Link href="#services" className="rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Services</Link>
            <Link href="#docs" className="rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Docs</Link>
            <Link href="#status" className="rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Status</Link>

            {/* User / Login */}
            <div className="relative">
              {authenticated ? (
                <UserDropdown logOut={logout} />
              ) : (
                <button
                  onClick={login}
                  className='flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-100'
                >
                  <span>Login</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1 bg-gray-50">
        {children}
      </main>

      <footer className="border-t border-gray-200 bg-white/90 px-6 p-6 text-xs text-gray-500 w-full">
        © {new Date().getFullYear()} Reunion — All rights reserved. |{" "}
        <Link href="/privacy" className="hover:underline">Privacy</Link>{" "}
        |{" "}
        <Link href="/terms" className="hover:underline">Terms</Link>
      </footer>
    </div>
  );
}
