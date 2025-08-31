"use client";

import React from "react";
import AssetCard from "./AssetCard";
import { dummyAssets } from "@/lib/dummyAssets";

const AssetList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {dummyAssets.map((asset) => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </div>
  );
};

export default AssetList;
