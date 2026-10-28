import re

with open("index.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

with open("js/app.js", "r", encoding="utf-8", errors="ignore") as f:
    js = f.read()

events = set(re.findall(r'on(?:click|change|input|submit|load|keydown|keyup)\s*=\s*["\']([a-zA-Z0-9_$.]+)\s*\(', html))
print(f"Total distinct event targets in index.html: {len(events)}")

missing = []
for ev in sorted(events):
    if ev.startswith("AuthGuard.") or ev.startswith("BackendSync.") or ev.startswith("console.") or ev.startswith("history.") or ev.startswith("document.") or ev in ["alert", "confirm", "print"]:
        continue
    # Check if defined in js or html
    pat = rf'(?:function\s+{re.escape(ev)}\b|window\.{re.escape(ev)}\s*=|const\s+{re.escape(ev)}\s*=|let\s+{re.escape(ev)}\s*=|var\s+{re.escape(ev)}\s*=)'
    if not re.search(pat, js) and not re.search(pat, html):
        missing.append(ev)

print(f"Missing in js/app.js or index.html ({len(missing)}):")
for m in missing:
    print(f"  * {m}")
