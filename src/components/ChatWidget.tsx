import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

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

export default function ChatWidget() {
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
