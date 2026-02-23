---
layout: default
---

<style>
  /* FONDO GENERAL PARA TODO EL PROYECTO */
  body {
    background-image: url('./assets/images/Background.png');
    background-size: cover;         /* Cubre toda la pantalla */
    background-position: center;    /* Centra la imagen */
    background-attachment: fixed;  /* El fondo no se mueve al hacer scroll */
    background-repeat: no-repeat;
    margin: 0;
    padding: 0;
  }

  /* Contenedor transparente para que el texto sea legible sobre el fondo */
  .main-content {
    background-color: rgba(255, 255, 255, 0.85); /* Blanco con transparencia */
    margin: 20px auto;
    padding: 40px;
    border-radius: 15px;
    max-width: 900px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  }

  /* ESTILO DE LOS BOTONES VISUALES */
  .menu-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 40px;
    margin-top: 50px;
  }

  .menu-item {
    text-align: center;
    text-decoration: none !important;
    transition: transform 0.3s ease;
    width: 150px;
  }

  .menu-item:hover {
    transform: translateY(-10px);
  }

  .menu-item img {
    width: 130px;
    height: 130px;
    object-fit: cover;
    border-radius: 50%; /* Cambiado a circular para estilo ingeniería */
    border: 4px solid #1a1a1a;
    background-color: #fff;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  }

  .menu-item span {
    display: block;
    margin-top: 15px;
    font-weight: bold;
    color: #1a1a1a;
    font-size: 1.1rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
</style>

<div class="main-content">
  <div style="text-align: center;">
    <h1 style="color: #1a1a1a; border-bottom: 2px solid #007acc; padding-bottom: 10px;">INGENIERÍA ESTRUCTURAL</h1>
    <p style="color: #444; font-style: italic;">Infraestructura, Diseño y Gestión de Proyectos</p>
  </div>

  <div class="menu-container">
    <a href="./steel.html" class="menu-item">
      <img src="./assets/images/Steel_icon.png" alt="Steel Projects">
      <span>STEEL</span>
    </a>

    <a href="./concrete.html" class="menu-item">
      <img src="./assets/images/Concrete_icon.png" alt="Concrete Projects">
      <span>CONCRETE</span>
    </a>

    <a href="./assets/docs/mi-cv.pdf" class="menu-item">
      <img src="./assets/images/Cv_icon.png" alt="Curriculum">
      <span>CV</span>
    </a>
  </div>
</div>
