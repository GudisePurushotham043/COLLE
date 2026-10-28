import json
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

from backend.database import get_current_state, update_state

ver, st, _, _, _ = get_current_state()
students = st.get('students', [])

# Filter out test student
cleaned_students = [s for s in students if (s.get('rollNo') or s.get('roll')) != '242G1A05Z9']

st['students'] = cleaned_students
update_state(st, updated_by='system_restore', change_summary='Restore exact original 392 student list')

print(f"Restored database: Total students = {len(cleaned_students)}")
