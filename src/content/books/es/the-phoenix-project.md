---
# Traducción de las notas en inglés (src/content/books/en/the-phoenix-project.md).
# Pon draft: false para publicarla junto con la versión en inglés.
title: "Notas sobre The Phoenix Project"
date: 2026-09-01
draft: false
book:
  title: "The Phoenix Project"
  author: "Gene Kim, Kevin Behr, George Spafford"
  year: 2013
  pages: 432
category: business
status: finished
rating: 4
spine: "#1c3f73"
takeaways:
  - "El trabajo no planificado es el asesino silencioso de cualquier plan."
  - "El trabajo en curso es invisible hasta que lo haces visible."
  - "La restricción decide el rendimiento de todo el sistema."
quotes:
  - "Mejorar el trabajo diario es incluso más importante que hacer el trabajo diario."
relatedProjects:
  - es/de-despliegues-manuales-a-un-pipeline
translationKey: the-phoenix-project
---

# The Phoenix Project: notas

Una novela de negocios que sigue a Bill Palmer, recién ascendido a vicepresidente de Operaciones de TI en Parts Unlimited, una empresa al borde del colapso. Tiene 90 días para salvar "The Phoenix Project", una iniciativa crítica que va retrasada y por encima del presupuesto, o se eliminará todo el departamento de TI.

Nota: quienes hayan leído *La meta*, de Eliyahu Goldratt, notarán similitudes con el mundo de la logística.

La premisa central: el caos en TI es un problema de todo el negocio, no solo de tecnología. Los conflictos entre Desarrollo, Operaciones, Seguridad y el negocio destruyen valor, hasta que se alinean mediante DevOps, Kanban y la Teoría de Restricciones.

Las ideas del libro se desarrollan con más profundidad en las [[DevOps Handbook - Consolidated Notes]].

---

## Los 4 tipos de trabajo

Todo el trabajo de TI cae en una de cuatro categorías. Hacer visible esta distinción ayuda a explicar por qué una organización no consigue entregar a tiempo:

- **Proyectos de negocio:** productos o funcionalidades nuevas que pide el negocio y que están ligados directamente a sus objetivos.
- **Proyectos internos de TI:** mejoras de infraestructura y de procesos (por ejemplo, preparar entornos o automatizar despliegues). Son invisibles para el negocio, a menudo avanzan sin supervisión y consumen recursos que irían a los proyectos de negocio.
- **Cambios:** el trabajo operativo diario de registrar, planificar, probar y desplegar modificaciones en los sistemas.
- **Trabajo no planificado:** el peor tipo de trabajo, también llamado "apagar incendios" (por ejemplo, recuperarse de caídas de los sistemas). Tiene el poder de paralizar todo lo demás.

> El trabajo no planificado es trabajo de recuperación, y casi siempre te aleja de cumplir tus objetivos.

La conclusión: el trabajo no planificado, provocado por cambios en sistemas inestables o que nadie entiende bien, impide entregar cualquier proyecto a tiempo. Por eso los resultados de cualquier cambio deben ser lo más predecibles posible: hacen falta entornos de desarrollo que reflejen producción y que el costo de un fallo sea lo más bajo posible.

---

## Teoría de Restricciones: TI como una planta de fabricación

Erik, el mentor de Bill, le enseña que las operaciones de TI funcionan como una planta de fabricación: el trabajo pasa por distintos puestos, y el rendimiento de todo el sistema lo determina el cuello de botella.

En Parts Unlimited, el cuello de botella tiene nombre: **Brent**, el ingeniero estrella y la única persona capaz de resolver los problemas más difíciles. Todo pasa por él; todos lo interrumpen y no le queda tiempo para trabajo proactivo. Proteger y optimizar su tiempo es la única forma de mejorar el sistema.

> Cualquier mejora hecha en cualquier lugar que no sea el cuello de botella es una ilusión.

Mejorar los puestos que no son el cuello de botella no aumenta el rendimiento; solo hace que se acumule más trabajo esperando en la restricción, lo que lleva el trabajo en curso (WIP) a niveles tóxicos.

---

## Control de cambios

Gran parte del trabajo no planificado viene de cambios sin control:

- El equipo de seguridad (dirigido por John) despliega cambios sin pasar por los procesos de aprobación y provoca caídas SEV1 (críticas), que no se pueden probar antes porque no existe un entorno de pruebas.
- Nadie documenta los cambios ni asiste a las reuniones del Change Advisory Board (CAB).

Bill pone en marcha un CAB que funciona: cada cambio se registra, se evalúa y se prueba. Eso reduce drásticamente las interrupciones no planificadas.

---

## Las Tres Vías

Los principios que estructuran la transformación (desarrollados después en *The DevOps Handbook*):

### La Primera Vía: flujo

El trabajo debe fluir de izquierda a derecha, de Desarrollo a Operaciones y finalmente al cliente, sin retroceder. El trabajo que vuelve atrás por defectos o ambigüedad es, literalmente, desperdicio.

Prácticas clave: hacer visible el trabajo con Kanban, limitar el WIP, reducir el tamaño de los lotes y asegurarse de que los defectos conocidos no pasen al siguiente centro de trabajo.

### La Segunda Vía: retroalimentación

Crear ciclos de retroalimentación rápidos y constantes para detectar y corregir problemas pronto. Incorporar la calidad desde el origen para evitar el retrabajo: el flujo ideal avanza en una sola dirección, hacia delante.

### La Tercera Vía: aprendizaje continuo

Una cultura de experimentación deliberada: ver los fallos como oportunidades de aprendizaje, hacer post-mortems sin culpables y practicar mediante la repetición. Aceptar el riesgo y el error como parte del aprendizaje.

---

## Mejorar el trabajo diario

> Mejorar el trabajo diario es incluso más importante que hacer el trabajo diario.

> No puedes mejorar lo que no puedes medir.

Los resultados de la transformación en Parts Unlimited hablan por sí solos: los incidentes SEV1 bajaron dos tercios, el tiempo de recuperación de incidentes se redujo a la mitad y se estableció un proceso estandarizado de creación de entornos que mantiene sincronizados a Desarrollo y Operaciones.

---

## Liderazgo y lecciones finales

- Liderar bien no consiste en dictar soluciones, sino en dar a los equipos el poder de encontrar y aplicar sus propias respuestas.
- Romper los
