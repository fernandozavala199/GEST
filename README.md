# Sistema de Gestión de Ventas con Gestión de la Variabilidad (LPS)

> **UNEMI - Universidad Estatal de Milagro**  
> **Carrera de Software | Gestión de la Configuración del Software (8vo Nivel)**  
> **Componente Práctico 2:** Flujo CI/CD con Gestión de la Variabilidad del Software

---

## 🎯 Objetivo del Proyecto
Implementar una Línea de Productos de Software (Software Product Line - SPL) para un **Sistema de Gestión de Ventas** que permite generar **dos variantes funcionales** (`Básica` y `Premium`) a partir de una única base de código compartida (cero duplicación), gestionada mediante *Feature Flags*, control de versiones con Gitflow, integración continua (CI) con pruebas automatizadas y despliegue continuo (CD) mediante GitHub Actions.

---

## 🏗️ Modelo de Características (Feature Model)

```
                                  [Sistema de Ventas]
                                           |
                 +-------------------------+-------------------------+
                 |                         |                         |
            [Autenticación]          [Operaciones Base]         [Módulos Opcionales]
              (Obligatorio)             (Obligatorio)                (Opcional)
                                      /     |      \                  /          \
                                [Productos][Clientes][Ventas]  [Descuentos]   [Reportes]
                                                               (Opcional)     (Opcional)
                                                                                  |
                                                                           [Exportación CSV/JSON]
                                                                                 (Opcional)
```

### Matriz de Variabilidad de las Variantes

| Característica / Módulo | Variante Básica | Variante Premium | Tipo en Modelo |
| :--- | :---: | :---: | :---: |
| **Inicio de Sesión (Auth)** | ✅ Sí | ✅ Sí | Obligatorio (*Mandatory*) |
| **Catálogo de Productos** | ✅ Sí (Máx. 50) | ✅ Sí (Máx. 5000) | Obligatorio (*Mandatory*) |
| **Gestión de Clientes** | ✅ Sí | ✅ Sí | Obligatorio (*Mandatory*) |
| **Punto de Venta / Facturación** | ✅ Sí | ✅ Sí | Obligatorio (*Mandatory*) |
| **Gestión de Descuentos Promocionales** | ❌ No | ✅ Sí | Opcional (*Optional*) |
| **Reportes Estadísticos y Métricas** | ❌ No | ✅ Sí | Opcional (*Optional*) |
| **Exportación de Reportes (CSV/JSON)** | ❌ No | ✅ Sí | Opcional (*Requires Reports*) |

---

## 🚀 Puesta en Marcha Local

### Prerrequisitos
* Node.js v18 o superior
* npm v9 o superior

### Instalación y Ejecución
```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd componete-practico-2

# 2. Instalar dependencias
npm install

# 3. Validar consistencia del modelo de características
npm run validate:config

# 4. Ejecutar suite de pruebas unitarias automatizadas (7 pruebas)
npm test

# 5. Iniciar servidor de desarrollo local
npm run dev
```

---

## 🔄 Flujo CI/CD con GitHub Actions

El flujo automatizado se ejecuta en `.github/workflows/ci-cd.yml`:

1. **Integración Continua (CI)**:
   * **Checkout**: Descarga del código fuente.
   * **Setup Node.js**: Preparación del entorno de ejecución.
   * **npm ci**: Instalación limpia de dependencias.
   * **Validación de Variabilidad**: Ejecución de `scripts/validate-config.js` para asegurar que las configuraciones de variantes sean válidas.
   * **Pruebas Automatizadas**: Ejecución de las 7 pruebas unitarias con Vitest.
   * **Compilación (Build)**: Generación del artefacto de distribución optimizado (`dist/`).
   * **Subida de Artefacto**: Empaquetado y subida descargable mediante `actions/upload-artifact@v4`.

2. **Despliegue Continuo (CD)**:
   * Condicionado estrictamente al éxito de las pruebas y la compilación.
   * Despliegue automático a producción (GitHub Pages / Vercel).

---

## 🏷️ Versionado Semántico y Releases
* **v1.0.0**: Primera versión estable del sistema comercial con arquitectura base y soporte para variante Básica.
* **v1.1.0**: Incorporación del módulo avanzado de métricas, descuentos dinámicos y exportación de reportes (Variante Premium).
