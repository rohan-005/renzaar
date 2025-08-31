import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  const excludeOwner = req.nextUrl.searchParams.get("excludeOwner");

  try {
    const client = await clientPromise;
    const db = client.db("game_assets");
    const collection = db.collection("assets");

    const query = excludeOwner ? { ownerId: { $ne: excludeOwner } } : {};
    const assets = await collection.find(query).toArray();

    return NextResponse.json(assets);
  } catch (err) {
    return NextResponse.json({ success: false, error: err });
  }
}
