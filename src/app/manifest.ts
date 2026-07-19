import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Flownee — What makes sense next",
    short_name: "Flownee",
    description:
      "A calm, voice-first assistant for everyday intentions and practical next actions.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#525aff",
    orientation: "portrait-primary",
    icons: [
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
    ],
  };
}
