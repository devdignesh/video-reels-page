import { NextResponse } from "next/server";
import videos from "@/data/videos.json";

export function GET() {
  return NextResponse.json(videos);
}
