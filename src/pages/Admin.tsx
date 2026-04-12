import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const UPLOAD_URL = "https://functions.poehali.dev/e901110b-3ff0-4bea-b3b5-878f800f2d1e";
const GET_TRACKS_URL = "https://functions.poehali.dev/5042adab-d965-4a30-96ef-b5a6c428e7e2";

interface Track {
  id: number;
  title: string;
  description: string;
  genre: string;
  duration: string;
  file_url: string;
}

export default function Admin() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({ title: "", description: "", genre: "", duration: "" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchTracks = async () => {
    setLoading(true);
    const res = await fetch(GET_TRACKS_URL);
    const data = await res.json();
    setTracks(data.tracks || []);
    setLoading(false);
  };

  useEffect(() => { fetchTracks(); }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    if (file && !form.title) {
      setForm((f) => ({ ...f, title: file.name.replace(/\.[^.]+$/, "") }));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !form.title) return;
    setUploading(true);
    setMessage(null);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(",")[1];
      const res = await fetch(UPLOAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          file_data: base64,
          file_name: selectedFile.name,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ text: "Трек успешно загружен!", ok: true });
        setForm({ title: "", description: "", genre: "", duration: "" });
        setSelectedFile(null);
        if (fileRef.current) fileRef.current.value = "";
        fetchTracks();
      } else {
        setMessage({ text: data.error || "Ошибка загрузки", ok: false });
      }
      setUploading(false);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить трек?")) return;
    await fetch(`${GET_TRACKS_URL}?id=${id}`, { method: "DELETE" });
    fetchTracks();
  };

  return (
    <div className="min-h-screen px-6 py-12" style={{ background: "#0a0a14", color: "white" }}>
      <div className="container mx-auto max-w-3xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #c026d3, #f97316)" }}>
            <Icon name="Music" size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-oswald text-2xl font-bold">Управление треками</h1>
            <p className="text-white/40 text-sm font-golos">Загрузка и удаление аудио примеров</p>
          </div>
          <a href="/" className="ml-auto text-white/40 hover:text-white text-sm font-golos flex items-center gap-1 transition-colors">
            <Icon name="ArrowLeft" size={14} /> На сайт
          </a>
        </div>

        {/* Upload form */}
        <div className="rounded-2xl p-6 mb-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(192,38,211,0.2)" }}>
          <h2 className="font-oswald text-lg font-semibold mb-5">Загрузить трек</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 font-golos mb-1">Аудиофайл (MP3, WAV, OGG)</label>
              <div
                className="w-full px-4 py-6 rounded-xl border-2 border-dashed flex flex-col items-center gap-2 cursor-pointer transition-colors"
                style={{ borderColor: selectedFile ? "rgba(192,38,211,0.6)" : "rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.03)" }}
                onClick={() => fileRef.current?.click()}
              >
                <Icon name={selectedFile ? "FileAudio" : "Upload"} size={28} style={{ color: selectedFile ? "#c026d3" : "rgba(255,255,255,0.3)" }} />
                <p className="text-sm font-golos text-white/50">
                  {selectedFile ? selectedFile.name : "Нажмите, чтобы выбрать файл"}
                </p>
                {selectedFile && (
                  <p className="text-xs text-white/30 font-golos">{(selectedFile.size / 1024 / 1024).toFixed(2)} МБ</p>
                )}
              </div>
              <input ref={fileRef} type="file" accept="audio/*" onChange={handleFileChange} className="hidden" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/60 font-golos mb-1">Название *</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="«Наша история»"
                  className="w-full px-4 py-3 rounded-xl text-white text-sm font-golos outline-none placeholder:text-white/25 border border-white/10 focus:border-purple-500/50 transition-colors"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 font-golos mb-1">Жанр</label>
                <input
                  value={form.genre}
                  onChange={(e) => setForm({ ...form, genre: e.target.value })}
                  placeholder="Поп, Рок, Реп..."
                  className="w-full px-4 py-3 rounded-xl text-white text-sm font-golos outline-none placeholder:text-white/25 border border-white/10 focus:border-purple-500/50 transition-colors"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/60 font-golos mb-1">Описание</label>
              <input
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Для кого и какой повод"
                className="w-full px-4 py-3 rounded-xl text-white text-sm font-golos outline-none placeholder:text-white/25 border border-white/10 focus:border-purple-500/50 transition-colors"
                style={{ background: "rgba(255,255,255,0.05)" }}
              />
            </div>

            {message && (
              <div className={`px-4 py-3 rounded-xl text-sm font-golos ${message.ok ? "text-green-400" : "text-red-400"}`}
                style={{ background: message.ok ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)" }}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={uploading || !selectedFile}
              className="w-full py-3 rounded-xl text-white font-semibold font-golos transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #c026d3, #f97316)" }}
            >
              {uploading ? "Загружаю..." : "Загрузить трек"}
            </button>
          </form>
        </div>

        {/* Tracks list */}
        <div>
          <h2 className="font-oswald text-lg font-semibold mb-4">Загруженные треки ({tracks.length})</h2>
          {loading ? (
            <div className="text-white/40 font-golos text-sm text-center py-8">Загрузка...</div>
          ) : tracks.length === 0 ? (
            <div className="text-white/30 font-golos text-sm text-center py-8 rounded-xl border border-dashed border-white/10">
              Треки ещё не загружены
            </div>
          ) : (
            <div className="space-y-3">
              {tracks.map((t) => (
                <div key={t.id} className="rounded-xl p-4 flex items-center gap-4"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(192,38,211,0.15)" }}>
                    <Icon name="Music2" size={18} style={{ color: "#c026d3" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-golos font-semibold text-sm truncate">{t.title}</p>
                    <div className="flex gap-2 mt-0.5">
                      {t.genre && <span className="text-xs text-purple-400 font-golos">{t.genre}</span>}
                      {t.description && <span className="text-xs text-white/40 font-golos truncate">{t.description}</span>}
                    </div>
                  </div>
                  <audio controls src={t.file_url} className="h-8 w-36 opacity-70 hover:opacity-100 transition-opacity" />
                  <button onClick={() => handleDelete(t.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors hover:bg-red-500/20"
                    style={{ color: "rgba(255,255,255,0.3)" }}>
                    <Icon name="Trash2" size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
