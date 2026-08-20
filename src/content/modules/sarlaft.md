---
# Definición oficial, tags y beneficios: contenido.md. Slug confirmado.
# TODO: el `dashboard` sigue mostrando KPIs/gráficos de cartera de crédito
# (placeholder heredado); no corresponden a este módulo. Reemplazar por el
# tablero real de SARLAFT cuando esté disponible.
title: "SARLAFT"
description: "Sistema de Administración del Riesgo de Lavado de Activos y Financiación del Terrorismo. Es un modelo obligatorio en muchas entidades de Colombia, especialmente financieras, para prevenir que la organización sea utilizada para mover dinero ilegal o financiar actividades ilícitas."
highlights:
  - "Vinculación de clientes, proveedores, contratistas y empleados"
  - "Consulta en listas restrictivas (OFAC, ONU, etc.)"
  - "Informes de gestión"
  - "Seguimiento a PEP (personas políticamente expuestas)"
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
      image: "modules/sarlaft/cartera-por-linea"
    - title: "Concentración por sector (%)"
      image: "modules/sarlaft/concentracion-por-sector"
    - title: "Calidad de cartera por calificación (%)"
      image: "modules/sarlaft/calidad-de-cartera"
    - title: "Cobertura de cartera vencida (%)"
      image: "modules/sarlaft/cobertura-cartera-vencida"
benefits:
  title: "Beneficios para tu comité de riesgo"
  items:
    - title: "Cumple sin fricción"
      description: "Automatiza un requisito obligatorio para entidades financieras en Colombia, sin procesos manuales."
    - title: "Detecta riesgo antes de vincular"
      description: "La consulta automática en listas restrictivas se hace antes de formalizar cualquier vinculación."
    - title: "Seguimiento continuo a PEP"
      description: "Monitorea de forma permanente a las personas políticamente expuestas relacionadas con la entidad."
order: 7
---
