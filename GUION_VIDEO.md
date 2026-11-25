# 🎬 Guión Técnico para Video Explicativo (10 - 14 Minutos)

> **UNEMI - Facultad de Ciencias e Ingeniería**  
> **Carrera de Software | Gestión de la Configuración de Software**  
> **Componente Práctico 2:** Flujo de CI/CD con Gestión de la Variabilidad del Software

---

## 👥 Resumen de Asignación de Roles del Equipo

| Parte | Minutos | Tema Principal | Responsable |
| :--- | :---: | :--- | :--- |
| **Parte 1** | 00:00 - 01:00 (1 min) | Presentación del Grupo y Descripción del Sistema | **Fernando Zavala** |
| **Parte 2** | 01:00 - 03:00 (2 min) | Repositorio, Estrategia Gitflow, Ramas y Releases | **Andres Suarez** |
| **Parte 3** | 03:00 - 06:00 (3 min) | Flujo de Integración Continua (CI) y Artefactos | **Fernando Zavala** |
| **Parte 4** | 06:00 - 08:00 (2 min) | Demostración de Prueba Fallida y Corrección en CI | **Andres Suarez** |
| **Parte 5** | 08:00 - 10:00 (2 min) | Despliegue Continuo (CD) Condicionado a Pruebas | **Dennisse Cavero** |
| **Parte 6** | 10:00 - 13:00 (3 min) | Gestión de Variabilidad, Modelo de Características y Single Codebase | **Dennisse Cavero** |
| **Parte 7** | 13:00 - 14:00 (1 min) | Conclusiones Técnicas y Cierre | **Fernando, Dennisse y Andres** |

---

## ⏱️ Minuto a Minuto del Video

### PARTE 1: Presentación del Grupo y Sistema (00:00 - 01:00)
* **Qué mostrar en pantalla:** Diapositiva institucional UNEMI con nombres de los integrantes y luego la pantalla principal del Sistema de Ventas en el navegador.
* **Guión verbal (Integrante 1):**
  > "Saludos cordiales, ingeniera y compañeros. Somos el Grupo [Número de Grupo] de la carrera de Software de la UNEMI, cursando la asignatura de Gestión de la Configuración de Software. En este componente práctico presentamos la implementación integral de un flujo de Integración y Despliegue Continuo con gestión de la variabilidad del software. Abordamos la problemática de una empresa de desarrollo que requiere comercializar dos variantes de un sistema comercial sin incurrir en duplicidad de código fuente. A continuación, demostraremos técnicamente cada fase del proyecto."

---

### PARTE 2: Repositorio, Ramas e Historial de Cambios (01:00 - 03:00)
* **Qué mostrar en pantalla:** Interfaz de GitHub -> Vista del repositorio, pestaña de ramas (*Branches*), gráfico de commits (*Network graph*) y los dos Releases semánticos (`v1.0.0` y `v1.1.0`).
* **Guión verbal (Integrante 2):**
  > "Para la gestión de versiones implementamos el modelo de trabajo Gitflow sobre GitHub. Contamos con una rama principal `main` para código en estado productivo, una rama `develop` para la integración de cambios y ramas específicas `feature/...` asignadas a cada miembro del equipo. Como se puede observar en el historial de commits y Pull Requests, todos los integrantes participamos activamente. Además, aplicamos versionado semántico formal, generando dos releases: `v1.0.0`, correspondiente a la línea base y variante básica, y `v1.1.0`, que incorpora las características del paquete premium."

---

### PARTE 3: Integración Continua (CI) (03:00 - 06:00)
* **Qué mostrar en pantalla:** Archivo `.github/workflows/ci-cd.yml` en VS Code o GitHub, y luego la pestaña **Actions** mostrando la ejecución exitosa de los pasos de CI.
* **Guión verbal (Integrante 3):**
  > "El proceso de Integración Continua está automatizado mediante GitHub Actions. Nuestro pipeline se dispara con cada push o pull request. En el job de CI realizamos: primero, la obtención del código fuente mediante `checkout`; segundo, la preparación del entorno Node.js; tercero, la instalación limpia de dependencias; cuarto, la validación del modelo de características con nuestro script `validate-config.js`; y quinto, la ejecución de una batería de 7 pruebas unitarias con Vitest que evalúan lógica comercial, cálculo de impuestos ecuatorianos al 15% y aislamiento de permisos. Finalmente, se compila el proyecto y se genera un artefacto descargable `sales-system-production-build` mediante la acción oficial `upload-artifact`."

---

### PARTE 4: Demostración de Prueba Fallida y Corrección (06:00 - 08:00)
* **Qué mostrar en pantalla:** Vista de GitHub Actions con una ejecución en **Rojo (Failed)**, abriendo los logs detallados del fallo, y luego la ejecución subsiguiente en **Verde (Success)** con el commit de corrección.
* **Guión verbal (Integrante 4):**
  > "Como exige la rúbrica de evaluación, realizamos intencionalmente la simulación de un error. Alteramos una aserción en las pruebas unitarias esperando un valor incorrecto en el subtotal de venta. Al realizar push, observamos en GitHub Actions cómo el flujo falla inmediatamente marcando el paso en rojo y deteniendo la cadena antes de compilar o desplegar. Luego, identificamos la discrepancia en los logs `AssertionError`, realizamos el commit de corrección `fix: resolve test assertion discrepancy` y re-ejecutamos el flujo, logrando una ejecución 100% exitosa y validada."

---

### PARTE 5: Despliegue Continuo (CD) (08:00 - 10:00)
* **Qué mostrar en pantalla:** El bloque `deploy-production` en el workflow mostrando la cláusula `needs: build-and-test`, la ejecución en GitHub Actions y la página web en vivo cargada en el navegador.
* **Guión verbal (Integrante 5):**
  > "En la fase de Despliegue Continuo, el entorno productivo se encuentra alojado en GitHub Pages. La regla fundamental que hemos aplicado es la condicionalidad estricta: el job de despliegue depende exclusivamente de que el job de construcción y pruebas finalice con éxito (`needs: build-and-test`). Si alguna prueba falla, el sistema jamás se publica en producción. Al superar todos los controles en la rama `main`, la aplicación se despliega automáticamente en tiempo real."

---

### PARTE 6: Variantes y Reutilización de Código (10:00 - 13:00)
* **Qué mostrar en pantalla:** Diagrama del Modelo de Características (Feature Model), archivo `variants.json` y la aplicación web funcionando, alternando entre la **Variante Básica** y la **Variante Premium**.
* **Guión verbal (Integrante 2 y 3):**
  > "Para la gestión de variabilidad implementamos los principios de Líneas de Productos de Software. A partir de una única base de código fuente, gobernamos dos variantes mediante Feature Flags desacopladas:
  > - **Variante Básica:** Incluye las características obligatorias: inicio de sesión, catálogo de productos con tope de 50 registros, gestión de clientes y facturación estándar sin descuentos. Noten cómo los módulos de analítica y promociones se encuentran deshabilitados.
  > - **Variante Premium:** Al conmutar la configuración, la aplicación activa dinámicamente el módulo de cupones de descuento, la sección de reportes estadísticos con métricas financieras y el módulo de exportación de datos a formatos CSV y JSON.
  > Todo esto se valida automáticamente con nuestro validador sintáctico y semántico, garantizando cero duplicación de repositorios o código espagueti."

---

### PARTE 7: Conclusiones y Cierre (13:00 - 14:00)
* **Qué mostrar en pantalla:** Diapositiva o pantalla final con las conclusiones y despedida del equipo.
* **Guión verbal (Todos / Integrante 1):**
  > "En conclusión, este componente práctico nos permitió evidenciar cómo las herramientas de configuración de software, integración continua y líneas de productos reducen drásticamente los errores de integración, protegen la estabilidad del código en producción y permiten comercializar múltiples soluciones de software de forma escalable y profesional. Muchas gracias."
