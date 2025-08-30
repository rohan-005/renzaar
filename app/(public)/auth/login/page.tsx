/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc"; // Google icon

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email first");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] p-6">
      <form
        onSubmit={handleLogin}
        className="bg-[#1e1e1e] rounded-xl p-8 w-full max-w-md flex flex-col gap-4 border border-[#333]"
      >
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl text-[#00f7ff] font-semibold text-center">
          Welcome Back!
        </h2>

        {/* Inputs */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00f7ff]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00f7ff]"
        />

        {/* Login Button */}
        <button
          type="submit"
          className="w-full text-lg bg-[#00f7ff] text-black font-semibold rounded-lg py-2 hover:bg-[#00d4ff] transition duration-200"
        >
          Login
        </button>

        {/* Google Sign-In */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 text-lg bg-white text-black font-semibold rounded-lg py-2 hover:bg-gray-100 transition duration-200"
        >
          <FcGoogle size={24} /> Sign in with Google
        </button>

        {/* Forgot Password */}
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-center text-[#00f7ff] hover:underline text-sm cursor-pointer mt-2"
        >
          Forgot Password?
        </button>

        {/* Signup Link */}
        <p className="text-gray-300 text-center mt-2">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-[#ff4c4c] font-semibold hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
