import { useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "Услуги", href: "#services" },
  { label: "Примеры", href: "#examples" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(10,10,20,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(192,38,211,0.15)" }}>
        <a href="#home" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #c026d3, #f97316)" }}>
            <Icon name="Music" size={16} className="text-white" />
          </div>
          <span className="font-oswald text-xl font-bold gradient-text">МелодияДня</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}
              className="text-sm text-white/70 hover:text-white transition-colors font-golos hover:text-purple-300">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+79937582467" className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-golos transition-colors">
            <Icon name="Phone" size={14} style={{ color: "#c026d3" }} />
            +7 (993) 758-24-67
          </a>
          <a href="#contacts"
            className="flex items-center gap-2 px-5 py-2 rounded-full text-white text-sm font-semibold transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #c026d3, #f97316)" }}>
            Заказать песню
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-30 pt-20 px-6 flex flex-col gap-4"
          style={{ background: "rgba(10,10,20,0.97)" }}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="text-2xl font-oswald text-white/80 hover:text-white py-2 border-b border-white/10">
              {l.label}
            </a>
          ))}
          <a href="#contacts" onClick={() => setMenuOpen(false)}
            className="mt-4 text-center px-6 py-3 rounded-full text-white font-semibold"
            style={{ background: "linear-gradient(135deg, #c026d3, #f97316)" }}>
            Заказать песню
          </a>
        </div>
      )}
    </>
  );
}
