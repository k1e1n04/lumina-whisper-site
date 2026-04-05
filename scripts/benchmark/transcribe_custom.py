#!/usr/bin/env python3
"""Generate TTS audio from custom_sentences.txt and transcribe with WhisperKit CLI.

Usage:
    python transcribe_custom.py <whisperkit_cli>

Example:
    python transcribe_custom.py /tmp/WhisperKit/.build/release/whisperkit-cli
"""
import csv
import subprocess
import sys
import tempfile
from pathlib import Path

MODEL = "whisper-small"
LANGUAGE = "ja"
TTS_VOICE = "Kyoko"
SENTENCES_FILE = Path(__file__).parent / "custom_sentences.txt"
OUTPUT_CSV = Path(__file__).parent / "lumina_results.csv"
AUDIO_DIR = Path(__file__).parent / "custom_audio"


def load_sentences() -> list[tuple[str, str]]:
    """Return [(file_id, text), ...] from custom_sentences.txt."""
    rows = []
    with open(SENTENCES_FILE, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            parts = line.split(":", 1)
            if len(parts) == 2:
                rows.append((parts[0], parts[1]))
    return rows


def generate_audio(text: str, output_path: Path) -> None:
    """Generate WAV audio using macOS say command."""
    subprocess.run(
        ["say", "-v", TTS_VOICE, text, "-o", str(output_path), "--data-format=LEF32@22050"],
        check=True,
        capture_output=True,
    )


def transcribe(audio_path: Path, whisperkit_cli: Path) -> str:
    """Run whisperkit-cli and return transcribed text."""
    result = subprocess.run(
        [
            str(whisperkit_cli),
            "transcribe",
            "--audio-path", str(audio_path),
            "--model", MODEL,
            "--language", LANGUAGE,
        ],
        capture_output=True,
        text=True,
        timeout=600,
    )
    lines = [l.strip() for l in result.stdout.splitlines() if l.strip()]
    return lines[-1] if lines else ""


def main() -> None:
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <whisperkit_cli>", file=sys.stderr)
        sys.exit(1)

    whisperkit_cli = Path(sys.argv[1]).expanduser()
    if not whisperkit_cli.exists():
        print(f"Error: whisperkit-cli not found at {whisperkit_cli}", file=sys.stderr)
        sys.exit(1)

    AUDIO_DIR.mkdir(exist_ok=True)
    sentences = load_sentences()
    print(f"Processing {len(sentences)} samples with model={MODEL} language={LANGUAGE}")

    with open(OUTPUT_CSV, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["id", "reference", "hypothesis"])
        for i, (file_id, reference) in enumerate(sentences, 1):
            audio_path = AUDIO_DIR / f"{file_id}.wav"
            if not audio_path.exists():
                print(f"  [{i}/{len(sentences)}] Generating audio: {file_id}")
                generate_audio(reference, audio_path)
            hypothesis = transcribe(audio_path, whisperkit_cli)
            writer.writerow([file_id, reference, hypothesis])
            print(f"  [{i}/{len(sentences)}] {file_id}: {hypothesis[:50]}...")

    print(f"\nSaved to {OUTPUT_CSV}")


if __name__ == "__main__":
    main()
