import { describe, expect, it } from "vitest";

import manifest from "@/app/manifest";

describe("Flownee web manifest", () => {
  it("publishes exact-logo standard and maskable PNG icons", () => {
    expect(manifest().icons).toEqual([
      {
        src: "/icons/flownee-icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/flownee-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/flownee-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ]);
  });
});
