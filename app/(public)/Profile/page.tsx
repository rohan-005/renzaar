"use client";

import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { FaUpload, FaBoxOpen, FaLock } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TargetCursor from "@/components/TargetCursor";
import Loader from "../../Loader";
import AssetUpload from "@/components/AssetUpload";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";

const Profile = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<"upload" | null>(null);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [showCursor, setShowCursor] = useState(false);

  const [assetName, setAssetName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [zipFile, setZipFile] = useState<File | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setShowCursor(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader duration={1500} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c1c4bb] via-[#7d866c] to-[#618260b4]">
      {showCursor && (
        <TargetCursor spinDuration={20} hideDefaultCursor={true} />
      )}
      <Header />

      <div className="max-w-5xl mx-auto p-6">
        {/* ✅ USER DETAILS */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4 mb-8">
          <Image
            src={user?.photoURL || "/dummy/profile.png"}
            alt="Profile"
            width={80}
            height={80}
            className="rounded-full border-4 border-indigo-500"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {user?.displayName || "Anonymous User"}
            </h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        {/* ✅ FUN BUTTONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Upload Asset Button */}
          <button
            onClick={() => setActiveSection("upload")}
            className="cursor-target bg-indigo-500/90 text-white py-8 rounded-2xl flex flex-col items-center hover:bg-indigo-600 transition shadow-lg text-center text-xl"
          >
            <FaUpload className="text-4xl mb-3" />
            <span className="font-bold">Upload Asset</span>
            <span className="text-sm italic opacity-80">
              Show off your masterpiece!
            </span>
          </button>

          {/* Your Assets Button */}
          <button
            onClick={() => router.push("/Profile/myassets")}
            className="cursor-target bg-green-500/90 text-white py-8 rounded-2xl flex flex-col items-center hover:bg-green-600 transition shadow-lg text-xl"
          >
            <FaBoxOpen className="text-4xl mb-3" />
            <span className="font-bold">Your Assets</span>
            <span className="text-sm italic opacity-80">
              Your personal vault!
            </span>
          </button>

          {/* Forgot Password Button */}
          <button
            onClick={() => router.push("/forgot-password")}
            className="cursor-target bg-red-500/90 text-white py-8 rounded-2xl flex flex-col items-center hover:bg-red-600 transition shadow-lg text-xl"
          >
            <FaLock className="text-4xl mb-3" />
            <span className="font-bold">Forgot Password</span>
            <span className="text-sm italic opacity-80">Oops! Bad memory?</span>
          </button>
        </div>

        {/* ✅ UPLOAD MODAL */}
        <Dialog
          open={activeSection === "upload"}
          onClose={() => setActiveSection(null)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                Upload Your 3D Asset 🚀
              </h2>
              <p className="text-gray-600 mb-4 text-sm">
                Did you know? The first 3D model ever created was of a teapot!
                🫖
              </p>

              <AssetUpload
                assetName={assetName}
                setAssetName={setAssetName}
                description={description}
                setDescription={setDescription}
                handleThumbnail={(e) =>
                  setThumbnailFile(e.target.files?.[0] || null)
                }
                handleZip={(e) => setZipFile(e.target.files?.[0] || null)}
                handleAddAsset={async () => {
                  console.log("Uploading asset...");
                  if (!user || !assetName || !thumbnailFile || !zipFile) {
                    console.error("Missing required fields");
                    return;
                  }

                  const formData = new FormData();
                  formData.append("name", assetName);
                  formData.append("description", description);
                  formData.append("ownerId", user.uid);
                  formData.append("thumbnail", thumbnailFile);
                  formData.append("asset", zipFile);

                  try {
                    const res = await fetch("/api/assets/upload", {
                      method: "POST",
                      body: formData,
                    });

                    if (!res.ok) {
                      console.error("Upload failed");
                      return;
                    }

                    const result = await res.json();
                    console.log("Upload successful:", result);

                    // ✅ Optionally, show success toast
                    // toast.success("Asset uploaded successfully!");

                    setAssetName("");
                    setDescription("");
                    setThumbnailFile(null);
                    setZipFile(null);

                    // ✅ Close modal after upload
                    setActiveSection(null);
                  } catch (error) {
                    console.error("Error uploading asset:", error);
                    // toast.error("Upload failed. Try again.");
                  }
                }}
              />

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setActiveSection(null)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Profile;
