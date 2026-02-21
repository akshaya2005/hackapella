import { useState } from "react";
import { motion } from "framer-motion";
import {
  MousePointer2,
  Eraser,
  RotateCcw,
  Download,
  Volume2,
} from "lucide-react";
import { Song, ScoreMeasure } from "@/lib/music-data";
import MeasureBlock from "./MeasureBlock";

interface ScoreViewerProps {
  songA: Song;
  songB: Song;
  measures: ScoreMeasure[];
  onMeasuresChange: (measures: ScoreMeasure[]) => void;
}

type Tool = "select" | "erase";

export default function ScoreViewer({
  songA,
  songB,
  measures,
  onMeasuresChange,
}: ScoreViewerProps) {
  const [activeTool, setActiveTool] = useState<Tool>("select");
  const selectedCount = measures.filter((m) => m.selected).length;

  const toggleMeasure = (id: string) => {
    onMeasuresChange(
      measures.map((m) =>
        m.id === id ? { ...m, selected: !m.selected } : m
      )
    );
  };

  const clearSelection = () => {
    onMeasuresChange(measures.map((m) => ({ ...m, selected: false })));
  };

  const tools = [
    { id: "select" as Tool, icon: MousePointer2, label: "Select" },
    { id: "erase" as Tool, icon: Eraser, label: "Erase" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* Song Info Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">
            {songA.title} × {songB.title}
          </h2>
          <p className="text-sm text-muted-foreground font-mono">
            {songA.artist} + {songB.artist} · 32 measures
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-song-a" />
            <span className="text-muted-foreground">Song A</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-song-b" />
            <span className="text-muted-foreground">Song B</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-r from-song-a to-song-b" />
            <span className="text-muted-foreground">Mixed</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-3">
        <div className="flex items-center gap-1">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
                activeTool === tool.id
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <tool.icon className="h-4 w-4" />
              {tool.label}
            </button>
          ))}
          <div className="mx-2 h-5 w-px bg-border" />
          <button
            onClick={clearSelection}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          >
            <RotateCcw className="h-4 w-4" />
            Clear
          </button>
        </div>

        <div className="flex items-center gap-3">
          {selectedCount > 0 && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-full bg-primary/15 px-3 py-1 text-xs font-mono text-primary"
            >
              {selectedCount} selected
            </motion.span>
          )}
          <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
            <Volume2 className="h-4 w-4" />
            Preview
          </button>
          <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Score Grid */}
      <div className="rounded-xl border border-border bg-card p-4 overflow-x-auto">
        {/* Staff lines hint */}
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-8 lg:grid-cols-16">
          {measures.map((measure, idx) => (
            <MeasureBlock
              key={measure.id}
              measure={measure}
              index={idx}
              tool={activeTool}
              onClick={() => {
                if (activeTool === "select") toggleMeasure(measure.id);
                else if (activeTool === "erase" && measure.selected)
                  toggleMeasure(measure.id);
              }}
            />
          ))}
        </div>
      </div>

      {/* Editing Panel */}
      {selectedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-5 glow-amber"
        >
          <h3 className="mb-3 font-semibold text-primary">
            Edit {selectedCount} measure{selectedCount > 1 ? "s" : ""}
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Swap source",
              "Transpose +1",
              "Transpose -1",
              "Double tempo",
              "Half tempo",
              "Reverse",
              "Delete notes",
            ].map((action) => (
              <button
                key={action}
                className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground hover:bg-muted transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
