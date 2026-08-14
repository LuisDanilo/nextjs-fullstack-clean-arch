# Clean Task App
Aplicación de ejemplo para gestionar tareas pendientes (TODO) utilizando Clean Architecture. Esta aplicación permite a los usuarios crear, leer, actualizar y eliminar tareas, siguiendo los principios de separación de responsabilidades y modularidad.

## Estructura del proyecto

El proyecto está organizado siguiendo la arquitectura limpia, con las siguientes capas principales:
- **Capa de Dominio**: Contiene las entidades, reglas de negocio e interfaces de repositorios. Esta capa es independiente de cualquier framework o tecnología específica. Define los objetos protagonistas, las reglas o restricciones que estén asociadas a ellos y y las interfaces que definen las operaciones de persistencia. Ejemplo: Una entidad "Task", una regla de negocio que restrinja la creación de tareas con un título vacío, una interfaz "TaskRepository" que define las operaciones de persistencia de la entidad.

- **Capa de Aplicación**: Contiene los casos de uso que definen la lógica de negocio de la aplicación. Define el flujo de trabajo para una tarea o funcionalidad en la aplicación, coordinando la interacción entre las entidades del dominio (y sus reglas de negocio asociadas) y los repositorios que persisten los resultados del flujo de trabajo. Ejemplo: Un caso de uso que representa la creación de tareas, donde se utiliza la entidad "Task", las reglas de negocio asociadas a la creación de una tarea y su persistencia a través de un repositorio. 

- **Capa de Infraestructura**: Contiene la implementación específica de los repositorios, servicios externos y cualquier otra dependencia tecnológica. Esta capa se encarga de la implementacion especifica de persistencia de datos mediante el uso de servicios externos. Ejemplo:  Una implementación de "TaskRepository" llamada "TaskSQLRepository" que utiliza una base de datos SQL para persistir las tareas.

- **Capa de Presentación**: Contiene la interfaz de usuario y los controladores que manejan las solicitudes del usuario. 

### Directorios principales

- **src/core/shared**: Contiene los elementos compartidos entre las diferentes funcionalidades de la aplicación, como entidades, reglas de negocio y utilidades.
    - **src/core/shared/domain**: Contiene las entidades, reglas de negocio comunes e interfaces de repositorios compartidos entre las diferentes funcionalidades de la aplicación.
- **src/core/features**: Contiene las funcionalidades específicas de la aplicación. Cada funcionalidad puede tener su propia estructura de capas (dominio, aplicación, infraestructura y presentación) si es necesario.
    - **src/core/features/\*\*/domain**: Contiene las entidades, reglas de negocio y repositorios específicos de una funcionalidad.
    - **src/core/features/\*\*/application**: Contiene los casos de uso de la funcionalidad, los cuales coordinan la ejecución de la lógica de negocio y las interfaces de repositorio de las entidades para la persistencia del resultado de dicha ejecución.
    - **src/core/features/\*\*/infrastructure**: Contiene la implementación específica de los repositorios del dominio de la funcionalidad.
    - **src/core/features/\*\*/presentation**: Contiene las interfaces de usuario de una funcionalidad.

