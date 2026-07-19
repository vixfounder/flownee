import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import { isCrossSiteRequest } from "@/lib/server/request-origin";

describe("isCrossSiteRequest", () => {
  it("accepts the public origin when a proxy rewrites the internal request URL", () => {
    const request = new NextRequest("http://internal:3000/api/transcribe", {
      headers: {
        host: "flownee-build-week.netlify.app",
        origin: "https://flownee-build-week.netlify.app",
        "sec-fetch-site": "same-origin",
        "x-forwarded-proto": "https",
      },
    });

    expect(isCrossSiteRequest(request)).toBe(false);
  });

  it("rejects a different origin even when it claims a same-site fetch", () => {
    const request = new NextRequest("http://internal:3000/api/plan", {
      headers: {
        host: "flownee-build-week.netlify.app",
        origin: "https://attacker.example",
        "sec-fetch-site": "same-site",
        "x-forwarded-proto": "https",
      },
    });

    expect(isCrossSiteRequest(request)).toBe(true);
  });

  it("rejects an explicitly cross-site browser request", () => {
    const request = new NextRequest("https://flownee-build-week.netlify.app/api/plan", {
      headers: {
        origin: "https://flownee-build-week.netlify.app",
        "sec-fetch-site": "cross-site",
      },
    });

    expect(isCrossSiteRequest(request)).toBe(true);
  });
});
