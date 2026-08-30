import { createClient } from "@sanity/client";
import createImageUrlBuilder from "@sanity/image-url";

export const projectId = import.meta.env["VITE_SANITY_PROJECT_ID"] || "25x1yw4c";
export const dataset = import.meta.env["VITE_SANITY_DATASET"] || "production";
export const apiVersion = import.meta.env["VITE_SANITY_API_VERSION"] || "2024-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

const imageBuilder = createImageUrlBuilder({ projectId, dataset });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlForImage = (source: any) => imageBuilder.image(source).auto("format").fit("max");

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}) {
  try {
    return (await client.fetch<T>(query, params)) as T;
  } catch (error) {
    console.error("Sanity fetch failed", error);
    return null as unknown as T;
  }
}
