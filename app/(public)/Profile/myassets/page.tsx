"use client";

import React, { useEffect, useState } from "react";
import AssetList from "@/components/AssetList";
import Header from "@/components/Header";
import { Asset } from "@/types";
import { useAuth } from "@/context/AuthContext";
import Loader from "../../../Loader";
const MyAssetsPage = () => {
  const [myAssets, setMyAssets] = useState<Asset[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyAssets() {
      if (!user) return;

      const res = await fetch("/api/assets/list");
      const data = await res.json();

      // Filter assets uploaded by current user
      const userAssets = data.assets.filter(
        (a: Asset) => a.ownerId === user.uid
      );
      setMyAssets(userAssets);
    }

    fetchMyAssets();
  }, [user]);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // simulate loading duration
    return () => clearTimeout(timer);
  }, []);
  if (loading) return <Loader duration={1500} />;
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c1c4bb] via-[#7d866c] to-[#618260b4] text-black">
      <Header />
      <h1 className="text-3xl font-bold text-center my-6">My Assets</h1>
      {myAssets.length > 0 ? (
        <AssetList assets={myAssets} />
      ) : (
        <p className="text-center text-gray-400 mt-10">
          You haven&apos;t uploaded any assets yet.
        </p>
      )}
    </div>
  );
};

export default MyAssetsPage;
