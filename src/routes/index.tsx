import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PageSkeleton from "@/components/PageSkeleton";
import { urlForImage } from "@/lib/sanity";
import { homeQueryOptions } from "@/lib/sanityQueries";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aksara Abadi — Melestarikan Aksara Nusantara di Blockchain" },
      {
        name: "description",
        content:
          "Jelajahi ensiklopedia aksara Nusantara, lihat galeri warisan budaya, dan abadikan namamu dalam aksara Jawa, Sunda, atau Lontara.",
      },
      { property: "og:title", content: "Aksara Abadi — Warisan Aksara Nusantara" },
      {
        property: "og:description",
        content: "Ensiklopedia aksara Nusantara dan prasasti digital berbasis blockchain.",
      },
    ],
  }),
  loader: async (): Promise<HomeData> => {
    const data = await sanityFetch<HomeData>(HOME_QUERY);
    return { home: data?.home ?? null, aksara: data?.aksara ?? [], galeri: data?.galeri ?? [] };
  },
  component: Index,
});

function Index() {
  const { home, aksara, galeri } = Route.useLoaderData();

  return (
    <main className="bg-white selection:bg-gold selection:text-ink">
      <Navbar />
      <Hero data={home} />

      <section className="py-24 bg-ink text-parchment relative overflow-hidden border-t border-gold/20">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/batik-ramp.png')] bg-repeat" />
        <div className="container mx-auto px-6 lg:px-8 text-center relative z-10 max-w-4xl">
          <span className="inline-block py-1 px-4 mb-6 rounded-full border border-gold/50 text-gold text-[10px] font-bold tracking-[0.3em] uppercase">
            Misi Preservasi
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8 leading-tight">
            {home?.aboutTitle || "Tentang Aksara Abadi"}
          </h2>
          <p className="text-lg md:text-xl font-light leading-relaxed text-parchment/80">
            {home?.aboutContent ||
              "Kami hadir untuk melestarikan aksara nusantara melalui teknologi modern. Menggabungkan kekayaan budaya masa lalu dengan keabadian teknologi Blockchain."}
          </p>
        </div>
      </section>

      <section className="py-24 bg-cream text-ink">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl font-bold mb-4 text-ink">Jelajahi Aksara</h2>
              <p className="text-clay text-lg">
                Kenali ragam tulisan dari berbagai penjuru nusantara yang mulai terlupakan.
              </p>
            </div>
            <Link
              to="/ensiklopedia"
              className="hidden md:inline-flex px-6 py-3 border border-bark rounded-md text-bark font-bold text-sm tracking-widest hover:bg-bark hover:text-parchment transition-all duration-300 uppercase"
            >
              Lihat Semua Aksara
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aksara.map((item) => (
              <Link
                key={item.slug}
                to="/ensiklopedia/$slug"
                params={{ slug: item.slug }}
                className="group block"
              >
                <div className="relative h-72 bg-sand rounded-xl overflow-hidden mb-6 shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 border border-gold/20">
                  {item.visual ? (
                    <img
                      src={urlForImage(item.visual).url()}
                      alt={item.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-clay/40">
                      No Image
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-parchment/90 backdrop-blur border border-gold/30 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-bark">
                    {item.origin}
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-bold text-ink group-hover:text-gold transition-colors flex items-center gap-2">
                  {item.name}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-lg">
                    →
                  </span>
                </h3>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link
              to="/ensiklopedia"
              className="inline-block px-8 py-4 bg-bark text-parchment rounded-md font-bold text-xs uppercase tracking-widest"
            >
              Lihat Semua Aksara
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-bark relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gold rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold rounded-full blur-[120px] opacity-20"></div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-ink rounded-full flex items-center justify-center text-4xl mb-8 border-2 border-gold shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            ✍️
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-parchment mb-6">
            Abadikan Namamu
          </h2>
          <p className="max-w-2xl text-parchment/80 text-lg md:text-xl mb-12 font-light leading-relaxed">
            Gunakan teknologi Blockchain untuk menyimpan namamu dalam bentuk Aksara Jawa. Jadilah
            bagian dari sejarah digital yang tak terhapuskan.
          </p>
          <Link
            to="/prasasti"
            className="bg-gold text-ink px-10 py-5 rounded-lg font-bold text-sm uppercase tracking-[0.15em] hover:bg-parchment hover:scale-105 transition-all shadow-xl"
          >
            Buat Prasasti Sekarang
          </Link>
        </div>
      </section>

      <section className="py-24 bg-white text-ink">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-3 block">
              Dokumentasi
            </span>
            <h2 className="font-serif text-4xl font-bold mb-4">Galeri Visual</h2>
            <p className="text-clay max-w-xl mx-auto">
              Artefak budaya dan kegiatan pelestarian yang kami kumpulkan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galeri.map((item, idx) => (
              <div
                key={idx}
                className="relative h-72 md:h-96 rounded-lg overflow-hidden group cursor-pointer"
              >
                {item.image && (
                  <img
                    src={urlForImage(item.image).url()}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="h-1 w-12 bg-gold mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
                  <h3 className="text-parchment font-serif font-bold text-xl leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/galeri"
              className="inline-block border-b border-ink pb-1 text-ink text-sm font-bold tracking-widest hover:text-gold hover:border-gold transition-all"
            >
              LIHAT GALERI LENGKAP
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
