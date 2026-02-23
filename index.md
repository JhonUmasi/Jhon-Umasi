---
layout: default
---

<style>
  /* Estilo para que los botones sean imágenes circulares o cuadradas modernas */
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
    transform: translateY(-10px); /* Efecto de levitación al pasar el mouse */
  }

  .menu-item img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 20px; /* Bordes redondeados modernos */
    border: 3px solid #007acc;
    background-color: #f9f9f9;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }

  .menu-item span {
    display: block;
    margin-top: 15px;
    font-weight: bold;
    color: #333;
    font-size: 1.1rem;
    font-family: 'Segoe UI', sans-serif;
  }
</style>

<div style="text-align: center;">
  <h1>CENTRO DE OPERACIONES PROFESIONAL</h1>
  <p>Haz clic en una sección para explorar mi trabajo</p>
</div>

<div class="menu-container">

  <a href="./proyectos.html" class="menu-item">
    <img src="./assets/images/Steel_icon.png" alt="Proyectos">
    <span>PROYECTOS</span>
  </a>

  <a href="./trabajos.html" class="menu-item">
    <img src="./assets/images/Concrete_icon.png" alt="Trabajos">
    <span>EXPERIENCIA</span>
  </a>

  <a href="./assets/docs/mi-cv.pdf" class="menu-item">
    <img src="./assets/images/Cv_icon.png" alt="Curriculum">
    <span>MI CV</span>
  </a>

</div>
