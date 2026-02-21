import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Zap } from "lucide-react";
import SongInput from "@/components/SongInput";
import ScoreViewer from "@/components/ScoreViewer";
import { Song, ScoreMeasure, generateMockScore } from "@/lib/music-data";

type AppState = "input" | "generating" | "viewing";

const Index = () => {
  const [state, setState] = useState<AppState>("input");
  const [songA, setSongA] = useState<Song | null>(null);
  const [songB, setSongB] = useState<Song | null>(null);
  const [score, setScore] = useState<ScoreMeasure[]>([]);

  const handleGenerate = () => {
    if (!songA || !songB) return;
    setState("generating");
    setTimeout(() => {
      setScore(generateMockScore(songA, songB));
      setState("viewing");
    }, 2500);
  };

  const handleBack = () => {
    setState("input");
    setScore([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Music className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Mashcore</h1>
              <p className="text-xs text-muted-foreground font-mono">score mashup generator</p>
            </div>
          </div>
          {state === "viewing" && (
            <button
              onClick={handleBack}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← New mashup
            </button>
          )}
        </div>
      </header>

      <AnimatePresence mode="wait">
        {state === "input" && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <SongInput
              songA={songA}
              songB={songB}
              onSongAChange={setSongA}
              onSongBChange={setSongB}
              onGenerate={handleGenerate}
            />
          </motion.div>
        )}

        {state === "generating" && (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[70vh] flex-col items-center justify-center gap-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/30"
            >
              <Zap className="h-7 w-7 text-primary animate-pulse-glow" />
            </motion.div>
            <div className="text-center">
              <p className="text-lg font-semibold">Generating mashup...</p>
              <p className="mt-1 text-sm text-muted-foreground font-mono">
                Analyzing harmonies & rhythms
              </p>
            </div>
          </motion.div>
        )}

        {state === "viewing" && songA && songB && (
          <motion.div
            key="viewing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ScoreViewer songA={songA} songB={songB} measures={score} onMeasuresChange={setScore} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
