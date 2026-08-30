import { createFileRoute, Link } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sanityFetch, urlForImage } from "@/lib/sanity";

interface AksaraItem {
  name: string;
  origin: string;
  slug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visual: any;
}

export const Route = createFileRoute("/ensiklopedia/")({
  head: () => ({
    meta: [
      { title: "Ensiklopedia Aksara Nusantara | Aksara Abadi" },
      {
        name: "description",
        content:
          "Pustaka digital ragam aksara Nusantara: Jawa, Sunda, Lontara, dan lainnya lengkap dengan sejarah dan pelafalannya.",
      },
      { property: "og:title", content: "Ensiklopedia Aksara Nusantara" },
      {
        property: "og:description",
        content: "Jelajahi ragam tulisan kuno Nusantara dalam satu pustaka digital.",
      },
    ],
  }),
  loader: async () => {
    const data = await sanityFetch<AksaraItem[]>(
      `*[_type == "aksara"]{ name, origin, "slug": slug.current, visual }`,
    );
    return data ?? [];
  },
  component: EnsiklopediaPage,
});

function EnsiklopediaPage() {
  const aksaras = Route.useLoaderData();

  return (
    <main className="relative min-h-screen bg-cream text-ink selection:bg-gold selection:text-parchment">
      <Navbar />
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/batik-ramp.png')] bg-repeat mix-blend-multiply" />

      <div className="container mx-auto px-6 lg:px-8 pt-32 pb-20 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-block py-1.5 px-4 rounded-full border border-gold bg-sand text-bark text-[10px] md:text-xs font-bold tracking-[0.2em] mb-4">
            PUSTAKA DIGITAL
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-ink">
            Ensiklopedia Aksara
          </h1>
          <p className="text-clay font-medium text-base md:text-lg leading-relaxed">
            Jelajahi ragam tulisan kuno Nusantara yang menjadi saksi bisu peradaban bangsa kita di
            masa lalu.
          </p>
        </div>

        {aksaras.length === 0 ? (
          <div className="text-center py-24 border-2 border-dashed border-gold/30 rounded-3xl bg-white/50">
            <p className="text-xl font-serif font-bold mb-2">Belum ada data aksara</p>
            <p className="text-sm text-clay">Tambahkan konten di Sanity Studio (backend).</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aksaras.map((item) => (
              <Link
                to="/ensiklopedia/$slug"
                params={{ slug: item.slug }}
                key={item.slug}
                className="group block bg-white border border-gold/20 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-gold/10 hover:-translate-y-2 transition-all duration-500"
              >
                <div className="relative h-56 w-full bg-sand overflow-hidden border-b border-gold/10">
                  {item.visual ? (
                    <img
                      src={urlForImage(item.visual).url()}
                      alt={item.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-clay/40 text-sm font-bold">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-8 relative">
                  <div className="absolute top-8 left-0 w-1 h-12 bg-gold rounded-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <p className="text-[10px] font-bold text-gold tracking-[0.2em] uppercase mb-3">
                    {item.origin}
                  </p>
                  <h2 className="font-serif text-2xl font-bold text-ink mb-4 group-hover:text-gold transition-colors">
                    {item.name}
                  </h2>
                  <div className="flex items-center text-clay text-xs font-bold tracking-widest uppercase mt-4 group-hover:text-bark transition-colors">
                    Pelajari Selengkapnya
                    <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300 text-lg">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
