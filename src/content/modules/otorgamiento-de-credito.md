---
# Definición oficial, tags y beneficios: contenido.md. Slug confirmado.
# TODO: el `dashboard` sigue mostrando KPIs/gráficos de cartera de crédito
# (placeholder heredado); no corresponden a este módulo. Reemplazar por el
# tablero real de otorgamiento cuando esté disponible.
title: "Otorgamiento de crédito"
description: "Analiza, mediante inteligencia artificial (IA), las variables necesarias para determinar si una persona natural o jurídica es candidata para obtener un crédito."
highlights:
  - "Indicadores por línea de crédito"
  - "Extracción de información con RPA"
  - "Estudios de crédito por industria"
  - "Scoring automático"
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
      image: "modules/otorgamiento-de-credito/cartera-por-linea"
    - title: "Concentración por sector (%)"
      image: "modules/otorgamiento-de-credito/concentracion-por-sector"
    - title: "Calidad de cartera por calificación (%)"
      image: "modules/otorgamiento-de-credito/calidad-de-cartera"
    - title: "Cobertura de cartera vencida (%)"
      image: "modules/otorgamiento-de-credito/cobertura-cartera-vencida"
benefits:
  title: "Beneficios para tu comité de riesgo"
  items:
    - title: "Decide más rápido"
      description: "El scoring automático reduce el tiempo de análisis de una solicitud de crédito de horas a minutos."
    - title: "Reduce el error humano"
      description: "La extracción de información vía RPA evita la digitación manual de datos desde fuentes externas."
    - title: "Adapta el criterio por línea de negocio"
      description: "Configura estudios de crédito distintos según el tipo de industria o línea de crédito."
order: 2
---
