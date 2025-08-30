/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import Loader from "@/app/Loader";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Inline error state
  const [success, setSuccess] = useState(""); // Inline success state
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader duration={1500} />;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess("Login successful!");
      setTimeout(() => router.push("/"), 1000); // Redirect after short delay
    } catch (err: any) {
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Invalid email or password");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setSuccess("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setSuccess("Login successful!");
      setTimeout(() => router.push("/"), 1000);
    } catch (err: any) {
      setError("Failed to login with Google");
    }
  };

  const handleForgotPassword = async () => {
  setError("");
  setSuccess("");


  try {
    // await sendPasswordResetEmail(auth, email);
    // setSuccess("Password reset email sent!");
    setTimeout(() => router.push("/auth/forgot-password"), 1500); // redirect after 1.5s
  } catch (err: any) {
    setError("Failed to send password reset email");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] p-6">
      <form
        onSubmit={handleLogin}
        className="bg-[#1e1e1e] rounded-xl p-8 w-full max-w-md flex flex-col gap-4 border border-[#333]"
      >
        <h2 className="text-2xl sm:text-3xl text-[#00f7ff] font-semibold text-center">
          Welcome Back!
        </h2>

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

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-400 text-sm">{success}</p>}

        <button
          type="submit"
          className="w-full text-lg bg-[#00f7ff] text-black font-semibold rounded-lg py-2 hover:bg-[#00d4ff] transition duration-200"
        >
          Login
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 text-lg bg-white text-black font-semibold rounded-lg py-2 hover:bg-gray-100 transition duration-200"
        >
          <FcGoogle size={24} /> Sign in with Google
        </button>

        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-center text-[#00f7ff] hover:underline text-sm cursor-pointer mt-2"
        >
          Forgot Password?
        </button>

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
