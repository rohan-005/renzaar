/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
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
        onSubmit={handleReset}
        className="bg-[#1e1e1e] rounded-xl p-8 w-full max-w-md flex flex-col gap-4 border border-[#333]"
      >
        <h2 className="text-2xl sm:text-3xl text-[#00f7ff] font-semibold text-center">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00f7ff]"
        />

        <button
          type="submit"
          className="w-full text-lg bg-[#00f7ff] text-black font-semibold rounded-lg py-2 hover:bg-[#00d4ff] transition duration-200"
        >
          Reset Password
        </button>

        <p className="text-gray-300 text-center mt-2">
          Remembered your password?{" "}
          <Link href="/auth/login" className="text-[#00f7ff] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
