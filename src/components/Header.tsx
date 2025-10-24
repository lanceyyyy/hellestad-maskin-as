"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import TopBar from "@/components/TopBar";
import Navigation from "@/components/Navigation";

export function Header() {
  const pathname = usePathname();
  const shouldStartSolid = useMemo(() => {
    if (!pathname) return false;
    return (
      pathname.startsWith("/kjop/") ||
      pathname === "/kontakt" ||
      pathname === "/selg" ||
      pathname === "/personvern"
    );
  }, [pathname]);

  const [isSolid, setIsSolid] = useState(shouldStartSolid);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setIsSolid(shouldStartSolid || window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldStartSolid]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSolid(shouldStartSolid || window.scrollY > 40);
  }, [pathname, shouldStartSolid]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full">
      <div className="pointer-events-auto">
        <TopBar isSolid={isSolid} />
        <Navigation
          activePath={pathname ?? "/"}
          isSolid={isSolid}
          isMobileMenuOpen={isMobileMenuOpen}
          onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
          onNavigate={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </header>
  );
}

export default Header;
