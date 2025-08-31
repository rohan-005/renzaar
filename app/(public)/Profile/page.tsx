/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Header from "@/components/Header";
import React, { useState, useEffect } from "react";
import AssetUpload from "@/components/AssetUpload";
import AssetList from "@/components/AssetList";
import { useAuth } from "@/context/AuthContext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

const Profile = () => {
  const { user } = useAuth();
  const [assetName, setAssetName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [assets, setAssets] = useState<any[]>([]);

  useEffect(() => {
    if (user) fetchUserAssets();
  }, [user]);

  const fetchUserAssets = async () => {
    const res = await fetch(`/api/assets/get?excludeOwner=`);
    const data = await res.json();
    const userAssets = data.filter((a: any) => a.ownerId === user?.uid);
    setAssets(userAssets);
  };

  const handleAddAsset = async () => {
  if (!user || !assetName || !thumbnailFile || !zipFile) return;

  const formData = new FormData();
  formData.append("name", assetName);
  formData.append("description", description);
  formData.append("ownerId", user.uid);
  formData.append("thumbnail", thumbnailFile);
  formData.append("asset", zipFile);

  const res = await fetch("/api/assets/upload", {
    method: "POST",
    body: formData,
  });

  const result = await res.json();
  if (result.success) {
    setAssets(prev => [
      ...prev,
      {
        name: assetName,
        description,
        thumbnailUrl: result.thumbnailUrl,
        modelUrl: result.modelUrl,
        zipUrl: result.modelUrl,
      },
    ]);

    setAssetName("");
    setDescription("");
    setThumbnailFile(null);
    setZipFile(null);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c1c4bb] via-[#7d866c] to-[#618260b4]">
      <Header />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Upload Asset</h1>
        <AssetUpload
          assetName={assetName}
          setAssetName={setAssetName}
          description={description}
          setDescription={setDescription}
          handleThumbnail={(e) => setThumbnailFile(e.target.files?.[0] || null)}
          handleZip={(e) => setZipFile(e.target.files?.[0] || null)}
          handleAddAsset={handleAddAsset}
        />
        <h2 className="text-2xl font-bold mt-6 mb-4">Your Assets</h2>
        <AssetList assets={assets} />
      </div>
    </div>
  );
};

export default Profile;
