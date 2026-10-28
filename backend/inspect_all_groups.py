import json
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

from backend.database import get_current_state, SEED_PATH

ver, st, _, _, _ = get_current_state()
students = st.get('students', [])

print(f"Total students: {len(students)}")
# Inspect patterns of student IDs, roll numbers, names
sec_map = {}
for s in students:
    sec = f"{s.get('dept')}-{s.get('year')}-{s.get('section')}"
    if sec not in sec_map:
        sec_map[sec] = []
    sec_map[sec].append(s)

for sec, list_s in sec_map.items():
    print(f"\n=== {sec} (Count: {len(list_s)}) ===")
    print("  Roll range:", list_s[0].get('rollNo'), "to", list_s[-1].get('rollNo'))
    print("  First 3 names:", [x.get('name') for x in list_s[:3]])
    print("  First 3 IDs:", [x.get('id') for x in list_s[:3]])
