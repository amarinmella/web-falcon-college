import re
import os

html_files = [
    "admision-media.html",
    "contacto-media.html",
    "convivencia-media.html",
    "falcon-college.html",
    "galeria-media.html",
    "nosotros-media.html",
    "noticias-media.html",
    "tecnico-profesional.html"
]

base_path = "c:/Users/ANDRES MARIN/Desktop/PROYECTOS WEB/WEB FALCON COLLEGE"

# Old footer block
old_footer_block = """            <!-- Social/Contact Column -->
            <div class="col-span-1 md:col-span-1 flex flex-col space-y-4">
                <span class="font-label-md text-label-md text-primary font-bold">Redes Sociales</span>
                <div class="flex space-x-4">
                    <a class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary transition-colors" href="https://www.instagram.com/falconcollege_">
                        <span class="material-symbols-outlined" style="font-size: 20px;">link</span>
                    </a>
                    <a class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary transition-colors" href="mailto:colegiofalconcollege@hotmail.com">
                        <span class="material-symbols-outlined" style="font-size: 20px;">mail</span>
                    </a>
                </div>
            </div>"""

# New footer block
new_footer_block = """            <!-- Social/Contact Column -->
            <div class="col-span-1 md:col-span-1 flex flex-col space-y-3">
                <span class="font-label-md text-label-md text-primary font-bold mb-1">Contacto</span>
                <p class="font-body-md text-body-md text-on-surface-variant flex items-start gap-2 text-sm">
                    <span class="material-symbols-outlined text-[18px] mt-0.5">location_on</span>
                    Mapocho 5740, Quinta Normal
                </p>
                <p class="font-body-md text-body-md text-on-surface-variant flex items-center gap-2 text-sm">
                    <span class="material-symbols-outlined text-[18px]">phone</span>
                    2 2786 0346
                </p>
                <p class="font-body-md text-body-md text-on-surface-variant flex items-center gap-2 text-sm">
                    <span class="material-symbols-outlined text-[18px]">mail</span>
                    colegiofalconcollege@hotmail.com
                </p>
                <div class="flex space-x-4 pt-2">
                    <a class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary transition-colors" href="https://www.instagram.com/falconcollege_" title="Instagram">
                        <span class="material-symbols-outlined" style="font-size: 20px;">link</span>
                    </a>
                </div>
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
        # Try regex search in case of slight whitespace variations
        print(f"Warning: Footer block not matched exactly in {filename}. Attempting regex replace.")
        pattern = r"<!-- Social/Contact Column -->\s*<div class=\"col-span-1 md:col-span-1 flex flex-col space-y-4\">\s*<span class=\"font-label-md text-label-md text-primary font-bold\">Redes Sociales</span>\s*<div class=\"flex space-x-4\">\s*<a class=\"w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary transition-colors\" href=\"https://www.instagram.com/falconcollege_\">\s*<span class=\"material-symbols-outlined\" style=\"font-size: 20px;\">link</span>\s*</a>\s*<a class=\"w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary transition-colors\" href=\"mailto:colegiofalconcollege@hotmail.com\">\s*<span class=\"material-symbols-outlined\" style=\"font-size: 20px;\">mail</span>\s*</a>\s*</div>\s*</div>"
        content, count = re.subn(pattern, new_footer_block, content)
        if count > 0:
            print(f"Updated footer in {filename} via regex")
        else:
            print(f"Error: Could not update footer in {filename}")
            
    # For contacto-media.html, do additional page-level replacements
    if filename == "contacto-media.html":
        # Replace address card
        old_card_addr = 'Mapocho 5740, Quinta Normal,<br>Santiago, Chile'
        new_card_addr = 'Mapocho 5740, Quinta Normal'
        if old_card_addr in content:
            content = content.replace(old_card_addr, new_card_addr)
            print("Updated page-level address card in contacto-media.html")
            
        # Replace copy address data-address
        old_data_addr = 'data-address="Mapocho 5740, Quinta Normal, Santiago"'
        new_data_addr = 'data-address="Mapocho 5740, Quinta Normal"'
        if old_data_addr in content:
            content = content.replace(old_data_addr, new_data_addr)
            print("Updated copy-button data-address in contacto-media.html")

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Finished footer updates.")
