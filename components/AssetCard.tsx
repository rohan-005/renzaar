"use client";

import React, { useState } from "react";
import Image from "next/image";
import ModelViewer from "./ModelViewer";
import JSZip from "jszip";
import { Asset } from "@/lib/dummyAssets";

interface Props {
  asset: Asset;
}

const AssetCard: React.FC<Props> = ({ asset }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [modelBlobUrl, setModelBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePreview = async () => {
    setLoading(true);
    try {
      // Fetch the zip file
      const response = await fetch(asset.zipUrl);
      const arrayBuffer = await response.arrayBuffer();

      // Load zip
      const zip = await JSZip.loadAsync(arrayBuffer);

      // Find the first .glb file in the zip
      const glbFile = Object.values(zip.files).find((f) =>
        f.name.toLowerCase().endsWith(".glb")
      );

      if (!glbFile) throw new Error("No .glb file found in zip");

      const glbData = await glbFile.async("blob");
      const blobUrl = URL.createObjectURL(glbData);
      setModelBlobUrl(blobUrl);
      setShowPreview(true);
    } catch (err) {
      console.error("Failed to load model from zip:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-2 flex flex-col items-center gap-2">
      <Image
        src={asset.thumbnail}
        width={200}
        height={200}
        alt={asset.name}
        className="rounded-lg object-cover"
        priority
      />
      <h3 className="text-white font-bold">{asset.name}</h3>
      <div className="flex gap-2">
        <button
          className="px-2 py-1 bg-blue-600 text-white rounded"
          onClick={handlePreview}
          disabled={loading}
        >
          {loading ? "Loading..." : "Preview"}
        </button>
        <a
          href={asset.zipUrl}
          download
          className="px-2 py-1 bg-green-600 text-white rounded"
        >
          Download
        </a>
      </div>

      {showPreview && modelBlobUrl && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white px-4 py-2 bg-red-600 rounded"
            onClick={() => {
              setShowPreview(false);
              URL.revokeObjectURL(modelBlobUrl);
              setModelBlobUrl(null);
            }}
          >
            Close
          </button>
          <div className="w-[600px] h-[400px]">
            <ModelViewer url={modelBlobUrl} width="100%" height="100%" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetCard;
