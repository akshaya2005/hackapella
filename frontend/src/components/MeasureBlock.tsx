import { motion } from "framer-motion";
import { ScoreMeasure } from "@/lib/music-data";

const PITCH_MAP: Record<string, number> = {
  C4: 9, D4: 8, E4: 7, F4: 6, G4: 5, A4: 4, B4: 3, C5: 2, D5: 1, E5: 0,
};

interface MeasureBlockProps {
  measure: ScoreMeasure;
  index: number;
  tool: "select" | "erase";
  onClick: () => void;
}

export default function MeasureBlock({ measure, index, onClick }: MeasureBlockProps) {
  const sourceColor =
    measure.source === "a"
      ? "bg-song-a/20 border-song-a/40"
      : measure.source === "b"
      ? "bg-song-b/20 border-song-b/40"
      : "bg-gradient-to-r from-song-a/10 to-song-b/10 border-muted-foreground/20";

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.02, duration: 0.3 }}
      onClick={onClick}
      className={`group relative flex flex-col rounded-lg border p-1.5 transition-all duration-150 cursor-pointer ${sourceColor} ${
        measure.selected
          ? "ring-2 ring-primary ring-offset-1 ring-offset-background"
          : "hover:brightness-125"
      }`}
    >
      {/* Measure number */}
      <span className="mb-1 text-[9px] font-mono text-muted-foreground leading-none">
        {measure.number}
      </span>

      {/* Mini staff */}
      <div className="relative h-12 w-full">
        {/* Staff lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px bg-score-line/40"
            style={{ top: `${10 + i * 8}px` }}
          />
        ))}

        {/* Notes */}
        {measure.notes.map((note) => {
          const row = PITCH_MAP[note.pitch] ?? 5;
          const col = ((note.beat - 1) / measure.notes.length) * 100;
          const isA = note.source === "a";
          return (
            <div
              key={note.id}
              className={`absolute h-1.5 w-1.5 rounded-full ${
                isA ? "bg-song-a" : "bg-song-b"
              }`}
              style={{
                top: `${4 + row * 4}px`,
                left: `${5 + col * 0.85}%`,
              }}
            />
          );
        })}
      </div>
    </motion.button>
  );
}
