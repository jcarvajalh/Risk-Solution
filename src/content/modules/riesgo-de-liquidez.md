---
# TODO (pendiente 1 del CLAUDE.md): SLUG "riesgo-de-liquidez" derivado en kebab-case del nombre
# confirmado, pero SIN confirmar por ti. Si el oficial es otro, renombra el archivo.
# TODO (pendiente 4): descripción, tags, dashboard y beneficios son PLACEHOLDER
# (copiados de "riesgo de crédito" por indicación tuya). Reemplazar por el
# contenido real. Los KPIs son ILUSTRATIVOS (no datos de cliente) y las imágenes
# de gráfico aún no existen (AppImage muestra placeholder).
title: "Riesgo de liquidez"
description: "Administración del riesgo de crédito de principio a fin: monitorea la calidad de la cartera, anticipa la pérdida esperada y controla la concentración por sector y por línea."
highlights:
  - "Pérdida esperada"
  - "Análisis de cosechas"
  - "Cobertura"
  - "Calidad de cartera"
  - "Concentración por sector"
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
      image: "modules/riesgo-de-liquidez/cartera-por-linea"
    - title: "Concentración por sector (%)"
      image: "modules/riesgo-de-liquidez/concentracion-por-sector"
    - title: "Calidad de cartera por calificación (%)"
      image: "modules/riesgo-de-liquidez/calidad-de-cartera"
    - title: "Cobertura de cartera vencida (%)"
      image: "modules/riesgo-de-liquidez/cobertura-cartera-vencida"
benefits:
  title: "Beneficios para tu comité de riesgo"
  items:
    - title: "Anticipa el deterioro"
      description: "El análisis de cosechas y la pérdida esperada permiten detectar deterioro de la cartera antes de que impacte los estados financieros."
    - title: "Controla la concentración"
      description: "Visualiza la exposición por sector, línea y deudor para mantener los límites definidos por la junta directiva."
    - title: "Reporta sin esfuerzo"
      description: "Tableros listos para el comité de riesgo y los reportes regulatorios, sin hojas de cálculo intermedias."
order: 3
---
