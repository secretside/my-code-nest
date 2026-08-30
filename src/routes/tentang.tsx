import { createFileRoute, Link } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/tentang")({
  head: () => ({
    meta: [
      { title: "Tentang Kami — Aksara Abadi" },
      {
        name: "description",
        content:
          "Kenali tim dan misi di balik Aksara Abadi: melestarikan aksara Nusantara melalui teknologi digital dan blockchain.",
      },
      { property: "og:title", content: "Tentang Kami — Aksara Abadi" },
      {
        property: "og:description",
        content:
          "Kenali tim dan misi di balik Aksara Abadi: melestarikan aksara Nusantara melalui teknologi digital dan blockchain.",
      },
    ],
  }),
  component: TentangPage,
});

const TEAM = [
  {
    nama: "[Nama Anggota 1]",
    peran: "Project Lead & Frontend",
    bio: "[Deskripsi singkat anggota 1 — misalnya latar belakang, minat pada budaya, atau kontribusinya pada proyek ini.]",
    inisial: "A1",
  },
  {
    nama: "[Nama Anggota 2]",
    peran: "Backend & Data",
    bio: "[Deskripsi singkat anggota 2 — misalnya latar belakang, minat pada budaya, atau kontribusinya pada proyek ini.]",
    inisial: "A2",
  },
  {
    nama: "[Nama Anggota 3]",
    peran: "Riset Aksara & Konten",
    bio: "[Deskripsi singkat anggota 3 — misalnya latar belakang, minat pada budaya, atau kontribusinya pada proyek ini.]",
    inisial: "A3",
  },
];

const NILAI = [
  {
    ikon: "📜",
    judul: "Preservasi",
    deskripsi:
      "Mendokumentasikan aksara Nusantara agar tidak hilang ditelan zaman dan tetap bisa dipelajari generasi mendatang.",
  },
  {
    ikon: "🔗",
    judul: "Keabadian Digital",
    deskripsi:
      "Memanfaatkan teknologi blockchain agar warisan budaya tersimpan secara permanen dan tidak dapat dihapus.",
  },
  {
    ikon: "🌏",
    judul: "Akses Terbuka",
    deskripsi:
      "Membuat pengetahuan tentang aksara tradisional mudah diakses oleh siapa saja, di mana saja, secara gratis.",
  },
];

const STATISTIK = [
  { angka: "[3]+", label: "Aksara Terdokumentasi" },
  { angka: "[100]+", label: "Prasasti Dibuat" },
  { angka: "[2026]", label: "Tahun Berdiri" },
  { angka: "[3]", label: "Anggota Tim" },
];

function TentangPage() {
  return (
    <main className="bg-white selection:bg-gold selection:text-ink">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-24 bg-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-[150px] opacity-15 pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-8 text-center max-w-4xl relative z-10">
          <span className="inline-block py-1 px-4 mb-6 rounded-full border border-gold/50 text-[#8A6D2F] text-[10px] font-bold tracking-[0.3em] uppercase">
            Tentang Kami
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-ink mb-8 leading-tight">
            Menjaga Aksara,
            <br />
            <span className="text-gold">Merawat Peradaban</span>
          </h1>
          <p className="text-lg md:text-xl font-light leading-relaxed text-clay">
            Aksara Abadi lahir dari kegelisahan melihat aksara Nusantara yang perlahan terlupakan.
            Kami percaya teknologi modern bisa menjadi jembatan antara warisan masa lalu dan
            generasi masa depan.
          </p>
        </div>
      </section>

      {/* Misi */}
      <section className="py-24 bg-ink text-parchment relative overflow-hidden border-t border-gold/20">
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-4 mb-4 rounded-full border border-gold/50 text-gold text-[10px] font-bold tracking-[0.3em] uppercase">
              Misi Kami
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold">Tiga Pilar Utama</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {NILAI.map((nilai) => (
              <div
                key={nilai.judul}
                className="bg-[#3A2818] border border-gold/20 rounded-xl p-8 hover:border-gold/60 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-4xl mb-6">{nilai.ikon}</div>
                <h3 className="font-serif text-xl font-bold mb-3 text-gold">{nilai.judul}</h3>
                <p className="text-parchment/70 font-light leading-relaxed text-sm">
                  {nilai.deskripsi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistik */}
      <section className="py-20 bg-sand border-b border-sand-dark">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
            {STATISTIK.map((stat) => (
              <div key={stat.label}>
                <div className="font-serif text-4xl md:text-5xl font-bold text-bark mb-2">
                  {stat.angka}
                </div>
                <div className="text-bronze text-xs font-bold tracking-widest uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tim */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-3 block">
              Orang-Orang di Balik Layar
            </span>
            <h2 className="font-serif text-4xl font-bold text-ink mb-4">Tim Kami</h2>
            <p className="text-clay max-w-xl mx-auto">
              Tiga orang dengan satu tujuan: memastikan aksara Nusantara tetap hidup di era digital.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {TEAM.map((anggota) => (
              <div
                key={anggota.nama}
                className="group bg-white border border-gold/20 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="h-56 bg-sand flex items-center justify-center relative">
                  <div className="w-24 h-24 rounded-full bg-bark border-2 border-gold flex items-center justify-center">
                    <span className="font-serif text-2xl font-bold text-gold">
                      {anggota.inisial}
                    </span>
                  </div>
                  <span className="absolute bottom-3 text-[10px] text-clay/40 tracking-widest uppercase">
                    [Foto anggota]
                  </span>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-serif text-xl font-bold text-ink group-hover:text-gold transition-colors">
                    {anggota.nama}
                  </h3>
                  <p className="text-gold text-xs font-bold tracking-widest uppercase mt-1 mb-4">
                    {anggota.peran}
                  </p>
                  <p className="text-clay text-sm font-light leading-relaxed">{anggota.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-bark relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gold rounded-full blur-[120px] opacity-20" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold rounded-full blur-[120px] opacity-20" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-parchment mb-6">
            Ikut Melestarikan Bersama Kami
          </h2>
          <p className="max-w-2xl mx-auto text-parchment/80 text-lg mb-12 font-light leading-relaxed">
            Jelajahi ensiklopedia aksara, atau abadikan namamu dalam prasasti digital yang tak
            terhapuskan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/ensiklopedia"
              className="border border-gold text-gold px-10 py-5 rounded-lg font-bold text-sm uppercase tracking-[0.15em] hover:bg-gold hover:text-ink transition-all"
            >
              Jelajahi Ensiklopedia
            </Link>
            <Link
              to="/prasasti"
              className="bg-gold text-ink px-10 py-5 rounded-lg font-bold text-sm uppercase tracking-[0.15em] hover:bg-parchment hover:scale-105 transition-all shadow-xl"
            >
              Buat Prasasti
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
