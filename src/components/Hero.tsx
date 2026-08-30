import { Link } from "@tanstack/react-router";
import { urlForImage } from "@/lib/sanity";

export type HeroData = {
  title?: string;
  subtitle?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heroImage?: any;
} | null;

export default function Hero({ data }: { data: HeroData }) {
  const title = data?.title || "ABADIKAN WARISAN LELUHUR";
  const subtitle =
    data?.subtitle || "Konversi namamu ke Aksara Nusantara dan simpan selamanya di Blockchain.";
  const imageUrl = data?.heroImage ? urlForImage(data.heroImage).url() : null;

  return (
    <section className="relative min-h-screen flex items-center bg-cream overflow-hidden pt-40 pb-20 lg:pt-48">
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/batik-ramp.png')] bg-repeat mix-blend-multiply" />

      <div className="container mx-auto px-8 lg:px-16 max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
        <div className="text-center lg:text-left order-2 lg:order-1 flex flex-col items-center lg:items-start lg:pl-4">
          <span className="inline-block py-1.5 px-4 rounded-full border border-gold bg-sand text-bark text-[11px] lg:text-xs font-bold tracking-[0.2em] mb-6">
            PRESERVASI BUDAYA WEB3
          </span>

          <h1 className="font-serif text-5xl lg:text-7xl font-bold leading-[1.1] text-ink tracking-tight mb-6">
            {title}
          </h1>

          <p className="text-bark text-base lg:text-lg leading-relaxed max-w-lg font-medium mb-8">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              to="/prasasti"
              className="px-8 py-4 bg-bark text-parchment text-xs lg:text-sm font-bold tracking-widest uppercase rounded-md hover:bg-gold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
            >
              Mulai Sekarang
            </Link>
            <Link
              to="/ensiklopedia"
              className="px-8 py-4 border-2 border-bark text-bark text-xs lg:text-sm font-bold tracking-widest uppercase rounded-md hover:bg-bark hover:text-parchment transition-all duration-300 bg-transparent text-center"
            >
              Pelajari Aksara
            </Link>
          </div>
        </div>

        <div className="relative order-1 lg:order-2 flex justify-center items-center w-full">
          <div className="relative flex items-center justify-center w-[320px] h-[320px] lg:w-[480px] lg:h-[480px] bg-bark-light rounded-full shadow-2xl border-[6px] border-cream ring-1 ring-gold/30">
            <div className="relative w-[70%] h-[70%]">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Ilustrasi aksara nusantara"
                  className="absolute inset-0 w-full h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-parchment">
                  <p className="text-sm font-bold opacity-80">Menunggu Gambar</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
