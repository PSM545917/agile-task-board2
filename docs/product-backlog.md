Product Backlog - Agile Task Board

Sistema de Gestión de Tareas para Equipos Ágiles



US-001: Autenticación de Usuarios

Como miembro del equipo

Quiero poder registrarme e iniciar sesión en el sistema

Para acceder de forma segura a mis proyectos y tareas

Criterios de Aceptación:



El usuario puede registrarse con email y contraseña

El sistema valida que el email sea único

La contraseña debe tener mínimo 8 caracteres

El usuario puede iniciar sesión con sus credenciales

El sistema muestra mensajes de error claros en caso de credenciales incorrectas

La sesión se mantiene activa hasta que el usuario cierre sesión



Story Points: 5

Prioridad: Alta



US-002: Visualización del Tablero Kanban

Como miembro del equipo

Quiero visualizar un tablero Kanban con columnas personalizables

Para tener una vista clara del flujo de trabajo del proyecto

Criterios de Aceptación:



El tablero muestra al menos 3 columnas por defecto: "Por Hacer", "En Progreso", "Completado"

Las tarjetas de tareas se muestran en sus columnas correspondientes

El tablero es responsive y se adapta a diferentes tamaños de pantalla

Se muestra el número de tareas en cada columna

El usuario puede cambiar entre diferentes proyectos/tableros



Story Points: 8

Prioridad: Alta



US-003: Creación de Tareas

Como Product Owner

Quiero crear nuevas tareas con título, descripción y prioridad

Para definir el trabajo que debe realizar el equipo

Criterios de Aceptación:



El usuario puede crear una tarea desde cualquier columna del tablero

Los campos obligatorios son: título (máximo 100 caracteres)

Los campos opcionales son: descripción, prioridad (Alta/Media/Baja), fecha límite

La tarea se crea en el estado correspondiente a la columna seleccionada

El sistema muestra confirmación visual al crear la tarea

La nueva tarea aparece inmediatamente en el tablero



Story Points: 3

Prioridad: Alta



US-004: Asignación de Tareas

Como Scrum Master

Quiero asignar tareas a miembros específicos del equipo

Para distribuir la carga de trabajo y clarificar responsabilidades

Criterios de Aceptación:



El usuario puede asignar una tarea a uno o varios miembros del equipo

Se muestra una lista de miembros disponibles del proyecto

La tarjeta muestra visualmente quién está asignado (avatar o iniciales)

El usuario puede reasignar o desasignar tareas

Los miembros asignados reciben notificación de la asignación

Se puede filtrar el tablero por tareas asignadas a un usuario específico



Story Points: 5

Prioridad: Alta



US-005: Gestión de Estados de Tareas

Como desarrollador

Quiero mover tareas entre diferentes estados mediante drag \& drop

Para actualizar el progreso del trabajo de forma intuitiva

Criterios de Aceptación:



El usuario puede arrastrar y soltar tareas entre columnas

El cambio de estado se guarda automáticamente

Se muestra feedback visual durante el arrastre

El sistema previene movimientos a columnas inválidas si existen reglas

Se registra un historial de cambios de estado con fecha y usuario

Las tareas se pueden mover también mediante menú contextual (clic derecho)



Story Points: 8

Prioridad: Media



US-006: Sistema de Comentarios

Como miembro del equipo

Quiero agregar comentarios a las tareas

Para comunicar actualizaciones, dudas o información relevante al equipo

Criterios de Aceptación:



El usuario puede abrir el detalle de una tarea

Dentro del detalle existe una sección de comentarios

Los comentarios muestran autor, fecha y hora

Se pueden agregar comentarios con formato de texto básico

Los comentarios se ordenan cronológicamente (más reciente primero)

Se puede editar o eliminar un comentario propio dentro de los primeros 15 minutos

Los miembros asignados reciben notificación de nuevos comentarios



Story Points: 5

Prioridad: Media



US-007: Dashboard de Reportes

Como Product Owner

Quiero visualizar métricas y reportes del proyecto

Para tomar decisiones basadas en datos y monitorear el progreso del equipo

Criterios de Aceptación:



El dashboard muestra: total de tareas, tareas por estado, tareas por prioridad

Se visualiza un gráfico de burndown del sprint actual

Se muestra el velocity del equipo (últimos 3 sprints)

Se indica el porcentaje de completitud del proyecto

Los datos se pueden filtrar por rango de fechas

Se muestra el tiempo promedio de las tareas en cada estado (lead time)

Los gráficos son interactivos y se actualizan en tiempo real



Story Points: 8

Prioridad: Baja



US-008: Filtros y Búsqueda de Tareas

Como miembro del equipo

Quiero filtrar y buscar tareas específicas

Para encontrar rápidamente la información que necesito sin revisar todo el tablero

Criterios de Aceptación:



Existe una barra de búsqueda visible en el tablero

Se puede buscar por título o descripción de tarea

Se pueden aplicar filtros por: asignado, prioridad, fecha límite, etiquetas

Los filtros se pueden combinar

El tablero muestra solo las tareas que cumplen los criterios

Se muestra un indicador de "filtros activos" cuando hay filtros aplicados

Se puede limpiar todos los filtros con un solo clic



Story Points: 3

Prioridad: Media

