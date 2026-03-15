import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function GET() {
  try {
    const response = await fetch(`${env.API_URL}/health`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("API not responding");
    }

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      api: "connected",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 },
    );
  }
}