import re
import os

html_files = [
    "academico-little.html",
    "admision-little.html",
    "contacto-little.html",
    "convivencia-little.html",
    "falcon-little.html",
    "galeria-little.html",
    "nosotros-little.html",
    "noticias-little.html"
]

base_path = "c:/Users/ANDRES MARIN/Desktop/PROYECTOS WEB/WEB FALCON COLLEGE"

# Old footer block
old_footer_block = """            <!-- Contact Info -->
            <div class="flex flex-col gap-3">
                <h4 class="font-label-md text-label-md font-bold text-primary uppercase tracking-wider mb-2">Ubicación</h4>
                <p class="font-body-md text-body-md text-on-surface-variant flex items-start gap-2">
                    <span class="material-symbols-outlined text-sm mt-1">location_on</span>
                    Mapocho 5488, Quinta Normal, Santiago
                </p>
                <p class="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
                    <span class="material-symbols-outlined text-sm">phone</span>
                    +56 2 2774 1667
                </p>
            </div>"""

# New footer block
new_footer_block = """            <!-- Contact Info -->
            <div class="flex flex-col gap-3">
                <h4 class="font-label-md text-label-md font-bold text-primary uppercase tracking-wider mb-2">Ubicación</h4>
                <p class="font-body-md text-body-md text-on-surface-variant flex items-start gap-2">
                    <span class="material-symbols-outlined text-sm mt-1">location_on</span>
                    Mapocho 5488, Quinta Normal
                </p>
                <p class="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
                    <span class="material-symbols-outlined text-sm">phone</span>
                    2 2277 41667
                </p>
                <p class="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
                    <span class="material-symbols-outlined text-sm">mail</span>
                    falconlittle@gmail.com
                </p>
            </div>"""

for filename in html_files:
    file_path = os.path.join(base_path, filename)
    if not os.path.exists(file_path):
        print(f"File {filename} not found.")
        continue
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Replace footer
    if old_footer_block in content:
        content = content.replace(old_footer_block, new_footer_block)
        print(f"Updated footer in {filename}")
    else:
        # Try variation with different spacing/newlines just in case
        print(f"Warning: Footer block not matched exactly in {filename}. Attempting regex replace.")
        pattern = r"<!-- Contact Info -->\s*<div class=\"flex flex-col gap-3\">\s*<h4 class=\"font-label-md text-label-md font-bold text-primary uppercase tracking-wider mb-2\">Ubicación</h4>\s*<p class=\"font-body-md text-body-md text-on-surface-variant flex items-start gap-2\">\s*<span class=\"material-symbols-outlined text-sm mt-1\">location_on</span>\s*Mapocho 5488, Quinta Normal, Santiago\s*</p>\s*<p class=\"font-body-md text-body-md text-on-surface-variant flex items-center gap-2\">\s*<span class=\"material-symbols-outlined text-sm\">phone</span>\s*\+56 2 2774 1667\s*</p>\s*</div>"
        content, count = re.subn(pattern, new_footer_block, content)
        if count > 0:
            print(f"Updated footer in {filename} via regex")
        else:
            print(f"Error: Could not update footer in {filename}")
            
    # For contacto-little.html, do additional page-level replacements
    if filename == "contacto-little.html":
        # Replace address card
        old_card_addr = 'Mapocho 5488, Quinta Normal,<br>Santiago, Chile'
        new_card_addr = 'Mapocho 5488, Quinta Normal'
        if old_card_addr in content:
            content = content.replace(old_card_addr, new_card_addr)
            print("Updated page-level address card in contacto-little.html")
            
        # Replace phone href and text
        old_tel_href = 'href="tel:+56227741667"'
        new_tel_href = 'href="tel:+562227741667"'
        if old_tel_href in content:
            content = content.replace(old_tel_href, new_tel_href)
            print("Updated page-level phone link in contacto-little.html")
            
        old_tel_text = '>+56 2 2774 1667<'
        new_tel_text = '>2 2277 41667<'
        if old_tel_text in content:
            content = content.replace(old_tel_text, new_tel_text)
            print("Updated page-level phone text in contacto-little.html")
            
        # Replace copy address data-address
        old_data_addr = 'data-address="Mapocho 5488, Quinta Normal, Santiago"'
        new_data_addr = 'data-address="Mapocho 5488, Quinta Normal"'
        if old_data_addr in content:
            content = content.replace(old_data_addr, new_data_addr)
            print("Updated copy-button data-address in contacto-little.html")

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Finished footer updates.")
