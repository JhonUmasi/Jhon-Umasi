---
layout: null
---
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Perfil Profesional | Ingeniería</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', sans-serif;
            /* El secreto para el fondo total */
            background: url('./assets/images/Background.png') no-repeat center center fixed;
            background-size: cover;
            color: white;
        }

        .overlay {
            background: rgba(0, 0, 0, 0.6); /* Capa oscura para que el texto resalte */
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
        }

        .menu-container {
            display: flex;
            gap: 50px;
            margin-top: 40px;
            flex-wrap: wrap;
            justify-content: center;
        }

        .menu-item {
            text-decoration: none;
            color: white;
            transition: 0.3s;
        }

        .menu-item:hover {
            transform: scale(1.1);
        }

        .icon-circle {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 4px solid #007acc;
            overflow: hidden;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 20px rgba(0,122,204,0.5);
        }

        .icon-circle img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .label {
            margin-top: 15px;
            font-weight: bold;
            font-size: 1.2rem;
            letter-spacing: 2px;
        }
    </style>
</head>
<body>
    <div class="overlay">
        <h1>CENTRO DE OPERACIONES PROFESIONAL</h1>
        <p>Especialista en Acero y Concreto</p>

        <div class="menu-container">
            <a href="steel.html" class="menu-item">
                <div class="icon-circle">
                    <img src="./assets/images/Steel_icon.png" alt="Steel">
                </div>
                <div class="label">STEEL</div>
            </a>

            <a href="concrete.html" class="menu-item">
                <div class="icon-circle">
                    <img src="./assets/images/Concrete_icon.png" alt="Concrete">
                </div>
                <div class="label">CONCRETE</div>
            </a>

            <a href="./assets/docs/mi-cv.pdf" class="menu-item">
                <div class="icon-circle">
                    <img src="./assets/images/Cv_icon.png" alt="CV">
                </div>
                <div class="label">MI CV</div>
            </a>
        </div>
    </div>
</body>
</html>
