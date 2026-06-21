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
        subactividades: ["🔍 Google Scholar", "📄 Docs", "📊 Sheets", "📎 Drive"]
    },
    "🎨 Diseño": {
        categoria: "Programas/Apps",
        subactividades: ["🎨 Figma", "📐 AutoCAD", "🖌️ Photoshop", "📄 Docs"]
    },
    "💻 Programación": {
        categoria: "Programas/Apps",
        subactividades: ["🐍 VS Code", "📄 Docs", "🔍 Stack Overflow", "📊 Sheets"]
    },
    "📊 Análisis": {
        categoria: "Programas/Apps",
        subactividades: ["📊 Excel", "📊 Power BI", "📄 Docs", "🔍 Research"]
    },
    "🎓 Estudio": {
        categoria: "Programas/Apps",
        subactividades: ["📚 Moodle", "📄 Docs", "🔍 Google", "📎 Drive"]
    }
};

var distracciones = [
    { icono: "📱", mensaje: "WhatsApp: Mensaje de Juan", tipo: "whatsapp", peso: 1 },
    { icono: "📱", mensaje: "WhatsApp: Mensaje de María", tipo: "whatsapp", peso: 1 },
    { icono: "🐦", mensaje: "Twitter: Nueva notificación", tipo: "twitter", peso: 1 },
    { icono: "📧", mensaje: "Gmail: Correo importante del cliente", tipo: "gmail", peso: 2 },
    { icono: "📧", mensaje: "Gmail: Oferta de trabajo", tipo: "gmail", peso: 3 },
    { icono: "📸", mensaje: "Instagram: Nueva foto etiquetada", tipo: "twitter", peso: 1 },
    { icono: "💬", mensaje: "Slack: Mensaje del equipo", tipo: "slack", peso: 2 },
    { icono: "💬", mensaje: "Slack: Reunión urgente", tipo: "slack", peso: 3 },
    { icono: "📺", mensaje: "YouTube: Nuevo video recomendado", tipo: "youtube", peso: 2 },
    { icono: "📺", mensaje: "YouTube: Tutorial de tu interés", tipo: "youtube", peso: 3 },
    { icono: "🎵", mensaje: "Spotify: Canción sugerida", tipo: "twitter", peso: 1 },
    { icono: "📰", mensaje: "Noticias: Alerta informativa", tipo: "twitter", peso: 1 }
];

var listadoNodos = new vis.DataSet([]);
var listadoConexiones = new vis.DataSet([]);
var red = null;

var estado_sistema = {
    nodo_activo: "",
    historial: {},
    tareas_activas: []
};

var nodosBase = ["🧠 Cerebro", "💡 Plasticidad", "🧬 Sinapsis"];

var particulas = [];
var canvas, ctx;

function initParticulas() {
    canvas = document.getElementById('canvasParticulas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (var i = 0; i < 80; i++) {
        particulas.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.3 + 0.1
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
            if (dist < 150) {
                ctx.beginPath();
                ctx.moveTo(particulas[i].x, particulas[i].y);
                ctx.lineTo(particulas[j].x, particulas[j].y);
                ctx.strokeStyle = 'rgba(197,160,89,' + (0.05 * (1 - dist/150)) + ')';
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
                size: 13,
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
            smooth: { type: 'continuous', roundness: 0.3 },
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
                gravitationalConstant: -50,
                centralGravity: 0.01,
                springLength: 100,
                springConstant: 0.08,
                damping: 0.4
            },
            stabilization: { iterations: 100 }
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
        var esInactivo = tiempoInactivo > 25 && info.categoria !== "Raiz";
        var esImportante = (contadorConexiones[nombre] || 0) > 4 && info.categoria !== "Raiz";
        var colorNodo = { background: '#F5F0EB', border: '#C5A059' };
        var tamaño = nombre === "🧠 Cerebro" ? 30 : (info.categoria === "Raiz" ? 24 : 14);
        var borderWidth = 1.5;
        var etiqueta = nombre;
        var fontColor = '#1B3022';
        if (nombre === nodoActivoActual) {
            borderWidth = 2.5;
            tamaño += 3;
            colorNodo = { background: '#E8E0D8', border: '#C5A059' };
        } else if (esInactivo) {
            etiqueta = "";
            if (esImportante) {
                colorNodo = { background: '#EDE8E2', border: '#D4C5A0' };
                tamaño = 16;
            } else {
                colorNodo = { background: '#F8F5F2', border: '#E8E0D8' };
                tamaño = 10;
            }
        } else if (esImportante) {
            colorNodo = { background: '#E8E0D8', border: '#C5A059' };
            tamaño = 18;
            borderWidth = 2;
        } else if (info.categoria === "Raiz") {
            colorNodo = { background: '#EDE8E2', border: '#C5A059' };
            tamaño = 26;
            borderWidth = 2;
        }
        if (!listadoNodos.get(nombre)) {
            listadoNodos.add({
                id: nombre,
                label: etiqueta,
                color: colorNodo,
                size: tamaño,
                borderWidth: borderWidth,
                font: { color: fontColor, size: 13, face: 'Inter', bold: false }
            });
            if (info.categoria === "Navegador Web") {
                listadoConexiones.add({
                    id: "NW-" + nombre,
                    from: "Navegador Web",
                    to: nombre,
                    color: { color: 'rgba(197,160,89,0.4)' },
                    width: 1.5
                });
            }
            if (info.categoria === "Programas/Apps") {
                listadoConexiones.add({
                    id: "PA-" + nombre,
                    from: "Programas/Apps",
                    to: nombre,
                    color: { color: 'rgba(197,160,89,0.4)' },
                    width: 1.5
                });
            }
            if (nombre === "Navegador Web" || nombre === "Programas/Apps") {
                listadoConexiones.add({
                    id: "MA-" + nombre,
                    from: "🧠 Cerebro",
                    to: nombre,
                    color: { color: 'rgba(197,160,89,0.5)' },
                    width: 2
                });
            }
        } else {
            listadoNodos.update({
                id: nombre,
                label: etiqueta,
                color: colorNodo,
                size: tamaño,
                borderWidth: borderWidth,
                font: { color: fontColor, size: 13, face: 'Inter', bold: false }
            });
        }
    });
    listadoConexiones.get().forEach(function(c) {
        var nodoOrigen = listadoNodos.get(c.from);
        var nodoDestino = listadoNodos.get(c.to);
        if (nodoOrigen && nodoDestino) {
            var colorLinea = 'rgba(197,160,89,0.25)';
            var anchoLinea = 1.5;
            if (c.from === nodoActivoActual || c.to === nodoActivoActual) {
                colorLinea = '#C5A059';
                anchoLinea = 2.5;
            } else if (nodoOrigen.label === "" && nodoDestino.label === "") {
                colorLinea = 'rgba(197,160,89,0.08)';
                anchoLinea = 0.8;
            } else if (c.from === "🧠 Cerebro" || c.to === "🧠 Cerebro") {
                colorLinea = 'rgba(197,160,89,0.4)';
                anchoLinea = 2;
            }
            listadoConexiones.update({
                id: c.id,
                color: { color: colorLinea, highlight: '#C5A059' },
                width: anchoLinea,
                smooth: { type: 'continuous', roundness: 0.3 }
            });
        }
    });
}

function mostrarNotificacion(tipo, mensaje, icono, distraccion) {
    var container = document.getElementById('notificaciones');
    var notif = document.createElement('div');
    notif.className = 'notificacion ' + (tipo === 'distraccion' ? 'distraccion' : 'importante');
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
        notif.style.transform = 'translateX(50px)';
        setTimeout(function() {
            if (notif.parentNode) notif.remove();
        }, 500);
    }, 6000);
    while (container.children.length > 5) {
        container.firstChild.remove();
    }
}

var textoHolzerInterval = null;

function mostrarTextoHolzer() {
    var el = document.getElementById('textoHolzer');
    var idx = Math.floor(Math.random() * textosHolzer.length);
    var texto = textosHolzer[idx];
    var x = 5 + Math.random() * 80;
    var y = 10 + Math.random() * 70;
    el.style.left = x + '%';
    el.style.top = y + '%';
    el.textContent = '"' + texto + '"';
    el.classList.add('activo');
    setTimeout(function() {
        el.classList.remove('activo');
    }, 5000);
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
        listadoConexiones.add({
            id: idConexion,
            from: nombre,
            to: "🧠 Cerebro",
            color: { color: 'rgba(197,160,89,0.5)' }
        });
    }
    estado_sistema.tareas_activas.forEach(function(tarea) {
        if (tarea !== nombre) {
            var id = "multi-" + nombre + "-" + tarea;
            if (!listadoConexiones.get(id)) {
                listadoConexiones.add({
                    id: id,
                    from: nombre,
                    to: tarea,
                    color: { color: 'rgba(197,160,89,0.3)' },
                    dashes: true
                });
            }
        }
    });
    estado_sistema.nodo_activo = nombre;
}

function abandonarActividad(nombre) {
    var ahora = Date.now() / 1000;
    estado_sistema.historial[nombre].ultimo_visto = ahora - 30;
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
    switch(faseActual) {
        case 0:
            if (elapsed < 3) {
                var actividad = "📝 Investigación";
                agregarActividad(actividad + " 1", "Programas/Apps", true);
                mostrarNotificacion('importante', 'Comenzaste: Investigación', '📝');
                mostrarTextoHolzer();
                document.getElementById('estadoDisplay').textContent = '🟢 Enfoque';
            }
            if (elapsed > 5 && elapsed < 8) {
                var subs = actividades["📝 Investigación"].subactividades;
                var sub = subs[Math.floor(Math.random() * subs.length)];
                var nombreSub = sub + " " + (++contadorNodos);
                estado_sistema.historial[nombreSub] = {
                    categoria: "Programas/Apps",
                    ultimo_visto: ahora
                };
                listadoConexiones.add({
                    id: "sub-" + nombreSub,
                    from: "📝 Investigación 1",
                    to: nombreSub,
                    color: { color: 'rgba(197,160,89,0.4)' }
                });
            }
            break;
        case 1:
            if (elapsed > 22 && elapsed < 24) {
                var dist = seleccionarDistraccion();
                mostrarNotificacion('distraccion', dist.mensaje, dist.icono, dist);
                estadisticas.totalCambios++;
                document.getElementById('estadoDisplay').textContent = '🟡 Distraído';
            }
            if (elapsed > 26 && elapsed < 28) {
                var nuevaAct = "💬 WhatsApp";
                agregarActividad(nuevaAct + " 1", "Programas/Apps", true);
                mostrarNotificacion('importante', 'Respondiendo WhatsApp', '💬');
                mostrarTextoHolzer();
            }
            break;
        case 2:
            if (elapsed > 42 && elapsed < 44) {
                var dist = seleccionarDistraccion();
                mostrarNotificacion('distraccion', dist.mensaje, dist.icono, dist);
                estadisticas.totalCambios++;
                document.getElementById('estadoDisplay').textContent = '🟡 Sobrecarga';
            }
            if (elapsed > 46 && elapsed < 48) {
                var nuevaAct = "📧 Gmail";
                agregarActividad(nuevaAct + " 1", "Navegador Web", true);
                mostrarNotificacion('importante', 'Revisando correo', '📧');
                mostrarTextoHolzer();
            }
            break;
        case 3:
            if (elapsed > 62 && elapsed < 64) {
                var dist = seleccionarDistraccion();
                mostrarNotificacion('distraccion', dist.mensaje, dist.icono, dist);
                estadisticas.totalCambios++;
                document.getElementById('estadoDisplay').textContent = '🔴 Caos';
            }
            if (elapsed > 66 && elapsed < 68) {
                var nuevaAct = "📺 YouTube";
                agregarActividad(nuevaAct + " 1", "Navegador Web", true);
                mostrarNotificacion('importante', 'Viendo video tutorial', '📺');
                mostrarTextoHolzer();
            }
            if (elapsed > 72 && elapsed < 74) {
                abandonarActividad("📝 Investigación 1");
                mostrarNotificacion('distraccion', '⚠️ Investigación abandonada', '⚠️');
                document.getElementById('estadoDisplay').textContent = '🔴 Caos';
            }
            break;
        case 4:
            if (elapsed > 82 && elapsed < 84) {
                var dist = seleccionarDistraccion();
                mostrarNotificacion('distraccion', dist.mensaje, dist.icono, dist);
                estadisticas.totalCambios++;
            }
            if (elapsed > 86 && elapsed < 88) {
                var nuevaAct = "💬 Slack";
                agregarActividad(nuevaAct + " 1", "Programas/Apps", true);
                mostrarNotificacion('importante', 'Respondiendo en Slack', '💬');
                mostrarTextoHolzer();
            }
            if (elapsed > 92 && elapsed < 94) {
                var keys = Object.keys(estado_sistema.historial);
                var subs = keys.filter(function(k) {
                    return estado_sistema.historial[k].categoria !== "Raiz" &&
                           !estado_sistema.tareas_activas.includes(k) &&
                           estado_sistema.historial[k].ultimo_visto > ahora - 10;
                });
                if (subs.length > 0) {
                    var idx = Math.floor(Math.random() * subs.length);
                    estado_sistema.historial[subs[idx]].ultimo_visto = ahora - 30;
                }
            }
            break;
        case 5:
            document.getElementById('estadoDisplay').textContent = '💀 Colapso inminente';
            if (elapsed > 105 && elapsed < 107) {
                estado_sistema.tareas_activas.forEach(function(t) {
                    if (t !== "🧠 Cerebro") {
                        abandonarActividad(t);
                    }
                });
                var dist = seleccionarDistraccion();
                mostrarNotificacion('distraccion', '💀 Colapso neuronal', '💀', dist);
                mostrarTextoHolzer();
            }
            if (elapsed > 110) {
                var nodosLista = listadoNodos.get();
                nodosLista.forEach(function(n) {
                    if (n.id !== "🧠 Cerebro" && n.id !== "💡 Plasticidad" && n.id !== "🧬 Sinapsis") {
                        listadoNodos.update({
                            id: n.id,
                            size: 4,
                            opacity: 0.1,
                            label: ''
                        });
                    }
                });
            }
            break;
    }
    var totalNodos = Object.keys(estado_sistema.historial).filter(function(k) {
        return estado_sistema.historial[k].categoria !== "Raiz";
    }).length;
    var abandonados = Object.keys(estado_sistema.historial).filter(function(k) {
        var info = estado_sistema.historial[k];
        return info.categoria !== "Raiz" && (ahora - info.ultimo_visto) > 25;
    }).length;
    var plasticidad = Math.max(0, 100 - (abandonados * 6) - (tareasActivas * 4));
    var desorden = Math.min(100, (tareasActivas * 12) + (abandonados * 5) + (faseActual * 5));
    var atencion = Math.max(0, 100 - (faseActual * 15) - (abandonados * 3) - (tareasActivas * 2));
    document.getElementById('plasticidadFill').style.width = plasticidad + '%';
    document.getElementById('plasticidadFill').style.background = plasticidad > 50 ? '#43b581' : plasticidad > 25 ? '#faa61a' : '#ed4245';
    document.getElementById('plasticidadText').textContent = Math.round(plasticidad) + '%';
    document.getElementById('desordenFill').style.width = desorden + '%';
    document.getElementById('desordenFill').style.background = desorden > 70 ? '#ed4245' : desorden > 40 ? '#faa61a' : '#43b581';
    document.getElementById('desordenText').textContent = Math.round(desorden) + '%';
    document.getElementById('atencionFill').style.width = atencion + '%';
    document.getElementById('atencionFill').style.background = atencion > 50 ? '#43b581' : atencion > 25 ? '#faa61a' : '#ed4245';
    document.getElementById('atencionText').textContent = Math.round(atencion) + '%';
    actualizarGrafo();
    if (Math.random() < 0.04) {
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
            size: 26,
            borderWidth: 2,
            font: { color: '#1B3022', size: 14, face: 'Inter', bold: true }
        });
    });
    listadoConexiones.add({ id: "c1", from: "🧠 Cerebro", to: "💡 Plasticidad", color: { color: 'rgba(197,160,89,0.5)' }, width: 2 });
    listadoConexiones.add({ id: "c2", from: "🧠 Cerebro", to: "🧬 Sinapsis", color: { color: 'rgba(197,160,89,0.5)' }, width: 2 });
    listadoConexiones.add({ id: "c3", from: "💡 Plasticidad", to: "🧬 Sinapsis", color: { color: 'rgba(197,160,89,0.3)' }, width: 1.5 });
    tiempoInicio = Date.now();
    simulacionActiva = true;
    if (intervaloSimulacion) clearInterval(intervaloSimulacion);
    intervaloSimulacion = setInterval(function() {
        if (simulacionActiva) {
            simularActividad();
            actualizarPersonaje(Date.now());
        }
    }, 200);
    if (textoHolzerInterval) clearInterval(textoHolzerInterval);
    textoHolzerInterval = setInterval(mostrarTextoHolzer, 12000);
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
    document.getElementById('plasticidadFill').style.width = '100%';
    document.getElementById('plasticidadFill').style.background = '#43b581';
    document.getElementById('plasticidadText').textContent = '100%';
    document.getElementById('desordenFill').style.width = '0%';
    document.getElementById('desordenText').textContent = '0%';
    document.getElementById('atencionFill').style.width = '100%';
    document.getElementById('atencionFill').style.background = '#43b581';
    document.getElementById('atencionText').textContent = '100%';
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
};
