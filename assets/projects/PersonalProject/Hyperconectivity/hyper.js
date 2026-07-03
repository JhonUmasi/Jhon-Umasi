var DURACION_TOTAL = 120;
var simulacionActiva = false;
var tiempoInicio = 0;
var intervaloSimulacion = null;
var contadorNodos = 0;
var faseActual = 0;

var estadisticas = {
    totalActividades: 0,
    totalAbandonadas: 0,
    totalCambios: 0
};

var animacionPersonaje = {
    estado: 'sentado',
    frameActual: 0,
    direccion: 1,
    framesSentado: ['sent1.avif', 'sent2.avif', 'sent3.avif', 'sent4.avif'],
    framesCelular: ['cel1.avif', 'cel2.avif', 'cel3.avif'],
    repeticionesCel3: 0,
    maxRepeticionesCel3: 3,
    repeticionesUltimo: 0,
    velocidadBase: 200,
    velocidadActual: 200,
    ultimoCambio: 0,
    modo: 'sentado',
    tiempoAlternancia: 0,
    animacionActiva: true,
    pausa: false,
    pausaHasta: 0,
    objetivo: null,
    enTransicion: false,
    framesRestantes: 0
};

function actualizarPersonaje(tiempo) {
    if (!animacionPersonaje.animacionActiva) return;
    if (animacionPersonaje.pausa && tiempo < animacionPersonaje.pausaHasta) return;
    animacionPersonaje.pausa = false;
    var img = document.getElementById('personajeImg');
    if (!img) return;
    var elapsed = tiempo - animacionPersonaje.ultimoCambio;
    var velocidad = animacionPersonaje.velocidadActual || animacionPersonaje.velocidadBase;
    if (elapsed >= velocidad) {
        animacionPersonaje.ultimoCambio = tiempo;
        if (animacionPersonaje.modo === 'sentado') {
            var frames = animacionPersonaje.framesSentado;
            var maxFrame = frames.length - 1;
            animacionPersonaje.frameActual += animacionPersonaje.direccion;
            if (animacionPersonaje.frameActual >= maxFrame) {
                if (animacionPersonaje.repeticionesUltimo < 3) {
                    animacionPersonaje.repeticionesUltimo++;
                    animacionPersonaje.frameActual = maxFrame;
                } else {
                    animacionPersonaje.direccion = -1;
                    animacionPersonaje.repeticionesUltimo = 0;
                    animacionPersonaje.frameActual = maxFrame - 1;
                }
            } else if (animacionPersonaje.frameActual <= 0) {
                animacionPersonaje.direccion = 1;
                animacionPersonaje.frameActual = 1;
            }
            animacionPersonaje.frameActual = Math.max(0, Math.min(maxFrame, animacionPersonaje.frameActual));
            var frameName = frames[Math.floor(animacionPersonaje.frameActual)];
            img.src = 'imagen/' + frameName;
        } else {
            var framesCel = animacionPersonaje.framesCelular;
            var maxCel = framesCel.length - 1;
            animacionPersonaje.frameActual += animacionPersonaje.direccion;
            if (animacionPersonaje.frameActual >= maxCel) {
                if (animacionPersonaje.repeticionesCel3 < animacionPersonaje.maxRepeticionesCel3) {
                    animacionPersonaje.repeticionesCel3++;
                    animacionPersonaje.frameActual = maxCel;
                } else {
                    animacionPersonaje.direccion = -1;
                    animacionPersonaje.repeticionesCel3 = 0;
                    animacionPersonaje.frameActual = maxCel - 1;
                }
            } else if (animacionPersonaje.frameActual <= 0) {
                animacionPersonaje.direccion = 1;
                animacionPersonaje.repeticionesCel3 = 0;
                animacionPersonaje.frameActual = 1;
            }
            animacionPersonaje.frameActual = Math.max(0, Math.min(maxCel, animacionPersonaje.frameActual));
            var frameName = framesCel[Math.floor(animacionPersonaje.frameActual)];
            img.src = 'imagen/' + frameName;
        }
    }
}

function ejecutarComportamientoNotificacion(tipo, intensidad) {
    var img = document.getElementById('personajeImg');
    if (!img) return;
    animacionPersonaje.pausa = true;
    animacionPersonaje.pausaHasta = Date.now() + 300 + (intensidad * 200);
    switch(tipo) {
        case 'whatsapp':
            animacionPersonaje.modo = 'celular';
            animacionPersonaje.frameActual = 0;
            animacionPersonaje.direccion = 1;
            animacionPersonaje.repeticionesCel3 = 0;
            animacionPersonaje.velocidadActual = 150;
            img.src = 'imagen/cel1.avif';
            setTimeout(function() {
                img.src = 'imagen/cel2.avif';
                animacionPersonaje.velocidadActual = 300;
                animacionPersonaje.frameActual = 1;
            }, 300);
            setTimeout(function() {
                animacionPersonaje.modo = 'sentado';
                animacionPersonaje.frameActual = 0;
                animacionPersonaje.velocidadActual = 300;
                img.src = 'imagen/sent1.avif';
                setTimeout(function() {
                    animacionPersonaje.velocidadActual = animacionPersonaje.velocidadBase;
                    animacionPersonaje.pausa = false;
                }, 500);
            }, 1200 + (intensidad * 300));
            break;
        case 'gmail':
            animacionPersonaje.modo = 'celular';
            animacionPersonaje.frameActual = 0;
            animacionPersonaje.direccion = 1;
            animacionPersonaje.repeticionesCel3 = 0;
            animacionPersonaje.velocidadActual = 150;
            img.src = 'imagen/cel1.avif';
            setTimeout(function() {
                img.src = 'imagen/cel2.avif';
                animacionPersonaje.frameActual = 1;
            }, 300);
            setTimeout(function() {
                img.src = 'imagen/cel3.avif';
                animacionPersonaje.frameActual = 2;
                animacionPersonaje.repeticionesCel3 = 0;
                var repeticiones = 2 + intensidad;
                var cont = 0;
                var intervaloRep = setInterval(function() {
                    cont++;
                    if (cont >= repeticiones) {
                        clearInterval(intervaloRep);
                        animacionPersonaje.modo = 'sentado';
                        animacionPersonaje.frameActual = 0;
                        animacionPersonaje.velocidadActual = 400;
                        img.src = 'imagen/sent1.avif';
                        setTimeout(function() {
                            animacionPersonaje.velocidadActual = animacionPersonaje.velocidadBase;
                            animacionPersonaje.pausa = false;
                        }, 500);
                    }
                }, 400);
            }, 600);
            break;
        case 'youtube':
            animacionPersonaje.modo = 'celular';
            animacionPersonaje.frameActual = 0;
            animacionPersonaje.direccion = 1;
            animacionPersonaje.repeticionesCel3 = 0;
            animacionPersonaje.velocidadActual = 200;
            img.src = 'imagen/cel1.avif';
            setTimeout(function() {
                img.src = 'imagen/cel2.avif';
                animacionPersonaje.frameActual = 1;
            }, 400);
            setTimeout(function() {
                img.src = 'imagen/cel3.avif';
                animacionPersonaje.frameActual = 2;
                animacionPersonaje.repeticionesCel3 = 0;
                var repeticiones = 3 + intensidad;
                var cont = 0;
                var intervaloRep = setInterval(function() {
                    cont++;
                    if (cont >= repeticiones) {
                        clearInterval(intervaloRep);
                        animacionPersonaje.modo = 'sentado';
                        animacionPersonaje.frameActual = 0;
                        animacionPersonaje.velocidadActual = 150;
                        img.src = 'imagen/sent1.avif';
                        setTimeout(function() {
                            img.src = 'imagen/sent2.avif';
                            animacionPersonaje.frameActual = 1;
                        }, 200);
                        setTimeout(function() {
                            img.src = 'imagen/sent3.avif';
                            animacionPersonaje.frameActual = 2;
                        }, 400);
                        setTimeout(function() {
                            img.src = 'imagen/sent4.avif';
                            animacionPersonaje.frameActual = 3;
                        }, 600);
                        setTimeout(function() {
                            animacionPersonaje.velocidadActual = animacionPersonaje.velocidadBase;
                            animacionPersonaje.pausa = false;
                        }, 1000);
                    }
                }, 300);
            }, 800);
            break;
        case 'slack':
            animacionPersonaje.modo = 'celular';
            animacionPersonaje.frameActual = 0;
            animacionPersonaje.direccion = 1;
            animacionPersonaje.repeticionesCel3 = 0;
            animacionPersonaje.velocidadActual = 200;
            img.src = 'imagen/cel1.avif';
            setTimeout(function() {
                img.src = 'imagen/cel2.avif';
                animacionPersonaje.frameActual = 1;
            }, 400);
            setTimeout(function() {
                animacionPersonaje.modo = 'sentado';
                animacionPersonaje.frameActual = 0;
                animacionPersonaje.velocidadActual = 300;
                img.src = 'imagen/sent1.avif';
                setTimeout(function() {
                    animacionPersonaje.velocidadActual = animacionPersonaje.velocidadBase;
                    animacionPersonaje.pausa = false;
                }, 500);
            }, 1000 + (intensidad * 200));
            break;
        case 'twitter':
            animacionPersonaje.modo = 'celular';
            animacionPersonaje.frameActual = 0;
            animacionPersonaje.direccion = 1;
            animacionPersonaje.repeticionesCel3 = 0;
            animacionPersonaje.velocidadActual = 150;
            img.src = 'imagen/cel1.avif';
            setTimeout(function() {
                img.src = 'imagen/cel2.avif';
                animacionPersonaje.frameActual = 1;
            }, 300);
            setTimeout(function() {
                img.src = 'imagen/cel3.avif';
                animacionPersonaje.frameActual = 2;
            }, 600);
            setTimeout(function() {
                animacionPersonaje.modo = 'sentado';
                animacionPersonaje.frameActual = 0;
                animacionPersonaje.velocidadActual = 200;
                img.src = 'imagen/sent1.avif';
                setTimeout(function() {
                    animacionPersonaje.velocidadActual = animacionPersonaje.velocidadBase;
                    animacionPersonaje.pausa = false;
                }, 300);
            }, 1000 + (intensidad * 150));
            break;
        default:
            animacionPersonaje.modo = 'celular';
            animacionPersonaje.frameActual = 0;
            animacionPersonaje.direccion = 1;
            animacionPersonaje.velocidadActual = 200;
            img.src = 'imagen/cel1.avif';
            setTimeout(function() {
                img.src = 'imagen/cel2.avif';
            }, 400);
            setTimeout(function() {
                img.src = 'imagen/cel3.avif';
            }, 800);
            setTimeout(function() {
                animacionPersonaje.modo = 'sentado';
                animacionPersonaje.frameActual = 0;
                animacionPersonaje.velocidadActual = 300;
                img.src = 'imagen/sent1.avif';
                setTimeout(function() {
                    animacionPersonaje.velocidadActual = animacionPersonaje.velocidadBase;
                    animacionPersonaje.pausa = false;
                }, 400);
            }, 1200);
            break;
    }
}

function cambiarModoPersonaje(modo) {
    if (animacionPersonaje.modo === modo) return;
    animacionPersonaje.modo = modo;
    animacionPersonaje.frameActual = 0;
    animacionPersonaje.direccion = 1;
    animacionPersonaje.repeticionesCel3 = 0;
    animacionPersonaje.repeticionesUltimo = 0;
    animacionPersonaje.ultimoCambio = Date.now();
    var img = document.getElementById('personajeImg');
    if (img) {
        if (modo === 'sentado') {
            img.src = 'imagen/sent1.avif';
        } else {
            img.src = 'imagen/cel1.avif';
        }
    }
}

function actualizarPersonajePorEstado(fase, tareasActivas) {
    if (fase === 0 || fase === 1) {
        if (animacionPersonaje.modo !== 'sentado') {
            cambiarModoPersonaje('sentado');
        }
        animacionPersonaje.animacionActiva = true;
        animacionPersonaje.velocidadActual = animacionPersonaje.velocidadBase;
    } else if (fase === 2 || fase === 3) {
        if (animacionPersonaje.modo !== 'celular') {
            cambiarModoPersonaje('celular');
        }
        animacionPersonaje.animacionActiva = true;
        animacionPersonaje.velocidadActual = 150;
    } else {
        var ahora = Date.now();
        if (!animacionPersonaje.tiempoAlternancia) {
            animacionPersonaje.tiempoAlternancia = ahora;
        }
        if (ahora - animacionPersonaje.tiempoAlternancia > 1500) {
            animacionPersonaje.tiempoAlternancia = ahora;
            var nuevoModo = animacionPersonaje.modo === 'sentado' ? 'celular' : 'sentado';
            cambiarModoPersonaje(nuevoModo);
            animacionPersonaje.velocidadActual = 100;
        }
        animacionPersonaje.animacionActiva = true;
    }
}

var textosHolzer = [
    "La atención es el recurso más escaso del siglo XXI",
    "El exceso de información fragmenta la capacidad de pensar profundamente",
    "La sociedad del cansancio nos ha robado la capacidad de contemplación",
    "El cerebro se cambia a sí mismo, pero la sobrecarga lo fragmenta",
    "La hiperconectividad es el nuevo analgésico de la mente",
    "Cada notificación es una pequeña muerte de la atención",
    "Deep work: la habilidad más valiosa en la era de la distracción",
    "El silencio se ha vuelto un lujo en el mundo hiperconectado",
    "El multitasking es un mito: el cerebro solo cambia de tarea",
    "La plasticidad se erosiona con cada distracción"
];

var actividades = {
    "📝 Investigación": {
        categoria: "Programas/Apps",
        subactividades: ["🔍 Google Scholar", "📄 Docs", "📊 Sheets", "📎 Drive", "📚 PDF", "✏️ Anotaciones"]
    },
    "🎨 Diseño": {
        categoria: "Programas/Apps",
        subactividades: ["🎨 Figma", "📐 AutoCAD", "🖌️ Photoshop", "📄 Docs", "🎬 Premiere", "🖼️ Illustrator"]
    },
    "💻 Programación": {
        categoria: "Programas/Apps",
        subactividades: ["🐍 VS Code", "📄 Docs", "🔍 Stack Overflow", "📊 Sheets", "🐱 GitHub", "📦 NPM", "🐳 Docker"]
    },
    "📊 Análisis": {
        categoria: "Programas/Apps",
        subactividades: ["📊 Excel", "📊 Power BI", "📄 Docs", "🔍 Research", "📈 Tableau", "🐍 Python", "📉 R"]
    },
    "🎓 Estudio": {
        categoria: "Programas/Apps",
        subactividades: ["📚 Moodle", "📄 Docs", "🔍 Google", "📎 Drive", "📝 Notas", "🎧 Podcast", "📖 Libros"]
    },
    "📱 Social": {
        categoria: "Navegador Web",
        subactividades: ["🐦 Twitter", "📸 Instagram", "💬 WhatsApp", "📘 Facebook", "🎵 TikTok", "📺 YouTube"]
    },
    "💼 Trabajo": {
        categoria: "Programas/Apps",
        subactividades: ["💬 Slack", "📧 Gmail", "📅 Calendar", "📝 Jira", "🔗 Zoom", "📊 Teams"]
    },
    "🎮 Entretenimiento": {
        categoria: "Navegador Web",
        subactividades: ["🎮 Steam", "📺 Netflix", "🎵 Spotify", "📚 Reddit", "🎬 Twitch", "🎮 Epic Games"]
    }
};

var distracciones = [
    { icono: "📱", mensaje: "WhatsApp: Mensaje de Juan", tipo: "whatsapp", peso: 2 },
    { icono: "📱", mensaje: "WhatsApp: Mensaje de María", tipo: "whatsapp", peso: 2 },
    { icono: "📱", mensaje: "WhatsApp: Grupo familiar (20 msgs)", tipo: "whatsapp", peso: 3 },
    { icono: "🐦", mensaje: "Twitter: Nueva notificación", tipo: "twitter", peso: 2 },
    { icono: "🐦", mensaje: "Twitter: Trending #colapso", tipo: "twitter", peso: 3 },
    { icono: "📧", mensaje: "Gmail: Correo importante del cliente", tipo: "gmail", peso: 3 },
    { icono: "📧", mensaje: "Gmail: Oferta de trabajo", tipo: "gmail", peso: 4 },
    { icono: "📧", mensaje: "Gmail: 5 correos no leídos", tipo: "gmail", peso: 3 },
    { icono: "📸", mensaje: "Instagram: Nueva foto etiquetada", tipo: "twitter", peso: 2 },
    { icono: "📸", mensaje: "Instagram: 10 notificaciones", tipo: "twitter", peso: 3 },
    { icono: "💬", mensaje: "Slack: Mensaje del equipo", tipo: "slack", peso: 3 },
    { icono: "💬", mensaje: "Slack: Reunión urgente", tipo: "slack", peso: 4 },
    { icono: "💬", mensaje: "Slack: 3 canales con actividad", tipo: "slack", peso: 3 },
    { icono: "📺", mensaje: "YouTube: Nuevo video recomendado", tipo: "youtube", peso: 3 },
    { icono: "📺", mensaje: "YouTube: Tutorial de tu interés", tipo: "youtube", peso: 4 },
    { icono: "📺", mensaje: "YouTube: Shorts - 5 videos", tipo: "youtube", peso: 4 },
    { icono: "🎵", mensaje: "Spotify: Canción sugerida", tipo: "twitter", peso: 2 },
    { icono: "📰", mensaje: "Noticias: Alerta informativa", tipo: "twitter", peso: 3 },
    { icono: "📰", mensaje: "Noticias: Breaking News", tipo: "twitter", peso: 4 },
    { icono: "🎮", mensaje: "Steam: Oferta de juego", tipo: "twitter", peso: 3 },
    { icono: "📚", mensaje: "Reddit: Nuevo post popular", tipo: "twitter", peso: 3 }
];

var listadoNodos = new vis.DataSet([]);
var listadoConexiones = new vis.DataSet([]);
var red = null;

var estado_sistema = {
    nodo_activo: "",
    historial: {},
    tareas_activas: []
};

var nodosBase = ["🧠 Cerebro", "💡 Plasticidad", "🧬 Sinapsis", "🌐 Conexiones", "⚡ Caos"];

var particulas = [];
var canvas, ctx;

function initParticulas() {
    canvas = document.getElementById('canvasParticulas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (var i = 0; i < 120; i++) {
        particulas.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
            size: Math.random() * 3 + 0.5,
            opacity: Math.random() * 0.4 + 0.05
        });
    }
    animarParticulas();
}

function animarParticulas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particulas.forEach(function(p) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(197,160,89,' + p.opacity + ')';
        ctx.fill();
    });
    for (var i = 0; i < particulas.length; i++) {
        for (var j = i + 1; j < particulas.length; j++) {
            var dx = particulas[i].x - particulas[j].x;
            var dy = particulas[i].y - particulas[j].y;
            var dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 200) {
                ctx.beginPath();
                ctx.moveTo(particulas[i].x, particulas[i].y);
                ctx.lineTo(particulas[j].x, particulas[j].y);
                ctx.strokeStyle = 'rgba(197,160,89,' + (0.03 * (1 - dist/200)) + ')';
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animarParticulas);
}

function inicializarGrafo() {
    var contenedor = document.getElementById('grafo');
    var datos = { nodes: listadoNodos, edges: listadoConexiones };
    var opciones = {
        nodes: {
            shape: 'dot',
            font: {
                size: 12,
                color: '#1B3022',
                face: 'Inter',
                bold: false
            },
            borderWidth: 1.5,
            color: {
                border: '#C5A059',
                background: '#F5F0EB',
                highlight: {
                    border: '#D4B06A',
                    background: '#EDE8E2'
                }
            }
        },
        edges: {
            width: 1.5,
            smooth: { type: 'continuous', roundness: 0.5 },
            color: {
                color: 'rgba(197,160,89,0.25)',
                highlight: '#C5A059',
                inherit: false
            },
            arrows: { to: { enabled: false } }
        },
        physics: {
            solver: 'forceAtlas2Based',
            forceAtlas2Based: {
                gravitationalConstant: -80,
                centralGravity: 0.01,
                springLength: 120,
                springConstant: 0.08,
                damping: 0.4
            },
            stabilization: { iterations: 150 }
        },
        interaction: {
            hover: true,
            tooltipDelay: 200,
            navigationButtons: false,
            keyboard: false
        },
        background: {
            color: 'rgba(248,245,242,0.0)'
        }
    };
    red = new vis.Network(contenedor, datos, opciones);
}

function actualizarGrafo() {
    var ahora = Date.now() / 1000;
    var nodoActivoActual = estado_sistema.nodo_activo;
    var contadorConexiones = {};
    listadoConexiones.get().forEach(function(c) {
        contadorConexiones[c.from] = (contadorConexiones[c.from] || 0) + 1;
        contadorConexiones[c.to] = (contadorConexiones[c.to] || 0) + 1;
    });
    Object.keys(estado_sistema.historial).forEach(function(nombre) {
        var info = estado_sistema.historial[nombre];
        var tiempoInactivo = ahora - info.ultimo_visto;
        var esInactivo = tiempoInactivo > 20 && info.categoria !== "Raiz";
        var esImportante = (contadorConexiones[nombre] || 0) > 3 && info.categoria !== "Raiz";
        var colorNodo = { background: '#F5F0EB', border: '#C5A059' };
        var tamaño = nombre === "🧠 Cerebro" ? 30 : (info.categoria === "Raiz" ? 22 : 12);
        var borderWidth = 1.5;
        var etiqueta = nombre;
        var fontColor = '#1B3022';
        if (nombre === nodoActivoActual) {
            borderWidth = 3;
            tamaño += 4;
            colorNodo = { background: '#E8E0D8', border: '#C5A059' };
        } else if (esInactivo) {
            etiqueta = "";
            if (esImportante) {
                colorNodo = { background: '#EDE8E2', border: '#D4C5A0' };
                tamaño = 14;
            } else {
                colorNodo = { background: '#F8F5F2', border: '#E8E0D8' };
                tamaño = 8;
            }
        } else if (esImportante) {
            colorNodo = { background: '#E8E0D8', border: '#C5A059' };
            tamaño = 18;
            borderWidth = 2;
        } else if (info.categoria === "Raiz") {
            colorNodo = { background: '#EDE8E2', border: '#C5A059' };
            tamaño = 24;
            borderWidth = 2;
        }
        if (!listadoNodos.get(nombre)) {
            listadoNodos.add({
                id: nombre,
                label: etiqueta,
                color: colorNodo,
                size: tamaño,
                borderWidth: borderWidth,
                font: { color: fontColor, size: 12, face: 'Inter', bold: false }
            });
            if (info.categoria === "Navegador Web") {
                listadoConexiones.add({
                    id: "NW-" + nombre,
                    from: "🌐 Conexiones",
                    to: nombre,
                    color: { color: 'rgba(197,160,89,0.3)' },
                    width: 1
                });
            }
            if (info.categoria === "Programas/Apps") {
                listadoConexiones.add({
                    id: "PA-" + nombre,
                    from: "⚡ Caos",
                    to: nombre,
                    color: { color: 'rgba(197,160,89,0.3)' },
                    width: 1
                });
            }
            if (nombre === "🌐 Conexiones" || nombre === "⚡ Caos") {
                listadoConexiones.add({
                    id: "MA-" + nombre,
                    from: "🧠 Cerebro",
                    to: nombre,
                    color: { color: 'rgba(197,160,89,0.4)' },
                    width: 1.5
                });
            }
        } else {
            listadoNodos.update({
                id: nombre,
                label: etiqueta,
                color: colorNodo,
                size: tamaño,
                borderWidth: borderWidth,
                font: { color: fontColor, size: 12, face: 'Inter', bold: false }
            });
        }
    });
    listadoConexiones.get().forEach(function(c) {
        var nodoOrigen = listadoNodos.get(c.from);
        var nodoDestino = listadoNodos.get(c.to);
        if (nodoOrigen && nodoDestino) {
            var colorLinea = 'rgba(197,160,89,0.2)';
            var anchoLinea = 1;
            if (c.from === nodoActivoActual || c.to === nodoActivoActual) {
                colorLinea = '#C5A059';
                anchoLinea = 2.5;
            } else if (nodoOrigen.label === "" && nodoDestino.label === "") {
                colorLinea = 'rgba(197,160,89,0.05)';
                anchoLinea = 0.5;
            } else if (c.from === "🧠 Cerebro" || c.to === "🧠 Cerebro") {
                colorLinea = 'rgba(197,160,89,0.35)';
                anchoLinea = 1.8;
            } else if (c.from === "🌐 Conexiones" || c.to === "🌐 Conexiones" || c.from === "⚡ Caos" || c.to === "⚡ Caos") {
                colorLinea = 'rgba(197,160,89,0.25)';
                anchoLinea = 1.2;
            }
            listadoConexiones.update({
                id: c.id,
                color: { color: colorLinea, highlight: '#C5A059' },
                width: anchoLinea,
                smooth: { type: 'continuous', roundness: 0.5 }
            });
        }
    });
}

function mostrarNotificacion(tipo, mensaje, icono, distraccion) {
    var container = document.getElementById('notificaciones');
    var notif = document.createElement('div');
    notif.className = 'notificacion ' + (tipo === 'distraccion' ? 'distraccion' : 'importante');
    
    var rotacion = (Math.random() - 0.5) * 4;
    notif.style.transform = 'rotate(' + rotacion + 'deg)';
    
    notif.innerHTML = `
        <div class="notif-header">
            <span class="icono">${icono || '🔔'}</span>
            <span>${tipo === 'distraccion' ? '⚠️ Distracción' : '📌 Nueva tarea'}</span>
            <span class="badge">${tipo === 'distraccion' ? 'Interrupción' : 'Actividad'}</span>
        </div>
        <div class="notif-body">${mensaje}</div>
        <div class="notif-tiempo">ahora</div>
    `;
    container.appendChild(notif);
    if (tipo === 'distraccion' && distraccion) {
        var intensidad = distraccion.peso || 1;
        ejecutarComportamientoNotificacion(distraccion.tipo, intensidad);
    }
    setTimeout(function() {
        notif.style.opacity = '0';
        notif.style.transform = 'translateX(30px) rotate(' + (rotacion + 5) + 'deg)';
        notif.style.transition = 'all 0.5s ease';
        setTimeout(function() {
            if (notif.parentNode) notif.remove();
        }, 500);
    }, 6000 + Math.random() * 2000);
    
    while (container.children.length > 15) {
        container.firstChild.remove();
    }
}

var textoHolzerInterval = null;

function mostrarTextoHolzer() {
    var el = document.getElementById('textoHolzer');
    var idx = Math.floor(Math.random() * textosHolzer.length);
    var texto = textosHolzer[idx];
    var x = 5 + Math.random() * 90;
    var y = 5 + Math.random() * 90;
    el.style.left = x + '%';
    el.style.top = y + '%';
    el.textContent = '"' + texto + '"';
    el.classList.add('activo');
    setTimeout(function() {
        el.classList.remove('activo');
    }, 5000 + Math.random() * 2000);
}

function agregarActividad(nombre, categoria, esPrincipal) {
    var ahora = Date.now() / 1000;
    estado_sistema.historial[nombre] = {
        categoria: categoria,
        ultimo_visto: ahora
    };
    if (esPrincipal) {
        estado_sistema.tareas_activas.push(nombre);
        estadisticas.totalActividades++;
    }
    var idConexion = "con-" + nombre;
    if (!listadoConexiones.get(idConexion)) {
        var baseDestino = ["🧠 Cerebro", "💡 Plasticidad", "🌐 Conexiones", "⚡ Caos"][Math.floor(Math.random() * 4)];
        listadoConexiones.add({
            id: idConexion,
            from: nombre,
            to: baseDestino,
            color: { color: 'rgba(197,160,89,0.3)' }
        });
    }
    estado_sistema.tareas_activas.forEach(function(tarea) {
        if (tarea !== nombre && Math.random() < 0.6) {
            var id = "multi-" + nombre + "-" + tarea;
            if (!listadoConexiones.get(id)) {
                listadoConexiones.add({
                    id: id,
                    from: nombre,
                    to: tarea,
                    color: { color: 'rgba(197,160,89,0.2)' },
                    dashes: Math.random() < 0.3
                });
            }
        }
    });
    estado_sistema.nodo_activo = nombre;
}

function abandonarActividad(nombre) {
    var ahora = Date.now() / 1000;
    estado_sistema.historial[nombre].ultimo_visto = ahora - 20;
    estado_sistema.tareas_activas = estado_sistema.tareas_activas.filter(function(t) {
        return t !== nombre;
    });
    estadisticas.totalAbandonadas++;
}

function seleccionarDistraccion() {
    var totalPeso = 0;
    distracciones.forEach(function(d) {
        totalPeso += d.peso;
    });
    var random = Math.random() * totalPeso;
    var acumulado = 0;
    for (var i = 0; i < distracciones.length; i++) {
        acumulado += distracciones[i].peso;
        if (random <= acumulado) {
            return distracciones[i];
        }
    }
    return distracciones[0];
}

function generarTareaAleatoria() {
    var keys = Object.keys(actividades);
    var key = keys[Math.floor(Math.random() * keys.length)];
    var actividad = actividades[key];
    var sub = actividad.subactividades[Math.floor(Math.random() * actividad.subactividades.length)];
    var nombre = sub + " " + (++contadorNodos);
    var categoria = actividad.categoria;
    return { nombre: nombre, categoria: categoria, padre: key };
}

// ============================================
// FRAGMENTACIÓN CEREBRAL - ANÁLISIS DINÁMICO
// ============================================
function calcularFragmentacionCerebral() {
    var categorias = {
        'productividad': 0,
        'social': 0,
        'entretenimiento': 0,
        'distraccion': 0,
        'estudio': 0,
        'trabajo': 0,
        'caos': 0,
        'otro': 0
    };
    
    var totalPeso = 0;
    var ahora = Date.now() / 1000;
    var tareasActivas = estado_sistema.tareas_activas;
    var historial = estado_sistema.historial;
    
    tareasActivas.forEach(function(tarea) {
        var info = historial[tarea];
        if (!info) return;
        var peso = 1;
        var tiempoActivo = ahora - info.ultimo_visto;
        if (tiempoActivo < 5) peso = 3;
        else if (tiempoActivo < 15) peso = 2;
        else peso = 1;
        
        var categoria = info.categoria || 'otro';
        var nombreLower = tarea.toLowerCase();
        if (categoria === 'Programas/Apps' || categoria === 'Navegador Web') {
            if (nombreLower.includes('whatsapp') || nombreLower.includes('slack') || 
                nombreLower.includes('twitter') || nombreLower.includes('instagram') ||
                nombreLower.includes('facebook') || nombreLower.includes('social')) {
                categorias.social += peso;
            } else if (nombreLower.includes('youtube') || nombreLower.includes('netflix') || 
                       nombreLower.includes('spotify') || nombreLower.includes('steam') ||
                       nombreLower.includes('epic') || nombreLower.includes('twitch') ||
                       nombreLower.includes('entretenimiento') || nombreLower.includes('juego')) {
                categorias.entretenimiento += peso;
            } else if (nombreLower.includes('gmail') || nombreLower.includes('calendar') || 
                       nombreLower.includes('jira') || nombreLower.includes('zoom') ||
                       nombreLower.includes('teams') || nombreLower.includes('trabajo')) {
                categorias.trabajo += peso;
            } else if (nombreLower.includes('moodle') || nombreLower.includes('google scholar') || 
                       nombreLower.includes('investigación') || nombreLower.includes('estudio') ||
                       nombreLower.includes('docs') || nombreLower.includes('sheets')) {
                categorias.estudio += peso;
            } else if (nombreLower.includes('figma') || nombreLower.includes('autocad') || 
                       nombreLower.includes('photoshop') || nombreLower.includes('premiere') ||
                       nombreLower.includes('diseño')) {
                categorias.productividad += peso;
            } else {
                categorias.productividad += peso * 0.5;
                categorias.otro += peso * 0.5;
            }
        } else {
            categorias.otro += peso;
        }
        totalPeso += peso;
    });
    
    var notificaciones = document.getElementById('notificaciones').children;
    var distraccionesRecientes = 0;
    for (var i = 0; i < Math.min(notificaciones.length, 10); i++) {
        var notif = notificaciones[i];
        if (notif && notif.classList && notif.classList.contains('distraccion')) {
            distraccionesRecientes++;
        }
    }
    categorias.distraccion = distraccionesRecientes * 2;
    totalPeso += categorias.distraccion;
    
    var caosBase = estadisticas.totalCambios * 0.5 + estadisticas.totalAbandonadas * 1.5;
    categorias.caos = Math.min(caosBase, 30);
    totalPeso += categorias.caos;
    
    if (estadisticas.totalAbandonadas > 0) {
        categorias.productividad = Math.max(0, categorias.productividad - estadisticas.totalAbandonadas * 2);
        categorias.distraccion += estadisticas.totalAbandonadas * 0.5;
    }
    
    var total = 0;
    for (var key in categorias) {
        total += categorias[key];
    }
    if (total === 0) {
        return {
            productividad: 70,
            estudio: 20,
            social: 5,
            otro: 5,
            total: 100
        };
    }
    
    var resultado = {};
    for (var key in categorias) {
        resultado[key] = Math.round((categorias[key] / total) * 100);
    }
    
    var suma = 0;
    for (var key in resultado) {
        suma += resultado[key];
    }
    if (suma !== 100 && suma > 0) {
        var diff = 100 - suma;
        var maxKey = Object.keys(resultado).reduce(function(a, b) {
            return resultado[a] > resultado[b] ? a : b;
        });
        resultado[maxKey] = Math.max(0, resultado[maxKey] + diff);
    }
    
    if (tareasActivas.length === 0) {
        resultado.productividad = 40;
        resultado.estudio = 30;
        resultado.social = 10;
        resultado.otro = 20;
    }
    
    return resultado;
}

function actualizarMetricasFragmentacion() {
    var fragmentacion = calcularFragmentacionCerebral();
    var totalActivas = estado_sistema.tareas_activas.length;
    
    var container = document.getElementById('metricasArte');
    if (!container) return;
    
    var html = `
        <div class="titulo-fragmentacion">🧩 Fragmentación Cerebral</div>
    `;
    
    var categoriasMostrar = [
        { key: 'productividad', label: '🧠 Productividad', color: 'productividad' },
        { key: 'trabajo', label: '💼 Trabajo', color: 'trabajo' },
        { key: 'estudio', label: '📚 Estudio', color: 'estudio' },
        { key: 'social', label: '📱 Social Media', color: 'social' },
        { key: 'entretenimiento', label: '🎮 Entretenimiento', color: 'entretenimiento' },
        { key: 'distraccion', label: '⚠️ Distracción', color: 'distraccion' },
        { key: 'caos', label: '💥 Caos', color: 'caos' },
        { key: 'otro', label: '❓ Otro', color: 'otro' }
    ];
    
    var tieneDatos = false;
    categoriasMostrar.forEach(function(cat) {
        var valor = fragmentacion[cat.key] || 0;
        if (valor > 0) {
            tieneDatos = true;
            html += `
                <div class="metrica-arte">
                    <span class="label">${cat.label}</span>
                    <div class="barra-arte">
                        <div class="fill ${cat.color}" style="width: ${valor}%;"></div>
                    </div>
                    <span class="valor">${valor}%</span>
                </div>
            `;
        }
    });
    
    if (!tieneDatos || totalActivas === 0) {
        html = `
            <div class="titulo-fragmentacion">🧘 Cerebro en Reposo</div>
            <div class="metrica-arte">
                <span class="label">🧠 Enfoque</span>
                <div class="barra-arte">
                    <div class="fill productividad" style="width: 100%;"></div>
                </div>
                <span class="valor">100%</span>
            </div>
        `;
    }
    
    var estadoCerebro = '';
    if (totalActivas === 0) {
        estadoCerebro = '🧘 En reposo';
    } else if (fragmentacion.caos > 30 || fragmentacion.distraccion > 25) {
        estadoCerebro = '💀 Colapso inminente';
    } else if (fragmentacion.caos > 15 || fragmentacion.distraccion > 15) {
        estadoCerebro = '🌀 Fragmentado';
    } else if (totalActivas > 3) {
        estadoCerebro = '⚡ Multitarea activa';
    } else {
        estadoCerebro = '🎯 Enfoque parcial';
    }
    
    var categoriasActivas = [];
    for (var key in fragmentacion) {
        if (fragmentacion[key] > 10) {
            categoriasActivas.push(key);
        }
    }
    
    html += `
        <div id="fragmentacionDetalle">
            <span>${estadoCerebro}</span>
            ${categoriasActivas.length > 0 ? '· ' + categoriasActivas.length + ' áreas activas' : ''}
            ${totalActivas > 0 ? '· ' + totalActivas + ' tareas' : ''}
        </div>
    `;
    
    container.innerHTML = html;
}

function simularActividad() {
    var ahora = Date.now() / 1000;
    var elapsed = (Date.now() - tiempoInicio) / 1000;
    var mins = Math.floor(elapsed / 60);
    var secs = Math.floor(elapsed % 60);
    document.getElementById('timerDisplay').textContent =
        String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
    if (elapsed >= DURACION_TOTAL) {
        document.getElementById('colapsoModal').classList.add('visible');
        document.getElementById('estadoDisplay').textContent = '💀 Colapso';
        document.getElementById('totalActividades').textContent = estadisticas.totalActividades;
        document.getElementById('totalAbandonadas').textContent = estadisticas.totalAbandonadas;
        document.getElementById('totalCambios').textContent = estadisticas.totalCambios;
        simulacionActiva = false;
        if (intervaloSimulacion) clearInterval(intervaloSimulacion);
        if (textoHolzerInterval) clearInterval(textoHolzerInterval);
        return;
    }
    faseActual = Math.floor(elapsed / 20);
    var tareasActivas = estado_sistema.tareas_activas.length;
    document.getElementById('tareasActivas').textContent = tareasActivas + ' activas';
    document.getElementById('faseDisplay').textContent = 'Fase ' + (faseActual + 1) + '/6';
    actualizarPersonajePorEstado(faseActual, tareasActivas);
    
    var probTarea = 0.15 + (faseActual * 0.03);
    var probDistraccion = 0.12 + (faseActual * 0.04);
    var probAbandono = 0.05 + (faseActual * 0.03);
    
    if (Math.random() < probTarea && tareasActivas < 12) {
        var tarea = generarTareaAleatoria();
        agregarActividad(tarea.nombre, tarea.categoria, true);
        mostrarNotificacion('importante', 'Nueva tarea: ' + tarea.nombre, '📌');
        
        if (Math.random() < 0.4) {
            var subTarea = generarTareaAleatoria();
            agregarActividad(subTarea.nombre, subTarea.categoria, true);
            listadoConexiones.add({
                id: "sub-" + subTarea.nombre,
                from: tarea.nombre,
                to: subTarea.nombre,
                color: { color: 'rgba(197,160,89,0.3)' }
            });
            mostrarNotificacion('importante', 'Sub-tarea: ' + subTarea.nombre, '📎');
        }
    }
    
    if (Math.random() < probDistraccion) {
        var dist = seleccionarDistraccion();
        mostrarNotificacion('distraccion', dist.mensaje, dist.icono, dist);
        estadisticas.totalCambios++;
        
        if (Math.random() < 0.3) {
            setTimeout(function() {
                var dist2 = seleccionarDistraccion();
                mostrarNotificacion('distraccion', dist2.mensaje, dist2.icono, dist2);
                estadisticas.totalCambios++;
            }, 500 + Math.random() * 1000);
        }
    }
    
    if (Math.random() < probAbandono && estado_sistema.tareas_activas.length > 1) {
        var activas = estado_sistema.tareas_activas;
        var idx = Math.floor(Math.random() * activas.length);
        var tareaAbandonar = activas[idx];
        if (tareaAbandonar && tareaAbandonar !== "🧠 Cerebro") {
            abandonarActividad(tareaAbandonar);
            mostrarNotificacion('distraccion', '❌ Abandonada: ' + tareaAbandonar, '❌');
        }
    }
    
    var caosNivel = Math.min(100, (tareasActivas * 8) + (estadisticas.totalCambios * 2) + (faseActual * 5));
    if (caosNivel > 60) {
        document.getElementById('estadoDisplay').textContent = '🔴 Caos';
    } else if (caosNivel > 30) {
        document.getElementById('estadoDisplay').textContent = '🟡 Sobrecarga';
    } else {
        document.getElementById('estadoDisplay').textContent = '🟢 Enfoque';
    }
    
    actualizarMetricasFragmentacion();
    
    var plasticidad = Math.max(0, 100 - (estadisticas.totalAbandonadas * 5) - (tareasActivas * 3) - (faseActual * 4));
    var desorden = Math.min(100, (tareasActivas * 10) + (estadisticas.totalAbandonadas * 4) + (faseActual * 6) + (estadisticas.totalCambios * 1.5));
    var atencion = Math.max(0, 100 - (faseActual * 12) - (estadisticas.totalAbandonadas * 4) - (tareasActivas * 2) - (estadisticas.totalCambios * 0.5));
    
    document.getElementById('plasticidadFill') && (document.getElementById('plasticidadFill').style.width = plasticidad + '%');
    document.getElementById('desordenFill') && (document.getElementById('desordenFill').style.width = desorden + '%');
    document.getElementById('atencionFill') && (document.getElementById('atencionFill').style.width = atencion + '%');
    
    actualizarGrafo();
    
    if (Math.random() < 0.06 + (faseActual * 0.01)) {
        mostrarTextoHolzer();
    }
}

function iniciarExperiencia() {
    document.getElementById('overlayInicial').classList.add('oculto');
    initParticulas();
    listadoNodos.clear();
    listadoConexiones.clear();
    estado_sistema.historial = {};
    estado_sistema.tareas_activas = [];
    contadorNodos = 0;
    estadisticas = {
        totalActividades: 0,
        totalAbandonadas: 0,
        totalCambios: 0
    };
    animacionPersonaje.modo = 'sentado';
    animacionPersonaje.frameActual = 0;
    animacionPersonaje.direccion = 1;
    animacionPersonaje.repeticionesCel3 = 0;
    animacionPersonaje.repeticionesUltimo = 0;
    animacionPersonaje.ultimoCambio = Date.now();
    animacionPersonaje.tiempoAlternancia = 0;
    animacionPersonaje.animacionActiva = true;
    animacionPersonaje.pausa = false;
    animacionPersonaje.velocidadActual = animacionPersonaje.velocidadBase;
    var img = document.getElementById('personajeImg');
    if (img) img.src = 'imagen/sent1.avif';
    
    nodosBase.forEach(function(n) {
        estado_sistema.historial[n] = { categoria: "Raiz", ultimo_visto: Date.now() / 1000 };
        listadoNodos.add({
            id: n,
            label: n,
            color: { background: '#EDE8E2', border: '#C5A059' },
            size: n === "🧠 Cerebro" ? 30 : 22,
            borderWidth: 2,
            font: { color: '#1B3022', size: 14, face: 'Inter', bold: true }
        });
    });
    
    listadoConexiones.add({ id: "c1", from: "🧠 Cerebro", to: "💡 Plasticidad", color: { color: 'rgba(197,160,89,0.4)' }, width: 2 });
    listadoConexiones.add({ id: "c2", from: "🧠 Cerebro", to: "🧬 Sinapsis", color: { color: 'rgba(197,160,89,0.4)' }, width: 2 });
    listadoConexiones.add({ id: "c3", from: "🧠 Cerebro", to: "🌐 Conexiones", color: { color: 'rgba(197,160,89,0.4)' }, width: 2 });
    listadoConexiones.add({ id: "c4", from: "🧠 Cerebro", to: "⚡ Caos", color: { color: 'rgba(197,160,89,0.4)' }, width: 2 });
    listadoConexiones.add({ id: "c5", from: "💡 Plasticidad", to: "🧬 Sinapsis", color: { color: 'rgba(197,160,89,0.2)' }, width: 1 });
    listadoConexiones.add({ id: "c6", from: "🌐 Conexiones", to: "⚡ Caos", color: { color: 'rgba(197,160,89,0.2)' }, width: 1 });
    
    tiempoInicio = Date.now();
    simulacionActiva = true;
    if (intervaloSimulacion) clearInterval(intervaloSimulacion);
    intervaloSimulacion = setInterval(function() {
        if (simulacionActiva) {
            simularActividad();
            actualizarPersonaje(Date.now());
        }
    }, 300);
    if (textoHolzerInterval) clearInterval(textoHolzerInterval);
    textoHolzerInterval = setInterval(mostrarTextoHolzer, 8000);
    setTimeout(actualizarGrafo, 100);
}

function reiniciarExperiencia() {
    simulacionActiva = false;
    if (intervaloSimulacion) {
        clearInterval(intervaloSimulacion);
        intervaloSimulacion = null;
    }
    if (textoHolzerInterval) {
        clearInterval(textoHolzerInterval);
        textoHolzerInterval = null;
    }
    listadoNodos.clear();
    listadoConexiones.clear();
    estado_sistema.historial = {};
    estado_sistema.tareas_activas = [];
    document.getElementById('colapsoModal').classList.remove('visible');
    document.getElementById('overlayInicial').classList.remove('oculto');
    document.getElementById('notificaciones').innerHTML = '';
    document.getElementById('timerDisplay').textContent = '00:00';
    document.getElementById('estadoDisplay').textContent = '🟢 Estable';
    document.getElementById('faseDisplay').textContent = 'Fase 1/6';
    document.getElementById('tareasActivas').textContent = '0 activas';
    
    // Reiniciar métricas de fragmentación
    actualizarMetricasFragmentacion();
    
    var el = document.getElementById('textoHolzer');
    el.classList.remove('activo');
    el.textContent = '';
    animacionPersonaje.modo = 'sentado';
    animacionPersonaje.frameActual = 0;
    animacionPersonaje.direccion = 1;
    animacionPersonaje.repeticionesCel3 = 0;
    animacionPersonaje.repeticionesUltimo = 0;
    animacionPersonaje.ultimoCambio = Date.now();
    animacionPersonaje.tiempoAlternancia = 0;
    animacionPersonaje.animacionActiva = true;
    animacionPersonaje.pausa = false;
    animacionPersonaje.velocidadActual = animacionPersonaje.velocidadBase;
    var img = document.getElementById('personajeImg');
    if (img) img.src = 'imagen/sent1.avif';
}

window.onload = function() {
    inicializarGrafo();
    // Inicializar métricas de fragmentación
    actualizarMetricasFragmentacion();
};
