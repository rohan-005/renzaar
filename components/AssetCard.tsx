/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";
import ModelViewer from "./ModelViewer";
import TiltedCard from "./TiltedCard";
import {
  FiUser,
  FiCalendar,
  FiTag,
  FiDownload,
  FiCreditCard,
  FiX,
} from "react-icons/fi";

type NullableDate = string | number | Date | undefined | null;

interface Comment {
  id: number;
  text: string;
  by?: string;
  at?: number;
}

interface Asset {
  id?: string;
  name: string;
  description?: string;
  thumbnailUrl: string;
  modelUrl: string;
  zipUrl: string;

  // ——— Common variants your API might use ———
  createdBy?: string;
  createdByName?: string;
  author?: string;
  ownerName?: string;
  user?: { name?: string; username?: string; displayName?: string };

  createdOn?: NullableDate;
  createdAt?: NullableDate;
  uploadedAt?: NullableDate;
  timestamp?: NullableDate;

  price?: number; // 0/undefined = free
  tags?: string[];
}

interface Props {
  asset: Asset;
}

const AssetCard: React.FC<Props> = ({ asset }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, text: "Awesome model!", by: "Alex", at: Date.now() - 3600_000 },
    {
      id: 2,
      text: "The roof details are neat 👏",
      by: "Mina",
      at: Date.now() - 1800_000,
    },
  ]);

  // Resolve file extension
  const fileExt = useMemo(() => {
    const ext = asset.modelUrl ? asset.modelUrl.split(".").pop() : "";
    return (ext || "").toLowerCase();
  }, [asset.modelUrl]);

  // Robust creator name resolution (covers many API field variants)
  const creatorName = useMemo(() => {
    return (
      asset.createdBy ||
      asset.createdByName ||
      asset.author ||
      asset.ownerName ||
      asset.user?.displayName ||
      asset.user?.name ||
      asset.user?.username ||
      ""
    );
  }, [asset]);

  // Robust created-on resolution
  const createdOnText = useMemo(() => {
    const raw: NullableDate =
      asset.createdOn ||
      asset.createdAt ||
      asset.uploadedAt ||
      asset.timestamp;

    if (!raw && raw !== 0) return "—";

    const d = new Date(raw as any);
    if (isNaN(d.getTime())) return "—";

    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, [asset]);

  const isFree = asset.price == null || asset.price <= 0;

  const addComment = () => {
    if (!comment.trim()) return;
    setComments((prev) => [
      ...prev,
      { id: Date.now(), text: comment.trim(), by: "You", at: Date.now() },
    ]);
    setComment("");
  };

  return (
    <div className="flex flex-col items-center gap-2 ">
      {/* Thumbnail Card */}
      <div
        className="flex flex-col items-center gap-2  cursor-target"
        onClick={() => setShowPreview(true)}
      >
        <TiltedCard
          imageSrc={asset.thumbnailUrl}
          altText={asset.name}
          captionText=""
          containerHeight="300px"
          containerWidth="300px"
          imageHeight="300px"
          imageWidth="300px"
          rotateAmplitude={10}
          scaleOnHover={1.1}
          showMobileWarning={false}
          showTooltip={false}
          displayOverlayContent={false}
        />
      </div>

      {/* Asset Name */}
      <h3 className="text-white  font-semibold text-3xl">{asset.name}</h3>

      {/* Modal */}
      {showPreview && (
        <div className="cursor fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          {/* Close */}
          <button
            className="absolute top-4 right-4 inline-flex items-center gap-2 text-white px-3 py-2 rounded bg-red-600 hover:bg-red-700"
            onClick={() => setShowPreview(false)}
          >
            <FiX /> Close
          </button>

          {/* Modal Content (single-color surface) */}
          <div className="flex w-11/12 h-5/6 bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            {/* Left: Model Preview (same color as right to keep it unified) */}
            <div className="w-1/2 h-full flex items-center justify-center bg-amber-100">
              {fileExt === "glb" || fileExt === "gltf" ? (
                <ModelViewer url={asset.modelUrl} width="100%" height="100%" />
              ) : (
                <div className="text-white text-center px-6">
                  <p className="text-lg font-semibold text-black">
                    No 3D Preview 
                  </p>
                  <p className="text-sm mt-2 text-gray-800">
                    Please upload a <strong>.glb</strong> or <strong>.gltf</strong> file for preview.<br />
                    <a href="https://convert3d.org/fbx-to-glb/app" className="text-blue-500 underline">Convert your asset</a>
                  </p>
                </div>
              )}
            </div>

            {/* Right: Details + Comments */}
            <div className="w-1/2 h-full flex flex-col">
              {/* Header strip */}
              <div className="px-6 py-4 bg-gradient-to-r from-indigo-700/30 to-purple-700/30 border-b border-white/10">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {asset.name}
                </h2>
                {asset.description ? (
                  <p className="mt-1 text-sm text-gray-300">
                    {asset.description}
                  </p>
                ) : null}
              </div>

              {/* Details */}
              <div className="px-6 py-5 space-y-4">
                {/* Meta grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-gray-200">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600/20">
                      <FiUser />
                    </span>
                    <div className="text-sm">
                      <p className="text-gray-400 leading-tight">Created by</p>
                      <p className="font-medium">
                        {creatorName || "Unknown"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-200">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600/20">
                      <FiCalendar />
                    </span>
                    <div className="text-sm">
                      <p className="text-gray-400 leading-tight">Created on</p>
                      <p className="font-medium">{createdOnText}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-200">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600/20">
                      <FiTag />
                    </span>
                    <div className="text-sm">
                      <p className="text-gray-400 leading-tight">Format</p>
                      <p className="font-medium">{fileExt?.toUpperCase() || "—"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-200">
                    <span
                      className={`inline-flex h-7 px-3 items-center justify-center rounded-lg text-sm font-semibold ${
                        isFree
                          ? "bg-emerald-600/20 text-emerald-300"
                          : "bg-blue-600/20 text-blue-300"
                      }`}
                    >
                      {isFree ? "Free" : `$${asset.price!.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                {/* Action */}
                <div className="pt-1">
                  {isFree ? (
                    <a
                      href={asset.zipUrl}
                      download
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow"
                    >
                      <FiDownload /> Download
                    </a>
                  ) : (
                    <button
                      onClick={() => alert("Redirect to payment (to implement)")}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium shadow"
                    >
                      <FiCreditCard /> Proceed to Payment
                    </button>
                  )}
                </div>

                {/* Tags (optional, shows only if provided) */}
                {asset.tags?.length ? (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {asset.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-200"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              {/* Divider */}
              <div className="border-t border-white/10" />

              {/* Comments */}
              <div className="flex-1 min-h-0 px-6 py-5 flex flex-col">
                <h3 className="text-lg font-semibold text-white">Comments</h3>

                <div className="mt-3 flex-1 overflow-y-auto rounded-lg border border-white/10 bg-white/5 p-3 space-y-2">
                  {comments.length ? (
                    comments.map((c) => (
                      <div
                        key={c.id}
                        className="bg-gray-800/60 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-100"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">
                            {c.by || "Anonymous"}
                          </span>
                          {c.at ? (
                            <span className="text-xs text-gray-400">
                              {new Date(c.at).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          ) : null}
                        </div>
                        <p className="leading-snug">{c.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No comments yet.</p>
                  )}
                </div>

                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    placeholder="Write a comment…"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                  <button
                    onClick={addComment}
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetCard;
