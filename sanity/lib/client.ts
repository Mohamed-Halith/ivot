import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = "2024-01-01";

export const isSanityConfigured = projectId !== "placeholder" && projectId.length > 0;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// Write-capable client for server-side mutations (subscribe, confirm)
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});
