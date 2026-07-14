"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { readAuth, clearAuth, AuthData } from "@/lib/auth-storage";

const loggedOutLinks = [
  { href: "#explore", label: "Explore" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
const loggedInLinks = [
  { href: "#explore", label: "Explore" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/addpizza", label: "Add pizza" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [authState, setAuthState] = useState<AuthData | null>(null);
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);
  const { data: session } = authClient.useSession();

  const syncFromStorage = () => setAuthState(readAuth());

  useEffect(() => {
    syncFromStorage();

    // Same-tab updates + cross-tab updates
    window.addEventListener("auth-changed", syncFromStorage);
    window.addEventListener("storage", syncFromStorage);
    return () => {
      window.removeEventListener("auth-changed", syncFromStorage);
      window.removeEventListener("storage", syncFromStorage);
    };
  }, []);

 
  useEffect(() => {
   
    if (session?.user) {
      const u = session.user as any;
      const mirrored: AuthData = {
        isLoggedIn: true,
        user: {
          _id: u.id ?? u._id ?? "",
          name: u.name ?? "",
          email: u.email ?? "",
          picUrl: u.image ?? u.picUrl ?? "",
        },
      };
      localStorage.setItem("library-auth-storage", JSON.stringify(mirrored));
      setAuthState(mirrored);
    } else if (session === null) {
      
      clearAuth();
      setAuthState(null);
    }
  }, [session]);  

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLoggedIn = !!authState?.isLoggedIn;
  const user = authState?.user;
  const links = isLoggedIn ? loggedInLinks : loggedOutLinks;

 
  const handleLogout = async () => {
    setOpen(false);
    setProfileOpen(false);

    await authClient.signOut(); 
    clearAuth();                
    setAuthState(null);        
    router.push("/login");
  };

  const isValidPic = user?.picUrl && !user.picUrl.includes("/register");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ink/10 bg-parchment/90 backdrop-blur-md">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="group flex items-center gap-4">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#E3A857] bg-[#241713]">
            <span className="text-2xl">🔥</span>
            <span className="absolute -bottom-1 h-3 w-3 rounded-full bg-[#C1440E]" />
          </div>

          <div>
            <h2 className="font-serif text-3xl font-bold text-white">
              Pizza
              <span className="text-[#C1440E]">Verse</span>
            </h2>
            <span className="text-xs tracking-[4px] text-gray-400">EST. 1999</span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/70 transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {isLoggedIn && user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full transition hover:opacity-80"
                aria-haspopup="true"
                aria-expanded={profileOpen}
              >
                <div className="relative h-9 w-9 overflow-hidden rounded-full border border-ink/10 bg-ink flex items-center justify-center text-parchment font-semibold text-xs">
                  {isValidPic ? (
                    <Image src={user.picUrl} alt={user.name} fill sizes="36px" className="object-cover" />
                  ) : (
                    <span>{user.name?.slice(0, 2).toUpperCase() || "US"}</span>
                  )}
                </div>
                <svg
                  className={`h-3 w-3 text-ink/60 transition-transform ${profileOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 12 8"
                  fill="none"
                >
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-ink/10 bg-parchment shadow-lg">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2.5 cursor-pointer text-sm font-semibold text-ink/80 transition hover:bg-ink/5 hover:text-ink"
                    onClick={() => setProfileOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block cursor-pointer w-full px-4 py-2.5 text-left text-sm font-semibold text-[#C1440E] transition hover:bg-ink/5 hover:text-[#A8380C]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className=" cursor-pointer text-sm font-semibold text-ink/80 hover:text-ink">
                Log in
              </Link>
              <Link href="/register" className="btn-primary cursor-pointer">
                Get started
              </Link>
            </>
          )}
        </div>

        
        <button aria-label="Toggle menu" className="flex flex-col gap-1.5 md:hidden" onClick={() => setOpen(!open)}>
          <span className={`h-[1.5px] w-6 bg-ink transition-transform ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
          <span className={`h-[1.5px] w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-[1.5px] w-6 bg-ink transition-transform ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
        </button>
      </nav>

     
      {open && (
        <div className="border-t border-ink/10 bg-parchment px-6 pb-6 md:hidden">
          <div className="flex flex-col gap-4 pt-4">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-base font-medium text-ink/80" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}

            <div className="mt-2 flex flex-col gap-3 border-t border-ink/10 pt-4">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="text-base font-semibold text-ink" onClick={() => setOpen(false)}>
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="cursor-pointer text-left text-base font-semibold text-[#C1440E]">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-semibold text-ink" onClick={() => setOpen(false)}>
                    Log in
                  </Link>
                  <Link href="/register" className="btn-primary w-full" onClick={() => setOpen(false)}>
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}