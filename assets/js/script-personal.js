// script-personal.js - Funcionalidad específica para la página About Me
// Depende de config.js (debe cargarse antes)

document.addEventListener('DOMContentLoaded', function() {
    if (typeof SITE_CONFIG !== 'undefined') {
        // ============================================
        // 1. QUICK CONTACT (top bar)
        // ============================================
        const quickContact = document.getElementById('quick-contact');
        if (quickContact) {
            quickContact.innerHTML = `
                <a href="mailto:${SITE_CONFIG.email}"><i class="fas fa-envelope"></i> Email</a>
                <a href="${SITE_CONFIG.social.linkedin}" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a>
                <a href="${SITE_CONFIG.social.whatsapp}" target="_blank"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                <a href="${SITE_CONFIG.social.github}" target="_blank"><i class="fab fa-github"></i> GitHub</a>
            `;
        }

        // ============================================
        // 2. PERFIL Y FOTO
        // ============================================
        const fotoPerfil = document.getElementById('foto-perfil');
        if (fotoPerfil) {
            fotoPerfil.src = SITE_CONFIG.rutas.foto_perfil;
            // Fallback por si no carga la imagen
            fotoPerfil.onerror = function() {
                this.src = 'https://via.placeholder.com/160x160?text=JHON+UMASI';
            };
        }

        const infoNombre = document.getElementById('info-nombre');
        if (infoNombre) {
            infoNombre.textContent = SITE_CONFIG.nombre_completo;
        }

        const infoUbicacion = document.getElementById('info-ubicacion');
        if (infoUbicacion) {
            infoUbicacion.textContent = SITE_CONFIG.ubicacion;
        }

        // ============================================
        // 3. SOBRE MÍ (descripción)
        // ============================================
        const sobreMi = document.getElementById('sobre-mi');
        if (sobreMi) {
            sobreMi.innerHTML = `
                <p><strong>${SITE_CONFIG.titulo}</strong></p>
                <p>8th cycle Civil Engineering student at UTEC, with strong analytical skills and a disruptive approach to the digital transformation of the construction industry. Specialized in structural design and BIM modeling, with advanced proficiency in key tools such as ETABS, SAP2000, Tekla, and Revit.</p>
                <p>Programming skills in Python, Lisp, .NET(C#) applied to process automation and workflow optimization. Upper-intermediate English (B2). Characterized by adaptability and fast learning. My goal is to join a structures, construction, or research team where I can apply technological solutions and Artificial Intelligence to enhance project efficiency and precision.</p>
            `;
        }

        // ============================================
        // 4. DATOS PERSONALES
        // ============================================
        const datosPersonales = document.getElementById('datos-personales');
        if (datosPersonales) {
            datosPersonales.innerHTML = `
                <div class="info-item"><strong>Full Name</strong><span>${SITE_CONFIG.nombre_completo}</span></div>
                <div class="info-item"><strong>Birth Date</strong><span>${SITE_CONFIG.fecha_nacimiento}</span></div>
                <div class="info-item"><strong>Nationality</strong><span>${SITE_CONFIG.nacionalidad}</span></div>
                <div class="info-item"><strong>Location</strong><span>${SITE_CONFIG.ubicacion}</span></div>
                <div class="info-item"><strong>Email</strong><span>${SITE_CONFIG.email}</span></div>
                <div class="info-item"><strong>Phone</strong><span>${SITE_CONFIG.telefono}</span></div>
            `;
        }

        // ============================================
        // 5. EDUCACIÓN
        // ============================================
        const educacion = document.getElementById('educacion');
        if (educacion) {
            educacion.innerHTML = `
                <div class="info-item"><strong>University of Engineering and Technology - UTEC</strong><span>Civil Engineering, 2022-2027 (Expected)</span></div>
                <div class="info-item"><strong>Complementary Courses</strong><span>Advanced Structural Design, Python Programming, Game Development with Godot/Unity</span></div>
            `;
        }

        // ============================================
        // 6. EXPERIENCIA PROFESIONAL
        // ============================================
        const experiencia = document.getElementById('experiencia');
        if (experiencia) {
            experiencia.innerHTML = `
                <div class="info-item"><strong>Steel Warehouse Design - Huacho</strong><span>April 2025 · Preliminary design of a 24x12m steel warehouse for vehicle storage</span></div>
                <div class="info-item"><strong>Cantilever Steel Roof Design - Huacho</strong><span>January 2026 · Design of a 5x18m cantilever steel roof for a parking lot</span></div>
                <div class="info-item"><strong>Pre-professional Internship - GM INGENIEROS Y CONSULTORES SAC</strong><span>January 2026 · Civil engineering intern responsible for perimeter plans, matrices, layouts, and residential projects</span></div>
            `;
        }

        // ============================================
        // 7. VOLUNTARIADOS
        // ============================================
        const voluntariados = document.getElementById('voluntariados');
        if (voluntariados) {
            voluntariados.innerHTML = `
                <div class="info-item"><strong>White Cross - Ancon - Lima</strong><span>2025 · Support in community activities benefiting over 50 people</span></div>
                <div class="info-item"><strong>PROA - Santiago de Surco - Lima</strong><span>2025 · Care for over 15 shelter animals, improving their well-being conditions</span></div>
            `;
        }

        // ============================================
        // 8. HABILIDADES TÉCNICAS
        // ============================================
        const habilidades = [
            "ETABS", "SAP2000", "SAFE", "AutoCAD", "Revit", 
            "Python", "Visual Studio .NET", "Godot", "Unity", 
            "AutoLISP", "Tekla", "Advanced Excel", "QGIS", 
            "Power BI", "Quantity Takeoff & Budgeting"
        ];
        
        const habilidadesContainer = document.getElementById('habilidades');
        if (habilidadesContainer) {
            const skillsHtml = habilidades.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
            habilidadesContainer.innerHTML = skillsHtml;
        }

        // ============================================
        // 9. IDIOMAS
        // ============================================
        const idiomas = document.getElementById('idiomas');
        if (idiomas) {
            idiomas.innerHTML = `
                <div class="info-item"><strong>Spanish</strong><span>Native</span></div>
                <div class="info-item"><strong>English</strong><span>Upper-Intermediate (B2)</span></div>
                <div class="info-item"><strong>Quechua</strong><span>Intermediate</span></div>
                <div class="info-item"><strong>German</strong><span>Basic (A1)</span></div>
                <div class="info-item"><strong>Korean</strong><span>Basic (A1)</span></div>
            `;
        }

        // ============================================
        // 10. BOTONES DE DESCARGA Y CONTACTO
        // ============================================
        const cvUrl = SITE_CONFIG.rutas.cv;
        
        const btnCv = document.getElementById('btn-cv');
        if (btnCv) {
            btnCv.href = cvUrl;
        }
        
        const btnCvTop = document.getElementById('btn-cv-top');
        if (btnCvTop) {
            btnCvTop.href = cvUrl;
        }
        
        const btnContactar = document.getElementById('btn-contactar');
        if (btnContactar) {
            btnContactar.href = `mailto:${SITE_CONFIG.email}`;
        }

        // ============================================
        // 11. REDES SOCIALES (footer del card)
        // ============================================
        const redesSociales = document.getElementById('redes-sociales');
        if (redesSociales) {
            redesSociales.innerHTML = `
                <a href="${SITE_CONFIG.social.linkedin}" target="_blank" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
                <a href="${SITE_CONFIG.social.github}" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>
                <a href="${SITE_CONFIG.social.twitter}" target="_blank" title="Twitter"><i class="fab fa-twitter"></i></a>
                <a href="${SITE_CONFIG.social.instagram}" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="${SITE_CONFIG.social.whatsapp}" target="_blank" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
                <a href="${SITE_CONFIG.social.telegram}" target="_blank" title="Telegram"><i class="fab fa-telegram"></i></a>
            `;
        }

        // ============================================
        // 12. COPYRIGHT (footer)
        // ============================================
        const copyright = document.getElementById('copyright');
        if (copyright) {
            copyright.textContent = `© ${SITE_CONFIG.año} ${SITE_CONFIG.nombre} · ${SITE_CONFIG.titulo}`;
        }

    } else {
        // Fallback si no existe SITE_CONFIG
        console.warn('SITE_CONFIG no está definido. Verifica config.js');
        
        // Mostrar un mensaje amigable en la consola
        const container = document.querySelector('.info-card');
        if (container) {
            const errorMsg = document.createElement('div');
            errorMsg.style.cssText = 'background: rgba(197,160,89,0.2); border-left: 4px solid #C5A059; padding: 15px; margin-bottom: 20px;';
            errorMsg.innerHTML = '<strong>⚠️ Configuración no cargada</strong><br>Verifica que el archivo config.js existe en la misma carpeta.';
            container.insertBefore(errorMsg, container.firstChild);
        }
    }
});