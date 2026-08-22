// --- JSON BASE (FUENTE DE VERDAD) ---
let dataJSON = {
  "encabezado": {
    "universidad": "UNIVERSIDAD DE INGENIERIA Y TECNOLOGIA",
    "carrera": "INGENIERIA CIVIL",
    "curso": "Proyecto Final de Ingeniería Civil 1",
    "proyecto_taic": "PROYECTO TAIC 2026",
    "ciclo": "2026-2",
    "grupo": "01",
    "profesor": "Ing. Carlos Alberto Benedetty Torres",
    "proyecto_seleccionado": "Por Definir"
  },
  "seccion_1_info_reunion": {
    "num_acta": "01",
    "fecha": "2026-08-22",
    "hora_inicio": "14:00",
    "hora_fin": "15:30",
    "duracion": "1.5",
    "modalidad": "Virtual",
    "lugar": "Google Meet"
  },
  "seccion_2_asistencia": {
    "asistentes": [
      { "num": 1, "nombre": "Jhon Alex Umasi Huisa", "codigo": "202220117", "rol": "Tesista", "rol_custom": "", "asistencia": "Sí" },
      { "num": 2, "nombre": "Richard Alejandor Cordova Alarcon", "codigo": "202220219", "rol": "Tesista", "rol_custom": "", "asistencia": "Sí" }
    ],
    "observaciones_asistencia": "Sin observaciones, todos asistieron puntualmente."
  },
  "seccion_3_agenda": {
    "objetivo_reunion": "Definir el alcance del marco teórico y asignación de actividades iniciales.",
    "temas_a_tratar_list": [
      { "num": 1, "titulo": "Revisión de bibliografía base" },
      { "num": 2, "titulo": "Distribución de capítulos" }
    ]
  },
  "seccion_4_desarrollo": {
    "compromisos_anteriores": [
      { "tarea": "Revisión de marco teórico", "responsables": ["Richard Alejandro Cordova Alarcon"], "estado": "Completado", "observaciones": "Sin observaciones" }
    ],
    "temas": [
      { "num": 1, "titulo": "Modelamiento estructural", "discusion": "Se evaluaron los paquetes de software disponibles y licencias del campus.", "decision": "Se utilizará ETABS para las simulaciones principales." }
    ],
    "problemas_identificados": "Dificultad de acceso a la base de datos de ensayos de laboratorio."
  },
  "seccion_5_acuerdos_tareas": [
    { "num": 1, "tarea": "Redacción del Capítulo 3", "responsables": ["Jhon Alex Umasi Huisa"], "fecha_limite": "2026-08-28", "entregable": "Documento PDF" }
  ],
  "seccion_6_proxima_reunion": {
    "fecha_propuesta": "2026-08-29",
    "hora_propuesta": "14:00",
    "modalidad": "Virtual",
    "lugar": "Google Meet",
    "temas_a_tratar": "Revisión del avance del Capítulo 3 y validación del modelo inicial."
  },
  "seccion_7_observaciones_generales": "Mantener comunicación fluida mediante el grupo de WhatsApp.",
  "seccion_8_firma": {
    "hora_firma": "15:30",
    "coordinador": "Jhon Alex Umasi Huisa",
    "elaborador": "Richard Alejandro Cordova Alarcon",
    "quien_lo_hizo": "Richard Alejandro Cordova Alarcon",
    "fecha": "2026-08-22",
    "firma_1_img": "",
    "firma_2_img": ""
  }
};

let modalTargetObj = null;
let modalTargetProp = '';

window.onload = function() {
    cargarFormularioDesdeJSON();
    renderAsistentes();
    renderTemasAgenda();
    renderCompromisos();
    renderTemas();
    renderTareas();
    // No llamamos a actualizar() para vista previa automática
};

// CALCULO BIDIRECCIONAL TIEMPO
function calcTiempoDesdeHoras() {
    const ini = document.getElementById("in_horaIni").value;
    const fin = document.getElementById("in_horaFin").value;
    if (ini && fin) {
        const [h1, m1] = ini.split(':').map(Number);
        const [h2, m2] = fin.split(':').map(Number);
        let diff = (h2 * 60 + m2) - (h1 * 60 + m1);
        if (diff < 0) diff += 1440;
        document.getElementById("in_duracion").value = (diff / 60).toFixed(2);
    }
}

function calcTiempoDesdeDuracion() {
    const ini = document.getElementById("in_horaIni").value;
    const dur = parseFloat(document.getElementById("in_duracion").value);
    if (ini && !isNaN(dur)) {
        const [h1, m1] = ini.split(':').map(Number);
        let totalMin = Math.round(h1 * 60 + m1 + dur * 60);
        let h2 = Math.floor(totalMin / 60) % 24;
        let m2 = totalMin % 60;
        document.getElementById("in_horaFin").value = `${String(h2).padStart(2, '0')}:${String(m2).padStart(2, '0')}`;
    }
}

function cargarFormularioDesdeJSON() {
    document.getElementById("in_numActa").value = dataJSON.seccion_1_info_reunion.num_acta;
    document.getElementById("in_grupo").value = dataJSON.encabezado.grupo;
    document.getElementById("in_profesor").value = dataJSON.encabezado.profesor;
    document.getElementById("in_tema").value = dataJSON.encabezado.proyecto_seleccionado;
    document.getElementById("in_fecha").value = dataJSON.seccion_1_info_reunion.fecha;
    document.getElementById("in_duracion").value = dataJSON.seccion_1_info_reunion.duracion;
    document.getElementById("in_horaIni").value = dataJSON.seccion_1_info_reunion.hora_inicio;
    document.getElementById("in_horaFin").value = dataJSON.seccion_1_info_reunion.hora_fin;
    document.getElementById("in_modalidad").value = dataJSON.seccion_1_info_reunion.modalidad;
    document.getElementById("in_lugar").value = dataJSON.seccion_1_info_reunion.lugar;
    document.getElementById("in_obsAsistencia").value = dataJSON.seccion_2_asistencia.observaciones_asistencia;
    document.getElementById("in_objetivo").value = dataJSON.seccion_3_agenda.objetivo_reunion;
    document.getElementById("in_problemas").value = dataJSON.seccion_4_desarrollo.problemas_identificados;
    
    document.getElementById("in_proxFecha").value = dataJSON.seccion_6_proxima_reunion.fecha_propuesta;
    document.getElementById("in_proxHora").value = dataJSON.seccion_6_proxima_reunion.hora_propuesta;
    document.getElementById("in_proxModalidad").value = dataJSON.seccion_6_proxima_reunion.modalidad;
    document.getElementById("in_proxLugar").value = dataJSON.seccion_6_proxima_reunion.lugar;
    document.getElementById("in_proxTemas").value = dataJSON.seccion_6_proxima_reunion.temas_a_tratar;

    document.getElementById("in_obsGenerales").value = dataJSON.seccion_7_observaciones_generales;
    document.getElementById("in_horaFirma").value = dataJSON.seccion_8_firma.hora_firma;
    document.getElementById("in_coordinador").value = dataJSON.seccion_8_firma.coordinador;
    document.getElementById("in_elaborador").value = dataJSON.seccion_8_firma.elaborador;
}

function actualizar() {
    // Solo actualiza el JSON, NO la vista previa
    dataJSON.seccion_1_info_reunion.num_acta = document.getElementById("in_numActa").value;
    dataJSON.encabezado.grupo = document.getElementById("in_grupo").value;
    dataJSON.encabezado.profesor = document.getElementById("in_profesor").value;
    dataJSON.encabezado.proyecto_seleccionado = document.getElementById("in_tema").value;
    dataJSON.seccion_1_info_reunion.fecha = document.getElementById("in_fecha").value;
    dataJSON.seccion_1_info_reunion.duracion = document.getElementById("in_duracion").value;
    dataJSON.seccion_1_info_reunion.hora_inicio = document.getElementById("in_horaIni").value;
    dataJSON.seccion_1_info_reunion.hora_fin = document.getElementById("in_horaFin").value;
    dataJSON.seccion_1_info_reunion.modalidad = document.getElementById("in_modalidad").value;
    dataJSON.seccion_1_info_reunion.lugar = document.getElementById("in_lugar").value;
    dataJSON.seccion_2_asistencia.observaciones_asistencia = document.getElementById("in_obsAsistencia").value;
    dataJSON.seccion_3_agenda.objetivo_reunion = document.getElementById("in_objetivo").value;
    dataJSON.seccion_4_desarrollo.problemas_identificados = document.getElementById("in_problemas").value;
    
    dataJSON.seccion_6_proxima_reunion.fecha_propuesta = document.getElementById("in_proxFecha").value;
    dataJSON.seccion_6_proxima_reunion.hora_propuesta = document.getElementById("in_proxHora").value;
    dataJSON.seccion_6_proxima_reunion.modalidad = document.getElementById("in_proxModalidad").value;
    dataJSON.seccion_6_proxima_reunion.lugar = document.getElementById("in_proxLugar").value;
    dataJSON.seccion_6_proxima_reunion.temas_a_tratar = document.getElementById("in_proxTemas").value;

    dataJSON.seccion_7_observaciones_generales = document.getElementById("in_obsGenerales").value;
    dataJSON.seccion_8_firma.hora_firma = document.getElementById("in_horaFirma").value;
    dataJSON.seccion_8_firma.coordinador = document.getElementById("in_coordinador").value;
    dataJSON.seccion_8_firma.elaborador = document.getElementById("in_elaborador").value;
    dataJSON.seccion_8_firma.quien_lo_hizo = document.getElementById("in_elaborador").value;
}

// 2. ASISTENCIA
function renderAsistentes() {
    const cont = document.getElementById("container_asistencia");
    if (!cont) return;
    cont.innerHTML = "";

    dataJSON.seccion_2_asistencia.asistentes.forEach((item, i) => {
        item.num = i + 1;
        const rolTexto = item.rol === "Otro" ? item.rol_custom : item.rol;
        cont.innerHTML += `
            <div class="dynamic-row" style="flex-wrap:wrap;">
                <input type="text" placeholder="Nombre" style="flex:2;" value="${item.nombre}" oninput="dataJSON.seccion_2_asistencia.asistentes[${i}].nombre=this.value; renderCompromisos(); renderTareas(); actualizar();">
                <input type="text" placeholder="Código" style="width:70px;" value="${item.codigo}" oninput="dataJSON.seccion_2_asistencia.asistentes[${i}].codigo=this.value; actualizar();">
                <select style="width:90px;" onchange="dataJSON.seccion_2_asistencia.asistentes[${i}].rol=this.value; renderAsistentes(); actualizar();">
                    <option value="Coordinador" ${item.rol==='Coordinador'?'selected':''}>Coordinador</option>
                    <option value="Elaborador" ${item.rol==='Elaborador'?'selected':''}>Elaborador</option>
                    <option value="Integrante" ${item.rol==='Integrante'?'selected':''}>Integrante</option>
                    <option value="Tesista" ${item.rol==='Tesista'?'selected':''}>Tesista</option>
                    <option value="Asesor" ${item.rol==='Asesor'?'selected':''}>Asesor</option>
                    <option value="Otro" ${item.rol==='Otro'?'selected':''}>Otro...</option>
                </select>
                ${item.rol === 'Otro' ? `<input type="text" placeholder="Especifique" style="width:80px;" value="${item.rol_custom||''}" oninput="dataJSON.seccion_2_asistencia.asistentes[${i}].rol_custom=this.value; actualizar();">` : ''}
                <select style="width:55px;" onchange="dataJSON.seccion_2_asistencia.asistentes[${i}].asistencia=this.value; actualizar();">
                    <option value="Sí" ${item.asistencia==='Sí'?'selected':''}>Sí</option>
                    <option value="No" ${item.asistencia==='No'?'selected':''}>No</option>
                </select>
                <button type="button" class="btn-del" onclick="dataJSON.seccion_2_asistencia.asistentes.splice(${i},1); renderAsistentes(); renderCompromisos(); renderTareas(); actualizar();">X</button>
            </div>`;
    });
}

function agregarAsistente() {
    dataJSON.seccion_2_asistencia.asistentes.push({ num: 0, nombre: "", codigo: "", rol: "Integrante", rol_custom: "", asistencia: "Sí" });
    renderAsistentes(); renderCompromisos(); renderTareas(); actualizar();
}

// 3.2 TEMAS A TRATAR (AGENDA PREVIA)
function renderTemasAgenda() {
    const cont = document.getElementById("container_agenda_temas");
    if (!cont) return;
    cont.innerHTML = "";

    dataJSON.seccion_3_agenda.temas_a_tratar_list.forEach((item, i) => {
        item.num = i + 1;
        cont.innerHTML += `
            <div style="border: 1px dashed #aaa; padding:6px; margin-bottom:8px; display:flex; align-items:center; gap:8px;">
                <label style="white-space:nowrap;">Tema ${item.num}:</label>
                <input type="text" style="flex:1;" value="${item.titulo}" oninput="dataJSON.seccion_3_agenda.temas_a_tratar_list[${i}].titulo=this.value; actualizar();">
                <button type="button" class="btn-del" onclick="dataJSON.seccion_3_agenda.temas_a_tratar_list.splice(${i},1); renderTemasAgenda(); actualizar();">Eliminar</button>
            </div>`;
    });
}

function agregarTemaAgenda() {
    dataJSON.seccion_3_agenda.temas_a_tratar_list.push({ num: 0, titulo: "" });
    renderTemasAgenda();
}

// 4.1 COMPROMISOS ANTERIORES
function renderCompromisos() {
    const cont = document.getElementById("container_compromisos");
    if (!cont) return;
    cont.innerHTML = "";

    dataJSON.seccion_4_desarrollo.compromisos_anteriores.forEach((item, i) => {
        cont.innerHTML += `
            <div style="border:1px solid #ddd; padding:6px; margin-bottom:6px;">
                <div style="display:flex; gap:4px;">
                    <input type="text" placeholder="Tarea pendiente" value="${item.tarea}" oninput="dataJSON.seccion_4_desarrollo.compromisos_anteriores[${i}].tarea=this.value; actualizar();">
                    <button type="button" class="btn-expand" onclick="abrirModalTexto(dataJSON.seccion_4_desarrollo.compromisos_anteriores[${i}], 'tarea', 'Tarea Pendiente')">ampliar</button>
                </div>
                <label>Responsables:</label>
                ${generarSelectorResponsables(item.responsables, `toggleResponsable(dataJSON.seccion_4_desarrollo.compromisos_anteriores[${i}].responsables, this.value)`)}
                <div class="grid-2" style="margin-top:4px;">
                    <div>
                        <label>Estado</label>
                        <select onchange="dataJSON.seccion_4_desarrollo.compromisos_anteriores[${i}].estado=this.value; actualizar();">
                            <option value="Pendiente" ${item.estado==='Pendiente'?'selected':''}>Pendiente</option>
                            <option value="En Proceso" ${item.estado==='En Proceso'?'selected':''}>En Proceso</option>
                            <option value="Completado" ${item.estado==='Completado'?'selected':''}>Completado</option>
                            <option value="Cancelado" ${item.estado==='Cancelado'?'selected':''}>Cancelado</option>
                        </select>
                    </div>
                    <div>
                        <label>Observaciones</label>
                        <input type="text" value="${item.observaciones}" oninput="dataJSON.seccion_4_desarrollo.compromisos_anteriores[${i}].observaciones=this.value; actualizar();">
                    </div>
                </div>
                <button type="button" class="btn-del" style="margin-top:4px;" onclick="dataJSON.seccion_4_desarrollo.compromisos_anteriores.splice(${i},1); renderCompromisos(); actualizar();">Eliminar Compromiso</button>
            </div>`;
    });
}

function toggleResponsable(arr, nombre) {
    const idx = arr.indexOf(nombre);
    if (idx > -1) arr.splice(idx, 1);
    else arr.push(nombre);
    actualizar();
}

function agregarCompromiso() {
    dataJSON.seccion_4_desarrollo.compromisos_anteriores.push({ tarea: "", responsables: [], estado: "Pendiente", observaciones: "-" });
    renderCompromisos(); actualizar();
}

// 4.2 TEMAS
function renderTemas() {
    const cont = document.getElementById("container_temas");
    if (!cont) return;
    cont.innerHTML = "";

    dataJSON.seccion_4_desarrollo.temas.forEach((item, i) => {
        item.num = i + 1;
        cont.innerHTML += `
            <div style="border: 1px dashed #aaa; padding:6px; margin-bottom:8px;">
                <label>Tema ${item.num}: Título</label>
                <input type="text" value="${item.titulo}" oninput="dataJSON.seccion_4_desarrollo.temas[${i}].titulo=this.value; actualizar();">
                <label>Discusión</label>
                <textarea rows="2" oninput="dataJSON.seccion_4_desarrollo.temas[${i}].discusion=this.value; actualizar();">${item.discusion}</textarea>
                <label>Decisión tomada</label>
                <textarea rows="2" oninput="dataJSON.seccion_4_desarrollo.temas[${i}].decision=this.value; actualizar();">${item.decision}</textarea>
                <button type="button" class="btn-del" style="margin-top:4px;" onclick="dataJSON.seccion_4_desarrollo.temas.splice(${i},1); renderTemas(); actualizar();">Eliminar Tema</button>
            </div>`;
    });
}

function agregarTema() {
    dataJSON.seccion_4_desarrollo.temas.push({ num: 0, titulo: "", discusion: "", decision: "" });
    renderTemas(); actualizar();
}

// 5. TAREAS Y ACUERDOS
function renderTareas() {
    const cont = document.getElementById("container_tareas");
    if (!cont) return;
    cont.innerHTML = "";

    dataJSON.seccion_5_acuerdos_tareas.forEach((item, i) => {
        item.num = i + 1;
        cont.innerHTML += `
            <div style="border:1px solid #ddd; padding:6px; margin-bottom:6px;">
                <div style="display:flex; gap:4px;">
                    <input type="text" placeholder="Tarea" value="${item.tarea}" oninput="dataJSON.seccion_5_acuerdos_tareas[${i}].tarea=this.value; actualizar();">
                    <button type="button" class="btn-expand" onclick="abrirModalTexto(dataJSON.seccion_5_acuerdos_tareas[${i}], 'tarea', 'Detalle de Tarea')">ampliar</button>
                </div>
                <label>Responsables:</label>
                ${generarSelectorResponsables(item.responsables, `toggleResponsable(dataJSON.seccion_5_acuerdos_tareas[${i}].responsables, this.value)`)}
                <div class="grid-2" style="margin-top:4px;">
                    <div>
                        <label>Fecha Límite</label>
                        <input type="date" value="${item.fecha_limite}" onchange="dataJSON.seccion_5_acuerdos_tareas[${i}].fecha_limite=this.value; actualizar();">
                    </div>
                    <div>
                        <label>Entregable</label>
                        <input type="text" value="${item.entregable}" oninput="dataJSON.seccion_5_acuerdos_tareas[${i}].entregable=this.value; actualizar();">
                    </div>
                </div>
                <button type="button" class="btn-del" style="margin-top:4px;" onclick="dataJSON.seccion_5_acuerdos_tareas.splice(${i},1); renderTareas(); actualizar();">X</button>
            </div>`;
    });
}

function agregarTarea() {
    dataJSON.seccion_5_acuerdos_tareas.push({ num: 0, tarea: "", responsables: [], fecha_limite: "", entregable: "" });
    renderTareas(); actualizar();
}

// MODAL PARA EDICIÓN EXTENDIDA
function abrirModalTexto(obj, prop, titulo) {
    modalTargetObj = obj;
    modalTargetProp = prop;
    document.getElementById("modal_titulo").innerText = titulo;
    document.getElementById("modal_textarea").value = obj[prop] || "";
    document.getElementById("modal_texto").style.display = "flex";
}

function guardarModalTexto() {
    if (modalTargetObj && modalTargetProp) {
        modalTargetObj[modalTargetProp] = document.getElementById("modal_textarea").value;
        renderCompromisos();
        renderTareas();
        actualizar();
    }
    cerrarModalTexto();
}

function cerrarModalTexto() {
    document.getElementById("modal_texto").style.display = "none";
    modalTargetObj = null;
}

// Variables globales para almacenar el Base64 de las firmas
let firmaCoordinadorBase64 = null;
let firmaElaboradorBase64 = null;

function cargarFirma(event, imgElementId, propiedadDataJSON) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const base64Result = e.target.result;

        // Guardar en el objeto dataJSON que consume el PDF
        if (!dataJSON.seccion_8_firma) {
            dataJSON.seccion_8_firma = {};
        }
        dataJSON.seccion_8_firma[propiedadDataJSON] = base64Result;

        // Solo actualizar datos, no vista previa
        if (typeof actualizar === 'function') {
            actualizar();
        }
    };
    
    reader.readAsDataURL(file);
}

// ==========================================
// PREVISUALIZACIÓN EN MODAL
// ==========================================
function generarHTMLPrevisualizacion() {
    // Función auxiliar para formatear fecha
    function formatearFecha(fecha) {
        if (!fecha) return "-";
        const partes = fecha.split('-');
        if (partes.length === 3) {
            return `${partes[2]}/${partes[1]}/${partes[0]}`;
        }
        return fecha;
    }

    const html = `
        <div class="word-document">
            <div class="header-section">
                <p class="title-bold">${dataJSON.encabezado.universidad}</p>
                <p class="title-bold">${dataJSON.encabezado.carrera}</p>
                <p class="title-bold">ACTA DE REUNIÓN DE PFIC 1 N.° ${dataJSON.seccion_1_info_reunion.num_acta}</p>
                <p class="title-bold">${dataJSON.encabezado.proyecto_taic}</p>
            </div>

            <p class="meta-line">Curso: ${dataJSON.encabezado.curso}</p>
            <p class="meta-line">Ciclo: ${dataJSON.encabezado.ciclo}</p>
            <p class="meta-line">Grupo N°: ${dataJSON.encabezado.grupo}</p>
            <p class="meta-line">Profesor: ${dataJSON.encabezado.profesor}</p>
            <p class="meta-line">Proyecto seleccionado: ${dataJSON.encabezado.proyecto_seleccionado}</p>

            <p class="section-header">1. INFORMACIÓN DE LA REUNIÓN</p>
            <table class="tbl-word">
                <tr><th style="width: 30%;">Campo</th><th>Detalle</th></tr>
                <tr><td>Acta N°:</td><td>${dataJSON.seccion_1_info_reunion.num_acta}</td></tr>
                <tr><td>Fecha:</td><td>${formatearFecha(dataJSON.seccion_1_info_reunion.fecha)}</td></tr>
                <tr><td>Hora de inicio:</td><td>${dataJSON.seccion_1_info_reunion.hora_inicio}</td></tr>
                <tr><td>Hora de término:</td><td>${dataJSON.seccion_1_info_reunion.hora_fin}</td></tr>
                <tr><td>Duración:</td><td>${dataJSON.seccion_1_info_reunion.duracion} hrs</td></tr>
                <tr><td>Modalidad:</td><td>${dataJSON.seccion_1_info_reunion.modalidad}</td></tr>
                <tr><td>Lugar/Plataforma:</td><td>${dataJSON.seccion_1_info_reunion.lugar}</td></tr>
            </table>

            <p class="section-header">2. ASISTENCIA</p>
            <table class="tbl-word">
                <thead>
                    <tr><th>N°</th><th>Nombre Completo</th><th>Código</th><th>Rol en equipo</th><th>Asistió</th></tr>
                </thead>
                <tbody>
                    ${dataJSON.seccion_2_asistencia.asistentes.map(a => `
                        <tr>
                            <td>${a.num}</td>
                            <td>${a.nombre}</td>
                            <td>${a.codigo}</td>
                            <td>${a.rol === 'Otro' ? a.rol_custom : a.rol}</td>
                            <td>${a.asistencia}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <p class="sub-label">Observaciones sobre inasistencias o retrasos:</p>
            <div class="text-block">${dataJSON.seccion_2_asistencia.observaciones_asistencia || "-"}</div>

            <p class="section-header">3. AGENDA DE LA REUNIÓN</p>
            <p class="sub-label"><b>3.1. Objetivo de la reunión:</b></p>
            <div class="text-block">${dataJSON.seccion_3_agenda.objetivo_reunion || "-"}</div>
            <p class="sub-label"><b>3.2. Temas a tratar (agenda previa):</b></p>
            ${dataJSON.seccion_3_agenda.temas_a_tratar_list.length > 0 ? `
                <ul style="margin: 4px 0 10px 20px; padding: 0;">
                    ${dataJSON.seccion_3_agenda.temas_a_tratar_list.map(t => `
                        <li style="margin-bottom: 3px;"><b>Tema ${t.num}:</b> ${t.titulo || '-'}</li>
                    `).join('')}
                </ul>
            ` : '<div class="text-block">-</div>'}

            <p class="section-header">4. DESARROLLO DE LA REUNIÓN</p>
            <p class="sub-label"><b>4.1. Revisión de compromisos de la reunión anterior</b></p>
            <table class="tbl-word">
                <thead>
                    <tr><th>Tarea pendiente</th><th>Responsable</th><th>Estado</th><th>Observaciones</th></tr>
                </thead>
                <tbody>
                    ${dataJSON.seccion_4_desarrollo.compromisos_anteriores.map(c => `
                        <tr>
                            <td>${c.tarea}</td>
                            <td>${c.responsables.join(", ") || "-"}</td>
                            <td>${c.estado}</td>
                            <td>${c.observaciones}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <p class="sub-label"><b>4.2. Temas discutidos y decisiones tomadas</b></p>
            ${dataJSON.seccion_4_desarrollo.temas.map(t => `
                <div style="margin-bottom: 6px;">
                    <p style="margin:2px 0;"><b>Tema ${t.num}:</b> ${t.titulo}</p>
                    <p style="margin:2px 0;"><b>Discusión:</b> ${t.discusion}</p>
                    <p style="margin:2px 0;"><b>Decisión tomada:</b> ${t.decision}</p>
                </div>
            `).join('')}

            <p class="sub-label"><b>4.3. Problemas o conflictos identificados</b></p>
            <div class="text-block">${dataJSON.seccion_4_desarrollo.problemas_identificados || "-"}</div>

            <p class="section-header">5. ACUERDOS Y TAREAS ASIGNADAS</p>
            <table class="tbl-word">
                <thead>
                    <tr><th>N°</th><th>Tarea/Compromiso</th><th>Responsable</th><th>Fecha límite</th><th>Entregable esperado</th></tr>
                </thead>
                <tbody>
                    ${dataJSON.seccion_5_acuerdos_tareas.map(t => `
                        <tr>
                            <td>${t.num}</td>
                            <td>${t.tarea}</td>
                            <td>${t.responsables.join(", ") || "-"}</td>
                            <td>${formatearFecha(t.fecha_limite)}</td>
                            <td>${t.entregable}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <p class="section-header">6. PRÓXIMA REUNIÓN</p>
            <table class="tbl-word">
                <tr><th style="width: 30%;">Campo</th><th>Detalle</th></tr>
                <tr><td>Fecha propuesta:</td><td>${formatearFecha(dataJSON.seccion_6_proxima_reunion.fecha_propuesta)}</td></tr>
                <tr><td>Hora propuesta:</td><td>${dataJSON.seccion_6_proxima_reunion.hora_propuesta}</td></tr>
                <tr><td>Modalidad:</td><td>${dataJSON.seccion_6_proxima_reunion.modalidad}</td></tr>
                <tr><td>Lugar/Plataforma:</td><td>${dataJSON.seccion_6_proxima_reunion.lugar}</td></tr>
                <tr><td>Temas a tratar:</td><td>${dataJSON.seccion_6_proxima_reunion.temas_a_tratar}</td></tr>
            </table>

            <p class="section-header">7. OBSERVACIONES GENERALES</p>
            <div class="text-block">${dataJSON.seccion_7_observaciones_generales || "-"}</div>

            <p class="section-header">8. FIRMA</p>
            <p class="meta-line">Siendo las ${dataJSON.seccion_8_firma.hora_firma} horas, se da por concluida la reunión, dejando constancia de los acuerdos y compromisos señalados en la presente acta.</p>

            <table class="tbl-signatures">
                <tr>
                    <td>
                        <div class="signature-box">
                            ${dataJSON.seccion_8_firma.firma_1_img ? `<img src="${dataJSON.seccion_8_firma.firma_1_img}" class="img-firma">` : ''}
                            <p>-------------------------</p>
                            <p>Coordinador del equipo:</p>
                            <p>Nombre: ${dataJSON.seccion_8_firma.coordinador}</p>
                            <p>Fecha: ${formatearFecha(dataJSON.seccion_8_firma.fecha)}</p>
                        </div>
                    </td>
                    <td>
                        <div class="signature-box">
                            ${dataJSON.seccion_8_firma.firma_2_img ? `<img src="${dataJSON.seccion_8_firma.firma_2_img}" class="img-firma">` : ''}
                            <p>-------------------------</p>
                            <p>Elaborado por:</p>
                            <p>Nombre: ${dataJSON.seccion_8_firma.elaborador}</p>
                            <p>Fecha: ${formatearFecha(dataJSON.seccion_8_firma.fecha)}</p>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    `;
    return html;
}

function previsualizarActa() {
    actualizar(); // Asegurar que los datos estén actualizados
    const contenido = generarHTMLPrevisualizacion();
    document.getElementById('preview_content').innerHTML = contenido;
    document.getElementById('modal_preview').style.display = 'flex';
}

function cerrarPrevisualizacion() {
    document.getElementById('modal_preview').style.display = 'none';
}

// EXPORTACIÓN PDF VECTORIAL NATIVA
function descargarPDFDirecto() {
    try {
        actualizar(); // Asegurar datos actualizados

        const jsPDF = window.jspdf ? window.jspdf.jsPDF : null;
        if (!jsPDF) { alert("Error: jsPDF no está disponible."); return; }

        const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
        const numActa = dataJSON.seccion_1_info_reunion.num_acta || "01";
        let y = 15;

        // Encabezado
        doc.setFont("times", "bold"); doc.setFontSize(11);
        doc.text(dataJSON.encabezado.universidad || "UNIVERSIDAD DE INGENIERÍA Y TECNOLOGÍA", 105, y, { align: "center" }); y += 5;
        doc.text(dataJSON.encabezado.carrera || "INGENIERÍA CIVIL", 105, y, { align: "center" }); y += 5;
        doc.text(`ACTA DE REUNIÓN DE PFIC 1 N.° ${numActa}`, 105, y, { align: "center" }); y += 5;
        doc.text(dataJSON.encabezado.proyecto_taic || "PROYECTO TAIC 2026", 105, y, { align: "center" }); y += 8;

        // Metadatos
        doc.setFont("times", "normal"); doc.setFontSize(10);
        doc.text(`Curso: ${dataJSON.encabezado.curso || "Proyecto Final de Ingeniería Civil 1"}`, 15, y); y += 5;
        doc.text(`Ciclo: ${dataJSON.encabezado.ciclo || "2026-2"}`, 15, y); y += 5;
        doc.text(`Grupo N°: ${dataJSON.encabezado.grupo || "-"}`, 15, y); y += 5;
        doc.text(`Profesor: ${dataJSON.encabezado.profesor || "-"}`, 15, y); y += 5;
        doc.text(`Proyecto seleccionado: ${dataJSON.encabezado.proyecto_seleccionado || "-"}`, 15, y); y += 8;

        // 1. Info
        doc.setFont("times", "bold"); doc.text("1. INFORMACIÓN DE LA REUNIÓN", 15, y); y += 3;
        doc.autoTable({
            startY: y,
            head: [['Campo', 'Detalle']],
            body: [
                ['Acta N°', numActa],
                ['Fecha:', dataJSON.seccion_1_info_reunion.fecha || "-"],
                ['Hora de inicio:', dataJSON.seccion_1_info_reunion.hora_inicio || "-"],
                ['Hora de término:', dataJSON.seccion_1_info_reunion.hora_fin || "-"],
                ['Duración:', `${dataJSON.seccion_1_info_reunion.duracion || 0} hrs`],
                ['Modalidad:', dataJSON.seccion_1_info_reunion.modalidad || "-"],
                ['Lugar/Plataforma:', dataJSON.seccion_1_info_reunion.lugar || "-"]
            ],
            theme: 'plain',
            styles: { font: 'times', fontSize: 9, cellPadding: 1.5, lineColor: [0, 0, 0], lineWidth: 0.1 },
            columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } },
            margin: { left: 15, right: 15 }
        });
        y = doc.lastAutoTable.finalY + 6;

        // 2. Asistencia
        doc.setFont("times", "bold"); doc.text("2. ASISTENCIA", 15, y); y += 3;
        doc.autoTable({
            startY: y,
            head: [['N°', 'Nombre Completo', 'Código', 'Rol en equipo', 'Asistió']],
            body: (dataJSON.seccion_2_asistencia.asistentes || []).map(a => [
                a.num, a.nombre, a.codigo, a.rol === 'Otro' ? a.rol_custom : a.rol, a.asistencia
            ]),
            theme: 'plain',
            styles: { font: 'times', fontSize: 9, cellPadding: 1.5, lineColor: [0, 0, 0], lineWidth: 0.1 },
            margin: { left: 15, right: 15 }
        });
        y = doc.lastAutoTable.finalY + 4;
        doc.setFont("times", "normal");
        doc.text(`Observaciones sobre inasistencias o retrasos: ${dataJSON.seccion_2_asistencia.observaciones_asistencia || "-"}`, 15, y); y += 8;

        // 3. Agenda de la Reunión
        doc.setFont("times", "bold"); doc.text("3. AGENDA DE LA REUNIÓN", 15, y); y += 5;
        
        doc.setFont("times", "bold"); doc.text("3.1. Objetivo de la reunión:", 15, y); y += 4;
        doc.setFont("times", "normal");
        const objLines = doc.splitTextToSize(dataJSON.seccion_3_agenda.objetivo_reunion || "-", 180);
        doc.text(objLines, 15, y);
        y += (objLines.length * 4) + 4;

        doc.setFont("times", "bold"); doc.text("3.2. Temas a tratar (agenda previa):", 15, y); y += 3;

        // Mapeo de filas solo con Número y Título
        const temasAgendaBody = dataJSON.seccion_3_agenda.temas_a_tratar_list.map(t => [
            `Tema ${t.num}`,
            t.titulo || "-"
        ]);

        doc.autoTable({
            startY: y,
            head: [['N°', 'Tema / Punto a Tratar']],
            body: temasAgendaBody.length > 0 ? temasAgendaBody : [['-', 'No se registraron temas']],
            theme: 'plain',
            styles: { font: 'times', fontSize: 9, cellPadding: 1.5, lineColor: [0, 0, 0], lineWidth: 0.1 },
            headStyles: { fontStyle: 'bold' },
            columnStyles: { 0: { cellWidth: 25, fontStyle: 'bold' } },
            margin: { left: 15, right: 15 }
        });
        y = doc.lastAutoTable.finalY + 6;

        // 4. Desarrollo
        if (y > 220) { doc.addPage(); y = 15; }
        doc.setFont("times", "bold"); doc.text("4. DESARROLLO DE LA REUNIÓN", 15, y); y += 5;
        doc.text("4.1. Revisión de compromisos de la reunión anterior", 15, y); y += 3;
        doc.autoTable({
            startY: y,
            head: [['Tarea pendiente', 'Responsable', 'Estado', 'Observaciones']],
            body: (dataJSON.seccion_4_desarrollo.compromisos_anteriores || []).map(c => [
                c.tarea, (c.responsables || []).join(", ") || "-", c.estado, c.observaciones
            ]),
            theme: 'plain',
            styles: { font: 'times', fontSize: 9, cellPadding: 1.5, lineColor: [0, 0, 0], lineWidth: 0.1 },
            margin: { left: 15, right: 15 }
        });
        y = doc.lastAutoTable.finalY + 5;

        doc.setFont("times", "bold"); doc.text("4.2. Temas discutidos y decisiones tomadas", 15, y); y += 4;
        (dataJSON.seccion_4_desarrollo.temas || []).forEach(t => {
            doc.setFont("times", "bold"); doc.text(`Tema ${t.num}: ${t.titulo}`, 15, y); y += 4;
            doc.setFont("times", "normal");
            let sDisc = doc.splitTextToSize(`Discusión: ${t.discusion}`, 180);
            doc.text(sDisc, 15, y); y += (sDisc.length * 4);
            let sDec = doc.splitTextToSize(`Decisión tomada: ${t.decision}`, 180);
            doc.text(sDec, 15, y); y += (sDec.length * 4) + 2;
        });

        doc.setFont("times", "bold"); doc.text("4.3. Problemas o conflictos identificados", 15, y); y += 4;
        doc.setFont("times", "normal");
        let splitProb = doc.splitTextToSize(dataJSON.seccion_4_desarrollo.problemas_identificados || "-", 180);
        doc.text(splitProb, 15, y); y += (splitProb.length * 4) + 7;

        // 5. Acuerdos
        if (y > 220) { doc.addPage(); y = 15; }
        doc.setFont("times", "bold"); doc.text("5. ACUERDOS Y TAREAS ASIGNADAS", 15, y); y += 3;
        doc.autoTable({
            startY: y,
            head: [['N°', 'Tarea/Compromiso', 'Responsable', 'Fecha límite', 'Entregable esperado']],
            body: (dataJSON.seccion_5_acuerdos_tareas || []).map(t => [
                t.num, t.tarea, (t.responsables || []).join(", ") || "-", t.fecha_limite, t.entregable
            ]),
            theme: 'plain',
            styles: { font: 'times', fontSize: 9, cellPadding: 1.5, lineColor: [0, 0, 0], lineWidth: 0.1 },
            margin: { left: 15, right: 15 }
        });
        y = doc.lastAutoTable.finalY + 7;

        // 6. Próxima Reunión
        if (y > 220) { doc.addPage(); y = 15; }
        doc.setFont("times", "bold"); doc.text("6. PRÓXIMA REUNIÓN", 15, y); y += 3;
        doc.autoTable({
            startY: y,
            head: [['Campo', 'Detalle']],
            body: [
                ['Fecha propuesta:', dataJSON.seccion_6_proxima_reunion.fecha_propuesta || "-"],
                ['Hora propuesta:', dataJSON.seccion_6_proxima_reunion.hora_propuesta || "-"],
                ['Modalidad:', dataJSON.seccion_6_proxima_reunion.modalidad || "-"],
                ['Lugar/Plataforma:', dataJSON.seccion_6_proxima_reunion.lugar || "-"],
                ['Temas a tratar:', dataJSON.seccion_6_proxima_reunion.temas_a_tratar || "-"]
            ],
            theme: 'plain',
            styles: { font: 'times', fontSize: 9, cellPadding: 1.5, lineColor: [0, 0, 0], lineWidth: 0.1 },
            columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } },
            margin: { left: 15, right: 15 }
        });
        y = doc.lastAutoTable.finalY + 7;

        // 7. Observaciones Generales
        doc.setFont("times", "bold"); doc.text("7. OBSERVACIONES GENERALES", 15, y); y += 4;
        doc.setFont("times", "normal");
        let splitObs = doc.splitTextToSize(dataJSON.seccion_7_observaciones_generales || "-", 180);
        doc.text(splitObs, 15, y); y += (splitObs.length * 4) + 7;

        // 8. Firmas
        if (y > 200) { doc.addPage(); y = 15; }
        doc.setFont("times", "bold"); doc.text("8. FIRMA", 15, y); y += 5;
        doc.setFont("times", "normal");
        
        let textoConclusion = `Siendo las ${dataJSON.seccion_8_firma?.hora_firma || "--:--"} horas, se da por concluida la reunión, dejando constancia de los acuerdos y compromisos señalados en la presente acta.`;
        let splitConcl = doc.splitTextToSize(textoConclusion, 180);
        doc.text(splitConcl, 15, y); 
        y += (splitConcl.length * 4) + 6;

        // Firmas - tomamos desde dataJSON
        const src1 = dataJSON.seccion_8_firma?.firma_1_img || '';
        const src2 = dataJSON.seccion_8_firma?.firma_2_img || '';

        const hayFirma1 = src1 && src1.startsWith('data:image');
        const hayFirma2 = src2 && src2.startsWith('data:image');

        let yImagenes = y;

        if (hayFirma1) {
            try {
                let fmt1 = src1.includes('image/jpeg') || src1.includes('image/jpg') ? 'JPEG' : 'PNG';
                doc.addImage(src1, fmt1, 15, yImagenes, 45, 18);
            } catch(e) { console.error("Error al renderizar firma 1 en PDF:", e); }
        }

        if (hayFirma2) {
            try {
                let fmt2 = src2.includes('image/jpeg') || src2.includes('image/jpg') ? 'JPEG' : 'PNG';
                doc.addImage(src2, fmt2, 110, yImagenes, 45, 18);
            } catch(e) { console.error("Error al renderizar firma 2 en PDF:", e); }
        }

        y = (hayFirma1 || hayFirma2) ? yImagenes + 20 : y + 25;

        doc.setFont("times", "normal");
        doc.text("-----------------------------------------", 15, y);
        doc.text("-----------------------------------------", 110, y);

        y += 5;

        doc.text("Coordinador del equipo:", 15, y);
        doc.text("Elaborado por:", 110, y); y += 5;

        doc.setFont("times", "bold");
        doc.text(`Nombre: ${dataJSON.seccion_8_firma?.coordinador || "-"}`, 15, y);
        doc.text(`Nombre: ${dataJSON.seccion_8_firma?.elaborador || "-"}`, 110, y); y += 5;

        doc.setFont("times", "normal");
        doc.text(`Fecha: ${dataJSON.seccion_1_info_reunion?.fecha || "-"}`, 15, y);
        doc.text(`Fecha: ${dataJSON.seccion_1_info_reunion?.fecha || "-"}`, 110, y);

        doc.save(`Acta N° ${numActa}.pdf`);
    } catch (e) {
        alert("Ocurrió un error al generar el PDF: " + e.message);
    }
}

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        cerrarPrevisualizacion();
        cerrarModalTexto();
    }
});
