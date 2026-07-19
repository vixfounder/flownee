import type { NextRequest } from "next/server";

function firstForwardedValue(value: string | null): string | null {
  const first = value?.split(",", 1)[0]?.trim();
  return first || null;
}

function publicRequestOrigin(request: NextRequest): string | null {
  const host =
    request.headers.get("host")?.trim() ||
    firstForwardedValue(request.headers.get("x-forwarded-host"));
  if (!host) {
    return request.nextUrl.origin;
  }

  const forwardedProtocol = firstForwardedValue(
    request.headers.get("x-forwarded-proto"),
  );
  const protocol = forwardedProtocol || request.nextUrl.protocol.slice(0, -1);

  try {
    return new URL(`${protocol}://${host}`).origin;
  } catch {
    return null;
  }
}

export function isCrossSiteRequest(request: NextRequest): boolean {
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return true;
  }

  const requestOrigin = request.headers.get("origin");
  if (requestOrigin === null) {
    return false;
  }

  let normalizedOrigin: string;
  try {
    normalizedOrigin = new URL(requestOrigin).origin;
  } catch {
    return true;
  }

  const expectedOrigin = publicRequestOrigin(request);
  return expectedOrigin === null || normalizedOrigin !== expectedOrigin;
}
