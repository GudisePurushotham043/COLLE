import json
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

from backend.database import get_current_state

ver, st, _, _, _ = get_current_state()
students = st.get('students', [])

print(f"Total students in DB: {len(students)}")
rolls = {}
duplicates = []
dummies = []
for s in students:
    r = (s.get('rollNo') or s.get('roll') or '').strip().toUpperCase() if hasattr(s.get('rollNo') or s.get('roll') or '', 'toUpperCase') else str(s.get('rollNo') or s.get('roll') or '').strip().upper()
    n = str(s.get('name', '')).upper()
    sid = str(s.get('id', ''))
    
    # Check for dummy/sample keywords
    if 'DEMO' in n or 'SAMPLE' in n or 'TEST' in n or 'DUMMY' in n or 'PLACEHOLDER' in n:
        dummies.append(s)
    if r == '252G1A0403' or sid == 'STU-102':
        dummies.append(s)
        
    if r in rolls:
        duplicates.append((r, s.get('name'), rolls[r].get('name')))
    else:
        rolls[r] = s

print(f"Duplicates found: {len(duplicates)}")
for d in duplicates:
    print(" ", d)

print(f"Dummies found: {len(dummies)}")
for d in dummies:
    print(" ", d.get('rollNo'), d.get('name'), d.get('id'))

# Check for students with missing rollNo or missing name or missing dept
invalid = [s for s in students if not (s.get('rollNo') or s.get('roll')) or not s.get('name') or not s.get('dept')]
print(f"Invalid/empty records: {len(invalid)}")
for inv in invalid:
    print(" ", inv)
