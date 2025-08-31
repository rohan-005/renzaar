"use client";

import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaHome, FaBoxOpen, FaUser } from "react-icons/fa";
import Image from "next/image";
import TargetCursor from "@/components/TargetCursor";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileProfileDropdown, setShowMobileProfileDropdown] =
    useState(false);

  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    setShowCursor(window.innerWidth >= 1024);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowProfileDropdown(false);
    }
    if (
      mobileDropdownRef.current &&
      !mobileDropdownRef.current.contains(event.target as Node)
    ) {
      setShowMobileProfileDropdown(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-6 relative font-sans ">
      {showCursor && <TargetCursor spinDuration={20} hideDefaultCursor />}

      {/* Logo + Hamburger (mobile inline) */}
      <div className="flex items-center justify-between lg:justify-start px-4 sm:px-6 py-4">
        <h1 className="mt-4 text-[2rem] sm:text-[3rem] lg:text-[5rem] font-electric font-extrabold text-[#d84242] leading-none tracking-wide">
          <Link href="/" className="block">
            RENZAAR
          </Link>
        </h1>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-3xl text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Tagline + Desktop Nav */}
      <div className="lg:h-25 mt-3  relative bg-gradient-to-br from-[#11151c] to-[#1c2028] text-white rounded-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between py-6 px-6 sm:px-10 border border-[#2c3e50]/70 shadow-lg gap-6">
        {/* Tagline */}
        <h2 className="font-stromfaze text-left sm:hidden lg:block   text-2xl md:text-4xl lg:text-5xl font-extrabold text-[#f7e989] tracking-wide">
          Discover. Create. Own.
        </h2>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 relative font-stromfaze">
          <Link
            href="/"
            className="cursor-target bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl text-lg font-semibold uppercase border border-white/10 hover:bg-[#d84242]/40 hover:shadow-[0_0_20px_#d84242] transition-all duration-300 flex items-center gap-2 tracking-wide"
          >
            Home
          </Link>
          <Link
            href="/assets"
            className="cursor-target bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl text-lg font-semibold uppercase border border-white/10 hover:bg-[#d84242]/40 hover:shadow-[0_0_20px_#d84242] transition-all duration-300 flex items-center gap-2 tracking-wide"
          >
            Assets
          </Link>
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="cursor-target bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl text-lg font-semibold uppercase border border-white/10 hover:bg-[#d84242]/40 hover:shadow-[0_0_20px_#d84242] transition-all duration-300 flex items-center gap-2 tracking-wide"
          >
            Profile
          </button>

          {/* Profile Dropdown (Desktop) */}
          {showProfileDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-full right-0 mt-4 w-[320px] bg-gradient-to-br from-[#16272f] to-[#0e181e] rounded-xl p-6 flex flex-col gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.8)] border border-[#2c3e50] z-50 animate-fade-in font-sans"
            >
              {user ? (
                <>
                  {/* Avatar + Username */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#0d1a24] flex items-center justify-center border-4 border-[#00f7ff] shadow-[0_0_10px_#00f7ff]">
                      <Image
                        src={user.photoURL || "/vercel.svg"}
                        alt="avatar"
                        width={40}
                        height={40}
                        className="rounded-full cursor-target"
                      />
                    </div>
                    <span className="cursor-target text-xl text-white font-semibold">
                      {user.displayName || "USERNAME"}
                    </span>
                  </div>

                  {/* Navigation */}
                  <nav className="flex flex-col gap-3 text-lg font-semibold">
                    <Link
                      href="/profile"
                      className="cursor-target px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-[#0f1c26]/50 hover:text-[#00f7ff] hover:shadow-[0_0_10px_#00f7ff] transition duration-300"
                    >
                      📂 Profile
                    </Link>
                    <Link
                      href="/my-assets"
                      className="cursor-target px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-[#0f1c26]/50 hover:text-[#00f7ff] hover:shadow-[0_0_10px_#00f7ff] transition duration-300"
                    >
                      📦 My Assets
                    </Link>
                  </nav>

                  {/* Logout */}
                  <button
                    onClick={logout}
                    className="cursor-target w-full px-3 py-2 text-lg text-gray-400 rounded-lg bg-white/10 backdrop-blur-sm hover:text-[#ff4c4c] hover:bg-[#1a1a1a]/50 hover:shadow-[0_0_8px_#ff4c4c] transition duration-300 font-semibold"
                  >
                    LOG OUT ↩
                  </button>
                </>
              ) : (
                <>
                  <div className="text-lg text-white font-bold text-center font-stromfaze">
                    Unlock, Trade, and Level Up Your Game Assets!
                  </div>
                  <div className="flex flex-col gap-4">
                    <Link
                      href="/auth/login"
                      className="w-full px-6 py-3 rounded-lg font-semibold text-lg bg-white/10 backdrop-blur-sm text-black border-2 border-[#00c7e0] hover:bg-[#00e0ff]/30 hover:shadow-[0_0_15px_#00e0ff] transition font-sans"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/register"
                      className="w-full px-6 py-3 rounded-lg font-semibold text-lg bg-white/10 backdrop-blur-sm text-white border-2 border-[#ff1a1a] hover:bg-[#ff1a1a]/30 hover:shadow-[0_0_15px_#ff1a1a] transition font-sans"
                    >
                      Register
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </nav>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-3/4 sm:w-1/2 bg-[#11151c] shadow-xl border-r border-[#2c3e50]/50 transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 gap-6 text-xl mt-12 font-stromfaze">
          {/* Icon-only navigation */}
          <Link
            href="/"
            className="flex items-center gap-4 cursor-target bg-white/10 backdrop-blur-md px-4 py-3 rounded-lg hover:bg-[#d84242]/30 hover:text-[#f7e989] transition font-semibold"
            onClick={() => setIsOpen(false)}
          >
            <FaHome /> <span>Home</span>
          </Link>
          <Link
            href="/assets"
            className="flex items-center gap-4 cursor-target bg-white/10 backdrop-blur-md px-4 py-3 rounded-lg hover:bg-[#d84242]/30 hover:text-[#f7e989] transition font-semibold"
            onClick={() => setIsOpen(false)}
          >
            <FaBoxOpen /> <span>Assets</span>
          </Link>

          {/* Profile Icon */}
          <button
            className="flex items-center gap-4 cursor-target bg-white/10 backdrop-blur-md px-4 py-3 rounded-lg hover:bg-[#d84242]/30 hover:text-[#f7e989] transition font-semibold"
            onClick={() =>
              setShowMobileProfileDropdown(!showMobileProfileDropdown)
            }
          >
            <FaUser /> <span>Profile</span>
          </button>

          {/* Mobile Profile Dropdown */}
          {showMobileProfileDropdown && (
            <div
              ref={mobileDropdownRef}
              className="mt-4 bg-gradient-to-br from-[#16272f] to-[#0e181e] rounded-xl p-6 flex flex-col gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.8)] border border-[#2c3e50] animate-fade-in font-sans"
            >
              {user ? (
                <>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#0d1a24] flex items-center justify-center border-4 border-[#00f7ff] shadow-[0_0_10px_#00f7ff]">
                      <Image
                        src={user.photoURL || "/vercel.svg"}
                        alt="avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                    <span className="text-xl text-white font-semibold">
                      {user.displayName || "USERNAME"}
                    </span>
                  </div>
                  <Link
                    href="/profile"
                    className="cursor-target px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-[#0f1c26]/50 hover:text-[#00f7ff] hover:shadow-[0_0_10px_#00f7ff] transition duration-300 font-semibold"
                  >
                    📂 Profile
                  </Link>
                  <Link
                    href="/my-assets"
                    className="cursor-target px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-[#0f1c26]/50 hover:text-[#00f7ff] hover:shadow-[0_0_10px_#00f7ff] transition duration-300 font-semibold"
                  >
                    📦 My Assets
                  </Link>
                  <button
                    onClick={logout}
                    className="cursor-target w-full px-3 py-2 text-lg text-gray-400 rounded-lg bg-white/10 backdrop-blur-sm hover:text-[#ff4c4c] hover:bg-[#1a1a1a]/50 hover:shadow-[0_0_8px_#ff4c4c] transition duration-300 font-semibold"
                  >
                    LOG OUT ↩
                  </button>
                </>
              ) : (
                <>
                  <div className="text-lg text-white font-bold text-center font-stromfaze">
                    Unlock, Trade, and Level Up Your Game Assets!
                  </div>
                  <div className="flex flex-col gap-4">
                    <Link
                      href="/auth/login"
                      className="w-full px-6 py-3 rounded-lg font-semibold text-lg bg-white/10 backdrop-blur-sm text-white border-2 border-[#00c7e0] hover:bg-[#00e0ff]/30 hover:shadow-[0_0_15px_#00e0ff] transition font-sans"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/register"
                      className="w-full px-6 py-3 rounded-lg font-semibold text-lg bg-white/10 backdrop-blur-sm text-white border-2 border-[#ff1a1a] hover:bg-[#ff1a1a]/30 hover:shadow-[0_0_15px_#ff1a1a] transition font-sans"
                    >
                      Register
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
