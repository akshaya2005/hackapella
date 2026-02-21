# Hackapella 🎶

AI-powered a cappella mashup generator.

## What It Does
- Takes two MIDI files
- Detects key + tempo
- Combines melodies
- Generates harmonies using an LSTM
- Outputs SATB MIDI arrangement

## Setup Instructions

### 1. Create virtual environment
python -m venv venv

### 2. Activate it
Mac/Linux:
source venv/bin/activate

Windows:
venv\Scripts\activate

### 3. Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

### 4. Run backend
uvicorn app:app --reload

## Project Structure

backend/
│── app.py
│── models/
│── data/
│── requirements.txt
│── README.md

## Authors
Hackathon Team 🚀