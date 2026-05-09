// ============================================
// PROJECT GLOBAL JS - Para Steel, Concrete, Seismic, etc.
// Funciones comunes para todas las páginas de proyectos
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. CONFIGURAR CONTACTOS RÁPIDOS (top bar)
    // ============================================
    const quickContact = document.getElementById('quick-contact');
    if (quickContact && typeof SITE_CONFIG !== 'undefined') {
        quickContact.innerHTML = `
            <a href="mailto:${SITE_CONFIG.email}" style="color:black; text-decoration:none; margin-right:20px;">
                <i class="fas fa-envelope"></i> Email
            </a>
            <a href="${SITE_CONFIG.social?.linkedin || '#'}" target="_blank" style="color:black; text-decoration:none;">
                <i class="fab fa-linkedin"></i> LinkedIn
            </a>
            <a href="${SITE_CONFIG.social?.github || '#'}" target="_blank" style="color:black; text-decoration:none; margin-left:20px;">
                <i class="fab fa-github"></i> GitHub
            </a>
        `;
    } else if (quickContact) {
        quickContact.innerHTML = `
            <span style="color:white;"><i class="fas fa-envelope"></i> proyecto@utec.edu.pe</span>
        `;
    }
    
    // ============================================
    // 2. CONFIGURAR COPYRIGHT
    // ============================================
    const copyright = document.getElementById('copyright');
    if (copyright && typeof SITE_CONFIG !== 'undefined') {
        copyright.textContent = `© ${SITE_CONFIG.año} | ${SITE_CONFIG.nombre} · Proyecto Estructural`;
    } else if (copyright) {
        copyright.textContent = `© ${new Date().getFullYear()} | UTEC · Proyecto Estructural`;
    }
    
    // ============================================
    // 3. MANEJAR IMÁGENES QUE FALLAN (placeholder)
    // ============================================
    const mainImage = document.querySelector('.project-main-image img');
    if (mainImage) {
        mainImage.onerror = function() {
            this.style.display = 'none';
            const container = this.parentElement;
            if (container) {
                container.innerHTML = `
                    <div class="image-placeholder">
                        <i class="fas fa-archway"></i>
                        <span>Image not available</span>
                        <small style="font-size:0.8rem;">Preview coming soon</small>
                    </div>
                `;
            }
        };
    }
    
    // ============================================
    // 4. GALERÍA DINÁMICA (LEE DATA-ATTRIBUTES)
    // ============================================
    const galleryContainer = document.getElementById('project-gallery');
    if (galleryContainer) {
        let images = [];
        const dataImages = galleryContainer.getAttribute('data-images');
        
        if (dataImages && dataImages !== '[]') {
            try {
                images = JSON.parse(dataImages);
            } catch(e) {
                console.warn('Error parsing gallery images:', e);
            }
        }
        
        if (!images.length) {
            galleryContainer.innerHTML = `
                <div class="gallery-placeholder">
                    <i class="fas fa-image"></i>
                    <span>No images available</span>
                    <small>Gallery will be updated soon</small>
                </div>
            `;
        } else {
            let galleryHTML = '<div class="project-gallery">';
            images.forEach(img => {
                galleryHTML += `
                    <div class="gallery-item">
                        <img src="${img.src}" alt="${img.alt || 'Gallery image'}">
                    </div>
                `;
            });
            galleryHTML += '</div>';
            galleryContainer.innerHTML = galleryHTML;
            
            document.querySelectorAll('.gallery-item img').forEach(img => {
                img.onerror = function() {
                    this.style.display = 'none';
                    this.parentElement.innerHTML = `
                        <div class="gallery-placeholder-small">
                            <i class="fas fa-image"></i>
                            <span>Not available</span>
                        </div>
                    `;
                };
            });
        }
    }
    
    // ============================================
    // 5. SMOOTH SCROLL PARA ENLACES INTERNOS
    // ============================================
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
    
    // ============================================
    // 6. BOTÓN VOLVER ARRIBA (opcional)
    // ============================================
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    console.log('Project global JS loaded ✅');
});