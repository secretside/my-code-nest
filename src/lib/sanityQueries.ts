import { queryOptions } from "@tanstack/react-query";
import { sanityFetch } from "@/lib/sanity";
import type { HeroData } from "@/components/Hero";

const STALE_TIME = 5 * 60 * 1000;

export interface AksaraItem {
  name: string;
  origin: string;
  slug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visual: any;
}

export interface GaleriItem {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
}

export interface HomeData {
  home: (HeroData & { aboutTitle?: string; aboutContent?: string }) | null;
  aksara: AksaraItem[];
  galeri: GaleriItem[];
}

export interface AksaraDetail {
  name: string;
  origin: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visual: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  audio?: string;
}

export interface PrasastiItem {
  name: string;
  message: string;
  scriptType: string;
  txHash: string;
  txUrl: string;
  timestamp: string;
}

const HOME_QUERY = `{
  "home": *[_type == "homepage"][0],
  "aksara": *[_type == "aksara"][0...3]{ name, origin, "slug": slug.current, visual },
  "galeri": *[_type == "galeri"][0...3]{ title, image }
}`;

export const homeQueryOptions = queryOptions({
  queryKey: ["sanity", "home"],
  staleTime: STALE_TIME,
  queryFn: async (): Promise<HomeData> => {
    const data = await sanityFetch<HomeData>(HOME_QUERY);
    return { home: data?.home ?? null, aksara: data?.aksara ?? [], galeri: data?.galeri ?? [] };
  },
});

export const aksaraListQueryOptions = queryOptions({
  queryKey: ["sanity", "aksara-list"],
  staleTime: STALE_TIME,
  queryFn: async (): Promise<AksaraItem[]> => {
    const data = await sanityFetch<AksaraItem[]>(
      `*[_type == "aksara"]{ name, origin, "slug": slug.current, visual }`,
    );
    return data ?? [];
  },
});

export const aksaraDetailQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["sanity", "aksara", slug],
    staleTime: STALE_TIME,
    queryFn: () =>
      sanityFetch<AksaraDetail | null>(
        `*[_type == "aksara" && slug.current == $slug][0]{
        name, origin, visual, description, content, "audio": pronunciation.asset->url
      }`,
        { slug },
      ),
  });

export const prasastiListQueryOptions = queryOptions({
  queryKey: ["sanity", "prasasti-list"],
  staleTime: STALE_TIME,
  queryFn: async (): Promise<PrasastiItem[]> => {
    const data = await sanityFetch<PrasastiItem[]>(
      `*[_type == "prasasti"] { name, message, scriptType, txHash, txUrl, timestamp } | order(timestamp desc)`,
    );
    return data ?? [];
  },
});
