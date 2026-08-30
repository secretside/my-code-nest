import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { to: "/ensiklopedia", label: "ENSIKLOPEDIA" },
  { to: "/prasasti", label: "BUAT PRASASTI" },
  { to: "/galeri", label: "GALERI" },
  { to: "/tentang", label: "TENTANG" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-cream/95 backdrop-blur-md border-b border-sand-dark shadow-sm transition-all duration-300">
      <div className="container mx-auto px-6 h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="relative w-12 h-12 bg-bark shadow-md rounded-full overflow-hidden group-hover:rotate-6 transition-transform duration-300 border-2 border-gold">
            <img
              src="/logo.png"
              alt="Logo Aksara Abadi"
              className="absolute inset-0 w-full h-full object-contain p-2"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold text-ink tracking-tight leading-none">
              AKSARA<span className="text-gold">ABADI</span>
            </span>
          </div>
        </Link>

        <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest text-bronze">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="hover:text-ink transition-colors relative group py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
              activeProps={{ className: "text-ink" }}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          className="md:hidden p-2 rounded-lg text-bark hover:bg-sand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-sand-dark bg-cream/98 backdrop-blur-md">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-bold tracking-widest text-bronze hover:text-ink border-b border-sand-dark/60 last:border-0"
                activeProps={{ className: "text-ink" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
