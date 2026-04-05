#!/usr/bin/env python3
"""Calculate CER between Lumina Whisper and Apple voice input transcriptions.

Usage:
    python calculate_wer.py
    # Reads lumina_results.csv and apple_results.csv from the same directory.
    # Writes public/benchmark-results.json at the project root.
"""
import csv
import json
import sys
from datetime import date
from pathlib import Path

import jiwer

BENCHMARK_DIR = Path(__file__).parent
LUMINA_RESULTS = BENCHMARK_DIR / "lumina_results.csv"
APPLE_RESULTS = BENCHMARK_DIR / "apple_results.csv"
OUTPUT_JSON = BENCHMARK_DIR.parent.parent / "public" / "benchmark-results.json"
MODEL_NAME = "whisper-small"


def load_csv(path: Path) -> dict[str, str]:
    """Load CSV with columns id, [reference,] hypothesis → {id: hypothesis}."""
    rows: dict[str, str] = {}
    with open(path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows[row["id"]] = row["hypothesis"]
    return rows


def load_references(path: Path) -> dict[str, str]:
    """Load reference column from lumina_results.csv → {id: reference}."""
    rows: dict[str, str] = {}
    with open(path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows[row["id"]] = row["reference"]
    return rows


def compute_cer(references: list[str], hypotheses: list[str]) -> float:
    """Return mean Character Error Rate as percentage, rounded to 1 decimal."""
    cer = jiwer.cer(references, hypotheses)
    return round(cer * 100, 1)


def pick_worst_samples(
    references: dict[str, str],
    lumina: dict[str, str],
    apple: dict[str, str],
    n: int = 3,
) -> list[dict]:
    """Return n samples sorted by Apple CER descending (worst first)."""
    def apple_cer(sid: str) -> float:
        return jiwer.cer([references[sid]], [apple[sid]])

    common = set(references) & set(lumina) & set(apple)
    sorted_ids = sorted(common, key=apple_cer, reverse=True)[:n]
    return [
        {
            "id": sid,
            "reference": references[sid],
            "lumina": lumina[sid],
            "apple": apple[sid],
        }
        for sid in sorted_ids
    ]


def main() -> None:
    for path in (LUMINA_RESULTS, APPLE_RESULTS):
        if not path.exists():
            print(f"Error: {path} not found.", file=sys.stderr)
            print("Run transcribe_lumina.py first, then fill in apple_results.csv.", file=sys.stderr)
            sys.exit(1)

    references = load_references(LUMINA_RESULTS)
    lumina = load_csv(LUMINA_RESULTS)
    apple = load_csv(APPLE_RESULTS)

    common_ids = sorted(set(references) & set(lumina) & set(apple))
    ref_list = [references[sid] for sid in common_ids]
    lumina_list = [lumina[sid] for sid in common_ids]
    apple_list = [apple[sid] for sid in common_ids]

    lumina_cer = compute_cer(ref_list, lumina_list)
    apple_cer = compute_cer(ref_list, apple_list)
    samples = pick_worst_samples(references, lumina, apple)

    result = {
        "lumina": {"cer": lumina_cer, "sampleCount": len(common_ids)},
        "apple": {"cer": apple_cer, "sampleCount": len(common_ids)},
        "dataset": "JSUT Basic5000",
        "measuredAt": str(date.today()),
        "modelName": MODEL_NAME,
        "samples": samples,
    }

    OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"Written to {OUTPUT_JSON}")
    print(f"Lumina CER: {lumina_cer}% | Apple CER: {apple_cer}% | Samples: {len(common_ids)}")


if __name__ == "__main__":
    main()
