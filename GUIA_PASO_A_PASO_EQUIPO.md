# 📘 Guía Paso a Paso para el Equipo de Trabajo

Esta guía explica detalladamente cómo conectar el proyecto local con GitHub, registrar la participación colaborativa de los integrantes, provocar intencionalmente el fallo de la prueba para la evidencia, y activar el despliegue automático.

---

## 1. Conectar el Proyecto Local a GitHub

1. Entra a tu cuenta de [GitHub](https://github.com) y crea un nuevo repositorio público o privado (por ejemplo: `practico2-gestion-software`). **No marques** "Add README" ni ".gitignore" (ya los tenemos creados).
2. En la terminal de esta carpeta, ejecuta:

```bash
# Vincular el repositorio remoto (reemplaza con la URL de tu repositorio)
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git

# Subir las ramas main y develop
git push -u origin main
git push -u origin develop

# Subir los tags de los dos releases semánticos (v1.0.0 y v1.1.0)
git push --tags
```

---

## 2. Registro Colaborativo de Integrantes y Ramas (Fase 2)

Para cumplir con la rúbrica (*"Evidenciar commits de todos los integrantes, integración mediante Pull Request e historial de modificaciones"*):

Cada integrante del grupo puede clonar el repositorio o trabajar desde una rama de característica (`feature/...`) asignada:

* **Estudiante 1 (Líder / CI-CD):**
  ```bash
  git checkout develop
  git checkout -b feature/ci-cd-pipeline
  # Realiza modificaciones o ajustes en .github/workflows/ci-cd.yml
  git add .
  git commit -m "ci: configure automated pipeline and artifact generation"
  git push origin feature/ci-cd-pipeline
  ```
* **Estudiante 2 (Módulo de Autenticación y Productos):**
  ```bash
  git checkout develop
  git checkout -b feature/auth-products
  # Ajustes o comentarios en Login.jsx / Products.jsx
  git add .
  git commit -m "feat(products): improve validation for product stock and catalog limits"
  git push origin feature/auth-products
  ```
* **Estudiante 3 (Módulo de Ventas y Facturación):**
  ```bash
  git checkout develop
  git checkout -b feature/sales-module
  # Ajustes en Sales.jsx / salesCalculator.js
  git add .
  git commit -m "feat(sales): integrate tax calculation and shopping cart state"
  git push origin feature/sales-module
  ```
* **Estudiante 4 (Variabilidad y Descuentos):**
  ```bash
  git checkout develop
  git checkout -b feature/discounts-variability
  # Ajustes en Discounts.jsx / variants.json
  git add .
  git commit -m "feat(variability): add discount feature flag for premium variant"
  git push origin feature/discounts-variability
  ```
* **Estudiante 5 (Reportes y Exportación):**
  ```bash
  git checkout develop
  git checkout -b feature/reports-export
  # Ajustes en Reports.jsx / exportUtils.js
  git add .
  git commit -m "feat(reports): implement analytical metrics and CSV/JSON export"
  git push origin feature/reports-export
  ```

### Creación de Pull Requests (PRs)
En la interfaz web de GitHub:
1. Ir a la pestaña **Pull requests** -> **New pull request**.
2. Seleccionar como base `develop` y comparar con la rama `feature/...`.
3. Asignar revisores entre los mismos compañeros del equipo.
4. Aprobar y presionar **Merge pull request**.

---

## 3. Cómo provocar el fallo intencional de una prueba (Fase 3)

La rúbrica exige: *"Provocar intencionalmente el fallo de una prueba, identificar el error en los registros, corregirlo y ejecutar nuevamente el flujo. Evidenciar una ejecución fallida y otra exitosa."*

### Paso A: Provocar el Fallo (Para tomar la captura de pantalla del error)
1. Abre el archivo `tests/salesSystem.test.js`.
2. En la **Prueba 1**, cambia el valor esperado de `expect(result.subtotal).toBe(1020.00);` por un valor erróneo:
   ```javascript
   expect(result.subtotal).toBe(9999.99); // << Provoca el fallo intencional
   ```
3. Guarda los cambios y haz commit y push a `develop`:
   ```bash
   git add tests/salesSystem.test.js
   git commit -m "test: simulate intentional test failure for CI evaluation"
   git push origin develop
   ```
4. Ve a GitHub -> pestaña **Actions**.
5. Verás el flujo ejecutándose y terminará en **Rojo (Failed ❌)**.
6. Entra a la ejecución, haz clic sobre el paso *5. Ejecución de pruebas unitarias automatizadas (Vitest)*.
7. **Toma una captura de pantalla clara** donde se vea el mensaje de error:
   `AssertionError: expected 1020 to be 9999.99`. Esta captura irá en tu informe técnico.

### Paso B: Corregir el Fallo
1. Vuelve a `tests/salesSystem.test.js` y restaura el valor correcto:
   ```javascript
   expect(result.subtotal).toBe(1020.00);
   ```
2. Guarda los cambios y haz commit y push:
   ```bash
   git add tests/salesSystem.test.js
   git commit -m "fix: resolve test assertion discrepancy in sales calculation"
   git push origin develop
   ```
3. Ve a GitHub Actions. Observarás que el flujo se ejecuta automáticamente y finaliza en **Verde (Success ✅)**.
4. **Toma una captura de pantalla** de la ejecución exitosa y del artefacto generado en la parte inferior (*Artifacts -> sales-system-production-build*).

---

## 4. Activación del Despliegue Continuo (CD en GitHub Pages)

Para que el job `deploy-production` publique automáticamente la web:
1. En tu repositorio de GitHub, haz clic en **Settings** (Configuración).
2. En el menú lateral izquierdo, haz clic en **Pages**.
3. En la sección **Build and deployment**:
   * En **Source**, selecciona: **GitHub Actions**.
4. ¡Listo! Cada vez que hagas merge a la rama `main`, GitHub Actions compilará el código, validará las pruebas y publicará tu aplicación en:
   `https://TU_USUARIO.github.io/TU_REPOSITORIO/`
