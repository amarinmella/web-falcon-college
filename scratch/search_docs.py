import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]
print("HTML Files:", html_files)

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Find all anchor tags that might be documents (either download keyword, pdf/docx extension, or just href="#")
    # Let's print out lines containing "download", ".pdf", ".docx", or "descargar"
    matches = []
    lines = content.split('\n')
    for idx, line in enumerate(lines, 1):
        if any(term in line.lower() for term in ['download', '.pdf', '.docx', 'descargar', 'rice', 'protocolo']):
            matches.append((idx, line.strip()))
            
    if matches:
        print(f"\n=== {file} ===")
        for idx, line in matches[:15]:
            print(f"  Line {idx}: {line}")
        if len(matches) > 15:
            print(f"  ... and {len(matches) - 15} more matches")
