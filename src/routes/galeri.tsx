import { createFileRoute } from "@tanstack/react-router";
import { useSearch } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Card
} from "@/components/ui/card";
import {
  Button
} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown
} from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import PageSkeleton from "@/components/PageSkeleton";
import { prasastiListQueryOptions } from "@/lib/sanityQueries";


interface GalleryFilters {
  scriptType: "all" | "javanese" | "sundanese" | "balinese" | "makassar";
}

export const Route = createFileRoute("/galeri")({
  head: () => ({
    meta: [
      { title: "Galeri Prasasti Digital | Aksara Abadi" },
      {
        name: "description",
        content:
          "Galeri publik prasasti digital yang terinspirasi dari sistem tulisan Nusantara.",
      },
      { property: "og:title", content: "Galeri Prasasti Digital | Aksara Abadi" },
      {
        property: "og:description",
        content: "Lihat koleksi prasasti digital yang telah diabadikan pada blockchain.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(prasastiListQueryOptions),
  pendingMs: 100,
  pendingComponent: () => <PageSkeleton cards={6} />,
  errorComponent: ({ error }) => (
    <div role="alert" className="pt-40 text-center text-clay">
      {error.message}
    </div>
  ),
  component: GaleriPage,
});

function GaleriPage() {
  const { data: prasasti } = useSuspenseQuery(prasastiListQueryOptions);
  const search = useSearch();
  const scriptType = (search.scriptType as GalleryFilters) ?? "all";

  // Format date function
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Get script label function
  const getScriptLabel = (scriptType: string): string => {
    switch (scriptType) {
      case "javanese": return "Jawa";
      case "sundanese": return "Sunda";
      case "balinese": return "Bali";
      case "makassar": return "Makassar";
      default: return scriptType;
    }
  };

  const filteredPrasasti = scriptType === "all" ? prasasti : prasasti.filter(p => p.scriptType === scriptType);

  if (prasasti === null) {
    // Loading state
    return (
      <main className="relative min-h-screen bg-cream text-ink selection:bg-gold selection:text-parchment">
        <Navbar />
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/batik-ramp.png')] bg-repeat mix-blend-multiply" />

        <div className="container mx-auto px-6 lg:px-8 pt-32 pb-20 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-block py-1.5 px-4 rounded-full border border-gold bg-sand text-bark text-[10px] md:text-xs font-bold tracking-[0.2em] mb-4">
              GALERI DIGITAL
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-ink">
              Galeri Prasasti Digital
            </h1>
            <p className="text-clay font-medium text-base md:text-lg leading-relaxed">
              Koleksi prasasti digital yang telah diabadikan pada blockchain Ethereum Sepolia testnet.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-4">
              <span className="text-bark font-semibold">Filter Aksara</span>
              <div className="w-48">
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full">
                    <Button variant="outline" size="icon">
                      {scriptType === "all" ? "Semua Aksara" :
                       scriptType === "javanese" ? "Jawa" :
                       scriptType === "sundanese" ? "Sunda" :
                       scriptType === "balinese" ? "Bali" :
                       scriptType === "makassar" ? "Makassar" : "Semua Aksara"}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full border-none p-0">
                  <DropdownMenuItem
                    onSelect={() => {
                      // Update URL query parameter
                      const url = new URL(window.location.href);
                      url.searchParams.set('scriptType', 'all');
                      window.history.replaceState({}, '', url);
                      window.location.reload();
                    }}
                  >
                    Semua Aksara
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      const url = new URL(window.location.href);
                      url.searchParams.set('scriptType', 'javanese');
                      window.history.replaceState({}, '', url);
                      window.location.reload();
                    }}
                  >
                    Jawa
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      const url = new URL(window.location.href);
                      url.searchParams.set('scriptType', 'sundanese');
                      window.history.replaceState({}, '', url);
                      window.location.reload();
                    }}
                  >
                    Sunda
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      const url = new URL(window.location.href);
                      url.searchParams.set('scriptType', 'balinese');
                      window.history.replaceState({}, '', url);
                      window.location.reload();
                    }}
                  >
                    Bali
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      const url = new URL(window.location.href);
                      url.searchParams.set('scriptType', 'makassar');
                      window.history.replaceState({}, '', url);
                      window.location.reload();
                    }}
                  >
                    Makassar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Loading skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index} className="group relative bg-white border border-gold/20 rounded-xl overflow-hidden">
                <div className="h-48 w-full bg-sand">
                  <div className="absolute inset-0 bg-sand/50 animate-pulse"></div>
                </div>
                <div className="p-6">
                  <div className="h-3 bg-gold/20 rounded w-32 mb-2 animate-pulse"></div>
                  <div className="h-2 bg-gold/20 rounded w-24 mb-2 animate-pulse"></div>
                  <div className="h-2 bg-gold/20 rounded w-28 mb-3 animate-pulse"></div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 bg-gold/20 rounded w-20 animate-pulse"></div>
                    <span className="text-xs text-clay/40 animate-pulse">Verified on-chain</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (prasasti.length === 0) {
    // Empty state
    return (
      <main className="relative min-h-screen bg-cream text-ink selection:bg-gold selection:text-parchment">
        <Navbar />
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/batik-ramp.png')] bg-repeat mix-blend-multiply" />

        <div className="container mx-auto px-6 lg:px-8 pt-32 pb-20 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-block py-1.5 px-4 rounded-full border border-gold bg-sand text-bark text-[10px] md:text-xs font-bold tracking-[0.2em] mb-4">
              GALERI DIGITAL
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-ink">
              Galeri Prasasti Digital
            </h1>
            <p className="text-clay font-medium text-base md:text-lg leading-relaxed">
              Koleksi prasasti digital yang telah diabadikan pada blockchain Ethereum Sepolia testnet.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-4">
              <span className="text-bark font-semibold">Filter Aksara</span>
              <div className="w-48">
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full">
                    <Button variant="outline" size="icon">
                      {scriptType === "all" ? "Semua Aksara" :
                       scriptType === "javanese" ? "Jawa" :
                       scriptType === "sundanese" ? "Sunda" :
                       scriptType === "balinese" ? "Bali" :
                       scriptType === "makassar" ? "Makassar" : "Semua Aksara"}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full border-none p-0">
                  <DropdownMenuItem
                    onSelect={() => {
                      const url = new URL(window.location.href);
                      url.searchParams.set('scriptType', 'all');
                      window.history.replaceState({}, '', url);
                      window.location.reload();
                    }}
                  >
                    Semua Aksara
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      const url = new URL(window.location.href);
                      url.searchParams.set('scriptType', 'javanese');
                      window.history.replaceState({}, '', url);
                      window.location.reload();
                    }}
                  >
                    Jawa
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      const url = new URL(window.location.href);
                      url.searchParams.set('scriptType', 'sundanese');
                      window.history.replaceState({}, '', url);
                      window.location.reload();
                    }}
                  >
                    Sunda
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      const url = new URL(window.location.href);
                      url.searchParams.set('scriptType', 'balinese');
                      window.history.replaceState({}, '', url);
                      window.location.reload();
                    }}
                  >
                    Bali
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      const url = new URL(window.location.href);
                      url.searchParams.set('scriptType', 'makassar');
                      window.history.replaceState({}, '', url);
                      window.location.reload();
                    }}
                  >
                    Makassar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="text-center py-20">
            <div className="text-5xl mb-6">📜</div>
            <p className="text-ink text-xl font-serif font-bold mb-4">
              Belum ada prasasti untuk
              {scriptType === "all" ? "kategori apa pun" :
               scriptType === "javanese" ? "Aksara Jawa" :
               scriptType === "sundanese" ? "Aksara Sunda" :
               scriptType === "balinese" ? "Aksara Bali" :
               scriptType === "makassar" ? "Aksara Makassar" :
               "kategori ini"}
            </p>
            <p className="text-clay">
              Jadilah yang pertama membuat prasasti digital di kategori ini!
            </p>
            <a
              href="/prasasti"
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gold text-bark font-semibold rounded-xl hover:bg-gold/90 transition-colors"
            >
              Buat Prasasti Baru
            </a>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-cream text-ink selection:bg-gold selection:text-parchment">
      <Navbar />
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/batik-ramp.png')] bg-repeat mix-blend-multiply" />

        <div className="container mx-auto px-6 lg:px-8 pt-32 pb-20 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-block py-1.5 px-4 rounded-full border border-gold bg-sad text-bark text-[10px] md:text-xs font-bold tracking-[0.2em] mb-4">
              GALERI DIGITAL
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-ink">
              Galeri Prasasti Digital
            </h1>
            <p className="text-clay font-medium text-base md:text-lg leading-relaxed">
              Koleksi prasasti digital yang telah diabadikan pada blockchain Ethereum Sepolia testnet.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-4">
              <span className="text-bark font-semibold">Filter Aksara</span>
              <div className="w-48">
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full">
                    <Button variant="outline" size="icon">
                      {scriptType === "all" ? "Semua Aksara" :
                       scriptType === "javanese" ? "Jawa" :
                       scriptType === "sundanese" ? "Sunda" :
                       scriptType === "balinese" ? "Bali" :
                       scriptType === "makassar" ? "Makassar" : "Semua Aksara"}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full border-none p-0">
                  <DropdownMenuItem
                    onSelect={() => {
                      const url = new URL(window.location.href);
                      url.searchParams.set('scriptType', 'all');
                      window.history.replaceState({}, '', url);
                      window.location.reload();
                    }}
                  >
                    Semua Aksara
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      const url = new URL(window.location.href);
                      url.searchParams.set('scriptType', 'javanese');
                      window.history.replaceState({}, '', url);
                      window.location.reload();
                    }}
                  >
                    Jawa
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      const url = new URL(window.location.href);
                      url.searchParams.set('scriptType', 'balinese');
                      window.history.replaceState({}, '', url);
                      window.location.reload();
                    }}
                  >
                    Bali
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      const url = new URL(window.location.href);
                      url.searchParams.set('scriptType', 'sundanese');
                      window.history.replaceState({}, '', url);
                      window.location.reload();
                    }}
                  >
                    Sunda
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      const url = new URL(window.location.href);
                      url.searchParams.set('scriptType', 'makassar');
                      window.history.replaceState({}, '', url);
                      window.location.reload();
                    }}
                  >
                    Makassar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {prasasti.map((item, index) => (
              <div key={item.txHash || index} className="group relative bg-white border border-gold/20 rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-2xl">
                {/* Aksara result - visually prominent */}
                <div className="relative h-48 w-full bg-sand flex items-center justify-center">
                  <div className="text-2xl font-bold text-ink px-4">
                    {item.message}
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-2">
                    <div className="w-12 h-1 bg-gold mb-2"></div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-ink mb-3">
                    Original
                  </h3>
                  <p className="text-lg text-clay mb-4 font-mono">
                    {item.name}
                  </p>

                  <div className="flex items-center gap-3 mb-4 text-sm text-clay">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-gold rounded"></div>
                      <span>Aksara: {getScriptLabel(item.scriptType)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {formatDate(item.timestamp)}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gold/20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gold font-semibold">✓</span>
                      <span className="text-sm text-gold">Verified on-chain</span>
                    </div>
                    <a
                      href={item.txUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 text-sm text-gold hover:text-bark"
                    >
                      View Transaction
                      <svg className="ml-2 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </main>
    );
  }