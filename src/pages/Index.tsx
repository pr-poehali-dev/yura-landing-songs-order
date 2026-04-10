import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/1c00bff8-03b7-4507-9dcf-a6b84d84569f/files/8d00e63a-3069-48e4-9235-b421be6aaa10.jpg";
const EXAMPLES_IMAGE = "https://cdn.poehali.dev/projects/1c00bff8-03b7-4507-9dcf-a6b84d84569f/files/df5ef1ab-b8e3-4843-a52e-738d74ed9aa0.jpg";
const COUPLE_IMAGE = "https://cdn.poehali.dev/projects/1c00bff8-03b7-4507-9dcf-a6b84d84569f/files/6b46c253-fd3d-47ea-99bd-4a3ff94a3316.jpg";

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "Услуги", href: "#services" },
  { label: "Примеры", href: "#examples" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

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
  {
    icon: "Mic",
    title: "Живое исполнение",
    desc: "Приедем и исполним вживую — незабываемый сюрприз для близких.",
    price: "от 10 000 ₽",
    accent: "#ef4444",
  },
];

const EXAMPLES = [
  { title: "«Наша история»", desc: "Поп-баллада для свадьбы Анны и Дмитрия", genre: "Поп", duration: "3:24" },
  { title: "«50 лет — это сила!»", desc: "Весёлый трек на юбилей Михаила Петровича", genre: "Фанк", duration: "2:58" },
  { title: "«Наша команда»", desc: "Гимн компании «СтройТех» для корпоратива", genre: "Рок", duration: "3:10" },
  { title: "«Дочке 18»", desc: "Нежная песня папы для дочери на совершеннолетие", genre: "Акустика", duration: "4:02" },
];

const REVIEWS = [
  { name: "Алина К.", role: "Свадьба", text: "Заказала романтическую песню — муж был в слезах на первом танце. Невероятно трогательно и профессионально!", stars: 5, avatar: "А" },
  { name: "Сергей М.", role: "День рождения", text: "Заказал для мамы на 60-летие. Она до сих пор слушает каждый день. Вложили столько тепла — спасибо огромное!", stars: 5, avatar: "С" },
  { name: "ООО «ПромТехника»", role: "Корпоратив", text: "Гимн компании стал хитом корпоратива. Все сотрудники пели хором! Работаем уже третий год.", stars: 5, avatar: "П" },
  { name: "Наталья Р.", role: "Выпускной", text: "Класс был в восторге — написали песню про 11 лет в школе, с именами каждого. Фантастика!", stars: 5, avatar: "Н" },
];

const BOT_ANSWERS: Record<string, string> = {
  "сколько стоит": "Стоимость зависит от формата. Романтические песни — от 3 500 ₽, корпоративные — от 5 000 ₽. Точную цену назову после уточнения деталей 🎵",
  "как заказать": "Всё просто! Напишите нам в форме «Контакты» или в этом чате. Опишите повод и ваши пожелания — и мы начнём работу.",
  "сроки": "Обычно 3–5 рабочих дней. Срочный заказ — возможен за 24 часа с доплатой 30%.",
  "стили": "Работаем во всех стилях: поп, рок, джаз, фолк, электронная музыка, акустика, рэп и даже классика.",
  "пример": "Послушайте примеры в разделе «Примеры» на нашем сайте — там есть треки разных жанров и поводов!",
  "привет": "Привет! Рад вас видеть 🎶 Чем могу помочь? Задайте любой вопрос о наших песнях на заказ.",
  "цена": "Стоимость зависит от формата. Романтические песни — от 3 500 ₽, корпоративные — от 5 000 ₽. Точную цену назову после уточнения деталей 🎵",
  "default": "Отличный вопрос! Для детального ответа свяжитесь с нашим менеджером через форму контактов — он ответит в течение 15 минут.",
};

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Привет! 🎵 Я помогу ответить на вопросы о заказе песен. Спрашивайте!" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { from: "user", text: trimmed }]);
    setInput("");
    setTimeout(() => {
      const lower = trimmed.toLowerCase();
      let answer = BOT_ANSWERS["default"];
      for (const key of Object.keys(BOT_ANSWERS)) {
        if (key !== "default" && lower.includes(key)) {
          answer = BOT_ANSWERS[key];
          break;
        }
      }
      setMessages((prev) => [...prev, { from: "bot", text: answer }]);
    }, 700);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
        style={{ background: "linear-gradient(135deg, #c026d3, #f97316)", boxShadow: "0 0 30px rgba(192,38,211,0.5)" }}
        aria-label="Открыть чат"
      >
        {open ? <Icon name="X" size={22} /> : <Icon name="MessageCircle" size={24} />}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 rounded-2xl overflow-hidden shadow-2xl"
          style={{ background: "#0f0f1a", border: "1px solid rgba(192,38,211,0.4)" }}
        >
          <div className="px-4 py-3 flex items-center gap-3"
            style={{ background: "linear-gradient(135deg, #c026d3, #7c3aed)" }}>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Icon name="Music" size={16} className="text-white" />
            </div>
            <div>
              <p className="font-oswald text-white text-sm font-semibold">МелодияДня — Поддержка</p>
              <p className="text-white/70 text-xs">Обычно отвечаем за 15 мин</p>
            </div>
            <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </div>

          <div className="h-64 overflow-y-auto p-3 flex flex-col gap-2">
            {messages.map((msg, i) => (
              <div key={i}
                className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${msg.from === "bot" ? "self-start text-white/90" : "self-end text-white"}`}
                style={{ background: msg.from === "bot" ? "rgba(255,255,255,0.07)" : "linear-gradient(135deg, #c026d3, #f97316)" }}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t" style={{ borderColor: "rgba(192,38,211,0.2)" }}>
            <div className="flex gap-2">
              <input
                className="flex-1 bg-white/5 text-white text-sm rounded-xl px-3 py-2 outline-none placeholder:text-white/30 border border-white/10 focus:border-purple-500/50"
                placeholder="Напишите вопрос..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button onClick={sendMessage}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white transition-transform hover:scale-110"
                style={{ background: "linear-gradient(135deg, #c026d3, #f97316)" }}>
                <Icon name="Send" size={14} />
              </button>
            </div>
            <p className="text-white/25 text-xs mt-2 text-center">Нажмите Enter для отправки</p>
          </div>
        </div>
      )}
    </>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setFormData({ name: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen gradient-bg text-white overflow-x-hidden">

      {/* NAVBAR */}
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

        <a href="#contacts"
          className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-white text-sm font-semibold transition-all hover:scale-105"
          style={{ background: "linear-gradient(135deg, #c026d3, #f97316)" }}>
          Заказать песню
        </a>

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

      {/* EXAMPLES */}
      <section id="examples" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src={EXAMPLES_IMAGE} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(10,10,20,1), rgba(10,10,20,0.7), rgba(10,10,20,1))" }} />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-golos px-4 py-1 rounded-full mb-4"
              style={{ background: "rgba(249,115,22,0.15)", color: "#f97316", border: "1px solid rgba(249,115,22,0.2)" }}>
              Наши работы
            </span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mb-4">
              Примеры <span className="gradient-text">треков</span>
            </h2>
            <p className="text-white/50 max-w-lg mx-auto font-golos">
              Каждая песня — уникальная история, написанная с любовью
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EXAMPLES.map((ex, i) => (
              <div key={ex.title}
                className="card-hover rounded-2xl p-6 flex items-center gap-4 neon-border"
                style={{ background: "rgba(255,255,255,0.04)" }}>
                <button
                  onClick={() => setPlayingId(playingId === i ? null : i)}
                  className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: playingId === i ? "linear-gradient(135deg, #f97316, #ef4444)" : "linear-gradient(135deg, #c026d3, #f97316)" }}>
                  <Icon name={playingId === i ? "Pause" : "Play"} size={20} className="text-white" />
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className="font-oswald text-lg font-semibold truncate">{ex.title}</h3>
                  <p className="text-white/50 text-sm font-golos truncate">{ex.desc}</p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full font-golos"
                      style={{ background: "rgba(192,38,211,0.2)", color: "#e879f9" }}>
                      {ex.genre}
                    </span>
                    <span className="text-xs text-white/30 font-golos">{ex.duration}</span>
                  </div>
                  {playingId === i && (
                    <div className="mt-2 flex items-end gap-0.5 h-5">
                      {[...Array(20)].map((_, j) => (
                        <div key={j} className="w-1 rounded-full animate-pulse"
                          style={{
                            height: `${(j % 5 + 1) * 4}px`,
                            background: "linear-gradient(to top, #c026d3, #f97316)",
                            animationDelay: `${j * 0.08}s`,
                          }} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <img src={COUPLE_IMAGE} alt="Счастливые клиенты"
              className="rounded-2xl w-full max-w-lg object-cover h-64 opacity-80"
              style={{ border: "1px solid rgba(192,38,211,0.3)" }} />
          </div>
        </div>
      </section>

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
                  <div className="ml-auto flex gap-0.5 text-orange-400">
                    {[...Array(r.stars)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-white/70 font-golos leading-relaxed text-sm">«{r.text}»</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
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
                  placeholder="+7 (999) 123-45-67"
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
              <button type="submit"
                className="w-full py-4 rounded-xl text-white font-semibold text-lg transition-all hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #c026d3, #f97316)", boxShadow: "0 0 30px rgba(192,38,211,0.3)" }}>
                Отправить заявку
              </button>
              <p className="text-center text-white/30 text-xs font-golos">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          )}

          <div className="mt-12 grid grid-cols-3 gap-4 text-center">
            {[
              { icon: "Phone", label: "+7 (999) 123-45-67", sub: "Звонки и WhatsApp" },
              { icon: "Mail", label: "hello@melodiyanya.ru", sub: "Email" },
              { icon: "MessageCircle", label: "@melodiyanya", sub: "Telegram" },
            ].map((c) => (
              <div key={c.label} className="rounded-xl p-4 neon-border"
                style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="flex justify-center mb-2">
                  <Icon name={c.icon as "Phone"} size={20} style={{ color: "#c026d3" }} fallback="Phone" />
                </div>
                <p className="text-white text-xs font-golos font-semibold leading-tight">{c.label}</p>
                <p className="text-white/40 text-xs font-golos mt-1">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t" style={{ borderColor: "rgba(192,38,211,0.15)" }}>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #c026d3, #f97316)" }}>
              <Icon name="Music" size={12} className="text-white" />
            </div>
            <span className="font-oswald text-base font-bold gradient-text">МелодияДня</span>
          </div>
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

      <ChatWidget />
    </div>
  );
}
