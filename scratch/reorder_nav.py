import re
import os

files = [
    "falcon-little.html",
    "nosotros-little.html",
    "admision-little.html",
    "academico-little.html",
    "noticias-little.html",
    "galeria-little.html",
    "convivencia-little.html",
    "contacto-little.html",
    "falcon-college.html",
    "nosotros-media.html",
    "admision-media.html",
    "tecnico-profesional.html",
    "noticias-media.html",
    "galeria-media.html",
    "convivencia-media.html",
    "contacto-media.html"
]

def reorder_list_items(ul_content):
    # Split ul_content into individual <li> lines, maintaining structure
    lines = ul_content.split('\n')
    
    # We want to identify the index of RICE, Noticias, and Galería items
    rice_idx = -1
    noticias_idx = -1
    galeria_idx = -1
    
    items = []
    # Parse out each <li> item line
    for i, line in enumerate(lines):
        if "convivencia-" in line or "RICE y Protocolos" in line:
            rice_idx = len(items)
        elif "noticias-" in line or "Noticias" in line:
            noticias_idx = len(items)
        elif "galeria-" in line or "Galería" in line:
            galeria_idx = len(items)
        
        # If it's a valid <li> element, append it
        if "<li>" in line:
            items.append(line)
        elif "pt-2" in line and "Postula" in line: # Mobile menu last button
            items.append(line)
            
    print(f"  Parsed items count: {len(items)}")
    print(f"  Indices found -> RICE: {rice_idx}, Noticias: {noticias_idx}, Galeria: {galeria_idx}")
    
    if rice_idx != -1 and noticias_idx != -1 and galeria_idx != -1:
        # Move RICE to be between Noticias and Galeria
        rice_item = items.pop(rice_idx)
        
        # After popping, indices might change. Let's find "Noticias" and "Galeria" again in the new list.
        new_noticias_idx = -1
        new_galeria_idx = -1
        for i, item in enumerate(items):
            if "noticias-" in item or "Noticias" in item:
                new_noticias_idx = i
            elif "galeria-" in item or "Galería" in item:
                new_galeria_idx = i
                
        # We insert RICE right after Noticias (which is new_noticias_idx + 1)
        insert_idx = new_noticias_idx + 1
        items.insert(insert_idx, rice_item)
        print(f"  Reordered successfully. Inserted RICE at index {insert_idx}")
    else:
        print("  WARNING: Could not find all necessary items for reordering!")
        return ul_content

    # Reconstruct the ul_content with original indentation
    # Let's extract the leading whitespace of the first item to style the rest
    indent = "            "
    for line in lines:
        if "<li>" in line:
            indent = line[:len(line) - len(line.lstrip())]
            break
            
    reconstructed = []
    # Add leading/trailing non-li lines if any (like blank lines)
    # Actually, we can just replace the <li> lines in the original ul_content
    # Let's rebuild the whole block with the new items list
    for item in items:
        # Normalize indentation
        stripped = item.strip()
        reconstructed.append(f"{indent}{stripped}")
        
    return "\n" + "\n".join(reconstructed) + "\n" + indent[:-4]

for filename in files:
    if not os.path.exists(filename):
        print(f"File {filename} not found!")
        continue
        
    print(f"Processing {filename}...")
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Process Desktop Nav
    desktop_match = re.search(r'(<ul class="hidden lg:flex[^>]*>)(.*?)(</ul>)', content, re.DOTALL)
    if desktop_match:
        ul_header = desktop_match.group(1)
        ul_body = desktop_match.group(2)
        ul_footer = desktop_match.group(3)
        
        print("Desktop Navigation:")
        new_body = reorder_list_items(ul_body)
        
        content = content.replace(desktop_match.group(0), f"{ul_header}{new_body}{ul_footer}")
    else:
        print("  Desktop Navigation not found!")
        
    # Process Mobile Nav
    # We find <div class="mobile-menu... <ul...> ... </ul>
    mobile_match = re.search(r'(<div class="mobile-menu[^>]*>.*?<ul[^>]*>)(.*?)(</ul>)', content, re.DOTALL)
    if mobile_match:
        ul_header = mobile_match.group(1)
        ul_body = mobile_match.group(2)
        ul_footer = mobile_match.group(3)
        
        print("Mobile Navigation:")
        new_body = reorder_list_items(ul_body)
        
        content = content.replace(mobile_match.group(0), f"{ul_header}{new_body}{ul_footer}")
    else:
        print("  Mobile Navigation not found!")
        
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Finished {filename}\n")
