"use client";

import React, { useEffect, useState } from "react";
import AssetList from "@/components/AssetList";
import Header from "@/components/Header";
import { Asset } from "@/types"; // define Asset type
import { useAuth } from "@/context/AuthContext"; // assuming you have auth context

const AssetsPage = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const { user } = useAuth();

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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <h1 className="text-3xl font-bold text-center my-6">Assets</h1>
      <AssetList assets={assets} />
    </div>
  );
};

export default AssetsPage;
