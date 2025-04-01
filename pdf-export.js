// pdf-export.js - Script para exportar la matriz de consistencia a PDF

document.addEventListener('DOMContentLoaded', function() {
    // Agregar botón de exportación después del botón generar
    const inputContainer = document.querySelector('.input-container');
    const exportButton = document.createElement('button');
    exportButton.id = 'exportPdfButton';
    exportButton.textContent = 'Exportar a PDF';
    exportButton.style.display = 'none'; // Inicialmente oculto
    exportButton.classList.add('export-button');
    inputContainer.appendChild(exportButton);

    // Evento para exportar a PDF
    exportButton.addEventListener('click', exportToPdf);
});

// Función para mostrar el botón de exportación cuando hay una matriz generada
function showExportButton() {
    const exportButton = document.getElementById('exportPdfButton');
    if (exportButton) {
        exportButton.style.display = 'inline-block';
    }
}

// Función para ocultar el botón de exportación
function hideExportButton() {
    const exportButton = document.getElementById('exportPdfButton');
    if (exportButton) {
        exportButton.style.display = 'none';
    }
}

// Función para exportar el contenido a PDF usando la funcionalidad de impresión del navegador
function exportToPdf() {
    const matrixContainer = document.getElementById('matrixContainer');
    const researchTopic = document.getElementById('researchTopic').value;
    const loadingElement = document.getElementById('loading');
    
    if (!matrixContainer.innerHTML.trim()) {
        alert('No hay matriz para exportar. Por favor, genera una matriz primero.');
        return;
    }
    
    // Mostrar indicador de carga
    loadingElement.style.display = 'flex';
    loadingElement.querySelector('p').textContent = 'Preparando contenido para impresión...';
    
    try {
        
        // Crear un elemento temporal para el PDF sin afectar el diseño original
        const tempElement = document.createElement('div');
        tempElement.innerHTML = matrixContainer.innerHTML;
        tempElement.classList.add('pdf-container');
        document.body.appendChild(tempElement);
        
        // Aplicar estilos específicos para PDF
        stylePdfContent(tempElement);
        
        // Añadir un título y encabezado al PDF
        const header = document.createElement('div');
        header.classList.add('pdf-header');
        header.innerHTML = `
            <h1>Matriz de Consistencia</h1>
            <h2>Tema: ${researchTopic}</h2>
            <p>Generado el: ${new Date().toLocaleDateString()}</p>
        `;
        tempElement.prepend(header);

        // Ocultar todos los elementos del body excepto el temporal
        const bodyChildren = Array.from(document.body.children);
        bodyChildren.forEach(child => {
            if (child !== tempElement) {
                child.style.display = 'none';
            }
        });
        
        // Imprimir el contenido
        window.print();
        
        // Restaurar la visibilidad de los elementos ocultos
        bodyChildren.forEach(child => {
            if (child !== tempElement) {
                child.style.display = '';
            }
        });
        
        // Remover el elemento temporal
        document.body.removeChild(tempElement);
        
    } catch (error) {
        console.error("Error al preparar el contenido para impresión:", error);
        alert("Error al preparar el contenido para impresión: " + error.message);
    } finally {
        // Restaurar texto de carga y ocultar indicador
        loadingElement.querySelector('p').textContent = 'Generando matriz...';
        loadingElement.style.display = 'none';
    }
}

// Función para aplicar estilos específicos al contenido del PDF
function stylePdfContent(element) {
    // Aplicar estilos para el PDF
    element.style.padding = '20px';
    element.style.fontSize = '10pt';
    
    // Estilos para las secciones
    const sections = element.querySelectorAll('.matrix-section');
    sections.forEach(section => {
        section.style.marginBottom = '20px';
        section.style.pageBreakInside = 'avoid';
        section.style.width = '100%';
    });
    
    // Estilos para las tablas
    const tables = element.querySelectorAll('table');
    tables.forEach(table => {
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginBottom = '15px';
    });
    
    // Estilos para los encabezados de tabla y celdas
    const thElements = element.querySelectorAll('th');
    thElements.forEach(th => {
        th.style.backgroundColor = '#f2f2f2';
        th.style.border = '1px solid #ddd';
        th.style.padding = '8px';
        th.style.textAlign = 'left';
        th.style.fontWeight = 'bold';
    });
    
    const tdElements = element.querySelectorAll('td');
    tdElements.forEach(td => {
        td.style.border = '1px solid #ddd';
        td.style.padding = '8px';
    });
    
    // Estilos para los encabezados
    const headers = element.querySelectorAll('h2');
    headers.forEach(header => {
        header.style.color = '#333';
        header.style.borderBottom = '2px solid #333';
        header.style.paddingBottom = '5px';
        header.style.marginBottom = '10px';
    });
    
    // Estilos para las listas
    const lists = element.querySelectorAll('ul');
    lists.forEach(list => {
        list.style.margin = '0';
        list.style.paddingLeft = '20px';
    });
}