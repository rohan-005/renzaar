"use client";

import React from "react";
import AssetCard from "./AssetCard";

interface Asset {
  id?: string;
  name: string;
  description?: string;
  thumbnailUrl: string;
  modelUrl: string;
  zipUrl: string;
}

interface AssetListProps {
  assets?: Asset[]; // Make it optional
}

const AssetList: React.FC<AssetListProps> = ({ assets = [] }) => {
  if (assets.length === 0) return <p className="text-white">No assets uploaded yet.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {assets.map((asset, i) => (
        <AssetCard key={i} asset={asset} />
      ))}
    </div>
  );
};

export default AssetList;
