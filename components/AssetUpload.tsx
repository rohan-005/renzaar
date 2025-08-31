"use client";

import { FC } from "react";

interface AssetUploadProps {
  assetName: string;
  setAssetName: (name: string) => void;
  description: string;
  setDescription: (desc: string) => void;
  handleThumbnail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleZip: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddAsset: () => void;
}

const AssetUpload: FC<AssetUploadProps> = ({
  assetName,
  setAssetName,
  description,
  setDescription,
  handleThumbnail,
  handleZip,
  handleAddAsset,
}) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Asset Name"
        value={assetName}
        onChange={(e) => setAssetName(e.target.value)}
        className="border p-2 mb-2 w-full rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 mb-2 w-full rounded"
      />
      <input type="file" accept="image/*" onChange={handleThumbnail} className="mb-2" />
      <input type="file" accept=".zip" onChange={handleZip} className="mb-2" />
      <button
        onClick={handleAddAsset}
        className="block px-4 py-2 bg-green-600 text-white rounded"
      >
        Add Asset
      </button>
    </div>
  );
};

export default AssetUpload;
