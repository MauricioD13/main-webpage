---
# EXAMPLE ENTRY: replace the notes with your own, then set draft: false to publish.
title: "Notes on The Unicorn Project"
date: 2026-09-01
draft: false
book:
  title: "The Unicorn Project"
  author: "Gene Kim"
  year: 2019
  pages: 432
category: business
status: finished
rating: 4.5
spine: "#e6005c"
takeaways:
  - "Five Ideals for eliminating chronic suffering in teams and restoring the joy of building."
  - "Locality, flow, and psychological safety: the cultural shift that enables technical velocity."
quotes:
  - "Improving daily work is even more important than doing daily work."
relatedProjects:
  - en/ecs-delivery
translationKey: the-unicorn-project
---

# El Proyecto Unicornio - Notas

Secuela del [[El Proyecto Fénix - Nota consolidada]]: ocurre en las mismas semanas, en la misma empresa (Parts Unlimited), pero vista desde el otro lado. La protagonista es Maxine, una arquitecta brillante a la que culpan injustamente de una caída del sistema de nómina y exilian al Proyecto Fénix como castigo.

Mientras el Fénix cuenta la historia desde Operaciones (Bill Palmer), el Unicornio la cuenta desde Desarrollo (Maxine y la "Rebel Alliance"). El libro introduce los **Cinco Ideales** para complementar las Tres Maneras: el Fénix habla de principios y prácticas; el Unicornio habla de las decisiones culturales y de arquitectura que habilitan la grandeza o crean sufrimiento crónico.

---

## Los Cinco Ideales

### Primer Ideal: Localidad y Simplicidad

Diseñar los sistemas y las organizaciones que los construyen de forma que los equipos puedan trabajar de manera local, sin depender de otros.

- **Ideal**: cualquier equipo puede desarrollar, probar y desplegar valor al cliente de forma independiente.
- **No ideal**: para desplegar valor, cada equipo debe coordinar con decenas de otros equipos, y cualquiera de ellos puede bloquearlo.

Si un equipo necesita agendar un despliegue con 40-50 equipos más, nada avanzará nunca. La localidad requiere simplicidad: desacoplar las aplicaciones entre sí. El último lugar donde queremos complejidad es interno — en el código, en la organización o en los procesos.

### Segundo Ideal: Enfoque, Flujo y Alegría

El estado óptimo del desarrollador: energía y tiempo enfocados en resolver el problema de negocio, y pasarlo bien en el proceso. Cuando estás absorbido en el trabajo pierdes la noción del tiempo — eso es flow.

- **Ideal**: tu energía está enfocada en resolver el problema de negocio y te estás divirtiendo.
- **No ideal**: todo tu tiempo se va en resolver problemas que ni siquiera quieres resolver (archivos YAML, Makefiles, espacios en nombres de archivos, bash).

Contratar ingenieros brillantes para resolver problemas de negocio y luego hacerlos perder el tiempo en procesos tediosos es la forma más rápida de perderlos. Trabajar en lotes pequeños con feedback continuo permite aprender rápido y dominar el dominio.

### Tercer Ideal: Mejora del Trabajo Diario

> Mejorar el trabajo diario es incluso más importante que hacer el trabajo diario.

Inversión continua en pequeñas mejoras a la forma de trabajar (kaizen), no solo en los ítems de trabajo. Priorizar la deuda técnica: si no se paga el "impuesto del 20%", las organizaciones terminan gastando todos sus ciclos pagando deuda hasta que la entrega de funcionalidades se detiene.

- Cuando alguien rompe el build o los tests, arreglarlo se convierte en el trabajo más importante del momento.
- Si alguien necesita una revisión de código, dejas lo que estés haciendo para ayudar.
- Trunk-based development: integrar cambios no ruptores diariamente, no ramas que viven semanas.

El enemigo del tercer ideal es **TWWADI** — *The Way We've Always Done It* ("la forma en que siempre lo hemos hecho"): reglas y procedimientos que nadie cuestiona y que nadie recuerda por qué existen.

### Cuarto Ideal: Seguridad Psicológica

Sin seguridad psicológica no hay experimentación, y sin experimentación no hay mejora. Es uno de los predictores más altos de desempeño en equipos (culturas de tipo generativo según Westrum).

- No avergonzar, rechazar ni castigar a quien habla.
- Ante problemas, preguntar "¿cuál es la causa?", no "¿quién es el culpable?".
- Postmortems sin culpa: todos deben sentirse seguros de levantar la mano y decir "puede que haya sido yo".

> La honestidad requiere ausencia de miedo.

### Quinto Ideal: Enfoque en el Cliente

Preguntarse sin piedad si lo que se está construyendo le importa al cliente — ¿está dispuesto a pagar por ello, o solo tiene valor para tu silo funcional?

Se conecta con la distinción **core vs. context** de Geoffrey Moore:

- **Core**: lo que los clientes pagan, la ventaja competitiva duradera del negocio.
- **Context**: todo lo demás — lo que había que hacer para entregar el producto (RRHH, nómina, marketing).

> Context should never kill core. El contexto nunca debe matar al core.

---

## La Rebel Alliance

Maxine no transforma sola: forma una alianza de agentes de cambio apasionados con propósito claro (coherente con la coalición guía de Kotter).

Lecciones de gestión del cambio del libro:

- Buscar quick wins y celebrar los éxitos.
- Entregar valor real: resolver problemas reales, no teorías.
- Asociarse a través de las fronteras: el project manager del equipo, enemigo al inicio, termina siendo uno de los mayores aliados.
- Liderazgo valiente: algunos líderes están dispuestos a perder su trabajo por hacer lo correcto — y el sistema empuja de vuelta con consecuencias reales.
- Contratar más gente no resuelve un cuello de botella: suele empeorarlo.

---

## Core vs. Context y los Tres Horizontes

Conectado con el Quinto Ideal, el libro usa el modelo de los tres horizontes de Geoffrey Moore:

- **Horizonte 1**: el negocio core — estable, predecible, burocrático.
- **Horizonte 2**: negocios más pequeños que generan clientes, capacidades y mercados nuevos.
- **Horizonte 3**: organizaciones altamente innovadoras que exploran ideas disruptivas y riesgosas.

El punto de quiebre de Parts Unlimited viene de enfocarse en el horizonte 3. El trabajo del horizonte 3 requiere aprendizaje rápido y experimentación — perfecto para formas de trabajo adaptativas. Los horizontes 1 y 3 requieren **tipos de líderes diferentes**.

---

## Programación funcional

Tema transversal del libro (Gene Kim es fan de Clojure): la programación funcional como modelo de sistemas sanos:

- **Inmutabilidad**: los datos no cambian, se crean versiones nuevas.
- **Funciones puras**: sin efectos secundarios ni estados ocultos.
- **Componibilidad**: piezas pequeñas que se combinan.

Los mismos principios aplican a la arquitectura de organizaciones: sistemas con estado disciplinado son más predecibles y más fáciles de cambiar.

---

## Lecciones finales

- Los equipos deben poder hacer cambios grandes en el diseño de su sistema sin permiso de alguien fuera del equipo, y desplegar por demanda con downtime negligible.
- No gestiones las dependencias: elimínalas.
- Aumentar la tasa de aprendizaje aumenta la tasa de éxito: solo 1/3 de las ideas estratégicas tiene resultados positivos; menos del 5% de los tests A/B dan resultado positivo.
- Las herramientas internas de desarrollo deben tratarse como productos: los desarrolladores son el cliente.
- Enfocarse en crecimiento, no en reducción de costos: el crecimiento es más sostenible y promueve mejor pensamiento a largo plazo.

> "Tenemos que ir a preguntarle al negocio." — "Somos el negocio. No son nuestros clientes, son nuestros colegas."
