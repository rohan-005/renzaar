import React from "react";
import AssetList from "@/components/AssetList";
import Header from "@/components/Header";

const AssetsPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header/>
      <h1 className="text-3xl font-bold text-center my-6">Assets</h1>
      <AssetList />
    </div>
  );
};

export default AssetsPage;
