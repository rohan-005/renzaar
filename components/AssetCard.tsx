"use client";

import React, { useState } from "react";
import Image from "next/image";
import ModelViewer from "./ModelViewer";

interface Asset {
  id?: string;
  name: string;
  description?: string;
  thumbnailUrl: string;
  modelUrl: string;
  zipUrl: string;
}

interface Props {
  asset: Asset;
}

const AssetCard: React.FC<Props> = ({ asset }) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="border rounded-lg p-2 flex flex-col items-center gap-2 bg-gray-800">
      <Image
        src={asset.thumbnailUrl}
        width={200}
        height={200}
        alt={asset.name}
        className="rounded-lg object-cover"
        priority
      />
      <h3 className="text-white font-bold">{asset.name}</h3>
      <button
        className="px-2 py-1 bg-blue-600 text-white rounded"
        onClick={() => setShowPreview(true)}
      >
        Preview
      </button>

      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white px-4 py-2 bg-red-600 rounded"
            onClick={() => setShowPreview(false)}
          >
            Close
          </button>
          <div className="flex w-4/5 h-4/5 bg-gray-900 rounded-lg overflow-hidden">
            <div className="w-1/2">
              <ModelViewer url={asset.modelUrl} width="100%" height="100%" />
            </div>
            <div className="w-1/2 p-4 text-white flex flex-col gap-4">
              <h2 className="text-2xl font-bold">{asset.name}</h2>
              <p>{asset.description}</p>
              <a
                href={asset.zipUrl}
                download
                className="px-4 py-2 bg-green-600 rounded w-max"
              >
                Download
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetCard;
