---
# Definición oficial, tags y beneficios: contenido.md. Slug confirmado.
title: "SARLAFT"
description: "Sistema de Administración del Riesgo de Lavado de Activos y Financiación del Terrorismo. Es un modelo obligatorio en muchas entidades de Colombia, especialmente financieras, para prevenir que la organización sea utilizada para mover dinero ilegal o financiar actividades ilícitas."
# Chips del hero: capacidades del módulo (contenido.md).
highlights:
  - "Vinculación de clientes, proveedores, contratistas y empleados"
  - "Consulta en listas restrictivas (OFAC, ONU, etc.)"
  - "Informes de gestión"
  - "Seguimiento a PEP (personas políticamente expuestas)"
# Vista previa del dashboard: fila de indicadores + capturas reales del producto,
# ampliables al hacer clic. Las cifras de los KPIs son datos reales del cliente
# tomados de la imagen "Tags" del módulo (fecha de corte 24/08/2026).
dashboard:
  kpis:
    - label: "Vinculaciones personas naturales"
      value: "2,146"
    - label: "Vinculaciones personas jurídicas"
      value: "318"
    - label: "Consultas a listas vinculantes"
      value: "18,504"
    - label: "Alertas activas"
      value: "6"
      tone: "danger"
  charts:
    - alt: "Tipos de vinculación de personas naturales"
      image: "modules/sarlaft/tipos-vinculacion-naturales"
    - alt: "Ciudades de ubicación de los vinculados"
      image: "modules/sarlaft/ciudades-vinculados"
    - alt: "Vinculaciones ejecutadas por año"
      image: "modules/sarlaft/vinculaciones-por-ano"
    - alt: "Registro de vinculación de persona jurídica"
      image: "modules/sarlaft/vinculacion-persona-juridica"
benefits:
  title: "Beneficios para tu comité de riesgo"
  items:
    - title: "Vinculación de clientes más ágil y confiable"
      description: "Los formularios digitales de vinculación para personas naturales y jurídicas estandarizan la captura de información, reduciendo errores manuales y agilizando el proceso de conocimiento del cliente desde el primer contacto."
    - title: "Detección oportuna de riesgos reputacionales y legales"
      description: "La consulta automática contra listas vinculantes (OFAC, ONU, Interpol, entre otras) permite identificar de forma inmediata posibles coincidencias con clientes, proveedores o terceros, evitando vincular o mantener relaciones con personas de alto riesgo."
    - title: "Cumplimiento normativo con menor exposición a sanciones"
      description: "Las alertas automáticas ante la aparición de una persona en listas restrictivas garantizan una respuesta oportuna frente a la Superintendencia y demás entes de control, reduciendo el riesgo de sanciones económicas y protegiendo la reputación de la organización ante clientes y aliados estratégicos."
order: 7
---
