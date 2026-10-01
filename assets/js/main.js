/**
 * PetLucky - Main JavaScript File
 * Handles UI interactions, Mobile Navigation, Animations and WhatsApp integrations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                menuIconOpen?.classList.add('hidden');
                menuIconClose?.classList.remove('hidden');
            } else {
                mobileMenu.classList.add('hidden');
                menuIconOpen?.classList.remove('hidden');
                menuIconClose?.classList.add('hidden');
            }
        });

        // Close mobile menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                if (menuIconOpen && menuIconClose) {
                    menuIconOpen.classList.remove('hidden');
                    menuIconClose.classList.add('hidden');
                }
            });
        });
    }

    // 2. Header shadow on scroll
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('shadow-md', 'bg-white/95', 'backdrop-blur-md');
                header.classList.remove('bg-white');
            } else {
                header.classList.remove('shadow-md', 'bg-white/95', 'backdrop-blur-md');
                header.classList.add('bg-white');
            }
        });
    }

    // 3. Contact Form Submission Simulation
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('form-name')?.value || 'Tutor';
            const petName = document.getElementById('form-pet')?.value || 'seu Pet';
            const service = document.getElementById('form-service')?.value || 'Atendimento Geral';
            const message = document.getElementById('form-message')?.value || '';

            // Redirect directly to WhatsApp with structured message for highest conversion
            const whatsappNumber = '5521967671362';
            let waMessage = `Olá, PetLucky! Meu nome é *${encodeURIComponent(name)}* e gostaria de informações sobre *${encodeURIComponent(service)}* para o(a) *${encodeURIComponent(petName)}*.`;
            
            if (message.trim() !== '') {
                waMessage += `%0A%0AMensagem: ${encodeURIComponent(message)}`;
            }

            // Show feedback modal / notification
            if (formFeedback) {
                formFeedback.classList.remove('hidden');
            }

            // Open WhatsApp after brief delay
            setTimeout(() => {
                window.open(`https://wa.me/${whatsappNumber}?text=${waMessage}`, '_blank');
            }, 800);
        });
    }

    // 4. Smooth scrolling for internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
