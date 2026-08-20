---
# Definición oficial, tags y beneficios: contenido.md (presentación "Solution
# Riesgos — Junio 2026"). Slug "riesgo-de-credito" confirmado.
title: "Riesgo de crédito"
description: "Genera los indicadores que permiten medir la probabilidad de pérdida por incumplimiento en los pagos de cualquier tipo de deuda por parte del deudor."
highlights:
  - "Pérdida esperada"
  - "Análisis de cosechas"
  - "Cartera total"
  - "Calidad de cartera"
  - "Cobertura de cartera"
  - "Concentración de cartera"
# Vista previa del dashboard. TODO: los KPIs son cifras ILUSTRATIVAS del mockup de
# Figma (no datos reales de ningún cliente). Los `image` apuntan a capturas que
# aún NO existen: AppImage mostrará un placeholder hasta que las sueltes en
# src/assets/images/modules/riesgo-de-credito/.
dashboard:
  kpis:
    - label: "Cartera bruta"
      value: "$259,750M"
    - label: "Cartera vencida > 30 días"
      value: "$7,336M"
    - label: "ICV > 30 días"
      value: "2.82%"
      tone: "primary"
    - label: "Total deudores"
      value: "38"
    - label: "Deudores vencidos"
      value: "15"
      tone: "danger"
  charts:
    - title: "Cartera por línea ($M)"
      image: "modules/riesgo-de-credito/cartera-por-linea"
    - title: "Concentración por sector (%)"
      image: "modules/riesgo-de-credito/concentracion-por-sector"
    - title: "Calidad de cartera por calificación (%)"
      image: "modules/riesgo-de-credito/calidad-de-cartera"
    - title: "Cobertura de cartera vencida (%)"
      image: "modules/riesgo-de-credito/cobertura-cartera-vencida"
benefits:
  title: "Beneficios para tu comité de riesgo"
  items:
    - title: "Anticipa el deterioro"
      description: "El análisis de cosechas y la pérdida esperada permiten detectar deterioro de la cartera antes de que impacte los estados financieros."
    - title: "Controla la concentración"
      description: "Visualiza la exposición por sector, línea y deudor para mantener los límites definidos por la junta directiva."
    - title: "Reporta sin esfuerzo"
      description: "Tableros listos para el comité de riesgo y los reportes regulatorios, sin hojas de cálculo intermedias."
order: 1
---
