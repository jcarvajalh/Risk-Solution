---
# Definición oficial, tags y beneficios: contenido.md. Slug confirmado.
# TODO: el `dashboard` sigue mostrando KPIs/gráficos de cartera de crédito
# (placeholder heredado); no corresponden a este módulo. Reemplazar por el
# tablero real de BI cuando esté disponible.
title: "Business Intelligence"
description: "Recopila los principales datos de la organización y, mediante un proceso de análisis, los presenta de forma gráfica y entendible para facilitar la toma de decisiones."
highlights:
  - "Informe de gestión"
  - "Relación de solvencia"
  - "Patrimonio técnico"
  - "ROE / ROA"
  - "Flujo de efectivo"
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
      image: "modules/business-intelligence/cartera-por-linea"
    - title: "Concentración por sector (%)"
      image: "modules/business-intelligence/concentracion-por-sector"
    - title: "Calidad de cartera por calificación (%)"
      image: "modules/business-intelligence/calidad-de-cartera"
    - title: "Cobertura de cartera vencida (%)"
      image: "modules/business-intelligence/cobertura-cartera-vencida"
benefits:
  title: "Beneficios para tu comité de riesgo"
  items:
    - title: "Una sola fuente de verdad ejecutiva"
      description: "Convierte datos dispersos de toda la organización en un informe de gestión único y actualizado."
    - title: "Mide la rentabilidad de un vistazo"
      description: "ROE, ROA y patrimonio técnico disponibles sin construir el cálculo manualmente cada mes."
    - title: "Anticipa el flujo de caja"
      description: "El flujo de efectivo proyectado apoya decisiones financieras antes del cierre contable."
order: 4
---
