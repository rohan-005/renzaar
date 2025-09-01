"use client";

import { FC, useState } from "react";
import toast from "react-hot-toast";

interface AssetUploadProps {
  assetName: string;
  setAssetName: (name: string) => void;
  description: string;
  setDescription: (desc: string) => void;
  handleThumbnail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleZip: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddAsset: () => Promise<void>; // Make it async for upload
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
  const [isUploading, setIsUploading] = useState(false);

  const startUpload = async () => {
    if (!assetName || !description) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsUploading(true);
    toast.loading("Uploading asset...");

    try {
      await handleAddAsset();
      toast.dismiss();
      toast.success("Asset uploaded successfully!");
      setAssetName("");
      setDescription("");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to upload asset");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload New Asset</h2>

      {/* Asset Name */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Asset Name</label>
        <input
          type="text"
          placeholder="Enter asset name"
          value={assetName}
          onChange={(e) => setAssetName(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Description</label>
        <textarea
          placeholder="Write a short description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={3}
        />
      </div>

      {/* Thumbnail Upload */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Thumbnail Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnail}
          className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
        />
      </div>

      {/* ZIP Upload */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-1">3D Model ZIP File</label>
        <input
          type="file"
          accept=".zip"
          onChange={handleZip}
          className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 cursor-pointer"
        />
      </div>

      {/* Add Asset Button */}
      <button
        onClick={startUpload}
        disabled={isUploading}
        className={`w-full py-3 text-lg font-semibold rounded-lg transition-all ${
          isUploading
            ? "bg-gray-700 text-gray-300 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 text-white"
        }`}
      >
        {isUploading ? (
          <div className="flex justify-center items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            Uploading...
          </div>
        ) : (
          "Add Asset"
        )}
      </button>
    </div>
  );
};

export default AssetUpload;
