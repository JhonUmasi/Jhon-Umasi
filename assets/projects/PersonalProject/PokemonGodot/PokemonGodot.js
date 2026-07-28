const changelogData = [
    {
        version: "v1.1",
        date: "25 de Julio, 2026",
        changes: [
            "Reorganizacion mejor de datos csv y json",
            "Sistema de evolucion por nivel",
            "Sistema de experiencia",
            "Sistema de batalla por turnos",
            "Sistema de uso de items en batalla y fuera de batalla",
            "Sistema de cambio de pokemon en batalla",
            "Escena de Pokemon",
            "Escena de Evoluciones",
            "Escena de Mochila",
            "Escena de los 6 pokemons que se lleva",
            "Escena de batallas pokemon",
            "Plugin - Editor de los movimientos",
            "Plugin - Editor de propiedades base de los pokemons",
            "Plugin - Editor de Ataques que aprende un pokemon",
            "Plugin - Editor de Item(sprite, propiedades)",
            "Plugin - Editor de NPCs",
            "Plugin - Editor de Sprite de pokemons",
            "Plugin - Generador de pokemons en escena",
            "Plugin - Generador de items en escena",

        ]
    },
    {
        version: "v1",
        date: "Diciembre, 2025",
        changes: [
            "Primera versión estable del editor.",
            "Plugin de editor de sprite",
            "Integración de interfaz limpia para gestión rápida."
        ]
    }
];

function cargarChangelog() {
    const container = document.getElementById('changelog-container');
    if (!container) return;
    
    container.innerHTML = ''; 

    changelogData.forEach(item => {
        const entry = document.createElement('div');
        entry.style.padding = '12px 0';
        entry.style.borderBottom = '1px solid var(--border-line)';

        const changesList = item.changes.map(change => `<li style="margin-bottom: 4px;">${change}</li>`).join('');

        entry.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
                <strong style="font-size: 0.95rem; color: var(--text-dark);">${item.version}</strong>
                <span style="font-size: 0.8rem; color: var(--text-muted);">${item.date}</span>
            </div>
            <ul style="padding-left: 18px; color: var(--text-muted); font-size: 0.85rem;">
                ${changesList}
            </ul>
        `;

        container.appendChild(entry);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    cargarChangelog();
});