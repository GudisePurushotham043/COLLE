import re
import sys

for portal, app_path in [("Faculty", "faculty/app.js"), ("Student", "student/app.js"), ("Staff", "staff/app.js")]:
    print(f"\n==========================================")
    print(f"  ANALYZING {portal} Portal ({app_path})")
    print(f"==========================================")
    with open(app_path, "r", encoding="utf-8", errors="ignore") as f:
        code = f.read()

    # Check state saving functions
    saves = re.findall(r'(?:pushState|saveState|localStorage\.setItem)[^\n]+', code)
    print(f"State persistence mechanisms ({len(saves)}):")
    for s in saves[:10]:
        print(f"  - {s.strip()}")

    # Check fetch calls
    fetches = re.findall(r'fetch\([^\n]+', code)
    print(f"\nAPI fetch calls ({len(fetches)}):")
    for ft in fetches:
        print(f"  - {ft.strip()}")

    # Check AuthGuard usage
    auth_uses = re.findall(r'AuthGuard\.[a-zA-Z0-9_]+', code)
    print(f"\nAuthGuard references: {set(auth_uses)}")
