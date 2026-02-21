from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
from utils.midi_parser import parse_midi
from utils.mashup_engine import create_mashup_blueprint
from utils.harmonizer import generate_harmony

app = FastAPI()

@app.post("/generate_mashup")
async def generate_mashup(song_a: UploadFile = File(...), song_b: UploadFile = File(...)):
    # 1. Parse MIDI files
    melody_a, chords_a = parse_midi(song_a.file)
    melody_b, chords_b = parse_midi(song_b.file)
    
    # 2. Generate mashup blueprint
    mashup_melody, mashup_chords = create_mashup_blueprint(melody_a, chords_a, melody_b, chords_b)
    
    # 3. Generate harmonies with LSTM
    full_score = generate_harmony(mashup_melody, mashup_chords)
    
    # 4. Save MIDI for download/playback
    output_file = "data/mashup_output.mid"
    full_score.write('midi', fp=output_file)
    
    return FileResponse(output_file, media_type='audio/midi', filename="mashup_output.mid")