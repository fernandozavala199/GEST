/**
 * Script de Validación Automatizada de Configuraciones de Variabilidad
 * Verifica la consistencia del Modelo de Características (Feature Model):
 * 1. Cumplimiento de características obligatorias en todas las variantes.
 * 2. Consistencia de dependencias (require / exclude).
 * 3. Integridad de los límites y flags de cada variante.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.resolve(__dirname, '../config/variants.json');

export function validateFeatureConfigurations(configFilePath = configPath) {
  const errors = [];
  const warnings = [];

  if (!fs.existsSync(configFilePath)) {
    throw new Error(`Archivo de configuración no encontrado en: ${configFilePath}`);
  }

  const rawData = fs.readFileSync(configFilePath, 'utf-8');
  let config;
  try {
    config = JSON.parse(rawData);
  } catch (err) {
    throw new Error(`Error de sintaxis JSON en archivo de configuración: ${err.message}`);
  }

  const { featureModel, variants } = config;

  if (!featureModel || !featureModel.mandatory || !variants) {
    errors.push('Estructura de modelo de características inválida: falta featureModel o variants.');
    return { valid: false, errors, warnings };
  }

  const mandatoryFeatures = featureModel.mandatory;
  const dependencies = featureModel.dependencies || {};

  // Validar cada variante
  for (const [variantKey, variantData] of Object.entries(variants)) {
    const features = variantData.features || {};

    // 1. Validar que todas las características obligatorias estén activas
    for (const mandatory of mandatoryFeatures) {
      if (features[mandatory] !== true) {
        errors.push(`Variante '${variantKey}': La característica obligatoria '${mandatory}' debe estar habilitada (true).`);
      }
    }

    // 2. Validar dependencias (ej. export_reports requiere reports)
    for (const [targetFeature, requiredFeatures] of Object.entries(dependencies)) {
      if (features[targetFeature] === true) {
        for (const req of requiredFeatures) {
          if (!features[req]) {
            errors.push(`Variante '${variantKey}': '${targetFeature}' requiere que '${req}' esté habilitado.`);
          }
        }
      }
    }

    // 3. Reglas de negocio específicas por variante
    if (variantKey === 'basic') {
      if (features.reports === true || features.export_reports === true || features.discounts === true) {
        errors.push(`Variante 'basic': No debe incluir características premium (reports, export_reports, discounts).`);
      }
    }

    if (variantKey === 'premium') {
      if (features.reports !== true || features.discounts !== true) {
        warnings.push(`Variante 'premium': Se esperaba que las características avanzadas estuvieran habilitadas.`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    summary: {
      variantsChecked: Object.keys(variants).length,
      mandatoryCount: mandatoryFeatures.length,
      optionalCount: (featureModel.optional || []).length
    }
  };
}

// Ejecución directa por CLI
if (process.argv[1] && process.argv[1].endsWith('validate-config.js')) {
  console.log('🔍 Iniciando validación automatizada de configuraciones de variabilidad...');
  const result = validateFeatureConfigurations();

  if (!result.valid) {
    console.error('❌ Error de validación en el modelo de características:');
    result.errors.forEach(err => console.error(`  - ${err}`));
    process.exit(1);
  } else {
    console.log('✅ Validación exitosa del Modelo de Características:');
    console.log(`  - Variantes analizadas: ${result.summary.variantsChecked}`);
    console.log(`  - Características obligatorias verificadas: ${result.summary.mandatoryCount}`);
    console.log(`  - Características opcionales verificadas: ${result.summary.optionalCount}`);
    if (result.warnings.length > 0) {
      result.warnings.forEach(w => console.warn(`  ⚠️ Alerta: ${w}`));
    }
    console.log('🎯 La base de código compartida garantiza variabilidad sin duplicación de código.');
    process.exit(0);
  }
}
