<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Información Personal | Ing. Estructural & Developer</title>
    <!-- Configuración global -->
    <script src="config.js"></script>
    <style>
        :root {
            --accent-color: #007acc;
            --accent-hover: #005f9e;
            --bg-overlay: rgba(0, 0, 0, 0.65);
            --text-light: #ffffff;
            --text-muted: rgba(255, 255, 255, 0.8);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: url('./assets/images/Background.png') no-repeat center center fixed;
            background-size: cover;
            color: var(--text-light);
            line-height: 1.6;
        }

        .content-wrapper {
            background: var(--bg-overlay);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            backdrop-filter: blur(3px);
        }

        .top-bar {
            background: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.8rem 0;
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .top-bar-content {
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }

        .quick-contact {
            display: flex;
            gap: 1.5rem;
            flex-wrap: wrap;
        }

        .quick-contact a {
            color: var(--text-light);
            text-decoration: none;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: color 0.3s;
            opacity: 0.9;
        }

        .quick-contact a:hover {
            color: var(--accent-color);
            opacity: 1;
        }

        .badge {
            background: var(--accent-color);
            color: white;
            padding: 0.3rem 1rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            letter-spacing: 0.5px;
        }

        .btn-back {
            display: inline-block;
            background: transparent;
            color: var(--accent-color);
            font-weight: 600;
            text-decoration: none;
            border: 2px solid var(--accent-color);
            padding: 8px 20px;
            border-radius: 30px;
            transition: all 0.3s;
            font-size: 0.9rem;
            margin-left: 20px;
        }

        .btn-back:hover {
            background: var(--accent-color);
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,122,204,0.3);
        }

        /* Botón de CV en top-bar */
        .btn-cv-top {
            display: inline-block;
            background: var(--accent-color);
            color: white;
            text-decoration: none;
            padding: 8px 20px;
            border-radius: 30px;
            font-weight: 600;
            font-size: 0.9rem;
            margin-left: 10px;
            border: 2px solid var(--accent-color);
            transition: all 0.3s;
        }

        .btn-cv-top:hover {
            background: transparent;
            color: var(--accent-color);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,122,204,0.3);
        }

        .info-container {
            max-width: 900px;
            margin: 40px auto;
            padding: 0 20px;
            flex: 1;
        }

        .info-card {
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            border: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .info-header {
            display: flex;
            align-items: center;
            gap: 30px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }

        .info-avatar {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 4px solid var(--accent-color);
            overflow: hidden;
            box-shadow: 0 0 30px rgba(0,122,204,0.3);
        }

        .info-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .info-title h2 {
            font-size: 2.2rem;
            color: white;
            margin-bottom: 10px;
        }

        .info-title p {
            color: var(--accent-color);
            font-size: 1.2rem;
            font-weight: 500;
        }

        .info-divider {
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
            margin: 30px 0;
        }

        .info-section {
            margin-bottom: 30px;
        }

        .info-section h3 {
            color: var(--accent-color);
            font-size: 1.3rem;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .info-section h3 i {
            font-size: 1.2rem;
        }

        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }

        .info-item {
            background: rgba(255,255,255,0.05);
            padding: 15px;
            border-radius: 10px;
            border-left: 3px solid var(--accent-color);
        }

        .info-item strong {
            color: var(--accent-color);
            display: block;
            margin-bottom: 5px;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .info-item span {
            color: white;
            font-size: 1.1rem;
        }

        .info-description {
            background: rgba(255,255,255,0.05);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            line-height: 1.8;
        }

        .info-buttons {
            display: flex;
            gap: 20px;
            margin: 30px 0;
            flex-wrap: wrap;
        }

        .btn-download {
            background: var(--accent-color);
            color: white;
            text-decoration: none;
            padding: 15px 40px;
            border-radius: 50px;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s;
            border: 2px solid var(--accent-color);
        }

        .btn-download:hover {
            background: transparent;
            color: var(--accent-color);
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(0,122,204,0.3);
        }

        .btn-contact {
            background: transparent;
            color: white;
            text-decoration: none;
            padding: 15px 40px;
            border-radius: 50px;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s;
            border: 2px solid white;
        }

        .btn-contact:hover {
            background: white;
            color: #1a1a1a;
            transform: translateY(-3px);
        }

        .skills {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 15px;
        }

        .skill-tag {
            background: rgba(0,122,204,0.2);
            border: 1px solid var(--accent-color);
            color: white;
            padding: 5px 15px;
            border-radius: 25px;
            font-size: 0.9rem;
        }

        footer {
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            padding: 20px;
            text-align: center;
            border-top: 2px solid var(--accent-color);
            margin-top: auto;
        }

        .copyright {
            font-size: 0.8rem;
            opacity: 0.5;
        }

        @media (max-width: 768px) {
            .info-header {
                flex-direction: column;
                text-align: center;
            }
            
            .info-title h2 {
                font-size: 1.8rem;
            }
            
            .info-card {
                padding: 20px;
            }
            
            .info-buttons {
                justify-content: center;
            }
            
            .btn-download, .btn-contact {
                width: 100%;
                justify-content: center;
            }
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>

<div class="content-wrapper">
    <div class="top-bar">
        <div class="top-bar-content">
            <div class="quick-contact" id="quick-contact">
                <!-- Se llenará con JavaScript -->
            </div>
            <div>
                <span class="badge">Información Personal</span>
                <a href="index.html" class="btn-back"><i class="fas fa-arrow-left"></i> Volver</a>
                <!-- Botón de CV en la parte superior (duplicado para acceso rápido) -->
                <a href="" download class="btn-cv-top" id="btn-cv-top">
                    <i class="fas fa-download"></i> CV
                </a>
            </div>
        </div>
    </div>

    <div class="info-container">
        <div class="info-card">
            <div class="info-header">
                <div class="info-avatar">
                    <img src="" alt="Foto de perfil" id="foto-perfil" onerror="this.src='https://via.placeholder.com/150?text=JC'">
                </div>
                <div class="info-title">
                    <h2 id="info-nombre"></h2>
                    <p><i class="fas fa-map-marker-alt"></i> <span id="info-ubicacion"></span></p>
                </div>
            </div>

            <div class="info-divider"></div>

            <!-- Sobre mí -->
            <div class="info-section">
                <h3><i class="fas fa-user-circle"></i> Sobre Mí</h3>
                <div class="info-description" id="sobre-mi">
                    <!-- Se llenará con JavaScript -->
                </div>
            </div>

            <!-- Información personal detallada -->
            <div class="info-section">
                <h3><i class="fas fa-address-card"></i> Datos Personales</h3>
                <div class="info-grid" id="datos-personales">
                    <!-- Se llenará con JavaScript -->
                </div>
            </div>

            <!-- Educación -->
            <div class="info-section">
                <h3><i class="fas fa-graduation-cap"></i> Educación</h3>
                <div class="info-grid" id="educacion">
                    <!-- Se llenará con JavaScript -->
                </div>
            </div>

            <!-- Experiencia Profesional -->
            <div class="info-section">
                <h3><i class="fas fa-briefcase"></i> Experiencia Profesional</h3>
                <div class="info-grid" id="experiencia">
                    <!-- Se llenará con JavaScript -->
                </div>
            </div>

            <!-- Voluntariados -->
            <div class="info-section">
                <h3><i class="fas fa-hands-helping"></i> Voluntariados</h3>
                <div class="info-grid" id="voluntariados">
                    <!-- Se llenará con JavaScript -->
                </div>
            </div>

            <!-- Habilidades -->
            <div class="info-section">
                <h3><i class="fas fa-code"></i> Habilidades Técnicas</h3>
                <div class="skills" id="habilidades">
                    <!-- Se llenará con JavaScript -->
                </div>
            </div>

            <!-- Idiomas -->
            <div class="info-section">
                <h3><i class="fas fa-language"></i> Idiomas</h3>
                <div class="info-grid" id="idiomas">
                    <!-- Se llenará con JavaScript -->
                </div>
            </div>

            <!-- Botones de acción -->
            <div class="info-buttons">
                <a href="" download class="btn-download" id="btn-cv">
                    <i class="fas fa-download"></i> DESCARGAR CV
                </a>
                <a href="" class="btn-contact" id="btn-contactar">
                    <i class="fas fa-paper-plane"></i> CONTACTAR
                </a>
            </div>

            <!-- Redes sociales adicionales -->
            <div style="text-align: center; margin-top: 20px;">
                <p style="opacity: 0.7; margin-bottom: 10px;">Encuéntrame en:</p>
                <div style="display: flex; gap: 20px; justify-content: center;" id="redes-sociales">
                    <!-- Se llenará con JavaScript -->
                </div>
            </div>
        </div>
    </div>

    <footer>
        <p class="copyright" id="copyright"></p>
    </footer>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        // 1. Quick contact
        document.getElementById('quick-contact').innerHTML = `
            <a href="mailto:${SITE_CONFIG.email}"><i class="fas fa-envelope"></i> Email</a>
            <a href="${SITE_CONFIG.social.linkedin}" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a>
            <a href="${SITE_CONFIG.social.whatsapp}" target="_blank"><i class="fab fa-whatsapp"></i> WhatsApp</a>
            <a href="${SITE_CONFIG.social.github}" target="_blank"><i class="fab fa-github"></i> GitHub</a>
        `;

        // 2. Foto de perfil
        document.getElementById('foto-perfil').src = SITE_CONFIG.rutas.foto_perfil;

        // 3. Nombre y ubicación
        document.getElementById('info-nombre').textContent = SITE_CONFIG.nombre_completo;
        document.getElementById('info-ubicacion').textContent = SITE_CONFIG.ubicacion;

        // 4. Sobre mí
        document.getElementById('sobre-mi').innerHTML = `
            <p>${SITE_CONFIG.titulo}. Estudiante de 8.vo ciclo de Ingeniería Civil en UTEC, con sólida capacidad analítica y un enfoque disruptivo hacia la transformación digital del sector. Especializado en diseño estructural y modelado BIM, con dominio avanzado de herramientas clave como ETABS, SAP2000, Tekla y Revit.</p>
            Cuento con habilidades en programación con Python, Lisp, .NET(C#) aplicado a la automatización de procesos y la optimización de flujos de trabajo repetitivos. Nivel de inglés intermedio-alto (B2). Me caracteriza la adaptabilidad y el aprendizaje acelerado. Mi objetivo es integrarme a un equipo de estructuras, construcción o investigación donde pueda aplicar soluciones tecnológicas e Inteligencia Artificial para elevar la eficiencia y precisión de los proyectos.</p>
        `;

        // 5. Datos personales
        document.getElementById('datos-personales').innerHTML = `
            <div class="info-item">
                <strong>Nombre completo</strong>
                <span>${SITE_CONFIG.nombre_completo}</span>
            </div>
            <div class="info-item">
                <strong>Fecha de nacimiento</strong>
                <span>${SITE_CONFIG.fecha_nacimiento}</span>
            </div>
            <div class="info-item">
                <strong>Nacionalidad</strong>
                <span>${SITE_CONFIG.nacionalidad}</span>
            </div>
            <div class="info-item">
                <strong>Ubicación</strong>
                <span>${SITE_CONFIG.ubicacion}</span>
            </div>
            <div class="info-item">
                <strong>Email</strong>
                <span>${SITE_CONFIG.email}</span>
            </div>
            <div class="info-item">
                <strong>Teléfono</strong>
                <span>${SITE_CONFIG.telefono}</span>
            </div>
        `;

        // 6. Educación
        document.getElementById('educacion').innerHTML = `
            <div class="info-item">
                <strong>Universidad de Ingeniería y Tecnología - UTEC</strong>
                <span>Ingeniería Civil, 2022-2027</span>
            </div>
            <div class="info-item">
                <strong>Cursos Complementarios</strong>
                <span>Diseño Estructural Avanzado, Programación con Python, Desarrollo de Videojuegos</span>
            </div>
        `;

        // 7. Experiencia Profesional
        document.getElementById('experiencia').innerHTML = `
            <div class="info-item">
                <strong>Diseño de nave industrial - Huacho</strong>
                <span>Abril 2025 · Diseño preliminar de una nave industrial de acero de 24 x 12 m para almacen de vehiculos</span>
            </div>
            <div class="info-item">
                <strong>Diseño de un techo metalico - Huacho</strong>
                <span>Enero 2026 · Diseño de un techo metálico en voladizo de 5 x 18 m para parquiadero de coches</span>
            </div>
            <div class="info-item">
                <strong>Practicas Preprofesionales</strong>
                <span>Enero 2026 · Practicante de ing. civil encargado de creacion de planos perimetricos, matrices, distribucion, viviendas en GM INGENIEROS Y CONSULTORES SAC</span>
            </div>
        `;

        // 8. Voluntariados
        document.getElementById('voluntariados').innerHTML = `
            <div class="info-item">
                <strong>Cruz Blanca - Ancon - Lima</strong>
                <span>2025 ·  Apoyo en actividades comunitarias que beneficiaron a más de 50 personas</span>
            </div>
            <div class="info-item">
                <strong>PROA</strong>
                <span>2025 · Cuidado de más de 15 mascotas en albergue, mejorando sus condiciones de bienestar. Santiago de Surco - Lima</span>
            </div>
        `;

        // 9. Habilidades
        const habilidades = ["ETABS", "SAP2000", "SAFE", "AutoCAD", "Revit", "Python", "Visual Studio .NET", "Godot", "Unity", "AutoLISP", "Tekla", "Excel Avanzado", "QGIS", "Power BI", , "Metrados y Presupuestos"];
        let skillsHtml = '';
        habilidades.forEach(skill => {
            skillsHtml += `<span class="skill-tag">${skill}</span>`;
        });
        document.getElementById('habilidades').innerHTML = skillsHtml;

        // 10. Idiomas
        document.getElementById('idiomas').innerHTML = `
            <div class="info-item">
                <strong>Español</strong>
                <span>Nativo</span>
            </div>
            <div class="info-item">
                <strong>Inglés</strong>
                <span>Intermedio-avanzado</span>
            </div>
            <div class="info-item">
                <strong>Quechua</strong>
                <span>Intermedio</span>
            </div>
            <div class="info-item">
                <strong>Alemán</strong>
                <span>Básico</span>
            </div>
            <div class="info-item">
                <strong>Coreano</strong>
                <span>Básico</span>
            </div>
        `;

        // 11. Botones (incluyendo el de la top-bar)
        const cvUrl = SITE_CONFIG.rutas.cv;
        document.getElementById('btn-cv').href = cvUrl;
        document.getElementById('btn-cv-top').href = cvUrl;
        document.getElementById('btn-contactar').href = `mailto:${SITE_CONFIG.email}`;

        // 12. Redes sociales
        document.getElementById('redes-sociales').innerHTML = `
            <a href="${SITE_CONFIG.social.linkedin}" target="_blank" style="color: white; font-size: 1.5rem;"><i class="fab fa-linkedin"></i></a>
            <a href="${SITE_CONFIG.social.github}" target="_blank" style="color: white; font-size: 1.5rem;"><i class="fab fa-github"></i></a>
            <a href="${SITE_CONFIG.social.twitter}" target="_blank" style="color: white; font-size: 1.5rem;"><i class="fab fa-twitter"></i></a>
            <a href="${SITE_CONFIG.social.instagram}" target="_blank" style="color: white; font-size: 1.5rem;"><i class="fab fa-instagram"></i></a>
        `;

        // 13. Copyright
        document.getElementById('copyright').textContent = 
            `© ${SITE_CONFIG.año} ${SITE_CONFIG.nombre} · ${SITE_CONFIG.titulo}`;
    });
</script>

</body>
</html>
