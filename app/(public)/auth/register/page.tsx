/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordStrength === "Weak") {
      alert("Please choose a stronger password");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      router.push("/"); // redirect to homepage
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const checkPasswordStrength = (pwd: string) => {
    setPassword(pwd);
    if (pwd.length < 6) setPasswordStrength("Weak");
    else if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && pwd.length >= 8) setPasswordStrength("Strong");
    else setPasswordStrength("Medium");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] p-6">
      <form
        onSubmit={handleRegister}
        className="bg-[#1e1e1e] rounded-xl p-8 w-full max-w-md flex flex-col gap-4 border border-[#333]"
      >
        <h2 className="text-2xl sm:text-3xl text-[#00f7ff] font-semibold text-center">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00f7ff]"
        />
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
          onChange={(e) => checkPasswordStrength(e.target.value)}
          required
          className="bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00f7ff]"
        />
        {/* Password Strength */}
        {password && (
          <span className={`text-sm ${passwordStrength === "Weak" ? "text-red-500" : passwordStrength === "Medium" ? "text-yellow-400" : "text-green-400"}`}>
            Password Strength: {passwordStrength}
          </span>
        )}

        <button
          type="submit"
          className="w-full text-lg bg-[#00f7ff] text-black font-semibold rounded-lg py-2 hover:bg-[#00d4ff] transition duration-200"
        >
          Register
        </button>

        {/* Google Sign-Up */}
        <button
          type="button"
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center gap-2 text-lg bg-white text-black font-semibold rounded-lg py-2 hover:bg-gray-100 transition duration-200"
        >
          <FcGoogle size={24} /> Sign up with Google
        </button>

        <p className="text-gray-300 text-center mt-2">
          Already have an account?{" "}
          <a href="/auth/login" className="text-[#00f7ff] font-semibold hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
