import { NextRequest, NextResponse } from "next/server";
import {
  getConfigurationHealth,
  getConfigHealthAllowedIps,
  getConfigHealthToken,
} from "@/lib/env";

export const dynamic = "force-dynamic";

function getRequestIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const [first] = forwardedFor.split(",");
    if (first?.trim()) return first.trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp?.trim()) return realIp.trim();
  return null;
}

export async function GET(request: NextRequest) {
  const bearer = getConfigHealthToken();
  const allowedIps = getConfigHealthAllowedIps();

  if (!bearer && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Config health endpoint is disabled" }, { status: 503 });
  }

  if (allowedIps.length > 0) {
    const requestIp = getRequestIp(request);
    if (!requestIp || !allowedIps.includes(requestIp)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  if (bearer) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${bearer}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.json(getConfigurationHealth());
}
