// script.js - Interactividad y dinámicas del portfolio
// Depende de config.js (debe cargarse antes)

document.addEventListener('DOMContentLoaded', function() {
    // Verificar que SITE_CONFIG existe (desde config.js)
    if (typeof SITE_CONFIG !== 'undefined') {
        // Actualizar nombre en el header
        const nombreHeader = document.getElementById('nombre-header');
        if (nombreHeader) {
            nombreHeader.textContent = SITE_CONFIG.nombre;
        }
        
        // Actualizar contacto rápido (top bar)
        const quickContact = document.getElementById('quick-contact');
        if (quickContact) {
            quickContact.innerHTML = `
                <a href="mailto:${SITE_CONFIG.email}"><i class="fas fa-envelope"></i> Email</a>
                <a href="${SITE_CONFIG.social.linkedin}" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a>
                <a href="${SITE_CONFIG.social.whatsapp}" target="_blank"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                <a href="${SITE_CONFIG.social.github}" target="_blank"><i class="fab fa-github"></i> GitHub</a>
            `;
        }
        
        // Actualizar contactos en el footer
        const footerContact = document.getElementById('footer-contact');
        if (footerContact) {
            footerContact.innerHTML = `
                <a href="mailto:${SITE_CONFIG.email}"><i class="fas fa-envelope"></i> ${SITE_CONFIG.email}</a>
                <a href="${SITE_CONFIG.social.linkedin}" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a>
                <a href="${SITE_CONFIG.social.whatsapp}" target="_blank"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                <a href="${SITE_CONFIG.social.github}" target="_blank"><i class="fab fa-github"></i> GitHub</a>
            `;
        }
        
        // Actualizar copyright con año dinámico
        const copyright = document.getElementById('copyright');
        if (copyright) {
            copyright.textContent = `© ${SITE_CONFIG.año} | ${SITE_CONFIG.nombre} · Engineering & Development`;
        }
    } else {
        // Fallback en caso de que no cargue config.js
        console.warn('SITE_CONFIG no está definido. Verifica que config.js existe y está bien escrito.');
        
        const nombreHeader = document.getElementById('nombre-header');
        if (nombreHeader) nombreHeader.textContent = "Jhon Umasi";
        
        const quickContact = document.getElementById('quick-contact');
        if (quickContact) {
            quickContact.innerHTML = `
                <a href="#"><i class="fas fa-envelope"></i> Email</a>
                <a href="#"><i class="fab fa-linkedin"></i> LinkedIn</a>
                <a href="#"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                <a href="#"><i class="fab fa-github"></i> GitHub</a>
            `;
        }
        
        const footerContact = document.getElementById('footer-contact');
        if (footerContact) {
            footerContact.innerHTML = `
                <a href="#"><i class="fas fa-envelope"></i> contacto@ejemplo.com</a>
                <a href="#"><i class="fab fa-linkedin"></i> LinkedIn</a>
                <a href="#"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                <a href="#"><i class="fab fa-github"></i> GitHub</a>
            `;
        }
        
        const copyright = document.getElementById('copyright');
        if (copyright) {
            copyright.textContent = `© ${new Date().getFullYear()} | Jhon Umasi · Engineering & Development`;
        }
    }
});

// Botón "Back to Top" - mostrar/ocultar según scroll
window.onscroll = function() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
};

// Smooth scroll para los enlaces internos (opcional, mejora la experiencia)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#" || targetId === "") return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});