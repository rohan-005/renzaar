"use client";
import { useAuth } from "@/context/AuthContext";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { FaInstagram, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import TargetCursor from "../../components/TargetCursor";
import Loader from "../Loader";

const Home = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);

  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowCursor(window.innerWidth >= 1024); // show only on lg and above
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // simulate loading duration
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader duration={1500} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#253900] via-[#253900] to-[#021d01b4] text-white p-6">
      {showCursor && (
        <TargetCursor spinDuration={20} hideDefaultCursor={true} />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] lg:grid-rows-[auto_auto] gap-6">
        <div className="flex flex-col gap-6 lg:row-span-2">
          {/* Logo */}
          <header className="flex justify-center lg:justify-start">
            <h1 className="text-[4rem] sm:text-[5rem] lg:text-[6rem] font-electric font-extrabold text-[#d84242] leading-none drop-shadow-[0_0_25px_rgba(216,66,66,0.7)] transition duration-500 hover:drop-shadow-[0_0_40px_rgba(216,66,66,1)]">
              <Link href="/" className="block">
                RENZAAR
              </Link>
            </h1>
          </header>

          {/* Profile Card */}
          <div className="font-stromfaze bg-gradient-to-br from-[#16272f] to-[#0e181e] rounded-xl p-6 flex flex-col gap-6 lg:h-[390px] sm:h-[300px] shadow-[0_4px_20px_rgba(0,0,0,0.8)] border border-[#2c3e50]">
            {/* Slogan */}
            <div className="text-lg sm:text-xl lg:text-2xl text-[#00f7ff] font-semibold">
              {user ? "Welcome Back!" : "Level Up Your Game Assets!"}
            </div>

            {user ? (
              <>
                {/* Avatar + Username */}
                <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
                  <div className="w-14 h-14 rounded-full bg-[#0d1a24] flex items-center justify-center border-4 border-[#00f7ff] shadow-[0_0_10px_#00f7ff] cursor-target">
                    <Image
                      src={user.photoURL || "/vercel.svg"} // fallback if photoURL is null
                      alt="avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </div>
                  <span className="text-3xl sm:text-4xl lg:text-5xl text-white break-words cursor-target">
                    {user.displayName || "USERNAME"}
                  </span>
                </div>

                {/* Navigation */}
                <nav className="flex lg:flex-col sm:flex-row sm:gap-20 lg:gap-2 text-lg sm:text-xl lg:text-2xl mt-2">
                  <Link
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-target ml-2
                               bg-white/10 backdrop-blur-sm hover:bg-[#0f1c26]/50 hover:text-[#00f7ff] 
                               hover:drop-shadow-[0_0_10px_#00f7ff] transition duration-300"
                  >
                    <span>📂</span> PROFILE
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg  cursor-target ml-2
                               bg-white/10 backdrop-blur-sm hover:bg-[#0f1c26]/50 hover:text-[#00f7ff] 
                               hover:drop-shadow-[0_0_10px_#00f7ff] transition duration-300"
                  >
                    <span>📦</span> MY ASSETS
                  </Link>
                </nav>

                {/* Logout */}
                <div className="mt-auto">
                  <button
                    onClick={logout}
                    className="cursor-target w-full flex items-center justify-between px-3 py-2 text-lg sm:text-xl lg:text-2xl
                               text-gray-400 rounded-lg bg-white/10 backdrop-blur-sm hover:text-[#ff4c4c]
                               hover:bg-[#1a1a1a]/50 hover:drop-shadow-[0_0_8px_#ff4c4c] transition duration-300"
                  >
                    <span>LOG OUT</span>
                    <span className="text-xl sm:text-2xl">↩</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Catchy Slogan */}
                <div className="text-xl sm:text-2xl lg:text-3xl text-white font-bold">
                  Unlock, Trade, and Level Up Your Game Assets!
                </div>

                {/* Login / Register Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <Link
                    href="/auth/login"
                    className="cursor-target w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-lg
                               bg-white/10 backdrop-blur-sm text-black border-2 border-[#00c7e0] sm:border-none
                               hover:bg-[#00e0ff]/30 transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="cursor-target w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-lg
                               bg-white/10 backdrop-blur-sm text-white border-2 border-[#ff1a1a] sm:border-none
                               hover:bg-[#ff1a1a]/30 transition"
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Description Box */}
        <div className="font-stromfaze relative bg-gradient-to-br from-[#11151c] to-[#1c2028] text-white rounded-2xl flex flex-col items-center justify-center h-auto p-6 sm:p-10 border border-[#2c3e50]/70 shadow-lg">
          {/* Tagline */}
          <h2 className="text-center text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-[#f7e989]">
            Discover. Create. Own.
          </h2>

          {/* Description */}
          <p className="text-center text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mb-8 px-2">
            Welcome to{" "}
            <span className="text-[#f7e989] font-semibold">Renzaar</span>, your
            ultimate marketplace for premium 3D game assets. Explore top-quality
            models, animations, and textures crafted by passionate creators.
            Empower your imagination and bring your game ideas to life!
          </p>

          {/* Why Choose Us */}
          <div className="text-center max-w-4xl w-full">
            <h3 className="text-xl sm:text-2xl font-semibold text-[#f7e989] mb-4">
              Why Choose Us?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300 text-sm sm:text-lg px-4">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-green-400 text-xl">✔</span>
                <span>Curated high-quality assets</span>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-green-400 text-xl">✔</span>
                <span>Affordable for all creators</span>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-green-400 text-xl">✔</span>
                <span>Instant downloads & easy integration</span>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-green-400 text-xl">✔</span>
                <span>Community-driven platform</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center sm:justify-end gap-6 text-3xl mt-8 w-full">
            <a
              href="https://instagram.com"
              target="_blank"
              className="cursor-target bg-white/10 backdrop-blur-sm px-3 py-3 rounded-full text-gray-400 hover:text-pink-500 transition duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="cursor-target bg-white/10 backdrop-blur-sm px-3 py-3 rounded-full text-gray-400 hover:text-white transition duration-300"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              className="cursor-target bg-white/10 backdrop-blur-sm px-3 py-3 rounded-full text-gray-400 hover:text-gray-200 transition duration-300"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Assets Section */}
        <div className="bg-gradient-to-br from-[#11151c] to-[#1c2028] rounded-xl flex items-center justify-center text-4xl sm:text-5xl font-bold h-[300px] border border-[#2c3e50] shadow-[0_4px_20px_rgba(0,0,0,0.8)] lg:col-span-2">
          <span className="text-[#00f7ff]">ASSETS</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
