---
# Definición oficial, tags y beneficios: contenido.md. Slug confirmado.
# TODO: el `dashboard` sigue mostrando KPIs/gráficos de cartera de crédito
# (placeholder heredado); no corresponden a este módulo. Reemplazar por el
# tablero real de riesgo operacional cuando esté disponible.
title: "Riesgo operacional"
description: "Mide la posibilidad de que la entidad sufra pérdidas debido a fallos en sus procesos internos, errores humanos, problemas tecnológicos o eventos externos."
highlights:
  - "Mapa de procesos"
  - "Mapa de riesgos"
  - "Matrices de riesgos"
  - "Registro de eventos de riesgo"
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
      image: "modules/riesgo-operacional/cartera-por-linea"
    - title: "Concentración por sector (%)"
      image: "modules/riesgo-operacional/concentracion-por-sector"
    - title: "Calidad de cartera por calificación (%)"
      image: "modules/riesgo-operacional/calidad-de-cartera"
    - title: "Cobertura de cartera vencida (%)"
      image: "modules/riesgo-operacional/cobertura-cartera-vencida"
benefits:
  title: "Beneficios para tu comité de riesgo"
  items:
    - title: "Visualiza dónde está el riesgo"
      description: "El mapa de procesos y el mapa de riesgos muestran en qué punto de la operación se concentran las mayores exposiciones."
    - title: "Estandariza el registro de eventos"
      description: "Cada evento de riesgo queda documentado en un solo lugar, trazable para auditoría."
    - title: "Prioriza con matrices claras"
      description: "Las matrices de riesgo ayudan a priorizar qué procesos intervenir primero."
order: 6
---
