---
# Definición oficial, tags y beneficios: contenido.md. Slug confirmado.
# TODO: el `dashboard` sigue mostrando KPIs/gráficos de cartera de crédito
# (placeholder heredado); no corresponden a este módulo. Reemplazar por el
# tablero real de liquidez cuando esté disponible.
title: "Riesgo de liquidez"
description: "Mide la capacidad financiera de la entidad para afrontar sus obligaciones de pasivos financieros frente a terceros."
highlights:
  - "Factor de retiro neto"
  - "Indicador de riesgo de liquidez"
  - "Escenarios de tensión"
  - "Coeficiente de fondeo"
  - "Control de excedentes de liquidez"
  - "Fuentes de fondeo"
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
    - title: "Anticipa faltantes de caja"
      description: "Los escenarios de tensión permiten proyectar situaciones extremas de retiro y detectar brechas antes de que se materialicen."
    - title: "Controla los excedentes"
      description: "Identifica recursos ociosos a través del control de excedentes de liquidez, sin comprometer el mínimo requerido."
    - title: "Cumple el indicador regulatorio sin sobresaltos"
      description: "El indicador de riesgo de liquidez y el coeficiente de fondeo se calculan automáticamente, listos para el comité y el ente regulador."
order: 3
---
