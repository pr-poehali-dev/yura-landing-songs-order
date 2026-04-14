import { useState } from "react";
import Icon from "@/components/ui/icon";

const SEND_ORDER_URL = "https://functions.poehali.dev/10d8fcfe-36d0-4d06-a637-390ae2a71229";

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "Услуги", href: "#services" },
  { label: "Примеры", href: "#examples" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const CONTACT_ITEMS = [
  { icon: "Phone", label: "+7 (993) 758-24-67", sub: "Звонки и WhatsApp", href: "tel:+79937582467" },
  { icon: "Mail", label: "melodiyadnya@mail.ru", sub: "Email", href: "mailto:melodiyadnya@mail.ru" },
  { icon: "MessageCircle", label: "Telegram", sub: "Написать в Telegram", href: "https://t.me/+_zRGYhdqo945MTli" },
  { icon: "Zap", label: "МАХ", sub: "Написать в МАХ", href: "https://max.ru/join/AFJgTokIx_lmRnDO3CHwqglGeAuwzE9Al8S0Nz30LV4" },
];

export default function ContactsSection() {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(SEND_ORDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Ошибка отправки");
      setFormSent(true);
      setFormData({ name: "", phone: "", message: "" });
    } catch {
      setError("Не удалось отправить заявку. Попробуйте ещё раз или напишите нам напрямую.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section id="contacts" className="py-24 px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-golos px-4 py-1 rounded-full mb-4"
              style={{ background: "rgba(249,115,22,0.15)", color: "#f97316", border: "1px solid rgba(249,115,22,0.2)" }}>
              Напишите нам
            </span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mb-4">
              Заказать <span className="gradient-text">песню</span>
            </h2>
            <p className="text-white/50 font-golos">Расскажите о поводе — мы свяжемся в течение 15 минут</p>
            <a href="tel:+79937582467" className="inline-block mt-3 font-oswald text-xl font-bold gradient-text hover:opacity-80 transition-opacity">
              +7 (993) 758-24-67
            </a>
          </div>

          {formSent ? (
            <div className="rounded-2xl p-10 text-center neon-border"
              style={{ background: "rgba(192,38,211,0.08)" }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "linear-gradient(135deg, #c026d3, #f97316)" }}>
                <Icon name="Check" size={28} className="text-white" />
              </div>
              <h3 className="font-oswald text-2xl font-bold mb-2">Заявка отправлена!</h3>
              <p className="text-white/60 font-golos">Мы свяжемся с вами в течение 15 минут</p>
              <button onClick={() => setFormSent(false)}
                className="mt-6 px-6 py-2 rounded-full text-sm font-golos text-white/60 border border-white/20 hover:border-purple-500/50 transition-all">
                Отправить ещё
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit}
              className="rounded-2xl p-8 neon-border space-y-5"
              style={{ background: "rgba(255,255,255,0.03)" }}>
              <div>
                <label className="block text-sm text-white/60 font-golos mb-2">Ваше имя</label>
                <input required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Иван Иванов"
                  className="w-full px-4 py-3 rounded-xl text-white text-sm font-golos outline-none placeholder:text-white/25 border border-white/10 focus:border-purple-500/50 transition-colors"
                  style={{ background: "rgba(255,255,255,0.05)" }} />
              </div>
              <div>
                <label className="block text-sm text-white/60 font-golos mb-2">Телефон или e-mail</label>
                <input required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+7 (993) 758-24-67"
                  className="w-full px-4 py-3 rounded-xl text-white text-sm font-golos outline-none placeholder:text-white/25 border border-white/10 focus:border-purple-500/50 transition-colors"
                  style={{ background: "rgba(255,255,255,0.05)" }} />
              </div>
              <div>
                <label className="block text-sm text-white/60 font-golos mb-2">Расскажите о поводе</label>
                <textarea required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Например: свадьба 20 июня, хочу трогательную балладу о нашей истории..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl text-white text-sm font-golos outline-none placeholder:text-white/25 resize-none border border-white/10 focus:border-purple-500/50 transition-colors"
                  style={{ background: "rgba(255,255,255,0.05)" }} />
              </div>
              {error && (
                <p className="text-red-400 text-sm font-golos text-center">{error}</p>
              )}
              <button type="submit" disabled={loading}
                className="w-full py-4 rounded-xl text-white font-semibold text-lg transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ background: "linear-gradient(135deg, #c026d3, #f97316)", boxShadow: "0 0 30px rgba(192,38,211,0.3)" }}>
                {loading ? "Отправляем..." : "Отправить заявку"}
              </button>
              <p className="text-center text-white/30 text-xs font-golos">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          )}

          <div className="mt-12 flex flex-col gap-4">
            {CONTACT_ITEMS.map((c) => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                className="rounded-xl p-4 neon-border flex items-center gap-4 transition-all hover:scale-[1.02]"
                style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(192,38,211,0.15)", border: "1px solid rgba(192,38,211,0.3)" }}>
                  <Icon name={c.icon as "Phone"} size={20} style={{ color: "#c026d3" }} fallback="Phone" />
                </div>
                <div>
                  <p className="text-white text-sm font-golos font-semibold">{c.label}</p>
                  <p className="text-white/40 text-xs font-golos mt-0.5">{c.sub}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t" style={{ borderColor: "rgba(192,38,211,0.15)" }}>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #c026d3, #f97316)" }}>
              <Icon name="Music" size={12} className="text-white" />
            </div>
            <span className="font-oswald text-base font-bold gradient-text">МелодияДня</span>
          </div>
          <a href="tel:+79937582467" className="text-white/40 hover:text-white/70 text-sm font-golos transition-colors flex items-center gap-1.5">
            <Icon name="Phone" size={13} />
            +7 (993) 758-24-67
          </a>
          <p className="text-white/30 text-sm font-golos">© 2024 МелодияДня. Все права защищены</p>
          <div className="flex gap-6">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}
                className="text-white/30 hover:text-white/70 text-xs font-golos transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}