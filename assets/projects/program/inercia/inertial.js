    /* ==========================================================================
    ENGINEERING INERTIA CALCULATOR - AUTOCAD (CORREGIDO - CENTROIDE E INERCIA)
    ========================================================================== */

    const canvas = document.getElementById('cadCanvas');
    const ctx = canvas.getContext('2d');

    const SCALE = 6;
    const SNAP_DIST = 12;
    const RULER_MARGIN = 25;

    // Estados de Control
    let currentTool = 'line';
    let clickPoints = [];
    let entities = [];
    let mousePos = { x: 0, y: 0 };
    let snappedPos = { x: 0, y: 0 };
    let isSnapped = false;
    let isShiftPressed = false;
    let isOrthoMode = false;
    let currentDistance = '';
    let isTyping = false;

    // UI Elements
    const inputT = document.getElementById('input-t');
    const checkSnap = document.getElementById('check-snap');
    const instructions = document.getElementById('cad-instructions');
    const msgBox = document.getElementById('cad-msg-box');
    const btnCalculate = document.getElementById('btn-calculate');
    const btnClear = document.getElementById('btn-clear');

    const tools = {
        line: document.getElementById('tool-line'),
        circle: document.getElementById('tool-circle'),
        arc: document.getElementById('tool-arc')
    };

    // --- Eventos de Teclado ---
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Shift') {
            isShiftPressed = true;
            draw();
        }
        
        // Capturar números para distancia
        if (clickPoints.length > 0 && (currentTool === 'line' || currentTool === 'circle')) {
            if (!isNaN(e.key) && e.key !== ' ' && e.key !== 'Enter' && e.key !== 'Backspace' && e.key !== 'Escape') {
                currentDistance += e.key;
                isTyping = true;
                showMsg(`Distance: ${currentDistance} cm`, "rgba(197, 160, 89, 0.1)", "var(--text-primary)");
                draw();
            } else if (e.key === 'Enter' && currentDistance.length > 0) {
                const dist = parseFloat(currentDistance) * SCALE;
                const lastPoint = clickPoints[clickPoints.length - 1];
                
                if (currentTool === 'line') {
                    const angle = Math.atan2(mousePos.y - lastPoint.y, mousePos.x - lastPoint.x);
                    const newPoint = {
                        x: lastPoint.x + dist * Math.cos(angle),
                        y: lastPoint.y + dist * Math.sin(angle)
                    };
                    
                    if (isOrthoMode) {
                        if (Math.abs(Math.cos(angle)) > Math.abs(Math.sin(angle))) {
                            newPoint.y = lastPoint.y;
                        } else {
                            newPoint.x = lastPoint.x;
                        }
                    }
                    
                    clickPoints.push(newPoint);
                    if (clickPoints.length === 2) {
                        entities.push({ type: 'line', p1: clickPoints[0], p2: clickPoints[1] });
                        clickPoints = [];
                        currentDistance = '';
                        isTyping = false;
                        hideMsg();
                        draw();
                        updateEntityCount();
                    }
                }
            } else if (e.key === 'Backspace') {
                currentDistance = currentDistance.slice(0, -1);
                if (currentDistance.length === 0) {
                    hideMsg();
                    isTyping = false;
                } else {
                    showMsg(`Distance: ${currentDistance} cm`, "rgba(197, 160, 89, 0.1)", "var(--text-primary)");
                }
                draw();
            } else if (e.key === 'Escape') {
                currentDistance = '';
                isTyping = false;
                hideMsg();
                draw();
            }
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.key === 'Shift') {
            isShiftPressed = false;
            draw();
        }
    });

    // Selección de herramientas
    Object.keys(tools).forEach(tool => {
        if (tools[tool]) {
            tools[tool].addEventListener('click', () => {
                currentTool = tool;
                clickPoints = [];
                currentDistance = '';
                isTyping = false;
                hideMsg();
                Object.values(tools).forEach(b => b && b.classList.remove('active-tool'));
                tools[tool].classList.add('active-tool');
                updateInstructions();
                draw();
            });
        }
    });

    btnClear.addEventListener('click', () => {
        entities = [];
        clickPoints = [];
        currentDistance = '';
        isTyping = false;
        resetResults();
        hideMsg();
        draw();
        updateEntityCount();
    });

    btnCalculate.addEventListener('click', () => {
        if (validateAndCalculate()) {
            showMsg("Calculation successful: Closed polygon detected.", "rgba(27, 48, 34, 0.1)", "var(--text-primary)");
        }
    });

    // Eventos del Canvas
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mousePos.x = e.clientX - rect.left - RULER_MARGIN;
        mousePos.y = e.clientY - rect.top - RULER_MARGIN;

        if (mousePos.x < 0) mousePos.x = 0;
        if (mousePos.y < 0) mousePos.y = 0;

        // Ortho inteligente
        if (clickPoints.length > 0 && currentTool === 'line') {
            const p0 = clickPoints[0];
            const dx = mousePos.x - p0.x;
            const dy = mousePos.y - p0.y;
            
            const angle = Math.atan2(Math.abs(dy), Math.abs(dx));
            const angleDeg = angle * 180 / Math.PI;
            
            if (angleDeg < 15 || angleDeg > 75) {
                isOrthoMode = true;
                if (angleDeg < 15) {
                    mousePos.y = p0.y;
                } else {
                    mousePos.x = p0.x;
                }
            } else {
                isOrthoMode = false;
            }
        } else {
            isOrthoMode = false;
        }

        checkObjectSnap();
        draw();
    });

    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const clickXReal = e.clientX - rect.left;
        if (clickXReal < RULER_MARGIN) return;

        if (isTyping) {
            currentDistance = '';
            isTyping = false;
            hideMsg();
            return;
        }

        let targetPoint = getActiveTargetPoint();
        clickPoints.push(targetPoint);

        if (currentTool === 'line' && clickPoints.length === 2) {
            if (distance(clickPoints[0], clickPoints[1]) > 0.5) {
                entities.push({ type: 'line', p1: clickPoints[0], p2: clickPoints[1] });
            }
            clickPoints = [];
        } else if (currentTool === 'circle' && clickPoints.length === 2) {
            const r = distance(clickPoints[0], clickPoints[1]);
            if (r > 0.5) {
                entities.push({ type: 'circle', center: clickPoints[0], r: r });
            }
            clickPoints = [];
        } else if (currentTool === 'arc' && clickPoints.length === 3) {
            entities.push({ type: 'arc', p1: clickPoints[0], p2: clickPoints[1], hPt: clickPoints[2] });
            clickPoints = [];
        }

        updateInstructions();
        draw();
        updateEntityCount();
    });

    function getActiveTargetPoint() {
        let base = isSnapped ? { ...snappedPos } : { ...mousePos };
        if (clickPoints.length > 0 && currentTool === 'line' && isShiftPressed) {
            let p0 = clickPoints[0];
            if (Math.abs(base.x - p0.x) > Math.abs(base.y - p0.y)) {
                base.y = p0.y;
            } else {
                base.x = p0.x;
            }
        }
        return base;
    }

    function checkObjectSnap() {
        isSnapped = false;
        if (!checkSnap.checked || entities.length === 0) return;

        let minDist = SNAP_DIST;
        let bestSnap = null;

        entities.forEach(ent => {
            if (ent.type === 'line') {
                let d1 = distance(mousePos, ent.p1);
                if (d1 < minDist) { minDist = d1; bestSnap = ent.p1; }
                let d2 = distance(mousePos, ent.p2);
                if (d2 < minDist) { minDist = d2; bestSnap = ent.p2; }
            } else if (ent.type === 'circle') {
                let d = distance(mousePos, ent.center);
                if (d < minDist) { minDist = d; bestSnap = ent.center; }
            } else if (ent.type === 'arc') {
                let d1 = distance(mousePos, ent.p1);
                if (d1 < minDist) { minDist = d1; bestSnap = ent.p1; }
                let d2 = distance(mousePos, ent.p2);
                if (d2 < minDist) { minDist = d2; bestSnap = ent.p2; }
            }
        });

        if (bestSnap) { 
            snappedPos = { ...bestSnap };
            isSnapped = true; 
        }
    }

    // RENDERIZADOR
    function draw(globalCx = null, globalCy = null) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(RULER_MARGIN, RULER_MARGIN);

        const step1cm = SCALE;
        const step5cm = SCALE * 5;
        const drawW = canvas.width - RULER_MARGIN;
        const drawH = canvas.height - RULER_MARGIN;

        // Grilla 1 cm
        ctx.strokeStyle = 'rgba(27, 48, 34, 0.02)';
        ctx.lineWidth = 0.5;
        for (let x = 0; x < drawW; x += step1cm) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, drawH); ctx.stroke(); }
        for (let y = 0; y < drawH; y += step1cm) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(drawW, y); ctx.stroke(); }

        // Grilla 5 cm
        ctx.strokeStyle = 'rgba(27, 48, 34, 0.08)';
        ctx.lineWidth = 1;
        for (let x = 0; x < drawW; x += step5cm) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, drawH); ctx.stroke(); }
        for (let y = 0; y < drawH; y += step5cm) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(drawW, y); ctx.stroke(); }

        // Dibujar Entidades
        ctx.lineWidth = parseFloat(inputT.value) * SCALE || 2;
        ctx.strokeStyle = '#C5A059';
        ctx.lineCap = 'round';

        entities.forEach(ent => {
            if (ent.type === 'line') {
                ctx.beginPath();
                ctx.moveTo(ent.p1.x, ent.p1.y);
                ctx.lineTo(ent.p2.x, ent.p2.y);
                ctx.stroke();
            } else if (ent.type === 'circle') {
                ctx.beginPath();
                ctx.arc(ent.center.x, ent.center.y, ent.r, 0, 2 * Math.PI);
                ctx.stroke();
            } else if (ent.type === 'arc') {
                drawArcFrom2ExtremesAndHeight(ent.p1, ent.p2, ent.hPt);
            }
        });

        // Preview
        let currentTarget = getActiveTargetPoint();
        ctx.strokeStyle = 'rgba(197, 160, 89, 0.6)';
        ctx.setLineDash([4, 4]);

        if (clickPoints.length > 0) {
            if (currentTool === 'line') {
                ctx.beginPath();
                ctx.moveTo(clickPoints[0].x, clickPoints[0].y);
                ctx.lineTo(currentTarget.x, currentTarget.y);
                ctx.stroke();
                let distReal = distance(clickPoints[0], currentTarget) / SCALE;
                ctx.fillStyle = 'var(--text-primary)';
                ctx.font = '10px Inter';
                ctx.fillText(`L: ${distReal.toFixed(1)} cm`, currentTarget.x + 10, currentTarget.y - 10);
                
                if (isTyping && currentDistance.length > 0) {
                    ctx.fillStyle = '#a34747';
                    ctx.font = '12px Inter';
                    ctx.fillText(`✏️ ${currentDistance} cm`, currentTarget.x + 10, currentTarget.y + 20);
                }
            } else if (currentTool === 'circle') {
                const r = distance(clickPoints[0], currentTarget);
                ctx.beginPath();
                ctx.arc(clickPoints[0].x, clickPoints[0].y, r, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fillStyle = 'var(--text-primary)';
                ctx.font = '10px Inter';
                ctx.fillText(`R: ${(r / SCALE).toFixed(1)} cm`, currentTarget.x + 10, currentTarget.y - 10);
            } else if (currentTool === 'arc') {
                if (clickPoints.length === 1) {
                    ctx.beginPath();
                    ctx.moveTo(clickPoints[0].x, clickPoints[0].y);
                    ctx.lineTo(currentTarget.x, currentTarget.y);
                    ctx.stroke();
                } else if (clickPoints.length === 2) {
                    drawArcFrom2ExtremesAndHeight(clickPoints[0], clickPoints[1], currentTarget);
                }
            }
        }
        ctx.setLineDash([]);

        if (isSnapped) {
            ctx.strokeStyle = '#27b34c';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(snappedPos.x - 4, snappedPos.y - 4, 8, 8);
        }

        if (globalCx !== null && globalCy !== null) {
            ctx.strokeStyle = '#a34747';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([5, 3]);
            ctx.beginPath(); ctx.moveTo(0, globalCy); ctx.lineTo(drawW, globalCy); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(globalCx, 0); ctx.lineTo(globalCx, drawH); ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = '#a34747';
            ctx.beginPath();
            ctx.arc(globalCx, globalCy, 5, 0, 2 * Math.PI);
            ctx.fill();
        }

        ctx.restore();

        // Reglas
        ctx.fillStyle = '#f4f6f4';
        ctx.fillRect(0, 0, canvas.width, RULER_MARGIN);
        ctx.fillRect(0, 0, RULER_MARGIN, canvas.height);

        ctx.fillStyle = 'rgba(27, 48, 34, 0.4)';
        ctx.font = '9px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let x = 0; x < drawW; x += step1cm) {
            let realXCm = Math.round(x / SCALE);
            let px = x + RULER_MARGIN;
            if (realXCm % 5 === 0) { ctx.fillText(`${realXCm}`, px, RULER_MARGIN - 10); }
        }

        ctx.textAlign = 'right';
        for (let y = 0; y < drawH; y += step1cm) {
            let realYCm = Math.round((drawH - y) / SCALE);
            let py = y + RULER_MARGIN;
            if (realYCm % 5 === 0) { ctx.fillText(`${realYCm}`, RULER_MARGIN - 8, py); }
        }

        ctx.fillStyle = '#E1E8E1';
        ctx.fillRect(0, 0, RULER_MARGIN, RULER_MARGIN);
    }

    function drawArcFrom2ExtremesAndHeight(p1, p2, hPt) {
        const circle = getCircleFrom3Points(p1, p2, hPt);
        if (!circle) return;

        let ang1 = Math.atan2(p1.y - circle.y, p1.x - circle.x);
        let ang3 = Math.atan2(p2.y - circle.y, p2.x - circle.x);
        let ccw = (p2.y - p1.y) * (hPt.x - p1.x) - (p2.x - p1.x) * (hPt.y - p1.y) > 0;

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.r, ang1, ang3, ccw);
        ctx.stroke();
    }

    function getCircleFrom3Points(p1, p2, p3) {
        const temp = p2.x * p2.x + p2.y * p2.y;
        const bc = (p1.x * p1.x + p1.y * p1.y - temp) / 2;
        const cd = (temp - p3.x * p3.x - p3.y * p3.y) / 2;
        const det = (p1.x - p2.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p2.y);
        if (Math.abs(det) < 1.0e-5) return null;
        const cx = (bc * (p2.y - p3.y) - cd * (p1.y - p2.y)) / det;
        const cy = ((p1.x - p2.x) * cd - (p2.x - p3.x) * bc) / det;
        return { x: cx, y: cy, r: Math.sqrt((p1.x - cx) ** 2 + (p1.y - cy) ** 2) };
    }

    // --- CÁLCULO CORREGIDO USANDO INTEGRALES DE LÍNEA (TEOREMA DE GREEN) ---
    function calculateProperties(vertices) {
        const n = vertices.length;
        const drawH = canvas.height - RULER_MARGIN;
        
        // Convertir a coordenadas reales (cm) con origen en esquina inferior izquierda
        const pts = vertices.map(v => ({
            x: v.x / SCALE,
            y: (drawH - v.y) / SCALE
        }));
        
        let areaAccum = 0;
        let cxAccum = 0, cyAccum = 0;
        let IxxAccum = 0, IyyAccum = 0;
        
        for (let i = 0; i < n; i++) {
            const j = (i + 1) % n;
            const xi = pts[i].x;
            const yi = pts[i].y;
            const xj = pts[j].x;
            const yj = pts[j].y;
            
            // Producto cruzado para cálculo del área
            const cross = (xi * yj) - (xj * yi);
            areaAccum += cross;
            
            // Centroide con integrales de línea
            cxAccum += (xi + xj) * cross;
            cyAccum += (yi + yj) * cross;
            
            // Momentos de inercia con respecto al origen global
            IxxAccum += (yi * yi + yi * yj + yj * yj) * cross;
            IyyAccum += (xi * xi + xi * xj + xj * xj) * cross;
        }
        
        // El "signedArea" guarda el signo matemático real dependiente de la dirección del contorno
        const signedArea = areaAccum / 2;
        const area = Math.abs(signedArea);
        
        // Corrección crítica: dividir entre la versión CON SIGNO para cancelar giros horarios/antihorarios
        let cx = cxAccum / (6 * signedArea);
        let cy = cyAccum / (6 * signedArea);
        
        // Momentos de inercia globales absolutos
        let IxxGlobal = Math.abs(IxxAccum) / 12;
        let IyyGlobal = Math.abs(IyyAccum) / 12;
        
        // Teorema de Steiner Inverso para trasladar la inercia al Centroide propio de la figura
        let Ixx = IxxGlobal - area * cy * cy;
        let Iyy = IyyGlobal - area * cx * cx;
        
        return { area, cx, cy, Ixx, Iyy };
    }

    // VALIDACIÓN, ENCADENAMIENTO Y CÁLCULO
    function validateAndCalculate() {
        if (entities.length === 0) {
            showMsg("Error: Canvas is empty.", "rgba(163, 71, 71, 0.1)", "#a34747");
            resetResults();
            return false;
        }

        // Filtrar únicamente los tramos de línea recta
        let lines = entities.filter(e => e.type === 'line').map(e => ({ p1: { ...e.p1 }, p2: { ...e.p2 } }));

        if (lines.length < 3) {
            showMsg("Error: Not enough segments to form a polygon.", "rgba(163, 71, 71, 0.1)", "#a34747");
            resetResults();
            return false;
        }

        // Algoritmo de encadenamiento para ordenar líneas desordenadas extremo con extremo
        let orderedVertices = [lines[0].p1, lines[0].p2];
        lines.splice(0, 1); 

        const TOL = 2.5; 
        let pathClosedSuccessfully = true;

        while (lines.length > 0) {
            let lastPt = orderedVertices[orderedVertices.length - 1];
            let foundIndex = -1;
            
            for (let i = 0; i < lines.length; i++) {
                if (distance(lastPt, lines[i].p1) < TOL) {
                    orderedVertices.push(lines[i].p2);
                    foundIndex = i;
                    break;
                } else if (distance(lastPt, lines[i].p2) < TOL) {
                    orderedVertices.push(lines[i].p1);
                    foundIndex = i;
                    break;
                }
            }
            
            if (foundIndex !== -1) {
                lines.splice(foundIndex, 1);
            } else {
                pathClosedSuccessfully = false;
                break;
            }
        }

        // Comprobar si el último nodo conecta con el primero para cerrar el bucle
        if (!pathClosedSuccessfully || distance(orderedVertices[0], orderedVertices[orderedVertices.length - 1]) > TOL) {
            showMsg("Error: Open path or detached lines detected.", "rgba(163, 71, 71, 0.1)", "#a34747");
            resetResults();
            return false;
        }

        // Eliminar el nodo redundante de cierre
        orderedVertices.pop();

        // -------------------------------------------------------------------------
        // ¡NUEVO!: ENCONTRAR EL MÍNIMO X E Y (BOUNDING BOX) EN CM
        // -------------------------------------------------------------------------
        const drawH = canvas.height - RULER_MARGIN;
        
        let minXCm = Infinity;
        let minYCm = Infinity;

        orderedVertices.forEach(v => {
            const xCm = v.x / SCALE;
            const yCm = (drawH - v.y) / SCALE;
            if (xCm < minXCm) minXCm = xCm;
            if (yCm < minYCm) minYCm = yCm;
        });
        // -------------------------------------------------------------------------

        // Ejecutar el cálculo matemático limpio sobre el perímetro secuencial
        const props = calculateProperties(orderedVertices);
        
        // TRANSFORMAR A COORDENADAS RELATIVAS PROPIAS DE LA FIGURA
        const relativeCx = props.cx - minXCm;
        const relativeCy = props.cy - minYCm;

        // Nota matemática: Los momentos de Inercia Ixx e Iyy con respecto al Centroide 
        // NO se ven afectados por la traslación de coordenadas gracias al teorema de Steiner inverso
        // que ya aplicas en 'calculateProperties'. Siguen siendo idénticos y exactos.

        // Renderizar resultados RELATIVOS en el DOM HTML
        document.getElementById('res-area').textContent = props.area.toFixed(2);
        document.getElementById('res-cx').textContent = relativeCx.toFixed(2); // <--- Relativo
        document.getElementById('res-cy').textContent = relativeCy.toFixed(2); // <--- Relativo
        document.getElementById('res-ixx').textContent = props.Ixx.toFixed(2);
        document.getElementById('res-iyy').textContent = props.Iyy.toFixed(2);

        // Dibujar visualmente los ejes centroidales en la posición global real de la pantalla
        const cxPx = props.cx * SCALE;
        const cyPx = drawH - props.cy * SCALE;
        draw(cxPx, cyPx);

        return true;
    }



    function distance(p1, p2) {
        return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
    }

    function showMsg(text, bg, color) {
        msgBox.style.display = "block";
        msgBox.style.background = bg;
        msgBox.style.color = color;
        msgBox.style.border = `1px solid ${color}`;
        msgBox.textContent = text;
    }

    function hideMsg() {
        msgBox.style.display = "none";
    }

    function resetResults() {
        document.getElementById('res-area').textContent = "---";
        document.getElementById('res-cx').textContent = "---";
        document.getElementById('res-cy').textContent = "---";
        document.getElementById('res-ixx').textContent = "---";
        document.getElementById('res-iyy').textContent = "---";
    }

    function updateEntityCount() {
        const count = document.getElementById('entity-count');
        if (count) {
            count.textContent = `${entities.length} entities`;
        }
    }

    function updateInstructions() {
        if (currentTool === 'line') {
            instructions.innerHTML = `<i class="fas fa-pencil-alt"></i> <strong>Line:</strong> 2 clicks. Type a number for exact distance, press Enter. Smart Ortho aligns automatically.`;
        } else if (currentTool === 'circle') {
            instructions.innerHTML = `<i class="fas fa-circle"></i> <strong>Circle:</strong> 1st click center, 2nd click radius.`;
        } else if (currentTool === 'arc') {
            instructions.innerHTML = `<i class="fas fa-undo"></i> <strong>Arc:</strong> 1st click start, 2nd click end, 3rd click defines curve.`;
        }
    }

    // Inicializar Aplicación CAD
    updateInstructions();
    draw();
    updateEntityCount();
