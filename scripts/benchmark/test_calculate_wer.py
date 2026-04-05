# scripts/benchmark/test_calculate_wer.py
import json
import csv
import pytest
from pathlib import Path
from calculate_wer import compute_cer, pick_worst_samples, load_csv


def write_csv(path: Path, rows: list[dict], fieldnames: list[str]) -> None:
    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def test_compute_cer_perfect():
    refs = ["明日の会議は午後3時"]
    hyps = ["明日の会議は午後3時"]
    assert compute_cer(refs, hyps) == 0.0


def test_compute_cer_partial_error():
    refs = ["明日の会議は午後3時から始まります"]
    hyps = ["明日の会議は後3時から始まります"]  # 1 char missing "午"
    cer = compute_cer(refs, hyps)
    assert 0.0 < cer < 20.0


def test_pick_worst_samples_returns_n(tmp_path):
    references = {
        "id1": "ABCD",
        "id2": "EFGH",
        "id3": "IJKL",
    }
    lumina = {"id1": "ABCD", "id2": "EFGH", "id3": "IJKL"}  # perfect
    apple = {"id1": "ABXX", "id2": "EXYH", "id3": "XXXX"}   # various errors
    samples = pick_worst_samples(references, lumina, apple, n=2)
    assert len(samples) == 2
    assert samples[0]["id"] in {"id1", "id2", "id3"}
    assert "reference" in samples[0]
    assert "lumina" in samples[0]
    assert "apple" in samples[0]


def test_pick_worst_samples_orders_by_apple_cer(tmp_path):
    references = {"id1": "ABCD", "id2": "EFGH"}
    lumina = {"id1": "ABCD", "id2": "EFGH"}
    # id2 has more apple errors
    apple = {"id1": "ABCX", "id2": "XXXX"}
    samples = pick_worst_samples(references, lumina, apple, n=2)
    assert samples[0]["id"] == "id2"  # worst apple first


def test_load_csv(tmp_path):
    csv_path = tmp_path / "test.csv"
    write_csv(csv_path, [
        {"id": "id1", "reference": "ref1", "hypothesis": "hyp1"},
        {"id": "id2", "reference": "ref2", "hypothesis": "hyp2"},
    ], ["id", "reference", "hypothesis"])
    result = load_csv(csv_path)
    assert result == {"id1": "hyp1", "id2": "hyp2"}
