import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import AdmZip from "adm-zip";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const ownerId = formData.get("ownerId") as string;

    const thumbnailFile = formData.get("thumbnail") as File;
    const assetFile = formData.get("asset") as File;

    const uploadsDir = path.join(process.cwd(), "public/uploads");
    await mkdir(uploadsDir, { recursive: true });

    // Save thumbnail
    const thumbPath = path.join(uploadsDir, thumbnailFile.name);
    await writeFile(thumbPath, Buffer.from(await thumbnailFile.arrayBuffer()));
    const thumbnailUrl = `/uploads/${thumbnailFile.name}`;

    // Save original asset
    const assetPath = path.join(uploadsDir, assetFile.name);
    await writeFile(assetPath, Buffer.from(await assetFile.arrayBuffer()));

    let modelUrl: string;
    let zipUrl: string;

    if (assetFile.name.endsWith(".zip")) {
      // Extract ZIP
      const zip = new AdmZip(assetPath);
      const extractDir = path.join(uploadsDir, name.replace(/\s+/g, "_"));
      await mkdir(extractDir, { recursive: true });
      zip.extractAllTo(extractDir, true);

      // Find first .glb or .gltf file
      const extractedFiles = zip.getEntries();
      const modelFile = extractedFiles.find(f =>
        f.entryName.endsWith(".glb") || f.entryName.endsWith(".gltf")
      );

      if (!modelFile) {
        return NextResponse.json({
          success: false,
          error: "No .glb or .gltf file found inside ZIP",
        });
      }

      modelUrl = `/uploads/${name.replace(/\s+/g, "_")}/${modelFile.entryName}`;
      zipUrl = `/uploads/${assetFile.name}`; // ZIP for download
    } else {
      // Direct GLB/FBX/OBJ upload
      modelUrl = `/uploads/${assetFile.name}`;
      zipUrl = modelUrl;
    }

    // Save metadata to MongoDB
    const client = await clientPromise;
    const db = client.db("game_assets");
    const collection = db.collection("assets");

    const result = await collection.insertOne({
      name,
      description,
      thumbnailUrl,
      modelUrl,
      zipUrl,
      ownerId,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      assetId: result.insertedId,
      thumbnailUrl,
      modelUrl,
      zipUrl,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Upload failed" });
  }
}
