// Mobile Menu & Scroll Reveal Logic
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Logic with smooth transitions
    const mobileMenuBtns = document.querySelectorAll('.mobile-menu-btn');
    const mobileMenus = document.querySelectorAll('.mobile-menu-custom');

    mobileMenuBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const menu = mobileMenus[index];
            if (menu) {
                const isOpen = menu.classList.toggle('open');
                
                // Toggle icon between menu and close
                const icon = btn.querySelector('.material-symbols-outlined');
                if (icon) {
                    icon.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        icon.textContent = isOpen ? 'close' : 'menu';
                        icon.style.transform = 'scale(1)';
                    }, 100);
                }
            }
        });
    });

    // 2. Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Stop observing once revealed to boost performance
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% of the element is visible
            rootMargin: '0px 0px -40px 0px' // Offset trigger point slightly for premium feel
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('revealed'));
    }

    // 3. RUT Validation & Formatting (Chilean RUT Modulo 11)
    const rutInputs = document.querySelectorAll('.rut-input');
    
    const formatearRut = (rut) => {
        let valor = rut.replace(/\./g, '').replace(/-/g, '');
        if (valor.length < 2) return valor;
        let cuerpo = valor.slice(0, -1).replace(/\D/g, "");
        let dv = valor.slice(-1).toUpperCase();
        let cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return cuerpoFormateado + "-" + dv;
    };

    const validarRut = (rutString) => {
        const cleanRut = rutString.replace(/\./g, '').replace(/-/g, '');
        if (cleanRut.length < 8 || cleanRut.length > 9) return false;
        
        let cuerpo = cleanRut.slice(0, -1);
        let dv = cleanRut.slice(-1).toLowerCase();
        
        let suma = 0;
        let multiplo = 2;
        
        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo.charAt(i)) * multiplo;
            multiplo = multiplo === 7 ? 2 : multiplo + 1;
        }
        
        let dvEsperado = 11 - (suma % 11);
        dvEsperado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'k' : dvEsperado.toString();
        
        return dv === dvEsperado;
    };

    rutInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let cursorPosition = e.target.selectionStart;
            let originalLength = e.target.value.length;
            
            e.target.value = formatearRut(e.target.value);
            
            // Adjust cursor position after formatting
            let newLength = e.target.value.length;
            cursorPosition = cursorPosition + (newLength - originalLength);
            e.target.setSelectionRange(cursorPosition, cursorPosition);
        });

        input.addEventListener('blur', (e) => {
            const val = e.target.value.trim();
            const errorLabel = input.parentElement.querySelector('.rut-error');
            if (val === '') {
                input.classList.remove('border-green-500', 'border-error');
                if (errorLabel) errorLabel.classList.add('hidden');
                return;
            }
            
            if (validarRut(val)) {
                input.classList.remove('border-error');
                input.classList.add('border-green-500');
                if (errorLabel) errorLabel.classList.add('hidden');
            } else {
                input.classList.remove('border-green-500');
                input.classList.add('border-error');
                if (errorLabel) {
                    errorLabel.classList.remove('hidden');
                    errorLabel.textContent = 'RUT inválido. Ejemplo: 12.345.678-9';
                }
            }
        });
    });

    // 4. Interactive Admissions & Contact Form flow
    const admissionsForms = document.querySelectorAll('.admissions-form, .contact-form');
    
    admissionsForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isFormValid = true;
            
            // Validate all inputs before submitting
            const ruts = form.querySelectorAll('.rut-input');
            ruts.forEach(input => {
                const val = input.value.trim();
                const errorLabel = input.parentElement.querySelector('.rut-error');
                if (!validarRut(val)) {
                    isFormValid = false;
                    input.classList.remove('border-green-500');
                    input.classList.add('border-error');
                    if (errorLabel) {
                        errorLabel.classList.remove('hidden');
                        errorLabel.textContent = 'RUT inválido. Por favor corrígelo.';
                    }
                }
            });

            // Email validation
            const emails = form.querySelectorAll('input[type="email"]');
            emails.forEach(input => {
                const val = input.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(val)) {
                    isFormValid = false;
                    input.classList.add('border-error');
                } else {
                    input.classList.remove('border-error');
                    input.classList.add('border-green-500');
                }
            });

            // Name fields validation
            const requiredTexts = form.querySelectorAll('input[required][type="text"]:not(.rut-input)');
            requiredTexts.forEach(input => {
                if (input.value.trim().length < 3) {
                    isFormValid = false;
                    input.classList.add('border-error');
                } else {
                    input.classList.remove('border-error');
                    input.classList.add('border-green-500');
                }
            });

            if (!isFormValid) {
                // Focus first error
                const firstError = form.querySelector('.border-error');
                if (firstError) firstError.focus();
                return;
            }

            // If valid, trigger loading spinner and transition
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnContent = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
            `;

            // Simulate high-fidelity network request delay
            setTimeout(() => {
                const formCard = form.closest('.form-container-card');
                const successCard = formCard.parentElement.querySelector('.success-container-card');
                
                if (formCard && successCard) {
                    // Smooth transition
                    formCard.style.transition = 'all 0.5s ease';
                    formCard.style.opacity = '0';
                    formCard.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        formCard.classList.add('hidden');
                        successCard.classList.remove('hidden');
                        
                        // Small delay to trigger success card fade in animation
                        setTimeout(() => {
                            successCard.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                            successCard.style.opacity = '1';
                            successCard.style.transform = 'scale(1)';
                            
                            // Trigger checkmark animation if present
                            const checkmark = successCard.querySelector('.success-checkmark');
                            if (checkmark) {
                                checkmark.classList.add('animate-checkmark');
                            }
                        }, 50);
                    }, 500);
                }
            }, 1800);
        });
    });

    // 5. Dynamic JSON News Engine & Reusable Modal Controller
    const bodyElement = document.querySelector('body[data-sede]');
    const reusableModal = document.getElementById('news-reusable-modal');
    
    if (bodyElement && reusableModal) {
        const currentSede = bodyElement.getAttribute('data-sede'); // 'media' or 'little'
        initDynamicNews(currentSede);
    }

    async function initDynamicNews(sede) {
        try {
            const response = await fetch('/noticias.json');
            if (!response.ok) throw new Error('No se pudo cargar la base de datos de noticias.');
            const newsData = await response.json();
            
            // Filter news by current sede
            const filteredNews = newsData.filter(news => news.sede === sede);
            
            if (filteredNews.length === 0) return;
            
            // Render sections
            renderNews(filteredNews, sede);
            
            // Bind modal click events
            bindModalEvents(newsData, sede);
        } catch (error) {
            console.error('Error al inicializar las noticias:', error);
            const featuredWrapper = document.getElementById('featured-article-wrapper');
            if (featuredWrapper) {
                featuredWrapper.innerHTML = `
                    <div class="p-8 text-center bg-surface border border-error/20 rounded-2xl">
                        <span class="material-symbols-outlined text-error text-4xl mb-2">error</span>
                        <p class="text-on-surface font-semibold">Lo sentimos, no pudimos cargar las noticias en este momento.</p>
                        <p class="text-xs text-on-surface-variant mt-1">Por favor, intenta recargar la página.</p>
                    </div>
                `;
            }
        }
    }

    function renderNews(filteredNews, sede) {
        const isMedia = sede === 'media';
        const brandColorClass = isMedia ? 'primary' : 'warm-coral';
        const brandBgClass = isMedia ? 'bg-primary/10 text-primary' : 'bg-warm-coral/10 text-warm-coral';
        const brandBtnClass = isMedia ? 'bg-primary hover:bg-primary/95 text-white' : 'bg-warm-coral hover:bg-warm-coral/95 text-white';
        const brandShadowHover = isMedia ? 'hover:shadow-xl' : 'hover:shadow-xl hover:shadow-[0_15px_30px_rgba(242,106,90,0.06)]';
        const brandBorderHover = isMedia ? 'hover:border-primary/20' : 'hover:border-warm-coral/20';

        // A. Featured Post (Index 0)
        const featuredWrapper = document.getElementById('featured-article-wrapper');
        if (featuredWrapper && filteredNews[0]) {
            const story = filteredNews[0];
            featuredWrapper.innerHTML = `
                <span class="font-label-md text-label-md text-${brandColorClass} bg-${brandColorClass}/10 px-3 py-1 rounded-full w-fit mb-6 block font-bold">Hito Académico Destacado</span>
                
                <!-- Horizontal Card -->
                <div class="bg-surface rounded-2xl border border-outline-variant/20 shadow-lg overflow-hidden flex flex-col lg:flex-row items-stretch transition-all duration-300 ${brandShadowHover}">
                    <div class="w-full lg:w-1/2 min-h-[300px] relative">
                        <img src="${story.image}" alt="${story.title}" class="w-full h-full object-cover absolute inset-0">
                    </div>
                    <div class="w-full lg:w-1/2 p-8 md:p-10 flex flex-col justify-between">
                        <div>
                            <div class="flex items-center gap-3 text-sm text-on-surface-variant mb-3 font-semibold">
                                <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">calendar_today</span>${story.date}</span>
                                <span>•</span>
                                <span class="${brandBgClass} px-2.5 py-0.5 rounded font-bold uppercase tracking-wider text-[11px]">${story.category}</span>
                            </div>
                            <h2 class="font-headline-md text-headline-md text-primary mb-4 leading-snug">${story.title}</h2>
                            <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                                ${story.excerpt}
                            </p>
                        </div>
                        <button data-news-id="${story.id}" class="btn-read-more self-start ${brandBtnClass} font-bold text-label-md px-6 py-3 rounded transition-all duration-300 shadow-md flex items-center justify-center gap-2 group arrow-slide-hover border border-white/10">
                            Leer Noticia Completa
                            <span class="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>
            `;
        }

        // B. Recent Articles Grid (Indices 1, 2, 3)
        const recentGrid = document.getElementById('recent-articles-grid');
        if (recentGrid) {
            const recentStories = filteredNews.slice(1, 4);
            recentGrid.innerHTML = recentStories.map(story => `
                <!-- Article Card -->
                <div class="group bg-surface rounded-2xl border border-surface-container-high shadow-md hover:shadow-xl hover:translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${brandShadowHover} ${brandBorderHover} flex flex-col justify-between overflow-hidden">
                    <div class="h-48 w-full relative overflow-hidden bg-outline-variant/10">
                        <img src="${story.image}" alt="${story.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                    </div>
                    <div class="p-6 flex-grow flex flex-col justify-between">
                        <div>
                            <div class="flex items-center gap-2 text-xs text-on-surface-variant mb-2 font-semibold">
                                <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">calendar_today</span>${story.date}</span>
                                <span>•</span>
                                <span class="text-${brandColorClass} font-bold">${story.category}</span>
                            </div>
                            <h3 class="font-headline-sm text-headline-sm text-on-surface mb-3 group-hover:text-${brandColorClass} transition-colors line-clamp-2">${story.title}</h3>
                            <p class="text-sm text-on-surface-variant leading-relaxed mb-6 line-clamp-3">
                                ${story.excerpt}
                            </p>
                        </div>
                        <button data-news-id="${story.id}" class="btn-read-more text-sm font-bold text-${brandColorClass} group-hover:translate-x-1.5 transition-transform flex items-center gap-1 self-start">
                            Leer más <span class="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // C. Archivo Histórico (Indices 4+)
        const archiveSection = document.getElementById('archive-section');
        const archiveList = document.getElementById('archive-articles-list');
        if (archiveSection && archiveList) {
            const archiveStories = filteredNews.slice(4);
            if (archiveStories.length > 0) {
                archiveSection.classList.remove('hidden');
                archiveList.innerHTML = archiveStories.map(story => `
                    <!-- Archive Card Premium List Row -->
                    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-surface rounded-xl border border-outline-variant/20 hover:border-${brandColorClass}/30 transition-all duration-300 hover:shadow-md gap-4">
                        <div class="flex items-center gap-4">
                            <div class="w-16 h-16 rounded-lg overflow-hidden shrink-0 hidden sm:block bg-outline-variant/10">
                                <img src="${story.image}" alt="${story.title}" class="w-full h-full object-cover">
                            </div>
                            <div>
                                <div class="flex items-center gap-2 text-xs text-on-surface-variant mb-1 font-semibold">
                                    <span>${story.date}</span>
                                    <span>•</span>
                                    <span class="text-${brandColorClass} font-bold">${story.category}</span>
                                </div>
                                <h4 data-news-id="${story.id}" class="font-body-md text-body-md font-bold text-on-surface hover:text-${brandColorClass} transition-colors cursor-pointer">${story.title}</h4>
                            </div>
                        </div>
                        <button data-news-id="${story.id}" class="btn-read-more text-xs font-bold text-${brandColorClass} hover:translate-x-1.5 transition-transform flex items-center gap-1 self-start sm:self-center shrink-0">
                            Leer noticia <span class="material-symbols-outlined text-xs">arrow_forward</span>
                        </button>
                    </div>
                `).join('');
            } else {
                archiveSection.classList.add('hidden');
            }
        }
    }

    function bindModalEvents(newsData, sede) {
        // Use event delegation or rebinding after render
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-news-id]');
            if (trigger) {
                const storyId = trigger.getAttribute('data-news-id');
                const story = newsData.find(n => n.id === storyId);
                if (story) {
                    openReusableModal(story, sede);
                }
            }
        });
    }

    function openReusableModal(story, sede) {
        if (!reusableModal) return;
        
        const mDate = document.getElementById('news-modal-date');
        const mCategory = document.getElementById('news-modal-category');
        const mTitle = document.getElementById('news-modal-title');
        const mImage = document.getElementById('news-modal-image');
        const mBody = document.getElementById('news-modal-body');
        
        if (mDate) mDate.textContent = story.date;
        if (mCategory) {
            mCategory.textContent = story.category;
            mCategory.className = `text-${sede === 'media' ? 'primary' : 'warm-coral'} font-bold`;
        }
        if (mTitle) mTitle.textContent = story.title;
        if (mImage) {
            mImage.src = story.image;
            mImage.alt = story.title;
        }
        if (mBody) {
            mBody.innerHTML = story.body.map(para => {
                let formattedPara = para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                formattedPara = formattedPara.replace(/\*(.*?)\*/g, '<em>$1</em>');
                formattedPara = formattedPara.replace(/«(.*?)»/g, '«<em>$1</em>»');
                return `<p>${formattedPara}</p>`;
            }).join('');
        }
        
        // Prevent body scroll behind modal
        document.body.style.overflow = 'hidden';
        
        reusableModal.classList.remove('hidden');
        
        // Trigger transition via reflow
        void reusableModal.offsetWidth;
        
        reusableModal.classList.remove('opacity-0');
        reusableModal.classList.add('opacity-100');
        
        const modalContainer = reusableModal.querySelector('.bg-surface');
        if (modalContainer) {
            modalContainer.classList.remove('scale-95');
            modalContainer.classList.add('scale-100');
        }
    }

    const closeReusableModal = () => {
        if (!reusableModal) return;
        
        const modalContainer = reusableModal.querySelector('.bg-surface');
        if (modalContainer) {
            modalContainer.classList.remove('scale-100');
            modalContainer.classList.add('scale-95');
        }
        
        reusableModal.classList.remove('opacity-100');
        reusableModal.classList.add('opacity-0');
        
        setTimeout(() => {
            reusableModal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    };

    const modalCloseBtn = document.getElementById('news-modal-close');
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeReusableModal);
    }

    if (reusableModal) {
        reusableModal.addEventListener('click', (e) => {
            if (e.target === reusableModal) {
                closeReusableModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeReusableModal();
        }
    });

    // 6. Dynamic JSON Gallery & Lightbox Controller
    const galleryGrid = document.getElementById('gallery-grid');
    const lightboxModal = document.getElementById('gallery-lightbox-modal');
    
    if (galleryGrid && lightboxModal) {
        const currentSede = bodyElement.getAttribute('data-sede'); // 'media' or 'little'
        initDynamicGallery(currentSede);
    }

    let galleryItems = [];
    let activeFilter = 'all';
    let currentImageIndex = 0;

    async function initDynamicGallery(sede) {
        try {
            const response = await fetch('/galeria.json');
            if (!response.ok) throw new Error('No se pudo cargar la base de datos de galería.');
            const rawItems = await response.json();
            
            // Filter by Sede
            galleryItems = rawItems.filter(item => item.sede === sede);
            
            if (galleryItems.length === 0) return;
            
            // Initial Render
            renderGallery(galleryItems, sede);
            
            // Bind Filter button triggers
            const filterBtns = document.querySelectorAll('.filter-btn');
            filterBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const filter = btn.getAttribute('data-filter');
                    
                    // Toggle active classes on buttons
                    filterBtns.forEach(b => {
                        b.classList.remove('bg-primary', 'bg-warm-coral', 'text-white', 'shadow-md');
                        b.classList.add('bg-surface', 'border', 'border-outline-variant/40', 'text-on-surface');
                    });
                    
                    const isMedia = sede === 'media';
                    const activeColorClass = isMedia ? 'bg-primary' : 'bg-warm-coral';
                    btn.classList.remove('bg-surface', 'border', 'border-outline-variant/40', 'text-on-surface');
                    btn.classList.add(activeColorClass, 'text-white', 'shadow-md');
                    
                    // Filter and animate
                    activeFilter = filter;
                    animateAndFilterGallery(sede);
                });
            });
            
            // Bind Lightbox Trigger
            bindLightboxEvents(sede);
            
        } catch (error) {
            console.error('Error al cargar la galería:', error);
            if (galleryGrid) {
                galleryGrid.innerHTML = `
                    <div class="col-span-1 md:col-span-3 p-8 text-center bg-surface border border-error/20 rounded-2xl">
                        <span class="material-symbols-outlined text-error text-4xl mb-2">error</span>
                        <p class="text-on-surface font-semibold">Lo sentimos, no pudimos cargar las fotos en este momento.</p>
                        <p class="text-xs text-on-surface-variant mt-1">Por favor, intenta recargar la página.</p>
                    </div>
                `;
            }
        }
    }

    function renderGallery(items, sede) {
        if (!galleryGrid) return;
        
        const isMedia = sede === 'media';
        const brandColorClass = isMedia ? 'primary' : 'warm-coral';
        const brandShadowHover = isMedia ? 'hover:shadow-[0_15px_30px_rgba(15,23,42,0.08)]' : 'hover:shadow-[0_15px_30px_rgba(242,106,90,0.08)]';
        const brandBorderHover = isMedia ? 'hover:border-primary/20' : 'hover:border-warm-coral/20';

        galleryGrid.innerHTML = items.map((item, index) => `
            <!-- Gallery Item Card -->
            <div data-item-id="${item.id}" data-category="${item.category}" class="gallery-card group bg-surface rounded-2xl border border-outline-variant/20 shadow-md ${brandShadowHover} ${brandBorderHover} overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1">
                <div class="h-64 w-full relative overflow-hidden bg-outline-variant/10">
                    <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                    <!-- Glass Hover Overlay -->
                    <div class="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center">
                        <span class="material-symbols-outlined text-white text-3xl transform scale-75 group-hover:scale-100 transition-all duration-300">zoom_in</span>
                    </div>
                </div>
                <div class="p-6">
                    <span class="text-[11px] font-bold uppercase tracking-wider text-${brandColorClass} mb-1 block">${item.category === 'infraestructura' ? 'Infraestructura' : item.category === 'clases' ? 'Clases e Inicial' : 'Eventos y Deportes'}</span>
                    <h3 class="font-headline-sm text-headline-sm text-on-surface mb-2 line-clamp-1 group-hover:text-${brandColorClass} transition-colors">${item.title}</h3>
                    <p class="text-xs text-on-surface-variant leading-relaxed line-clamp-2">${item.description}</p>
                </div>
            </div>
        `).join('');
    }

    function animateAndFilterGallery(sede) {
        const cards = document.querySelectorAll('.gallery-card');
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
        });
        
        setTimeout(() => {
            const filtered = activeFilter === 'all' 
                ? galleryItems 
                : galleryItems.filter(item => item.category === activeFilter);
                
            renderGallery(filtered, sede);
            
            // Reflow and animate in
            const newCards = document.querySelectorAll('.gallery-card');
            newCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                void card.offsetWidth;
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, index * 40); // Stagger animation for premium feel
            });
        }, 300);
    }

    function bindLightboxEvents(sede) {
        const isMedia = sede === 'media';
        const modalImg = document.getElementById('lightbox-image');
        const modalTitle = document.getElementById('lightbox-title');
        const modalDesc = document.getElementById('lightbox-desc');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        const closeBtn = document.getElementById('lightbox-close');

        // Delegation for clicks on cards
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.gallery-card');
            if (card) {
                const itemId = card.getAttribute('data-item-id');
                
                // Get active filtered items list for proper navigation
                const filteredList = activeFilter === 'all' 
                    ? galleryItems 
                    : galleryItems.filter(item => item.category === activeFilter);
                
                const index = filteredList.findIndex(item => item.id === itemId);
                if (index !== -1) {
                    currentImageIndex = index;
                    openLightbox(filteredList, index, sede);
                }
            }
        });

        function openLightbox(list, index, sede) {
            if (!lightboxModal || !modalImg) return;
            
            const item = list[index];
            if (!item) return;

            // Prevent scroll
            document.body.style.overflow = 'hidden';

            modalImg.src = item.image;
            modalImg.alt = item.title;
            if (modalTitle) modalTitle.textContent = item.title;
            if (modalDesc) modalDesc.textContent = item.description;

            lightboxModal.classList.remove('hidden');
            void lightboxModal.offsetWidth;

            lightboxModal.classList.remove('opacity-0');
            lightboxModal.classList.add('opacity-100');

            const container = lightboxModal.querySelector('.transform');
            if (container) {
                container.classList.remove('scale-95');
                container.classList.add('scale-100');
            }
        }

        const closeLightbox = () => {
            if (!lightboxModal) return;

            const container = lightboxModal.querySelector('.transform');
            if (container) {
                container.classList.remove('scale-100');
                container.classList.add('scale-95');
            }

            lightboxModal.classList.remove('opacity-100');
            lightboxModal.classList.add('opacity-0');

            setTimeout(() => {
                lightboxModal.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        };

        const navigateLightbox = (direction) => {
            const filteredList = activeFilter === 'all' 
                ? galleryItems 
                : galleryItems.filter(item => item.category === activeFilter);

            if (filteredList.length <= 1) return;

            // Calculate next index
            if (direction === 'next') {
                currentImageIndex = (currentImageIndex + 1) % filteredList.length;
            } else {
                currentImageIndex = (currentImageIndex - 1 + filteredList.length) % filteredList.length;
            }

            // Animate transition
            if (modalImg) {
                modalImg.style.opacity = '0';
                modalImg.style.transform = 'scale(0.98)';
                
                setTimeout(() => {
                    const nextItem = filteredList[currentImageIndex];
                    modalImg.src = nextItem.image;
                    modalImg.alt = nextItem.title;
                    if (modalTitle) modalTitle.textContent = nextItem.title;
                    if (modalDesc) modalDesc.textContent = nextItem.description;
                    
                    void modalImg.offsetWidth;
                    modalImg.style.opacity = '1';
                    modalImg.style.transform = 'scale(1)';
                }, 150);
            }
        };

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (prevBtn) prevBtn.addEventListener('click', () => navigateLightbox('prev'));
        if (nextBtn) nextBtn.addEventListener('click', () => navigateLightbox('next'));
        
        if (lightboxModal) {
            lightboxModal.addEventListener('click', (e) => {
                if (e.target === lightboxModal) {
                    closeLightbox();
                }
            });
        }

        document.addEventListener('keydown', (e) => {
            if (lightboxModal && !lightboxModal.classList.contains('hidden')) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') navigateLightbox('next');
                if (e.key === 'ArrowLeft') navigateLightbox('prev');
            }
        });
    }

    // ==========================================================
    // 5. Contact Pages Interactive Features (Toast & Clipboard)
    // ==========================================================
    function showToast(message) {
        const toast = document.getElementById('toast-notification');
        const toastMsg = document.getElementById('toast-message');
        if (toast && toastMsg) {
            toastMsg.textContent = message;
            toast.classList.remove('opacity-0', 'translate-y-24', 'pointer-events-none');
            toast.classList.add('animate-toast-in');
            
            // Clear animations and hide after 3 seconds
            setTimeout(() => {
                toast.classList.remove('animate-toast-in');
                toast.classList.add('opacity-0', 'translate-y-24', 'pointer-events-none');
            }, 3000);
        }
    }

    const copyAddressCard = document.getElementById('copy-address-card');
    const mapCopyBtn = document.getElementById('map-copy-btn');
    
    const handleCopyAddress = (address) => {
        navigator.clipboard.writeText(address).then(() => {
            showToast('¡Dirección copiada al portapapeles! 📋');
        }).catch(err => {
            console.error('Error al copiar la dirección: ', err);
        });
    };
    
    if (copyAddressCard) {
        copyAddressCard.addEventListener('click', () => {
            const addressParagraph = copyAddressCard.querySelector('p');
            if (addressParagraph) {
                const addressText = addressParagraph.innerText.replace(/\n/g, ', ');
                handleCopyAddress(addressText);
            }
        });
    }
    
    if (mapCopyBtn) {
        mapCopyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const addressText = mapCopyBtn.getAttribute('data-address');
            if (addressText) {
                handleCopyAddress(addressText);
            }
        });
    }

    // ==========================================================
    // 6. Convivencia Escolar & Protocolos Drawer Lógica
    // ==========================================================
    const protocolTriggers = document.querySelectorAll('.protocol-trigger-btn');
    const drawer = document.getElementById('protocol-drawer');
    const drawerBackdrop = document.getElementById('protocol-drawer-backdrop');
    const drawerPanel = document.getElementById('protocol-drawer-panel');
    const drawerClose = document.getElementById('protocol-drawer-close');
    const drawerCancel = document.getElementById('protocol-drawer-cancel');
    
    const loader = document.getElementById('protocol-drawer-loader');
    const drawerContent = document.getElementById('protocol-drawer-content');
    
    const pTitle = document.getElementById('protocol-title');
    const pSubtitle = document.getElementById('protocol-subtitle');
    const pDesc = document.getElementById('protocol-description');
    const pStepsList = document.getElementById('protocol-steps-list');

    let protocolsData = null;

    function openDrawer() {
        if (!drawer || !drawerPanel || !drawerBackdrop) return;
        document.body.style.overflow = 'hidden';
        drawer.classList.remove('pointer-events-none');
        drawerBackdrop.classList.remove('opacity-0', 'pointer-events-none');
        drawerBackdrop.classList.add('opacity-100');
        drawerPanel.classList.remove('translate-x-full');
        drawerPanel.classList.add('translate-x-0');
    }

    function closeDrawer() {
        if (!drawer || !drawerPanel || !drawerBackdrop) return;
        document.body.style.overflow = '';
        drawerPanel.classList.remove('translate-x-0');
        drawerPanel.classList.add('translate-x-full');
        drawerBackdrop.classList.remove('opacity-100');
        drawerBackdrop.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => {
            drawer.classList.add('pointer-events-none');
        }, 300);
    }

    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerCancel) drawerCancel.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer && !drawer.classList.contains('pointer-events-none')) {
            closeDrawer();
        }
    });

    const isLittle = pStepsList ? pStepsList.classList.contains('before:bg-warm-coral/20') : false;
    const badgeBgClass = isLittle ? 'bg-warm-coral' : 'bg-primary';

    protocolTriggers.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const protocolId = btn.getAttribute('data-protocol');
            if (!protocolId) return;

            openDrawer();

            if (loader && drawerContent) {
                loader.classList.remove('hidden');
                drawerContent.classList.add('hidden');
            }

            try {
                if (!protocolsData) {
                    const response = await fetch('/protocolos.json');
                    protocolsData = await response.json();
                }

                const data = protocolsData[protocolId];
                if (data) {
                    if (pTitle) pTitle.textContent = data.title;
                    if (pSubtitle) pSubtitle.textContent = data.subtitle || '';
                    if (pDesc) pDesc.textContent = data.description;
                    
                    if (pStepsList) {
                        pStepsList.innerHTML = '';
                        data.steps.forEach((step, idx) => {
                            const stepEl = document.createElement('div');
                            stepEl.className = 'relative pl-2 animate-fade-in-up';
                            stepEl.style.animationDelay = `${idx * 0.1}s`;
                            stepEl.innerHTML = `
                                <span class="absolute -left-[30px] top-0.5 w-5 h-5 rounded-full ${badgeBgClass} text-white flex items-center justify-center font-bold text-[10px] shadow-sm">${idx + 1}</span>
                                <p class="text-xs text-on-surface-variant font-semibold leading-relaxed">${step}</p>
                            `;
                            pStepsList.appendChild(stepEl);
                        });
                    }

                    if (loader && drawerContent) {
                        setTimeout(() => {
                            loader.classList.add('hidden');
                            drawerContent.classList.remove('hidden');
                        }, 200);
                    }
                }
            } catch (error) {
                console.error('Error cargando protocolos:', error);
                if (pTitle) pTitle.textContent = 'Error';
                if (pDesc) pDesc.textContent = 'No se pudo cargar el flujograma en este momento. Inténtelo más tarde.';
                if (loader && drawerContent) {
                    loader.classList.add('hidden');
                    drawerContent.classList.remove('hidden');
                }
            }
        });
    });
});
