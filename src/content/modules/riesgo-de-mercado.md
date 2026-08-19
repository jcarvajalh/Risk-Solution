---
# Definición oficial, tags y beneficios: contenido.md. Slug confirmado.
# TODO: el `dashboard` sigue mostrando KPIs/gráficos de cartera de crédito
# (placeholder heredado); no corresponden a este módulo. Reemplazar por el
# tablero real de mercado cuando esté disponible.
title: "Riesgo de mercado"
description: "Mide la probabilidad de variaciones en el precio y la posición de los activos de la entidad."
highlights:
  - "VaR (Value at Risk)"
  - "Cupos de contraparte"
  - "Margen de intermediación"
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
      image: "modules/riesgo-de-mercado/cartera-por-linea"
    - title: "Concentración por sector (%)"
      image: "modules/riesgo-de-mercado/concentracion-por-sector"
    - title: "Calidad de cartera por calificación (%)"
      image: "modules/riesgo-de-mercado/calidad-de-cartera"
    - title: "Cobertura de cartera vencida (%)"
      image: "modules/riesgo-de-mercado/cobertura-cartera-vencida"
benefits:
  title: "Beneficios para tu comité de riesgo"
  items:
    - title: "Evita concentración por contraparte"
      description: "Los cupos de contraparte se monitorean de forma continua para que ninguna operación supere los límites aprobados."
    - title: "Mide la pérdida potencial del portafolio"
      description: "El cálculo de VaR muestra, con un nivel de confianza dado, cuánto podría perder la entidad en condiciones normales de mercado."
    - title: "Controla el margen de intermediación"
      description: "Visibilidad permanente del margen entre tasas activas y pasivas."
order: 5
---
