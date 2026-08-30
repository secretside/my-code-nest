import { createFileRoute, Link } from "@tanstack/react-router";
import { PortableText } from "@portabletext/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sanityFetch, urlForImage } from "@/lib/sanity";

interface AksaraDetail {
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

export const Route = createFileRoute("/ensiklopedia/$slug")({
  loader: async ({ params }) => {
    const data = await sanityFetch<AksaraDetail | null>(
      `*[_type == "aksara" && slug.current == $slug][0]{
        name, origin, visual, description, content, "audio": pronunciation.asset->url
      }`,
      { slug: params.slug },
    );
    return data;
  },
  head: ({ loaderData }) => {
    const name = loaderData?.name ?? "Detail Aksara";
    const title = `${name} | Ensiklopedia Aksara Abadi`;
    const description = `Pelajari sejarah, bentuk, dan pelafalan ${name} dari ${loaderData?.origin ?? "Nusantara"}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: DetailAksaraPage,
});

function DetailAksaraPage() {
  const data = Route.useLoaderData();

  if (!data) {
    return (
      <div className="min-h-screen bg-cream text-ink">
        <Navbar />
        <div className="container mx-auto px-6 pt-40 text-center">
          <h1 className="text-3xl font-serif font-bold mb-4">Data tidak ditemukan</h1>
          <p className="mb-8 text-clay">Aksara yang Anda cari mungkin belum didokumentasikan.</p>
          <Link
            to="/ensiklopedia"
            className="text-gold hover:text-bark font-bold tracking-widest uppercase transition-colors"
          >
            ← Kembali ke Daftar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-cream text-ink selection:bg-gold selection:text-parchment">
      <Navbar />
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/batik-ramp.png')] bg-repeat mix-blend-multiply" />

      <div className="container mx-auto px-6 lg:px-12 pt-32 pb-20 max-w-4xl relative z-10">
        <Link
          to="/ensiklopedia"
          className="inline-flex items-center text-clay hover:text-gold mb-12 transition-colors text-xs font-bold tracking-[0.2em] uppercase group"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform text-lg">←</span>{" "}
          KEMBALI KE DAFTAR
        </Link>

        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start mb-16 border-b border-gold/20 pb-16">
          <div className="relative w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden shadow-2xl bg-white border-8 border-white ring-1 ring-gold/20 rotate-1 hover:rotate-0 transition-transform duration-500">
            {data.visual ? (
              <img
                src={urlForImage(data.visual).url()}
                alt={data.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-sand text-clay/50 font-bold">
                No Image
              </div>
            )}
          </div>

          <div className="w-full md:w-2/3 flex flex-col items-center md:items-start text-center md:text-left">
            <span className="inline-block py-1.5 px-4 rounded-full border border-gold bg-sand text-bark text-[10px] font-bold tracking-[0.2em] mb-6 uppercase">
              {data.origin}
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-ink mb-8 leading-tight">
              {data.name}
            </h1>

            {data.audio && (
              <div className="w-full bg-white p-6 rounded-xl border border-gold/20 shadow-sm flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🔊</span>
                  <p className="text-[10px] font-bold text-gold uppercase tracking-widest">
                    Dengarkan Pelafalan
                  </p>
                </div>
                <audio controls src={data.audio} className="w-full h-8 accent-gold" />
              </div>
            )}
          </div>
        </div>

        <div className="prose prose-lg prose-headings:font-serif prose-headings:text-ink prose-p:text-clay prose-a:text-gold prose-strong:text-bark prose-blockquote:border-gold prose-li:text-clay max-w-none">
          {data.description && (
            <div className="text-xl md:text-2xl font-serif text-bark leading-relaxed mb-12">
              <PortableText value={data.description} />
            </div>
          )}
          <div className="w-24 h-1 bg-gold mb-12 opacity-50"></div>
          {data.content && <PortableText value={data.content} />}
        </div>
      </div>
      <Footer />
    </main>
  );
}
