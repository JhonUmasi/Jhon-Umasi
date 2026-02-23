---
layout: null
---
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portafolio de Ingeniería | Estructuras y Desarrollo</title>
    <style>
        :root {
            --accent-color: #007acc;
            --bg-overlay: rgba(0, 0, 0, 0.75);
        }

        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: url('./assets/images/Background.png') no-repeat center center fixed;
            background-size: cover;
            color: white;
            scroll-behavior: smooth; /* Para que al bajar se sienta fluido */
        }

        /* Capa oscura que permite el scroll */
        .content-wrapper {
            background: var(--bg-overlay);
            min-height: 100vh;
            padding-bottom: 100px; /* Espacio para el footer */
        }

        header {
            text-align: center;
            padding: 60px 20px;
        }

        h1 { font-size: 2.5rem; letter-spacing: 3px; border-bottom: 2px solid var(--accent-color); display: inline-block; padding-bottom: 10px; }

        /* SECCIONES */
        .section-container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        .section-title {
            font-size: 1.8rem;
            color: var(--accent-color);
            border-left: 5px solid var(--accent-color);
            padding-left: 15px;
            margin-bottom: 30px;
            text-transform: uppercase;
        }

        /* GRID DE BOTONES */
        .menu-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 30px;
            margin-bottom: 60px;
        }

        .menu-item {
            text-decoration: none;
            color: white;
            text-align: center;
            transition: transform 0.3s ease;
        }

        .menu-item:hover { transform: translateY(-10px); }

        .circle-container {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            border: 3px solid var(--accent-color);
            margin: 0 auto 15px;
            overflow: hidden;
            background: white;
            box-shadow: 0 0 15px rgba(0,122,204,0.3);
        }

        .circle-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .label { font-weight: bold; font-size: 0.9rem; letter-spacing: 1px; }

        /* FOOTER DE CONTACTO */
        footer {
            background: #111;
            padding: 20px;
            text-align: center;
            border-top: 2px solid var(--accent-color);
            width: 100%;
        }

        .contact-links a {
            color: white;
            text-decoration: none;
            margin: 0 15px;
            font-size: 0.9rem;
        }

        .contact-links a:hover { color: var(--accent-color); }
    </style>
</head>
<body>

<div class="content-wrapper">
    <header>
        <h1>INGENIERÍA ESTRUCTURAL & DEV</h1>
        <p>Portafolio Profesional de [Tu Nombre]</p>
        <a href="./assets/docs/mi-cv.pdf" style="color:var(--accent-color); font-weight:bold; text-decoration:none; border:1px solid var(--accent-color); padding:10px 20px; border-radius:5px;">DESCARGAR CV COMPLETO</a>
    </header>

    <section class="section-container">
        <h2 class="section-title">Proyectos de Ing. Civil</h2>
        <div class="menu-grid">
            <a href="steel.html" class="menu-item">
                <div class="circle-container"><img src="./assets/images/Steel_icon.png" alt="Steel"></div>
                <div class="label">STEEL</div>
            </a>
            <a href="concrete.html" class="menu-item">
                <div class="circle-container"><img src="./assets/images/Concrete_icon.png" alt="Concrete"></div>
                <div class="label">CONCRETE</div>
            </a>
            <a href="seismic.html" class="menu-item">
                <div class="circle-container"><img src="./assets/images/Seismic_icon.png" alt="Seismic"></div>
                <div class="label">SEISMIC</div>
            </a>
        </div>
    </section>

    <section class="section-container">
        <h2 class="section-title">Proyectos Aparte (Gamedev & Otros)</h2>
        <div class="menu-grid">
            <a href="pokemon.html" class="menu-item">
                <div class="circle-container"><img src="./assets/images/Pokemon_icon.png" alt="Pokemon"></div>
                <div class="label">POKEMON GODOT</div>
            </a>
            <a href="friends.html" class="menu-item">
                <div class="circle-container"><img src="./assets/images/Friends_icon.png" alt="Friends"></div>
                <div class="label">MY FRIENDS</div>
            </a>
            <a href="kurai.html" class="menu-item">
                <div class="circle-container"><img src="./assets/images/Kurai_icon.png" alt="Kurai"></div>
                <div class="label">KURAI EKO</div>
            </a>
        </div>
    </section>

    <section class="section-container">
        <h2 class="section-title">Investigación Académica</h2>
        <div class="menu-grid">
            <a href="nanosteel.html" class="menu-item">
                <div class="circle-container"><img src="./assets/images/Nanosteel_icon.png" alt="NanoSteel"></div>
                <div class="label">NANOSTEEL</div>
            </a>
            <a href="ecoconcreto.html" class="menu-item">
                <div class="circle-container"><img src="./assets/images/Ecoconcreto_icon.png" alt="EcoConcreto"></div>
                <div class="label">ECOCONCRETO</div>
            </a>
        </div>
    </section>

    <footer>
        <div class="contact-links">
            <a href="mailto:tu-correo@gmail.com">📧 tu-correo@gmail.com</a>
            <a href="https://linkedin.com/in/tu-perfil" target="_blank">🔗 LinkedIn</a>
            <a href="https://wa.me/tu-numero" target="_blank">📱 WhatsApp</a>
        </div>
        <p style="font-size: 0.7rem; margin-top: 10px; opacity: 0.5;">© 2026 | Diseñado para Ingeniería</p>
    </footer>
</div>

</body>
</html>
