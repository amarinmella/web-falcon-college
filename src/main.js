// Mobile Menu Logic
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtns = document.querySelectorAll('.mobile-menu-btn');
    const mobileMenus = document.querySelectorAll('.mobile-menu');

    mobileMenuBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const menu = mobileMenus[index];
            if (menu) {
                menu.classList.toggle('hidden');
                
                // Toggle icon between menu and close
                const icon = btn.querySelector('.material-symbols-outlined');
                if (menu.classList.contains('hidden')) {
                    icon.textContent = 'menu';
                } else {
                    icon.textContent = 'close';
                }
            }
        });
    });
});
