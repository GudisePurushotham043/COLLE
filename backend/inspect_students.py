import json
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

from backend.database import get_current_state, SEED_PATH

ver, st, _, _, _ = get_current_state()
students = st.get('students', [])
print(f"Total students in DB: {len(students)}")

depts = {}
for s in students:
    d = s.get('dept', 'Unknown')
    depts[d] = depts.get(d, 0) + 1
print("By Dept:", depts)

sections = {}
for s in students:
    k = f"{s.get('dept')}-{s.get('year')}-Sec{s.get('section')}"
    sections[k] = sections.get(k, 0) + 1
print("\nBy Dept-Year-Section:")
for k, v in sorted(sections.items()):
    print(f"  {k}: {v}")

# Sample student inspect
print("\nSample students:")
for s in students[:5]:
    print(" ", s.get('id'), s.get('rollNo'), s.get('name'), s.get('dept'), s.get('section'))
print(" ...")
for s in students[-5:]:
    print(" ", s.get('id'), s.get('rollNo'), s.get('name'), s.get('dept'), s.get('section'))
