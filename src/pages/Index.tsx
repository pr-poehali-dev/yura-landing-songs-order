import Icon from "@/components/ui/icon";
import Navbar from "@/components/Navbar";
import ExamplesSection from "@/components/ExamplesSection";
import ContactsSection from "@/components/ContactsSection";
import ChatWidget from "@/components/ChatWidget";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/1c00bff8-03b7-4507-9dcf-a6b84d84569f/files/8d00e63a-3069-48e4-9235-b421be6aaa10.jpg";
const EXAMPLES_IMAGE = "https://cdn.poehali.dev/projects/1c00bff8-03b7-4507-9dcf-a6b84d84569f/files/df5ef1ab-b8e3-4843-a52e-738d74ed9aa0.jpg";

const SERVICES = [
  {
    icon: "Heart",
    title: "Романтическая песня",
    desc: "Признание в любви, годовщина, свидание — создадим трек, который растопит сердце.",
    price: "от 3 500 ₽",
    accent: "#e879f9",
  },
  {
    icon: "PartyPopper",
    title: "День рождения",
    desc: "Весёлый именной трек с именем, шутками и добрыми пожеланиями.",
    price: "от 2 500 ₽",
    accent: "#f97316",
  },
  {
    icon: "Building2",
    title: "Корпоратив",
    desc: "Гимн компании, поздравление коллегам или корпоративный хит — под любой стиль.",
    price: "от 5 000 ₽",
    accent: "#c026d3",
  },
  {
    icon: "Gem",
    title: "Свадьба",
    desc: "Первый танец, история отношений в песне — уникальный подарок на всю жизнь.",
    price: "от 6 000 ₽",
    accent: "#f59e0b",
  },
  {
    icon: "Music",
    title: "Любой повод",
    desc: "Выпускной, новоселье, детский праздник — напишем под ваш запрос.",
    price: "от 2 000 ₽",
    accent: "#14b8a6",
  },
];

const REVIEWS = [
  { name: "Алина К.", role: "Свадьба", text: "Заказала романтическую песню — муж был в слезах на первом танце. Невероятно трогательно и профессионально!", stars: 5, avatar: "А" },
  { name: "Сергей М.", role: "День рождения", text: "Заказал для мамы на 60-летие. Она до сих пор слушает каждый день. Вложили столько тепла — спасибо огромное!", stars: 5, avatar: "С" },
  { name: "ООО «ПромТехника»", role: "Корпоратив", text: "Гимн компании стал хитом корпоратива. Все сотрудники пели хором! Работаем уже третий год.", stars: 5, avatar: "П" },
  { name: "Наталья Р.", role: "Выпускной", text: "Класс был в восторге — написали песню про 11 лет в школе, с именами каждого. Фантастика!", stars: 5, avatar: "Н" },
];

export default function Index() {
  return (
    <div className="min-h-screen gradient-bg text-white overflow-x-hidden">

      <Navbar />

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center mesh-bg overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMAGE} alt="Студия" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(10,10,20,0.95) 40%, rgba(10,10,20,0.5) 100%)" }} />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-golos mb-6"
              style={{ background: "rgba(192,38,211,0.15)", border: "1px solid rgba(192,38,211,0.3)", color: "#e879f9" }}>
              <Icon name="Sparkles" size={14} />
              Уникальные песни на заказ
            </div>
            <h1 className="font-oswald text-5xl md:text-7xl font-bold leading-tight mb-6">
              Песня, которая<br />
              <span className="gradient-text">останется навсегда</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl font-golos leading-relaxed mb-8 max-w-lg">
              Создаём уникальные треки для любого повода — от романтического признания до корпоративного гимна. Профессионально, быстро, с душой.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contacts"
                className="px-8 py-4 rounded-full text-white font-semibold text-lg transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #c026d3, #f97316)", boxShadow: "0 0 30px rgba(192,38,211,0.4)" }}>
                Заказать песню
              </a>
              <a href="#examples"
                className="px-8 py-4 rounded-full font-semibold text-lg transition-all hover:bg-white/10 text-white"
                style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
                Послушать примеры
              </a>
            </div>

            <div className="flex gap-8 mt-12">
              {[["500+", "Песен создано"], ["98%", "Довольных клиентов"], ["3–5", "Дней на трек"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <p className="font-oswald text-3xl font-bold gradient-text">{val}</p>
                  <p className="text-white/50 text-sm font-golos mt-1">{lbl}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:flex justify-center animate-float">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(192,38,211,0.3) 0%, transparent 70%)" }} />
              <div className="relative w-full h-full rounded-full overflow-hidden neon-border">
                <img src={EXAMPLES_IMAGE} alt="Музыка" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #c026d3, #7c3aed)" }}>
                <Icon name="Music2" size={28} className="text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #f97316, #ef4444)" }}>
                <Icon name="Mic" size={20} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-white/30" />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-golos px-4 py-1 rounded-full mb-4"
              style={{ background: "rgba(192,38,211,0.15)", color: "#e879f9", border: "1px solid rgba(192,38,211,0.2)" }}>
              Что мы делаем
            </span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mb-4">
              Наши <span className="gradient-text">услуги</span>
            </h2>
            <p className="text-white/50 max-w-lg mx-auto font-golos">
              Любой повод, любой стиль, любые эмоции — мы напишем вашу историю в звуке
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div key={s.title}
                className="card-hover rounded-2xl p-6 neon-border"
                style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${s.accent}22`, border: `1px solid ${s.accent}44` }}>
                  <Icon name={s.icon as "Music"} size={22} style={{ color: s.accent }} fallback="Music" />
                </div>
                <h3 className="font-oswald text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-white/55 text-sm font-golos leading-relaxed mb-4">{s.desc}</p>
                <p className="font-oswald text-lg font-bold" style={{ color: s.accent }}>{s.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ExamplesSection />

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-golos px-4 py-1 rounded-full mb-4"
              style={{ background: "rgba(232,121,249,0.15)", color: "#e879f9", border: "1px solid rgba(232,121,249,0.2)" }}>
              Что говорят клиенты
            </span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Отзывы</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name}
                className="card-hover rounded-2xl p-6 neon-border"
                style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-oswald text-lg font-bold text-white flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #c026d3, #f97316)" }}>
                    {r.avatar}
                  </div>
                  <div>
                    <p className="font-oswald text-base font-semibold">{r.name}</p>
                    <p className="text-white/40 text-sm font-golos">{r.role}</p>
                  </div>
                </div>
                <p className="text-white/70 font-golos leading-relaxed text-sm mb-4">«{r.text}»</p>
                <div className="flex gap-0.5 text-orange-400">
                  {[...Array(r.stars)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactsSection />

      <ChatWidget />
    </div>
  );
}
