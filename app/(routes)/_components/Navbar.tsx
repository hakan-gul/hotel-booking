"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ModeToggle } from "@/components/ModeToggle";
import MobileMenu from "./MobileMenu";
import { NavMenu } from "@/constans";
import NavItem from "./NavItem";
import { usePathname, useRouter } from "next/navigation";
import pb from "@/lib/pocketbase";
import { UserIcon } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(pb.authStore.isValid);
  const [user, setUser] = useState(pb.authStore.model);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const authListener = () => {
      setIsLoggedIn(pb.authStore.isValid);
      setUser(pb.authStore.model);
    };
    pb.authStore.onChange(authListener);
    return () => {
      pb.authStore.onChange(authListener);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);


  const handleLogout = () => {
    pb.authStore.clear();
    setIsLoggedIn(false);
    setUser(null);
    router.push("/auth/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <nav
    className={`w-full z-30 ${
      pathname !== "/"
        ? "bg-mydark2"
        : isScrolled
        ? "bg-mydark2"
        : "bg-transparent"
    } fixed top-0 left-0 transition-colors duration-300`}
  >
    <div className="container mx-auto px-4 py-6 flex items-center justify-between">
      <div className="w-24 py-4 px-3 rounded-xl bg-white">
        <Image
          src="/logo.png"
          alt="logo"
          width={500}
          height={500}
          className="w-full"
        />
      </div>
      <div className="hidden lg:flex flex-row items-center gap-9 ml-auto text-white">
        {NavMenu.map((item, index) => (
          <NavItem key={index} title={item.title} url={item.url} />
        ))}
      </div>
      <div className="flex lg:flex items-center ml-auto gap-2 relative">
        {mounted && isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center text-white focus:outline-none"
            >
              {user?.username || user?.email}
              <UserIcon className=" text-white ml-2" />

            </button>
            {dropdownOpen && (
              <>
                

              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                <a
                  href="/account"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  My Account
                </a>
                <button
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
              </>
              
            )}
          </div>
        ) : mounted ? (
          <div className="flex flex-row items-center gap-4">
            <NavItem title="Giriş Yap" url="/auth/login" />
            <NavItem title="Kayıt Ol" url="/auth/register" />
          </div>
        ) : null}
        <ModeToggle />

        <div className="lg:hidden flex flex-row items-center ml-auto gap-2">
          <MobileMenu />
        </div>
      </div>
    </div>
  </nav>
  );
};

export default Navbar;