// ==========================================
// DATOS INICIALES - Tareas de ejemplo
// ==========================================
const initialTasks = [
    {
        id: 'TASK-001',
        title: 'Implementar autenticación de usuarios',
        description: 'Crear sistema de login con JWT y validación de credenciales',
        priority: 'high',
        status: 'todo',
        assignee: 'Juan Pérez',
        initials: 'JP'
    },
    {
        id: 'TASK-002',
        title: 'Diseñar componente de tablero',
        description: 'Crear mockups del tablero Kanban en Figma',
        priority: 'high',
        status: 'todo',
        assignee: 'María García',
        initials: 'MG'
    },
    {
        id: 'TASK-003',
        title: 'Configurar base de datos',
        description: 'Instalar MongoDB y configurar esquemas iniciales',
        priority: 'medium',
        status: 'progress',
        assignee: 'Carlos Ruiz',
        initials: 'CR'
    },
    {
        id: 'TASK-004',
        title: 'Implementar drag & drop',
        description: 'Añadir funcionalidad de arrastrar y soltar tareas',
        priority: 'medium',
        status: 'progress',
        assignee: 'Ana López',
        initials: 'AL'
    },
    {
        id: 'TASK-005',
        title: 'Crear documentación API',
        description: 'Documentar endpoints con Swagger',
        priority: 'low',
        status: 'done',
        assignee: 'Pedro Martínez',
        initials: 'PM'
    },
    {
        id: 'TASK-006',
        title: 'Setup del proyecto',
        description: 'Inicializar repositorio y configurar estructura',
        priority: 'high',
        status: 'done',
        assignee: 'Laura Sánchez',
        initials: 'LS'
    }
];

// ==========================================
// CLASE KANBAN BOARD
// ==========================================
/**
 * Clase principal que gestiona el tablero Kanban
 * Maneja el renderizado, drag & drop y actualización de datos
 */
class KanbanBoard {
    /**
     * Constructor de la clase
     * @param {Array} tasks - Array de objetos con las tareas iniciales
     */
    constructor(tasks) {
        this.tasks = tasks; // Almacena las tareas
        this.draggedElement = null; // Referencia al elemento que se está arrastrando
        this.init(); // Inicializa el tablero
    }

    /**
     * Inicializa el tablero Kanban
     * Renderiza las tareas, configura eventos y actualiza contadores
     */
    init() {
        this.renderTasks();
        this.setupDragAndDrop();
        this.updateTaskCounts();
    }

    /**
     * Renderiza todas las tareas en sus columnas correspondientes
     * Limpia las columnas existentes y vuelve a crear las tarjetas
     */
    renderTasks() {
        // Limpiar todas las columnas antes de renderizar
        document.querySelectorAll('.tasks-container').forEach(container => {
            container.innerHTML = '';
        });

        // Crear y agregar cada tarjeta a su columna
        this.tasks.forEach(task => {
            const taskCard = this.createTaskCard(task);
            const container = document.querySelector(`.tasks-container[data-status="${task.status}"]`);
            if (container) {
                container.appendChild(taskCard);
            }
        });
    }

    /**
     * Crea el elemento DOM de una tarjeta de tarea
     * @param {Object} task - Objeto con los datos de la tarea
     * @returns {HTMLElement} - Elemento article con la estructura completa
     */
    createTaskCard(task) {
        // Crear elemento principal
        const card = document.createElement('article');
        card.className = 'task-card';
        card.draggable = true; // Hacer la tarjeta arrastrable
        card.dataset.taskId = task.id; // Guardar ID en data attribute
        card.dataset.status = task.status; // Guardar estado actual

        // Construir el HTML interno de la tarjeta
        card.innerHTML = `
            <div class="task-header">
                <h3 class="task-title">${task.title}</h3>
                <span class="task-priority priority-${task.priority}">${task.priority}</span>
            </div>
            <p class="task-description">${task.description}</p>
            <div class="task-footer">
                <div class="task-assignee">
                    <div class="avatar">${task.initials}</div>
                    <span>${task.assignee}</span>
                </div>
                <span class="task-id">${task.id}</span>
            </div>
        `;

        return card;
    }

    /**
     * Configura todos los event listeners para Drag & Drop
     * Utiliza delegación de eventos para mejor rendimiento
     */
    setupDragAndDrop() {
        // Eventos para las tarjetas (elementos arrastrables)
        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('task-card')) {
                this.handleDragStart(e);
            }
        });

        document.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('task-card')) {
                this.handleDragEnd(e);
            }
        });

        // Eventos para las zonas de drop (contenedores)
        document.querySelectorAll('.tasks-container').forEach(container => {
            // dragover: Se dispara continuamente mientras se arrastra sobre el elemento
            container.addEventListener('dragover', (e) => this.handleDragOver(e));
            
            // dragenter: Se dispara cuando el elemento entra en la zona
            container.addEventListener('dragenter', (e) => this.handleDragEnter(e));
            
            // dragleave: Se dispara cuando el elemento sale de la zona
            container.addEventListener('dragleave', (e) => this.handleDragLeave(e));
            
            // drop: Se dispara cuando se suelta el elemento
            container.addEventListener('drop', (e) => this.handleDrop(e));
        });
    }

    /**
     * Maneja el inicio del arrastre de una tarjeta
     * @param {DragEvent} e - Evento de arrastre
     */
    handleDragStart(e) {
        // Guardar referencia al elemento que se está arrastrando
        this.draggedElement = e.target;
        
        // Añadir clase para efecto visual
        e.target.classList.add('dragging');
        
        // Configurar tipo de efecto de arrastre
        e.dataTransfer.effectAllowed = 'move';
        
        // Guardar datos (requerido por algunos navegadores)
        e.dataTransfer.setData('text/html', e.target.innerHTML);
    }

    /**
     * Maneja el fin del arrastre de una tarjeta
     * @param {DragEvent} e - Evento de arrastre
     */
    handleDragEnd(e) {
        // Remover clase de efecto visual
        e.target.classList.remove('dragging');
        
        // Limpiar efectos visuales de todas las zonas
        document.querySelectorAll('.tasks-container').forEach(container => {
            container.classList.remove('drag-over');
        });
    }

    /**
     * Maneja el evento dragover para permitir el drop
     * @param {DragEvent} e - Evento de arrastre
     * @returns {boolean} - false para permitir el drop
     */
    handleDragOver(e) {
        // Prevenir comportamiento por defecto (necesario para permitir drop)
        if (e.preventDefault) {
            e.preventDefault();
        }
        
        // Indicar que el efecto será mover
        e.dataTransfer.dropEffect = 'move';
        
        return false;
    }

    /**
     * Maneja cuando el elemento entra a una zona de drop
     * @param {DragEvent} e - Evento de arrastre
     */
    handleDragEnter(e) {
        // Añadir efecto visual cuando entra a la zona
        if (e.target.classList.contains('tasks-container')) {
            e.target.classList.add('drag-over');
        }
    }

    /**
     * Maneja cuando el elemento sale de una zona de drop
     * @param {DragEvent} e - Evento de arrastre
     */
    handleDragLeave(e) {
        // Remover efecto visual cuando sale de la zona
        if (e.target.classList.contains('tasks-container')) {
            e.target.classList.remove('drag-over');
        }
    }

    /**
     * Maneja el evento drop cuando se suelta una tarjeta
     * @param {DragEvent} e - Evento de arrastre
     * @returns {boolean} - false para prevenir propagación
     */
    handleDrop(e) {
        // Prevenir comportamiento por defecto y propagación
        if (e.stopPropagation) {
            e.stopPropagation();
        }

        // Obtener el contenedor donde se soltó
        const container = e.target.closest('.tasks-container');
        if (!container || !this.draggedElement) return;

        // Obtener el nuevo estado basado en la columna
        const newStatus = container.dataset.status;
        const taskId = this.draggedElement.dataset.taskId;

        // Actualizar el estado en el array de datos
        const taskIndex = this.tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
            this.tasks[taskIndex].status = newStatus;
        }

        // Mover visualmente la tarjeta al nuevo contenedor
        container.appendChild(this.draggedElement);
        this.draggedElement.dataset.status = newStatus;

        // Actualizar contadores de todas las columnas
        this.updateTaskCounts();

        // Remover efecto visual
        container.classList.remove('drag-over');

        // Log para debugging
        console.log(`Tarea ${taskId} movida a ${newStatus}`);

        return false;
    }

    /**
     * Actualiza los badges con el conteo de tareas por columna
     * Cuenta las tareas de cada estado y actualiza el DOM
     */
    updateTaskCounts() {
        // Objeto para almacenar los conteos
        const statusCounts = {
            todo: 0,
            progress: 0,
            done: 0
        };

        // Contar tareas por estado
        this.tasks.forEach(task => {
            if (statusCounts.hasOwnProperty(task.status)) {
                statusCounts[task.status]++;
            }
        });

        // Actualizar los badges en el DOM
        Object.keys(statusCounts).forEach(status => {
            const badge = document.querySelector(`[data-count="${status}"]`);
            if (badge) {
                badge.textContent = statusCounts[status];
            }
        });
    }

    /**
     * Agrega una nueva tarea al tablero
     * @param {Object} task - Objeto con los datos de la nueva tarea
     */
    addTask(task) {
        this.tasks.push(task);
        const taskCard = this.createTaskCard(task);
        const container = document.querySelector(`.tasks-container[data-status="${task.status}"]`);
        if (container) {
            container.appendChild(taskCard);
        }
        this.updateTaskCounts();
        console.log(`Nueva tarea agregada: ${task.id}`);
    }

    /**
     * Elimina una tarea del tablero
     * @param {string} taskId - ID de la tarea a eliminar
     */
    removeTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        const taskCard = document.querySelector(`[data-task-id="${taskId}"]`);
        if (taskCard) {
            taskCard.remove();
        }
        this.updateTaskCounts();
        console.log(`Tarea eliminada: ${taskId}`);
    }
}

// ==========================================
// INICIALIZACIÓN
// ==========================================
/**
 * Esperar a que el DOM esté completamente cargado
 * antes de inicializar el tablero
 */
document.addEventListener('DOMContentLoaded', () => {
    // Crear instancia del tablero con tareas iniciales
    const kanbanBoard = new KanbanBoard(initialTasks);
    
    // Hacer la instancia global para debugging
    window.kanbanBoard = kanbanBoard;
    
    // Log de confirmación
    console.log('✅ Tablero Kanban inicializado correctamente');
    console.log(`📊 Total de tareas: ${kanbanBoard.tasks.length}`);
    console.log('💡 Usa window.kanbanBoard desde la consola para interactuar');
});