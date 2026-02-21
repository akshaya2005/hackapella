export interface Song {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  key: string;
  duration: string;
}

export interface ScoreNote {
  id: string;
  measure: number;
  beat: number;
  pitch: string;
  duration: number;
  source: "a" | "b";
}

export interface ScoreMeasure {
  id: string;
  number: number;
  notes: ScoreNote[];
  source: "a" | "b" | "mixed";
  selected: boolean;
}

export const SAMPLE_SONGS: Song[] = [
  { id: "1", title: "Bohemian Rhapsody", artist: "Queen", bpm: 72, key: "Bb", duration: "5:55" },
  { id: "2", title: "Billie Jean", artist: "Michael Jackson", bpm: 117, key: "F#m", duration: "4:54" },
  { id: "3", title: "Stairway to Heaven", artist: "Led Zeppelin", bpm: 82, key: "Am", duration: "8:02" },
  { id: "4", title: "Superstition", artist: "Stevie Wonder", bpm: 101, key: "Ebm", duration: "4:26" },
  { id: "5", title: "Take Five", artist: "Dave Brubeck", bpm: 172, key: "Ebm", duration: "5:24" },
  { id: "6", title: "So What", artist: "Miles Davis", bpm: 136, key: "Dm", duration: "9:22" },
  { id: "7", title: "Clocks", artist: "Coldplay", bpm: 131, key: "Ebm", duration: "5:07" },
  { id: "8", title: "Get Lucky", artist: "Daft Punk", bpm: 116, key: "F#m", duration: "6:09" },
];

const PITCHES = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5"];

export function generateMockScore(songA: Song, songB: Song): ScoreMeasure[] {
  const measures: ScoreMeasure[] = [];
  const totalMeasures = 32;

  for (let i = 0; i < totalMeasures; i++) {
    const source: "a" | "b" | "mixed" = i < 8 ? "a" : i < 16 ? "mixed" : i < 24 ? "b" : "mixed";
    const noteCount = 3 + Math.floor(Math.random() * 4);
    const notes: ScoreNote[] = [];

    for (let n = 0; n < noteCount; n++) {
      notes.push({
        id: `${i}-${n}`,
        measure: i,
        beat: n + 1,
        pitch: PITCHES[Math.floor(Math.random() * PITCHES.length)],
        duration: [0.25, 0.5, 1, 2][Math.floor(Math.random() * 4)],
        source: source === "mixed" ? (Math.random() > 0.5 ? "a" : "b") : source,
      });
    }

    measures.push({
      id: `m-${i}`,
      number: i + 1,
      notes,
      source,
      selected: false,
    });
  }

  return measures;
}
