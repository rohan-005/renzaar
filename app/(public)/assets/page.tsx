"use client";

import React, { useEffect, useState } from "react";
import AssetList from "@/components/AssetList";
import Header from "@/components/Header";
import { Asset } from "@/types";
import { useAuth } from "@/context/AuthContext";
import TargetCursor from "@/components/TargetCursor";
import Loader from "../../Loader";

const AssetsPage = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    async function fetchAssets() {
      if (!user) return;

      const res = await fetch("/api/assets/list");
      const data = await res.json();

      // Exclude assets uploaded by current user
      const otherAssets = data.assets.filter((a: Asset) => a.ownerId !== user.uid);
      setAssets(otherAssets);
    }

    fetchAssets();
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      setShowCursor(window.innerWidth >= 1024); // show only on lg and above
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // simulate loading duration
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader duration={1500} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c1c4bb] via-[#7d866c] to-[#618260b4] text-black">
      {showCursor && <TargetCursor spinDuration={20} hideDefaultCursor={true} />}
      <Header />
      <h1 className="text-3xl font-bold text-center my-6">Assets</h1>

      {/* Remove button wrapper */}
      <AssetList assets={assets} />
    </div>
  );
};

export default AssetsPage;
