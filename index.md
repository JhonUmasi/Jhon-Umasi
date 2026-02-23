<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ing. Estructural & Developer | Portafolio Profesional</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary: #0077be;
            --primary-dark: #005a92;
            --secondary: #2c3e50;
            --accent: #e67e22;
            --light: #ecf0f1;
            --dark: #1a1a1a;
            --gray: #7f8c8d;
            --success: #27ae60;
            --shadow: 0 4px 6px rgba(0,0,0,0.1);
            --shadow-hover: 0 10px 25px rgba(0,0,0,0.2);
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: var(--dark);
            line-height: 1.6;
            min-height: 100vh;
        }

        /* Ocultar el contenido por defecto de Jekyll */
        .main-content h1, 
        .main-content h2, 
        .main-content p,
        .main-content a,
        .main-content .btn {
            display: none;
        }

        /* Fondo con overlay profesional - usando tu imagen local */
        .hero-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('./assets/images/Background.png') no-repeat center center/cover;
            filter: brightness(0.7);
            z-index: -1;
        }

        .hero-bg::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, rgba(0,119,190,0.2), rgba(255,255,255,0.3));
        }

        .wrapper {
            position: relative;
            z-index: 1;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        /* Header profesional - STICKY */
        .header {
            background: rgba(255,255,255,0.95);
            backdrop-filter: blur(10px);
            box-shadow: var(--shadow);
            position: sticky;
            top: 0;
            z-index: 100;
            padding: 0.5rem 0;
        }

        .nav-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0.5rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .logo-img {
            width: 40px;
            height: 40px;
            background: var(--primary);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 1.2rem;
        }

        .logo-text h1 {
            font-size: 1.2rem;
            color: var(--secondary);
            margin: 0;
        }

        .logo-text p {
            font-size: 0.8rem;
            color: var(--gray);
            margin: 0;
        }

        .contact-header {
            display: flex;
            gap: 1.5rem;
        }

        .contact-header a {
            color: var(--secondary);
            text-decoration: none;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 0.3rem;
            transition: color 0.3s;
        }

        .contact-header a:hover {
            color: var(--primary);
        }

        /* Hero section - ANCHO COMPLETO */
        .hero {
            background: rgba(255,255,255,0.2);
            backdrop-filter: blur(5px);
            color: white;
            text-align: center;
            padding: 4rem 2rem;
            margin-bottom: 2rem;
            width: 100%;
        }

        .hero h2 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            font-weight: 300;
            letter-spacing: 2px;
            color: white;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
        }

        .hero h2 strong {
            font-weight: 700;
            color: var(--accent);
        }

        .hero p {
            font-size: 1.1rem;
            max-width: 700px;
            margin: 0 auto 2rem;
            opacity: 0.95;
        }

        .btn-info {
            background: var(--accent);
            color: white;
            border: none;
            padding: 1rem 2.5rem;
            font-size: 1rem;
            font-weight: 600;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s;
            text-decoration: none;
            display: inline-block;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: var(--shadow);
            border: none;
        }

        .btn-info:hover {
            background: #d35400;
            transform: translateY(-2px);
            box-shadow: var(--shadow-hover);
        }

        /* Main content - ANCHO COMPLETO */
        .main-content {
            width: 100%;
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem 4rem;
            flex: 1;
        }

        /* INDICE DE NAVEGACIÓN */
        .section-index {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin: 2rem 0 3rem;
            flex-wrap: wrap;
        }

        .index-link {
            background: rgba(255,255,255,0.2);
            backdrop-filter: blur(5px);
            color: white;
            text-decoration: none;
            padding: 0.75rem 1.5rem;
            border-radius: 50px;
            font-weight: 600;
            transition: all 0.3s;
            border: 1px solid rgba(255,255,255,0.3);
        }

        .index-link:hover {
            background: var(--accent);
            border-color: var(--accent);
            transform: translateY(-2px);
        }

        .section {
            margin-bottom: 4rem;
            scroll-margin-top: 80px;
            width: 100%;
        }

        .section-title {
            font-size: 2rem;
            color: white;
            margin-bottom: 2rem;
            padding-bottom: 0.5rem;
            border-bottom: 3px solid var(--accent);
            display: inline-block;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            width: 100%;
        }

        .project-card {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: var(--shadow);
            transition: all 0.3s;
            text-decoration: none;
            color: var(--dark);
        }

        .project-card:hover {
            transform: translateY(-10px);
            box-shadow: var(--shadow-hover);
        }

        .card-image {
            height: 180px;
            background: linear-gradient(45deg, var(--primary), var(--primary-dark));
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
        }

        /* IMÁGENES LOCALES */
        .card-image img {
            width: 100px;
            height: 100px;
            object-fit: contain;
            filter: drop-shadow(2px 4px 4px rgba(0,0,0,0.2));
        }

        .card-content {
            padding: 1.5rem;
        }

        .card-content h3 {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
            color: var(--secondary);
        }

        .card-content p {
            color: var(--gray);
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }

        .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .tag {
            background: var(--light);
            color: var(--secondary);
            padding: 0.2rem 0.8rem;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: 600;
        }

        /* Footer FLOTANTE (ANCLADO) */
        .footer {
            background: var(--dark);
            color: white;
            padding: 1rem 2rem;
            text-align: center;
            position: sticky;
            bottom: 0;
            width: 100%;
            z-index: 90;
            box-shadow: 0 -5px 15px rgba(0,0,0,0.2);
            border-top: 2px solid var(--accent);
        }

        .footer-links {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-bottom: 0.5rem;
            flex-wrap: wrap;
            max-width: 1400px;
            margin-left: auto;
            margin-right: auto;
        }

        .footer-links a {
            color: white;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: color 0.3s;
            font-size: 1rem;
        }

        .footer-links a:hover {
            color: var(--accent);
        }

        .footer-links i {
            font-size: 1.3rem;
        }

        .copyright {
            font-size: 0.8rem;
            opacity: 0.7;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .nav-container {
                flex-direction: column;
                gap: 1rem;
                padding: 1rem;
            }
            
            .contact-header {
                flex-wrap: wrap;
                justify-content: center;
            }
            
            .hero h2 {
                font-size: 2rem;
            }
            
            .grid {
                grid-template-columns: 1fr;
            }

            .footer {
                position: relative;
            }
        }
    </style>
    <!-- Font Awesome para iconos -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="hero-bg"></div>
    
    <div class="wrapper">
        <header class="header">
            <div class="nav-container">
                <div class="logo">
                    <div class="logo-img">IE</div>
                    <div class="logo-text">
                        <h1>Ingeniero Estructural</h1>
                        <p>+ Developer</p>
                    </div>
                </div>
                <div class="contact-header">
                    <a href="mailto:tu-correo@gmail.com"><i class="fas fa-envelope"></i> Email</a>
                    <a href="https://linkedin.com/in/tu-perfil" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a>
                    <a href="https://wa.me/tu-numero" target="_blank"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                    <a href="https://github.com/tu-usuario" target="_blank"><i class="fab fa-github"></i> GitHub</a>
                </div>
            </div>
        </header>

        <section class="hero">
            <h2><strong>Estructuras</strong> que inspiran · <strong>Código</strong> que transforma</h2>
            <p>Ingeniero Civil Estructural · Desarrollador de Videojuegos · Investigador</p>
            <a href="#" class="btn-info" onclick="alert('Sección de Información Personal (próximamente)'); return false;">
                <i class="fas fa-user"></i> INFORMACIÓN PERSONAL
            </a>
        </section>

        <main class="main-content">
            <!-- ÍNDICE DE NAVEGACIÓN -->
            <div class="section-index">
                <a href="#civil" class="index-link"><i class="fas fa-hard-hat"></i> Ing. Civil</a>
                <a href="#gamedev" class="index-link"><i class="fas fa-gamepad"></i> Game Dev</a>
                <a href="#research" class="index-link"><i class="fas fa-flask"></i> Investigación</a>
            </div>

            <!-- Proyectos Ingeniería Civil -->
            <section id="civil" class="section">
                <h2 class="section-title">Proyectos de Ingeniería Civil</h2>
                <div class="grid">
                    <a href="steel.html" class="project-card">
                        <div class="card-image">
                            <img src="./assets/images/Steel_icon.png" alt="Steel">
                        </div>
                        <div class="card-content">
                            <h3>STEEL</h3>
                            <p>Diseño y análisis de estructuras metálicas complejas</p>
                            <div class="tags">
                                <span class="tag">AISC</span>
                                <span class="tag">FEA</span>
                                <span class="tag">3D Modeling</span>
                            </div>
                        </div>
                    </a>

                    <a href="concrete.html" class="project-card">
                        <div class="card-image">
                            <img src="./assets/images/Concrete_icon.png" alt="Concrete">
                        </div>
                        <div class="card-content">
                            <h3>CONCRETE</h3>
                            <p>Estructuras de hormigón armado y pretensado</p>
                            <div class="tags">
                                <span class="tag">ACI 318</span>
                                <span class="tag">ETABS</span>
                                <span class="tag">SAFE</span>
                            </div>
                        </div>
                    </a>

                    <a href="seismic.html" class="project-card">
                        <div class="card-image">
                            <img src="./assets/images/Seismic_icon.png" alt="Seismic">
                        </div>
                        <div class="card-content">
                            <h3>SEISMIC</h3>
                            <p>Análisis sísmico avanzado y diseño por desempeño</p>
                            <div class="tags">
                                <span class="tag">Pushover</span>
                                <span class="tag">Time History</span>
                                <span class="tag">FEMA P-58</span>
                            </div>
                        </div>
                    </a>
                </div>
            </section>

            <!-- Proyectos Game Development -->
            <section id="gamedev" class="section">
                <h2 class="section-title">Game Development & Otros</h2>
                <div class="grid">
                    <a href="pokemon.html" class="project-card">
                        <div class="card-image">
                            <img src="./assets/images/PokemonGodot_icon.png" alt="Pokemon">
                        </div>
                        <div class="card-content">
                            <h3>POKEMON GODOT</h3>
                            <p>Fan game desarrollado en Godot Engine con mecánicas clásicas</p>
                            <div class="tags">
                                <span class="tag">Godot</span>
                                <span class="tag">GDScript</span>
                                <span class="tag">RPG</span>
                            </div>
                        </div>
                    </a>

                    <a href="friends.html" class="project-card">
                        <div class="card-image">
                            <img src="./assets/images/MyFriend_icon.png" alt="Friends">
                        </div>
                        <div class="card-content">
                            <h3>MY FRIENDS</h3>
                            <p>Red social temática para comunidades de ingeniería</p>
                            <div class="tags">
                                <span class="tag">React</span>
                                <span class="tag">Node.js</span>
                                <span class="tag">MongoDB</span>
                            </div>
                        </div>
                    </a>

                    <a href="kurai.html" class="project-card">
                        <div class="card-image">
                            <img src="./assets/images/KuraiEko_icon.png" alt="Kurai">
                        </div>
                        <div class="card-content">
                            <h3>KURAI EKO</h3>
                            <p>Videojuego indie de plataformas con temática ambiental</p>
                            <div class="tags">
                                <span class="tag">Unity</span>
                                <span class="tag">C#</span>
                                <span class="tag">2D Art</span>
                            </div>
                        </div>
                    </a>
                </div>
            </section>

            <!-- Investigación Académica -->
            <section id="research" class="section">
                <h2 class="section-title">Investigación Académica</h2>
                <div class="grid">
                    <a href="nanosteel.html" class="project-card">
                        <div class="card-image">
                            <img src="./assets/images/Nanosteel_icon.png" alt="NanoSteel">
                        </div>
                        <div class="card-content">
                            <h3>NANOSTEEL</h3>
                            <p>Materiales nanoestructurados para aplicaciones estructurales</p>
                            <div class="tags">
                                <span class="tag">Nanotecnología</span>
                                <span class="tag">Metalurgia</span>
                                <span class="tag">Publicación Q1</span>
                            </div>
                        </div>
                    </a>

                    <a href="ecoconcreto.html" class="project-card">
                        <div class="card-image">
                            <img src="./assets/images/Ecoconcreto_icon.png" alt="EcoConcreto">
                        </div>
                        <div class="card-content">
                            <h3>ECOCONCRETO</h3>
                            <p>Hormigones ecológicos con materiales reciclados</p>
                            <div class="tags">
                                <span class="tag">Sostenibilidad</span>
                                <span class="tag">Materiales</span>
                                <span class="tag">Durabilidad</span>
                            </div>
                        </div>
                    </a>
                </div>
            </section>
        </main>

        <!-- Footer ANCLADO (sticky) -->
        <footer class="footer">
            <div class="footer-links">
                <a href="mailto:tu-correo@gmail.com"><i class="fas fa-envelope"></i> tu-correo@gmail.com</a>
                <a href="https://linkedin.com/in/tu-perfil" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a>
                <a href="https://wa.me/tu-numero" target="_blank"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                <a href="https://github.com/tu-usuario" target="_blank"><i class="fab fa-github"></i> GitHub</a>
                <a href="https://t.me/tu-usuario" target="_blank"><i class="fab fa-telegram"></i> Telegram</a>
            </div>
            <p class="copyright">© 2026 Ingeniero Estructural & Developer · Todos los derechos reservados</p>
        </footer>
    </div>
</body>
</html>
