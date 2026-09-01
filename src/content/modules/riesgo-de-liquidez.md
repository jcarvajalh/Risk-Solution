---
# Definición oficial, tags y beneficios: contenido.md. Slug confirmado.
title: "Riesgo de liquidez"
description: "Mide la capacidad financiera de la entidad para afrontar sus obligaciones de pasivos financieros frente a terceros."
# Chips del hero: capacidades del módulo (contenido.md).
highlights:
  - "Factor de retiro neto"
  - "Indicador de riesgo de liquidez"
  - "Escenarios de tensión"
  - "Coeficiente de fondeo"
  - "Control de excedentes de liquidez"
  - "Fuentes de fondeo"
# Vista previa del dashboard: fila de indicadores + capturas reales del producto,
# ampliables al hacer clic. Las cifras de los KPIs son datos reales del cliente
# tomados de la imagen "Tags" del módulo (fecha de corte 31/07/2026). Se omiten los
# dos indicadores que la captura muestra en blanco (saldo y factor de retiro a la
# vista): sin dato disponible, no se inventan.
dashboard:
  kpis:
    - label: "IRL 90 días"
      value: "$39,618M"
    - label: "IRLr 90 días"
      value: "5.39%"
      tone: "primary"
    - label: "Saldo de depósitos convenios"
      value: "$25,585M"
    - label: "Factor de retiro neto (convenios)"
      value: "17.49%"
  charts:
    - alt: "Indicador de riesgo de liquidez a 90 días (millones de $)"
      image: "modules/riesgo-de-liquidez/irl-90-dias"
    - alt: "Razón de riesgo de liquidez a 30 días por escenario"
      image: "modules/riesgo-de-liquidez/razon-riesgo-30-dias"
    - alt: "Brecha de liquidez: real frente a meta (miles)"
      image: "modules/riesgo-de-liquidez/brecha-de-liquidez"
    - alt: "IRLr a 7, 30 y 90 días (%)"
      image: "modules/riesgo-de-liquidez/irlr"
benefits:
  title: "Beneficios para tu comité de riesgo"
  items:
    - title: "Visibilidad permanente de la posición de liquidez"
      description: "El monitoreo continuo del Indicador de Riesgo de Liquidez (IRL) y del factor de retiro neto permite a la entidad conocer en todo momento su capacidad para cubrir obligaciones de corto plazo, evitando sorpresas y fortaleciendo la toma de decisiones financieras."
    - title: "Anticipación ante escenarios adversos"
      description: "Con los escenarios de tensión y el simulador de liquidez, la entidad puede evaluar el impacto de eventos como retiros masivos, caídas en captaciones o choques de mercado, y definir planes de contingencia antes de que el riesgo se materialice."
    - title: "Cumplimiento normativo y confianza institucional"
      description: "El cálculo estandarizado del IRL y su trazabilidad facilitan el reporte a los entes de control (Superintendencia Financiera, Supersolidaria, entre otros), reduciendo el riesgo regulatorio y transmitiendo mayor solidez y confianza a asociados, ahorradores e inversionistas."
order: 3
---
