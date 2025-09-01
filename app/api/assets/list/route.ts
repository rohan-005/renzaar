import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("game_assets");
    const collection = db.collection("assets");

    const assets = await collection.find({}).toArray();

    return NextResponse.json({ success: true, assets });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to fetch assets" });
  }
}
