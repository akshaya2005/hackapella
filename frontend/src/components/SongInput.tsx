import { useState } from "react";
import { motion } from "framer-motion";
import { Music2, Disc3, ArrowRight } from "lucide-react";
import { Song, SAMPLE_SONGS } from "@/lib/music-data";

interface SongInputProps {
  songA: Song | null;
  songB: Song | null;
  onSongAChange: (song: Song) => void;
  onSongBChange: (song: Song) => void;
  onGenerate: () => void;
}

function SongCard({
  label,
  variant,
  selected,
  onSelect,
}: {
  label: string;
  variant: "a" | "b";
  selected: Song | null;
  onSelect: (song: Song) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex-1">
      <div className="mb-3 flex items-center gap-2">
        <div
          className={`h-2.5 w-2.5 rounded-full ${
            variant === "a" ? "bg-song-a" : "bg-song-b"
          }`}
        />
        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      </div>

      <button
        onClick={() => setOpen(!open)}
        className={`w-full rounded-xl border p-5 text-left transition-all duration-200 ${
          selected
            ? "border-border bg-card"
            : "border-dashed border-muted-foreground/30 hover:border-muted-foreground/50 bg-muted/30"
        }`}
      >
        {selected ? (
          <div>
            <p className="text-lg font-semibold">{selected.title}</p>
            <p className="text-sm text-muted-foreground">{selected.artist}</p>
            <div className="mt-3 flex gap-3 font-mono text-xs text-muted-foreground">
              <span>{selected.bpm} BPM</span>
              <span>Key: {selected.key}</span>
              <span>{selected.duration}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 py-2">
            <Disc3 className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">Select a song...</span>
          </div>
        )}
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 max-h-60 overflow-y-auto rounded-xl border border-border bg-card p-1"
        >
          {SAMPLE_SONGS.map((song) => (
            <button
              key={song.id}
              onClick={() => {
                onSelect(song);
                setOpen(false);
              }}
              className="w-full rounded-lg px-4 py-3 text-left transition-colors hover:bg-muted"
            >
              <p className="text-sm font-medium">{song.title}</p>
              <p className="text-xs text-muted-foreground">
                {song.artist} · {song.bpm} BPM · {song.key}
              </p>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default function SongInput({
  songA,
  songB,
  onSongAChange,
  onSongBChange,
  onGenerate,
}: SongInputProps) {
  const ready = songA && songB && songA.id !== songB.id;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-12 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 glow-amber"
        >
          <Music2 className="h-7 w-7 text-primary" />
        </motion.div>
        <h2 className="text-3xl font-bold tracking-tight">Create a Mashup</h2>
        <p className="mt-2 text-muted-foreground">
          Pick two songs and we'll generate an editable score
        </p>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
        <SongCard label="Song A" variant="a" selected={songA} onSelect={onSongAChange} />
        <SongCard label="Song B" variant="b" selected={songB} onSelect={onSongBChange} />
      </div>

      <div className="mt-10 flex justify-center">
        <motion.button
          whileHover={ready ? { scale: 1.03 } : {}}
          whileTap={ready ? { scale: 0.97 } : {}}
          onClick={onGenerate}
          disabled={!ready}
          className={`flex items-center gap-2 rounded-xl px-8 py-3.5 font-semibold transition-all duration-200 ${
            ready
              ? "bg-primary text-primary-foreground glow-amber hover:brightness-110"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          Generate Mashup
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
}
