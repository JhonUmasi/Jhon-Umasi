// config.js - Configuración global del sitio
// CAMBIA ESTOS DATOS UNA SOLA VEZ Y SE ACTUALIZARÁ EN TODO EL SITIO

const SITE_CONFIG = {
    // Información personal
    nombre: "Jhon Umasi",
    nombre_completo: "Jhon Alex Umasi Huisa",
    titulo: "Ingeniero Civil Estructural · Desarrollador · Investigador",
    email: "jhonumasi13@gmail.com",
    telefono: "+51 914 424 137",
    ubicacion: "Lima Perú",
    fecha_nacimiento: "13 de Septiembre, 2004",
    nacionalidad: "Peruana",
    
    // Redes sociales (SOLO CAMBIAS AQUÍ)
    social: {
        linkedin: "https://www.linkedin.com/in/jhon-alex-umasi-huisa-564b25250",
        github: "https://github.com/JhonUmasi",
        twitter: "https://twitter.com/JhonUmasi",
        instagram: "https://instagram.com/jhon_umasi",
        whatsapp: "https://wa.me/914424137",
        telegram: "https://t.me/jhonumasi"
    },
    
    // Rutas de archivos
    rutas: {
        cv: "./assets/docs/CV_jhon.pdf",
        foto_perfil: "./assets/images/profile.jpg",
        background: "./assets/images/Background.png"
    },
    
    // Año actual (automático)
    año: new Date().getFullYear()
};
