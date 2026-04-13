import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const EXAMPLES_IMAGE = "https://cdn.poehali.dev/projects/1c00bff8-03b7-4507-9dcf-a6b84d84569f/files/df5ef1ab-b8e3-4843-a52e-738d74ed9aa0.jpg";
const COUPLE_IMAGE = "https://cdn.poehali.dev/projects/1c00bff8-03b7-4507-9dcf-a6b84d84569f/files/6b46c253-fd3d-47ea-99bd-4a3ff94a3316.jpg";

const GET_TRACKS_URL = "https://functions.poehali.dev/5042adab-d965-4a30-96ef-b5a6c428e7e2";

const EXAMPLES = [
  { title: "«Наша история»", desc: "Поп-баллада для свадьбы Анны и Дмитрия", genre: "Реп", duration: "3:24" },
  { title: "«50 лет — это сила!»", desc: "Весёлый трек на юбилей Михаила Петровича", genre: "Рок", duration: "2:58" },
  { title: "«Наша команда»", desc: "Гимн компании «СтройТех» для корпоратива", genre: "Диско", duration: "3:10" },
  { title: "«Дочке 18»", desc: "Нежная песня папы для дочери на совершеннолетие", genre: "Акустика", duration: "4:02" },
];

interface Track {
  id: number;
  title: string;
  description: string;
  genre: string;
  duration: string;
  file_url: string;
}

export default function ExamplesSection() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch(GET_TRACKS_URL)
      .then((r) => r.json())
      .then((d) => setTracks(d.tracks || []));
  }, []);

  const handlePlay = (id: number, url: string) => {
    if (playingId === id) {
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      if (audioRef.current) audioRef.current.pause();
      audioRef.current = new Audio(url);
      audioRef.current.play();
      audioRef.current.onended = () => setPlayingId(null);
      setPlayingId(id);
    }
  };

  return (
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

        {tracks.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EXAMPLES.map((ex) => (
              <div key={ex.title}
                className="card-hover rounded-2xl p-6 flex items-center gap-4 neon-border"
                style={{ background: "rgba(255,255,255,0.04)" }}>
                <div className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ background: "rgba(192,38,211,0.15)", border: "1px solid rgba(192,38,211,0.3)" }}>
                  <Icon name="Music2" size={20} style={{ color: "#c026d3" }} />
                </div>
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
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tracks.map((t) => (
              <div key={t.id}
                className="card-hover rounded-2xl p-6 flex items-center gap-4 neon-border"
                style={{ background: "rgba(255,255,255,0.04)" }}>
                <button
                  onClick={() => handlePlay(t.id, t.file_url)}
                  className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: playingId === t.id ? "linear-gradient(135deg, #f97316, #ef4444)" : "linear-gradient(135deg, #c026d3, #f97316)" }}>
                  <Icon name={playingId === t.id ? "Pause" : "Play"} size={20} className="text-white" />
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className="font-oswald text-lg font-semibold truncate">{t.title}</h3>
                  <p className="text-white/50 text-sm font-golos truncate">{t.description}</p>
                  <div className="mt-2 flex gap-2">
                    {t.genre && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-golos"
                        style={{ background: "rgba(192,38,211,0.2)", color: "#e879f9" }}>
                        {t.genre}
                      </span>
                    )}
                  </div>
                  {playingId === t.id && (
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
        )}

        <div className="mt-12 flex justify-center">
          <img src={COUPLE_IMAGE} alt="Счастливые клиенты"
            className="rounded-2xl w-full max-w-lg object-cover h-64 opacity-80"
            style={{ border: "1px solid rgba(192,38,211,0.3)" }} />
        </div>
      </div>
    </section>
  );
}
