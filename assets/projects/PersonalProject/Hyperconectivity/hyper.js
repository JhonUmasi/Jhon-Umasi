// ============================================
// HYPER.JS - SISTEMA CON ESTADOS IRREVERSIBLES v14
// ============================================

var simulacionActiva = false;
var tiempoInicio = 0;
var tareasDB = [];
var tareasActivas = [];
var tareasCompletadas = [];
var tareasIncompletas = [];
var nodosDesconectados = [];
var totalCompletadas = 0;
var totalIncompletas = 0;
var totalDesconectados = 0;

var prioridadCategoria = {
    'Trabajo': 1.0,
    'Social': 1.0,
    'Aprendizaje': 1.0,
    'Entretenimiento': 1.0
};

var estadisticas = {
    totalCompletadas: 0,
    totalIncompletas: 0,
    totalDesconectados: 0
};

// ============================================
// CARGA DEL CSV
// ============================================
function cargarCSV() {
    console.log('Cargando CSV...');
    fetch('hyper.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el CSV');
            }
            return response.text();
        })
        .then(data => {
            var lineas = data.split('\n');
            var headers = lineas[0].split(',');
            tareasDB = [];
            for (var i = 1; i < lineas.length; i++) {
                if (lineas[i].trim() === '') continue;
                var valores = lineas[i].split(',');
                var tarea = {};
                for (var j = 0; j < headers.length; j++) {
                    tarea[headers[j].trim()] = valores[j] ? valores[j].trim() : '';
                }
                tarea.id = parseInt(tarea.id);
                tarea.clicks_necesarios = parseInt(tarea.clicks_necesarios);
                tarea.tiempo_limite = parseInt(tarea.tiempo_limite);
                tarea.prioridad_base = parseInt(tarea.prioridad_base);
                tarea.es_distractor = tarea.es_distractor === 'true';
                tareasDB.push(tarea);
            }
            console.log('CSV cargado correctamente:', tareasDB.length, 'tareas');
            if (simulacionActiva && tareasActivas.length === 0) {
                generarTareasIniciales();
            }
        })
        .catch(error => {
            console.error('Error cargando CSV:', error);
            cargarTareasRespaldo();
        });
}

function cargarTareasRespaldo() {
    console.log('Usando tareas de respaldo (no se encontró el CSV)');
    tareasDB = [
        { id: 1, tarea: 'Revisar Excel', descripcion: 'Balance mensual', categoria: 'Trabajo', clicks_necesarios: 8, tiempo_limite: 15, prioridad_base: 9, es_distractor: false },
        { id: 2, tarea: 'WhatsApp jefe', descripcion: 'Confirmar cambios', categoria: 'Trabajo', clicks_necesarios: 4, tiempo_limite: 12, prioridad_base: 8, es_distractor: false },
        { id: 3, tarea: 'WhatsApp amigo', descripcion: 'Invitación a cenar', categoria: 'Social', clicks_necesarios: 2, tiempo_limite: 8, prioridad_base: 3, es_distractor: true },
        { id: 4, tarea: 'Instagram', descripcion: 'Fotos de familia', categoria: 'Social', clicks_necesarios: 2, tiempo_limite: 6, prioridad_base: 2, es_distractor: true },
        { id: 5, tarea: 'YouTube tutorial', descripcion: 'Excel avanzado', categoria: 'Aprendizaje', clicks_necesarios: 5, tiempo_limite: 12, prioridad_base: 4, es_distractor: false },
        { id: 6, tarea: 'Slack equipo', descripcion: 'Mensajes en canales', categoria: 'Trabajo', clicks_necesarios: 4, tiempo_limite: 11, prioridad_base: 7, es_distractor: false },
        { id: 7, tarea: 'TikTok', descripcion: 'Videos virales', categoria: 'Entretenimiento', clicks_necesarios: 2, tiempo_limite: 5, prioridad_base: 1, es_distractor: true },
        { id: 8, tarea: 'Correos Gmail', descripcion: 'Responder pendientes', categoria: 'Trabajo', clicks_necesarios: 5, tiempo_limite: 14, prioridad_base: 7, es_distractor: false },
    ];
    if (simulacionActiva && tareasActivas.length === 0) {
        generarTareasIniciales();
    }
}

// ============================================
// ANIMACIÓN PERSONAJE
// ============================================
var animacionPersonaje = {
    frameActual: 0,
    direccion: 1,
    framesSentado: ['sent1.avif', 'sent2.avif', 'sent3.avif', 'sent4.avif'],
    framesCelular: ['cel1.avif', 'cel2.avif', 'cel3.avif'],
    velocidadBase: 400,
    velocidadActual: 400,
    ultimoCambio: 0,
    modo: 'sentado',
    animacionActiva: true
};

function actualizarPersonaje(tiempo) {
    if (!animacionPersonaje.animacionActiva) return;
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
                animacionPersonaje.direccion = -1;
                animacionPersonaje.frameActual = maxFrame - 1;
            } else if (animacionPersonaje.frameActual <= 0) {
                animacionPersonaje.direccion = 1;
                animacionPersonaje.frameActual = 1;
            }
            animacionPersonaje.frameActual = Math.max(0, Math.min(maxFrame, animacionPersonaje.frameActual));
            img.src = 'imagen/' + frames[Math.floor(animacionPersonaje.frameActual)];
        } else {
            var framesCel = animacionPersonaje.framesCelular;
            var maxCel = framesCel.length - 1;
            animacionPersonaje.frameActual += animacionPersonaje.direccion;
            if (animacionPersonaje.frameActual >= maxCel) {
                animacionPersonaje.direccion = -1;
                animacionPersonaje.frameActual = maxCel - 1;
            } else if (animacionPersonaje.frameActual <= 0) {
                animacionPersonaje.direccion = 1;
                animacionPersonaje.frameActual = 1;
            }
            animacionPersonaje.frameActual = Math.max(0, Math.min(maxCel, animacionPersonaje.frameActual));
            img.src = 'imagen/' + framesCel[Math.floor(animacionPersonaje.frameActual)];
        }
    }
}

function cambiarModoPersonaje(modo) {
    if (animacionPersonaje.modo === modo) return;
    animacionPersonaje.modo = modo;
    animacionPersonaje.frameActual = 0;
    animacionPersonaje.direccion = 1;
    animacionPersonaje.ultimoCambio = Date.now();
    var img = document.getElementById('personajeImg');
    if (img) {
        img.src = 'imagen/' + (modo === 'sentado' ? 'sent1.avif' : 'cel1.avif');
    }
}

// ============================================
// SISTEMA DE PRIORIDADES
// ============================================
function actualizarPrioridades() {
    var completadasRecientes = tareasCompletadas.slice(-5);
    var distractoresCompletados = completadasRecientes.filter(t => t.es_distractor).length;
    var trabajoCompletado = completadasRecientes.filter(t => t.categoria === 'Trabajo').length;
    var socialCompletado = completadasRecientes.filter(t => t.categoria === 'Social').length;
    
    prioridadCategoria['Trabajo'] = 1.0 + (trabajoCompletado * 0.3) - (distractoresCompletados * 0.1);
    prioridadCategoria['Social'] = 1.0 + (socialCompletado * 0.4) + (distractoresCompletados * 0.2);
    prioridadCategoria['Aprendizaje'] = 1.0 + (completadasRecientes.filter(t => t.categoria === 'Aprendizaje').length * 0.3);
    prioridadCategoria['Entretenimiento'] = 1.0 + (completadasRecientes.filter(t => t.categoria === 'Entretenimiento').length * 0.4) + (distractoresCompletados * 0.3);
    
    for (var cat in prioridadCategoria) {
        prioridadCategoria[cat] = Math.max(0.3, Math.min(2.5, prioridadCategoria[cat]));
    }
}

function generarTareaAleatoria() {
    if (tareasDB.length === 0) {
        console.warn('No hay tareas en la base de datos');
        return null;
    }
    
    actualizarPrioridades();
    
    var disponibles = tareasDB.filter(t => 
        !tareasActivas.some(a => a.id === t.id) && 
        !tareasCompletadas.some(c => c.id === t.id) &&
        !tareasIncompletas.some(i => i.id === t.id) &&
        !nodosDesconectados.some(d => d.id === t.id)
    );
    
    if (disponibles.length === 0) {
        console.log('No hay tareas disponibles');
        return null;
    }
    
    var tareasConPeso = disponibles.map(function(t) {
        var peso = t.prioridad_base * (prioridadCategoria[t.categoria] || 1.0);
        if (t.es_distractor) {
            var distractoresCompletados = tareasCompletadas.filter(tc => tc.es_distractor).length;
            peso = peso * (1 + (distractoresCompletados * 0.05));
        }
        return { tarea: t, peso: peso };
    });
    
    var totalPeso = tareasConPeso.reduce(function(sum, item) { return sum + item.peso; }, 0);
    if (totalPeso === 0) return null;
    
    var random = Math.random() * totalPeso;
    var acumulado = 0;
    
    for (var i = 0; i < tareasConPeso.length; i++) {
        acumulado += tareasConPeso[i].peso;
        if (random <= acumulado) {
            return tareasConPeso[i].tarea;
        }
    }
    return tareasConPeso[0] ? tareasConPeso[0].tarea : null;
}

// ============================================
// SISTEMA DE TAREAS
// ============================================
var listaTareasContainer = null;
var intervaloTiempo = null;

function agregarTarea(tareaDB) {
    if (!tareaDB) return;
    if (tareasActivas.some(t => t.id === tareaDB.id)) return;
    
    var nuevaTarea = {
        id: tareaDB.id,
        tarea: tareaDB.tarea,
        descripcion: tareaDB.descripcion,
        categoria: tareaDB.categoria,
        subcategoria: tareaDB.subcategoria || 'General',
        clicks_necesarios: tareaDB.clicks_necesarios,
        clicks_actuales: 0,
        tiempo_limite: tareaDB.tiempo_limite,
        tiempo_restante: tareaDB.tiempo_limite,
        prioridad: tareaDB.prioridad_base,
        estado: 'activa',
        es_distractor: tareaDB.es_distractor || false,
        iniciada: Date.now(),
        element: null
    };
    
    tareasActivas.push(nuevaTarea);
    
    var item = crearTareaElement(nuevaTarea);
    nuevaTarea.element = item;
    
    if (listaTareasContainer) {
        listaTareasContainer.appendChild(item);
        var placeholder = listaTareasContainer.querySelector('.placeholder-message');
        if (placeholder) placeholder.remove();
    }
    
    actualizarFragmentacionCerebro();
    
    var icono = nuevaTarea.es_distractor ? '🎯' : '📌';
    mostrarNotificacion(icono + ' ' + nuevaTarea.tarea + ' (' + nuevaTarea.clicks_necesarios + ' clicks, ' + nuevaTarea.tiempo_limite + 's)', 
                        nuevaTarea.es_distractor ? 'distractor' : '');
    
    cambiarModoPersonaje('celular');
    setTimeout(function() { cambiarModoPersonaje('sentado'); }, 800);
    
    document.getElementById('tareasActivas').textContent = tareasActivas.length + ' activas';
    actualizarMetricas();
}

function crearTareaElement(t) {
    var div = document.createElement('div');
    div.className = 'tarea-item';
    div.dataset.id = t.id;
    
    var icono = obtenerIconoCategoria(t.categoria);
    var clicksRestantes = t.clicks_necesarios - t.clicks_actuales;
    var progreso = (t.clicks_actuales / t.clicks_necesarios) * 100;
    var tiempoRestante = Math.ceil(t.tiempo_restante);
    
    var colorClase = 'verde';
    var tiempoColor = 'verde';
    if (tiempoRestante < 0) {
        tiempoColor = 'negativo';
        colorClase = 'rojo';
    } else if (tiempoRestante <= 3) {
        tiempoColor = 'rojo';
        colorClase = 'rojo';
    } else if (tiempoRestante <= 6) {
        tiempoColor = 'naranja';
        colorClase = 'naranja';
    }
    
    var distractorTag = t.es_distractor ? ' 🎯' : '';
    var tiempoTexto = tiempoRestante < 0 ? tiempoRestante + 's' : tiempoRestante + 's';
    
    div.innerHTML = `
        <div class="tarea-header">
            <span>${icono}</span>
            <span>${t.tarea}${distractorTag}</span>
            <span class="categoria">${t.categoria}</span>
            <span class="tiempo-restante ${tiempoColor}">${tiempoTexto}</span>
        </div>
        <div class="tarea-descripcion">${t.descripcion}</div>
        <div class="barra-progreso">
            <div class="fill-progreso ${colorClase}" style="width:${progreso}%;"></div>
        </div>
        <div class="clicks-info">
            <span>⬆ ${clicksRestantes} clicks restantes</span>
            ${t.es_distractor ? '<span style="color:#faa61a;">⚡ Fácil</span>' : ''}
        </div>
    `;
    
    div.addEventListener('click', function(e) {
        e.stopPropagation();
        if (t.estado === 'completada' || t.estado === 'incompleta' || t.estado === 'desconectado') return;
        procesarClickTarea(t.id);
    });
    
    return div;
}

function actualizarTareaElement(t) {
    if (!t.element) return;
    if (t.estado === 'completada' || t.estado === 'desconectado') return;
    
    var clicksRestantes = t.clicks_necesarios - t.clicks_actuales;
    var progreso = (t.clicks_actuales / t.clicks_necesarios) * 100;
    var tiempoRestante = Math.ceil(t.tiempo_restante);
    
    var colorClase = 'verde';
    var tiempoColor = 'verde';
    if (tiempoRestante < 0) {
        tiempoColor = 'negativo';
        colorClase = 'rojo';
    } else if (tiempoRestante <= 3) {
        tiempoColor = 'rojo';
        colorClase = 'rojo';
    } else if (tiempoRestante <= 6) {
        tiempoColor = 'naranja';
        colorClase = 'naranja';
    }
    
    var fill = t.element.querySelector('.fill-progreso');
    if (fill) {
        fill.style.width = progreso + '%';
        fill.className = 'fill-progreso ' + colorClase;
    }
    
    var tiempoSpan = t.element.querySelector('.tiempo-restante');
    if (tiempoSpan) {
        var tiempoTexto = tiempoRestante < 0 ? tiempoRestante + 's' : tiempoRestante + 's';
        tiempoSpan.textContent = tiempoTexto;
        tiempoSpan.className = 'tiempo-restante ' + tiempoColor;
    }
    
    var info = t.element.querySelector('.clicks-info');
    if (info) {
        info.innerHTML = `<span>⬆ ${clicksRestantes} clicks restantes</span>${t.es_distractor ? '<span style="color:#faa61a;">⚡ Fácil</span>' : ''}`;
    }
}

function procesarClickTarea(id) {
    var tarea = tareasActivas.find(t => t.id === id);
    if (!tarea || tarea.estado !== 'activa') return;
    
    tarea.clicks_actuales++;
    
    if (tarea.clicks_actuales >= tarea.clicks_necesarios) {
        completarTarea(id);
    } else {
        actualizarTareaElement(tarea);
        cambiarModoPersonaje('celular');
        setTimeout(function() { cambiarModoPersonaje('sentado'); }, 300);
    }
    
    actualizarMetricas();
}

function completarTarea(id) {
    var tarea = tareasActivas.find(t => t.id === id);
    if (!tarea || tarea.estado !== 'activa') return;
    
    tarea.estado = 'completada';
    tareasCompletadas.push(tarea);
    tareasActivas = tareasActivas.filter(t => t.id !== id);
    totalCompletadas++;
    estadisticas.totalCompletadas++;
    
    if (tarea.element) {
        tarea.element.classList.add('eliminando');
        setTimeout(function() {
            if (tarea.element && tarea.element.parentNode) {
                tarea.element.parentNode.removeChild(tarea.element);
            }
        }, 500);
    }
    
    mostrarNotificacion('✅ ' + tarea.tarea + ' completada', 'exito');
    cambiarModoPersonaje('sentado');
    
    document.getElementById('tareasActivas').textContent = tareasActivas.length + ' activas';
    actualizarFragmentacionCerebro();
    actualizarMetricas();
    
    mantenerMinimoTareas();
}

function moverAIncompleta(tarea) {
    if (!tarea || tarea.estado !== 'activa') return;
    
    tarea.estado = 'incompleta';
    tareasActivas = tareasActivas.filter(t => t.id !== tarea.id);
    tareasIncompletas.push(tarea);
    totalIncompletas++;
    estadisticas.totalIncompletas++;
    
    if (tarea.element) {
        tarea.element.classList.add('incompleta');
        var info = tarea.element.querySelector('.clicks-info');
        if (info) info.innerHTML = '⏳ ' + Math.ceil(tarea.tiempo_restante) + 's';
        var tiempo = tarea.element.querySelector('.tiempo-restante');
        if (tiempo) {
            tiempo.textContent = Math.ceil(tarea.tiempo_restante) + 's';
            tiempo.className = 'tiempo-restante negativo';
        }
        var fill = tarea.element.querySelector('.fill-progreso');
        if (fill) {
            fill.className = 'fill-progreso rojo';
        }
    }
    
    mostrarNotificacion('⏳ ' + tarea.tarea + ' - tiempo agotado (' + Math.ceil(tarea.tiempo_restante) + 's)', 'fallo');
    actualizarFragmentacionCerebro();
    actualizarMetricas();
}

function moverADesconectado(tarea) {
    if (!tarea) return;
    
    tarea.estado = 'desconectado';
    
    tareasActivas = tareasActivas.filter(t => t.id !== tarea.id);
    tareasIncompletas = tareasIncompletas.filter(t => t.id !== tarea.id);
    nodosDesconectados.push(tarea);
    totalDesconectados++;
    estadisticas.totalDesconectados++;
    
    if (tarea.element) {
        tarea.element.classList.add('incompleta');
        var info = tarea.element.querySelector('.clicks-info');
        if (info) info.innerHTML = '🌀 Desconectado - Divagando';
        var tiempo = tarea.element.querySelector('.tiempo-restante');
        if (tiempo) {
            tiempo.textContent = '🌀';
            tiempo.className = 'tiempo-restante negativo';
        }
        var fill = tarea.element.querySelector('.fill-progreso');
        if (fill) {
            fill.className = 'fill-progreso rojo';
        }
    }
    
    mostrarNotificacion('🌀 ' + tarea.tarea + ' - desconectado del sistema', 'fallo');
    actualizarFragmentacionCerebro();
    actualizarMetricas();
}

function mantenerMinimoTareas() {
    var activas = tareasActivas.filter(t => t.estado === 'activa').length;
    var necesarias = 4 - activas;
    
    if (necesarias > 0) {
        for (var i = 0; i < necesarias; i++) {
            setTimeout(function() {
                var nueva = generarTareaAleatoria();
                if (nueva) {
                    agregarTarea(nueva);
                }
            }, i * 1000 + 500);
        }
    }
    
    var incompletas = tareasIncompletas.length;
    if (incompletas > 2) {
        var caosExtra = Math.min(2, Math.floor(incompletas / 2));
        for (var j = 0; j < caosExtra; j++) {
            setTimeout(function() {
                var tarea = generarTareaAleatoria();
                if (tarea) {
                    agregarTarea(tarea);
                    mostrarNotificacion('💥 Caos! Nueva tarea urgente!', 'fallo');
                }
            }, j * 2000 + 1000 + 3000);
        }
    }
}

function mostrarMensajeEspera() {
    if (!listaTareasContainer) return;
    var mensaje = 'Esperando nuevas tareas...';
    if (tareasCompletadas.length > 0) {
        mensaje = '✅ ' + tareasCompletadas.length + ' completadas';
    }
    var div = document.createElement('div');
    div.className = 'placeholder-message';
    div.style.cssText = 'grid-column:1/-1;text-align:center;padding:30px 20px;color:var(--text-muted);font-size:13px;';
    div.innerHTML = '<i class="fas fa-brain" style="font-size:28px;display:block;margin-bottom:8px;opacity:0.3;"></i>' + mensaje;
    listaTareasContainer.appendChild(div);
}

// ============================================
// NOTIFICACIONES CON BORROSO PROGRESIVO
// ============================================
function mostrarNotificacion(mensaje, tipo) {
    var container = document.getElementById('notificaciones');
    if (!container) {
        var zona = document.getElementById('zonaNotificaciones');
        if (zona) {
            var div = document.createElement('div');
            div.id = 'notificaciones';
            zona.appendChild(div);
            container = div;
        }
    }
    if (!container) return;
    
    var notif = document.createElement('div');
    notif.className = 'notif-item';
    if (tipo === 'distractor') notif.classList.add('distractor');
    else if (tipo === 'exito') notif.classList.add('exito');
    else if (tipo === 'fallo') notif.classList.add('fallo');
    notif.textContent = mensaje;
    container.appendChild(notif);
    
    var plasticidad = calcularPlasticidad();
    aplicarNivelBorroso(notif, plasticidad);
    
    while (container.children.length > 3) {
        container.firstChild.remove();
    }
    
    setTimeout(function() {
        if (notif.parentNode) {
            notif.style.opacity = '0';
            notif.style.transform = 'translateX(-20px)';
            notif.style.transition = 'all 0.5s ease';
            setTimeout(function() {
                if (notif.parentNode) notif.remove();
            }, 500);
        }
    }, 4000);
}

function aplicarNivelBorroso(element, plasticidad) {
    element.classList.remove('blurred', 'very-blurred', 'extreme-blurred');
    
    if (plasticidad < 20) {
        element.classList.add('extreme-blurred');
    } else if (plasticidad < 40) {
        element.classList.add('very-blurred');
    } else if (plasticidad < 60) {
        element.classList.add('blurred');
    }
}

function obtenerIconoCategoria(categoria) {
    var icons = { 'Trabajo': '💼', 'Social': '📱', 'Aprendizaje': '📚', 'Entretenimiento': '🎮' };
    return icons[categoria] || '📌';
}

// ============================================
// MÉTRICAS
// ============================================
function calcularAtencion() {
    var activas = tareasActivas.filter(t => t.estado === 'activa').length;
    var completadas = tareasCompletadas.length;
    var incompletas = tareasIncompletas.length;
    var desconectados = nodosDesconectados.length;
    
    var base = 100;
    base -= activas * 2;
    base -= incompletas * 8;
    base -= desconectados * 6;
    base += completadas * 2;
    
    var trabajoCompletado = tareasCompletadas.filter(t => t.categoria === 'Trabajo').length;
    base += trabajoCompletado * 0.5;
    
    return Math.max(0, Math.min(100, base));
}

function calcularPlasticidad() {
    var activas = tareasActivas.filter(t => t.estado === 'activa').length;
    var completadas = tareasCompletadas.length;
    var incompletas = tareasIncompletas.length;
    var desconectados = nodosDesconectados.length;
    
    var base = 100;
    base -= activas * 1.5;
    base -= incompletas * 10;
    base -= desconectados * 8;
    base += completadas * 1.5;
    
    var distractoresCompletados = tareasCompletadas.filter(t => t.es_distractor).length;
    base -= distractoresCompletados * 3;
    
    return Math.max(0, Math.min(100, base));
}

function obtenerEstadoMental() {
    var atencion = calcularAtencion();
    var plasticidad = calcularPlasticidad();
    var desconectados = nodosDesconectados.length;
    
    if (atencion > 70 && plasticidad > 70) return '🧘 Enfoque total';
    if (atencion > 50 && plasticidad > 50) return '🎯 Atención parcial';
    if (atencion > 30 && plasticidad > 30) return '🌀 Fragmentado';
    if (atencion < 30 && plasticidad < 30 || desconectados > 3) return '💀 Colapso inminente';
    if (desconectados > 0) return '⚠️ ' + desconectados + ' nodos desconectados';
    return '📊 Procesando...';
}

function actualizarMetricas() {
    var atencion = calcularAtencion();
    var plasticidad = calcularPlasticidad();
    
    document.getElementById('atencionValor').textContent = Math.round(atencion) + '%';
    document.getElementById('plasticidadValor').textContent = Math.round(plasticidad) + '%';
    
    document.querySelector('.fill.atencion').style.width = atencion + '%';
    document.querySelector('.fill.plasticidad').style.width = plasticidad + '%';
    
    document.getElementById('estadoMental').textContent = obtenerEstadoMental();
    
    if (atencion < 30 || plasticidad < 30) {
        document.getElementById('estadoDisplay').textContent = '🔴 Colapso';
    } else if (atencion < 50 || plasticidad < 50) {
        document.getElementById('estadoDisplay').textContent = '🟡 Inestable';
    } else {
        document.getElementById('estadoDisplay').textContent = '🟢 Enfoque';
    }
    
    actualizarBorrosoNotificaciones(plasticidad);
    actualizarFragmentacionCerebro();
}

function actualizarBorrosoNotificaciones(plasticidad) {
    var notifs = document.querySelectorAll('#notificaciones .notif-item');
    notifs.forEach(function(el) {
        el.classList.remove('blurred', 'very-blurred', 'extreme-blurred');
        if (plasticidad < 20) {
            el.classList.add('extreme-blurred');
        } else if (plasticidad < 40) {
            el.classList.add('very-blurred');
        } else if (plasticidad < 60) {
            el.classList.add('blurred');
        }
    });
}

// ============================================
// CEREBRO FRAGMENTADO - Panel Derecho
// ============================================
var brainPieces = [];
var brainTime = 0;
var brainImageReady = false;
var brainCanvas, brainCtx;
var brainImage = new Image();
var brainFragmentSize = 20;
var brainDispersionForce = 2.8;
var brainGlobalSpeed = 0.0025;
var brainTargetDispersion = 0;
var brainCurrentDispersion = 0;
var brainPiecesOriginal = [];

function inicializarCerebro() {
    brainCanvas = document.getElementById('brainCanvas');
    if (!brainCanvas) return;
    brainCtx = brainCanvas.getContext('2d');
    
    brainImage.src = 'imagen/cabeza.png';
    brainImage.onload = function() {
        brainImageReady = true;
        initBrainPieces();
        // Guardar una copia de las piezas originales para poder restaurarlas
        brainPiecesOriginal = JSON.parse(JSON.stringify(brainPieces));
        animarCerebro();
    };
    brainImage.onerror = function() {
        console.warn('No se encontró imagen cabeza.png, usando respaldo');
        brainImageReady = true;
        initBrainPiecesFallback();
        brainPiecesOriginal = JSON.parse(JSON.stringify(brainPieces));
        animarCerebro();
    };
}

function initBrainPiecesFallback() {
    brainCanvas.width = window.innerWidth * 0.6;
    brainCanvas.height = window.innerHeight;
    
    brainPieces = [];
    var cols = 20;
    var rows = 20;
    var w = brainCanvas.width / cols;
    var h = brainCanvas.height / rows;
    
    for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
            var cx = x / cols - 0.5;
            var cy = y / rows - 0.5;
            var dist = Math.sqrt(cx*cx + cy*cy);
            if (dist > 0.7) continue;
            
            var startX = x * w + w/2 - brainCanvas.width/2 + brainCanvas.width/2;
            var startY = y * h + h/2 - brainCanvas.height/2 + brainCanvas.height/2;
            
            brainPieces.push({
                startX: startX,
                startY: startY,
                curX: startX,
                curY: startY,
                w: w,
                h: h,
                dx: (Math.random() - 0.5) * 3,
                dy: (Math.random() - 0.5) * 3,
                fragility: 0.3 + Math.random() * 0.3,
                color: `hsl(${200 + Math.random() * 40}, 30%, ${50 + Math.random() * 30}%)`,
                fallback: true
            });
        }
    }
}

function initBrainPieces() {
    brainCanvas.width = window.innerWidth * 0.6;
    brainCanvas.height = window.innerHeight;
    brainPieces = [];
    
    var scale = Math.min(brainCanvas.width / brainImage.width, brainCanvas.height / brainImage.height) * 0.8;
    var imgWidth = brainImage.width * scale;
    var imgHeight = brainImage.height * scale;
    var centerX = (brainCanvas.width - imgWidth) / 2;
    var centerY = (brainCanvas.height - imgHeight) / 2;
    
    var tempCanvas = document.createElement('canvas');
    var tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = brainImage.width;
    tempCanvas.height = brainImage.height;
    tempCtx.drawImage(brainImage, 0, 0);
    var imageData = tempCtx.getImageData(0, 0, brainImage.width, brainImage.height).data;
    
    for (var y = 0; y < brainImage.height; y += brainFragmentSize) {
        for (var x = 0; x < brainImage.width; x += brainFragmentSize) {
            var pixelX = Math.floor(x + brainFragmentSize / 2);
            var pixelY = Math.floor(y + brainFragmentSize / 2);
            var index = (pixelY * brainImage.width + pixelX) * 4;
            
            if (imageData[index + 3] < 50) continue;
            
            var startX = centerX + x * scale;
            var startY = centerY + y * scale;
            
            var normX = (x - brainImage.width / 2) / (brainImage.width / 2);
            var normY = (y - brainImage.height / 2) / (brainImage.height / 2);
            var distFromCenter = Math.sqrt(normX * normX + normY * normY);
            var fragility = distFromCenter * 0.4 + Math.random() * 0.15;
            
            brainPieces.push({
                srcX: x,
                srcY: y,
                srcW: Math.min(brainFragmentSize, brainImage.width - x),
                srcH: Math.min(brainFragmentSize, brainImage.height - y),
                startX: startX,
                startY: startY,
                curX: startX,
                curY: startY,
                destW: Math.min(brainFragmentSize, brainImage.width - x) * scale,
                destH: Math.min(brainFragmentSize, brainImage.height - y) * scale,
                dx: (Math.random() - 0.5) * brainDispersionForce,
                dy: (Math.random() - 0.5) * brainDispersionForce,
                fragility: fragility,
                fallback: false
            });
        }
    }
}

function actualizarFragmentacionCerebro() {
    var plasticidad = calcularPlasticidad();
    // Invertir: menor plasticidad = más fragmentación
    // plasticidad 100% -> dispersion 0 (cerebro intacto)
    // plasticidad 0% -> dispersion 1 (cerebro completamente fragmentado)
    brainTargetDispersion = 1 - (plasticidad / 100);
    brainTargetDispersion = Math.max(0, Math.min(1, brainTargetDispersion));
}

function animarCerebro() {
    if (!brainImageReady) {
        requestAnimationFrame(animarCerebro);
        return;
    }
    
    brainCtx.fillStyle = '#ffffff';
    brainCtx.fillRect(0, 0, brainCanvas.width, brainCanvas.height);
    
    // Suavizar transición de fragmentación - permite que se recupere
    brainCurrentDispersion += (brainTargetDispersion - brainCurrentDispersion) * 0.03;
    
    brainTime += brainGlobalSpeed * (0.3 + brainCurrentDispersion * 0.7);
    var globalPhase = brainTime * 0.11;
    
    var forceMultiplier = brainCurrentDispersion * 3.0;
    
    for (var i = 0; i < brainPieces.length; i++) {
        var piece = brainPieces[i];
        
        // Si la dispersión es muy baja, las piezas vuelven a su posición original
        if (brainCurrentDispersion < 0.05) {
            piece.curX += (piece.startX - piece.curX) * 0.05;
            piece.curY += (piece.startY - piece.curY) * 0.05;
        } else if (globalPhase > piece.fragility * (1 - brainCurrentDispersion * 0.3)) {
            // Las piezas se dispersan
            piece.curX += piece.dx * forceMultiplier * 0.3;
            piece.curY += piece.dy * forceMultiplier * 0.3;
        } else {
            // Las piezas tienden a volver a su posición original
            piece.curX += (piece.startX - piece.curX) * 0.02;
            piece.curY += (piece.startY - piece.curY) * 0.02;
        }
        
        // Dibujar la pieza
        if (piece.fallback) {
            brainCtx.fillStyle = piece.color;
            brainCtx.fillRect(piece.curX, piece.curY, piece.w, piece.h);
        } else {
            brainCtx.drawImage(
                brainImage,
                piece.srcX, piece.srcY, piece.srcW, piece.srcH,
                piece.curX, piece.curY, piece.destW, piece.destH
            );
        }
    }
    
    requestAnimationFrame(animarCerebro);
}

// ============================================
// TIMER Y SIMULACIÓN
// ============================================
function generarTareasIniciales() {
    if (tareasDB.length === 0) {
        console.warn('No hay tareas para generar');
        return;
    }
    
    var tareasIniciales = [];
    var intentos = 0;
    while (tareasIniciales.length < 5 && intentos < 50) {
        var tarea = generarTareaAleatoria();
        if (tarea && !tareasIniciales.some(t => t.id === tarea.id)) {
            tareasIniciales.push(tarea);
            agregarTarea(tarea);
        }
        intentos++;
    }
}

function actualizarTiempo() {
    if (!simulacionActiva) return;
    
    var ahora = Date.now();
    var elapsed = (ahora - tiempoInicio) / 1000;
    var mins = Math.floor(elapsed / 60);
    var secs = Math.floor(elapsed % 60);
    document.getElementById('timerDisplay').textContent =
        String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
    
    var tareasADesconectar = [];
    var tareasAIncompletar = [];
    
    tareasActivas.forEach(function(t) {
        if (t.estado !== 'activa') return;
        var tiempoTranscurrido = (ahora - t.iniciada) / 1000;
        t.tiempo_restante = t.tiempo_limite - tiempoTranscurrido;
        
        actualizarTareaElement(t);
        
        if (t.tiempo_restante < 0) {
            if (t.tiempo_restante <= -t.tiempo_limite) {
                tareasADesconectar.push(t);
            } else {
                tareasAIncompletar.push(t);
            }
        }
    });
    
    tareasAIncompletar.forEach(function(t) {
        if (t.estado === 'activa') {
            moverAIncompleta(t);
        }
    });
    
    tareasADesconectar.forEach(function(t) {
        moverADesconectado(t);
    });
    
    tareasIncompletas.forEach(function(t) {
        var tiempoTranscurrido = (ahora - t.iniciada) / 1000;
        t.tiempo_restante = t.tiempo_limite - tiempoTranscurrido;
        
        if (t.tiempo_restante <= -t.tiempo_limite) {
            moverADesconectado(t);
        }
    });
    
    mantenerMinimoTareas();
    
    document.getElementById('tareasActivas').textContent = tareasActivas.length + ' activas';
    actualizarMetricas();
    
    var plasticidad = calcularPlasticidad();
    var atencion = calcularAtencion();
    if (plasticidad < 10 && atencion < 15 && nodosDesconectados.length >= 4) {
        mostrarColapso();
    }
}

// ============================================
// COLAPSO
// ============================================
function mostrarColapso() {
    if (document.getElementById('colapsoModal').classList.contains('visible')) return;
    
    simulacionActiva = false;
    if (intervaloTiempo) {
        clearInterval(intervaloTiempo);
        intervaloTiempo = null;
    }
    
    document.getElementById('totalCompletadas').textContent = estadisticas.totalCompletadas;
    document.getElementById('totalIncompletas').textContent = estadisticas.totalIncompletas;
    document.getElementById('totalDesconectados').textContent = estadisticas.totalDesconectados;
    
    document.getElementById('colapsoModal').classList.add('visible');
}

// ============================================
// INICIO
// ============================================
function iniciarExperiencia() {
    document.getElementById('overlayInicial').classList.add('oculto');
    
    if (tareasDB.length === 0) {
        cargarCSV();
    }
    
    initParticulas();
    inicializarCerebro();
    
    tareasActivas = [];
    tareasCompletadas = [];
    tareasIncompletas = [];
    nodosDesconectados = [];
    totalCompletadas = 0;
    totalIncompletas = 0;
    totalDesconectados = 0;
    
    prioridadCategoria = {
        'Trabajo': 1.0,
        'Social': 1.0,
        'Aprendizaje': 1.0,
        'Entretenimiento': 1.0
    };
    
    estadisticas = {
        totalCompletadas: 0,
        totalIncompletas: 0,
        totalDesconectados: 0
    };
    
    brainCurrentDispersion = 0;
    brainTargetDispersion = 0;
    brainPieces = [];
    brainTime = 0;
    
    animacionPersonaje.modo = 'sentado';
    animacionPersonaje.frameActual = 0;
    animacionPersonaje.direccion = 1;
    animacionPersonaje.ultimoCambio = Date.now();
    document.getElementById('personajeImg').src = 'imagen/sent1.avif';
    
    listaTareasContainer = document.getElementById('listaTareas');
    if (listaTareasContainer) {
        listaTareasContainer.innerHTML = '';
    }
    
    tiempoInicio = Date.now();
    simulacionActiva = true;
    
    if (intervaloTiempo) clearInterval(intervaloTiempo);
    intervaloTiempo = setInterval(actualizarTiempo, 1000);
    
    if (tareasDB.length > 0) {
        setTimeout(generarTareasIniciales, 500);
    } else {
        var waitForCSV = setInterval(function() {
            if (tareasDB.length > 0) {
                clearInterval(waitForCSV);
                setTimeout(generarTareasIniciales, 500);
            }
        }, 200);
        
        setTimeout(function() {
            clearInterval(waitForCSV);
            if (tareasDB.length > 0) {
                setTimeout(generarTareasIniciales, 500);
            }
        }, 5000);
    }
    
    setInterval(function() {
        if (simulacionActiva) {
            actualizarPersonaje(Date.now());
        }
    }, 200);
}

function reiniciarExperiencia() {
    simulacionActiva = false;
    if (intervaloTiempo) {
        clearInterval(intervaloTiempo);
        intervaloTiempo = null;
    }
    
    brainPieces = [];
    brainCurrentDispersion = 0;
    brainTargetDispersion = 0;
    brainTime = 0;
    
    tareasActivas = [];
    tareasCompletadas = [];
    tareasIncompletas = [];
    nodosDesconectados = [];
    
    document.getElementById('colapsoModal').classList.remove('visible');
    document.getElementById('overlayInicial').classList.remove('oculto');
    if (listaTareasContainer) listaTareasContainer.innerHTML = '';
    document.getElementById('estadoDisplay').textContent = '🟢 Enfoque';
    document.getElementById('tareasActivas').textContent = '0 activas';
    document.getElementById('timerDisplay').textContent = '00:00';
    
    var notif = document.getElementById('notificaciones');
    if (notif) notif.innerHTML = '';
    
    document.getElementById('atencionValor').textContent = '100%';
    document.getElementById('plasticidadValor').textContent = '100%';
    document.querySelector('.fill.atencion').style.width = '100%';
    document.querySelector('.fill.plasticidad').style.width = '100%';
    document.getElementById('estadoMental').textContent = '🧘 En reposo';
    
    if (brainImageReady) {
        initBrainPieces();
    }
}

// ============================================
// PARTÍCULAS
// ============================================
var particulas = [];
var canvas, ctx;

function initParticulas() {
    canvas = document.getElementById('canvasParticulas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particulas = [];
    for (var i = 0; i < 60; i++) {
        particulas.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.2 + 0.05
        });
    }
    animarParticulas();
}

function animarParticulas() {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particulas.forEach(function(p) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(67,181,129,' + p.opacity + ')';
        ctx.fill();
    });
    requestAnimationFrame(animarParticulas);
}

// ============================================
// TEXTOS HOLZER
// ============================================
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

var textoHolzerInterval = null;

function mostrarTextoHolzer() {
    var el = document.getElementById('textoHolzer');
    if (!el) return;
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
    }, 6000);
}

// ============================================
// INICIALIZACIÓN
// ============================================
window.onload = function() {
    inicializarCerebro();
    cargarCSV();
    actualizarMetricas();
    
    if (textoHolzerInterval) clearInterval(textoHolzerInterval);
    textoHolzerInterval = setInterval(mostrarTextoHolzer, 15000);
    
    listaTareasContainer = document.getElementById('listaTareas');
    if (listaTareasContainer) {
        var div = document.createElement('div');
        div.className = 'placeholder-message';
        div.style.cssText = 'grid-column:1/-1;text-align:center;padding:40px 20px;color:var(--text-muted);font-size:13px;';
        div.innerHTML = '<i class="fas fa-brain" style="font-size:32px;display:block;margin-bottom:10px;opacity:0.3;"></i>Esperando nuevas tareas...<br><small>Presiona "Ingresar" para comenzar</small>';
        listaTareasContainer.appendChild(div);
    }
    
    var zona = document.getElementById('zonaNotificaciones');
    if (zona && !document.getElementById('notificaciones')) {
        var div = document.createElement('div');
        div.id = 'notificaciones';
        zona.appendChild(div);
    }
};
