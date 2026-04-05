#!/usr/bin/env python3
"""Transcribe JSUT Basic5000 audio files using WhisperKit CLI.

Usage:
    python transcribe_lumina.py <jsut_dir> <whisperkit_cli>

Example:
    python transcribe_lumina.py ~/datasets/jsut_ver1.1 /tmp/WhisperKit/.build/release/whisperkit-cli
"""
import csv
import subprocess
import sys
from pathlib import Path

SAMPLE_COUNT = 50
MODEL = "openai_whisper-small"
LANGUAGE = "ja"
OUTPUT_FILENAME = "lumina_results.csv"


def load_transcript(jsut_dir: Path) -> list[tuple[str, str]]:
    """Return [(file_id, reference), ...] from JSUT transcript_utf8.txt."""
    transcript_path = jsut_dir / "basic5000" / "transcript_utf8.txt"
    if not transcript_path.exists():
        raise FileNotFoundError(f"Transcript not found: {transcript_path}")
    rows = []
    with open(transcript_path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            parts = line.split("\t", 1)
            if len(parts) == 2:
                rows.append((parts[0], parts[1]))
    return rows[:SAMPLE_COUNT]


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
        timeout=120,
    )
    # whisperkit-cli outputs the transcription to stdout; last non-empty line
    lines = [l.strip() for l in result.stdout.splitlines() if l.strip()]
    return lines[-1] if lines else ""


def main() -> None:
    if len(sys.argv) != 3:
        print(f"Usage: {sys.argv[0]} <jsut_dir> <whisperkit_cli>", file=sys.stderr)
        sys.exit(1)

    jsut_dir = Path(sys.argv[1]).expanduser()
    whisperkit_cli = Path(sys.argv[2]).expanduser()
    audio_dir = jsut_dir / "basic5000" / "wav"
    output_path = Path(__file__).parent / OUTPUT_FILENAME

    if not whisperkit_cli.exists():
        print(f"Error: whisperkit-cli not found at {whisperkit_cli}", file=sys.stderr)
        sys.exit(1)

    samples = load_transcript(jsut_dir)
    print(f"Processing {len(samples)} samples with model={MODEL} language={LANGUAGE}")

    with open(output_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["id", "reference", "hypothesis"])
        for i, (file_id, reference) in enumerate(samples, 1):
            audio_path = audio_dir / f"{file_id}.wav"
            if not audio_path.exists():
                print(f"  [{i}/{len(samples)}] WARNING: {audio_path} not found, skipping", file=sys.stderr)
                continue
            hypothesis = transcribe(audio_path, whisperkit_cli)
            writer.writerow([file_id, reference, hypothesis])
            print(f"  [{i}/{len(samples)}] {file_id}: {hypothesis[:40]}...")

    print(f"\nSaved to {output_path}")


if __name__ == "__main__":
    main()
