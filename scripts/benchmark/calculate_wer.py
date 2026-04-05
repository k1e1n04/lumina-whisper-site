#!/usr/bin/env python3
"""Calculate CER between Lumina Whisper and Apple voice input transcriptions.

Usage:
    python calculate_wer.py [lumina_csv] [apple_csv]
    # Defaults: lumina_results.csv and apple_results.csv in the same directory.
    # Writes public/benchmark-results.json at the project root.

Examples:
    python calculate_wer.py
    python calculate_wer.py lumina_results.csv apple_results_custom.csv
"""
import csv
import json
import sys
from datetime import date
from pathlib import Path

import jiwer

BENCHMARK_DIR = Path(__file__).parent
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
    lumina_path = BENCHMARK_DIR / (sys.argv[1] if len(sys.argv) > 1 else "lumina_results.csv")
    apple_path = BENCHMARK_DIR / (sys.argv[2] if len(sys.argv) > 2 else "apple_results.csv")

    for path in (lumina_path, apple_path):
        if not path.exists():
            print(f"Error: {path} not found.", file=sys.stderr)
            sys.exit(1)

    references = load_references(lumina_path)
    lumina = load_csv(lumina_path)
    apple = load_csv(apple_path)

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
