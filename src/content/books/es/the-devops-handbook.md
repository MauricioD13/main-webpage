---
# Traducción de las notas en inglés (src/content/books/en/the-devops-handbook.md).
# Pon draft: false para publicarla junto con la versión en inglés.
title: "Notas sobre The DevOps Handbook"
date: 2024-11-10
draft: false
book:
  title: "The DevOps Handbook"
  author: "Gene Kim, Jez Humble, Patrick Debois & John Willis"
  year: 2016
  pages: 421
category: tech
status: queued
spine: "#f3b13c"
relatedProjects:
  - es/reportes-que-nadie-tuvo-que-pedir
translationKey: the-devops-handbook
---

DevOps fomenta una cultura guiada por hipótesis y experimentación, en lugar del miedo al cambio. Se recompensa a las personas por asumir riesgos calculados.

Cada uno se hace responsable de la calidad de su trabajo, lo que lleva de forma natural a la automatización.

Las empresas muy productivas empoderan a muchos equipos pequeños de alto rendimiento; cuantos más desarrolladores hay, más despliegues efectivos se producen. En los equipos de bajo rendimiento ocurre lo contrario.

---

## La Primera Vía: principios de flujo

El primer paso es aumentar la velocidad entre las etapas del flujo de valor haciendo lo siguiente:

- Hacer visible el trabajo
- Reducir las cantidades de trabajo y el tamaño de los lotes (limitar el WIP y usar lotes pequeños)
- Gestionar las restricciones del sistema (Teoría de Restricciones)

### Hacer visible el trabajo

La primera fase del flujo DevOps es hacer visible el trabajo. En los entornos tecnológicos suele ser difícil ver el trabajo en curso (WIP).

Una forma de lograrlo es usar **Kanban**: sus etapas facilitan ver dónde se producen retrasos o acumulaciones en cada puesto de trabajo.

Una vez que el trabajo es visible, todas las partes interesadas pueden ver el flujo y priorizar las tareas según los objetivos generales.

### Limitar el WIP (trabajo en curso)

Limitar el número de tareas en un puesto de trabajo ayuda a que se terminen antes. La multitarea reduce la eficiencia; está demostrado científicamente.

Controlar el WIP deja claro dónde están los cuellos de botella.

### Lotes pequeños

El tamaño de los lotes debe minimizarse para detectar los errores antes, en lugar de pasarlos a los puestos siguientes o, en el peor de los casos, dejar que lleguen a producción.

Lotes pequeños = ciclos de retroalimentación más cortos = menor costo de corrección.

### Teoría de Restricciones

1. Identificar la restricción del sistema
2. Decidir cómo explotar la restricción del sistema
3. Subordinar todo lo demás a las decisiones anteriores
4. Elevar la restricción del sistema
5. Si la restricción se ha roto, volver al primer paso para evitar que la inercia cree una nueva restricción

**Restricciones habituales:**

- **Creación de entornos:** los equipos tienen que esperar a que se creen los entornos de prueba y staging antes de empezar los proyectos. Como puede haber "deriva" entre desarrollo y producción, los equipos de TI suelen tardar más en prepararlos.
- **Despliegue de código:** cuando un despliegue requiere muchas horas y mucho personal, el trabajo en curso (WIP) sube a niveles poco sanos para el negocio. Para resolverlo, los despliegues deben automatizarse todo lo posible.
- **Configuración y ejecución de pruebas:** cada despliegue necesita entornos de prueba, así que este paso también hay que automatizarlo.
- **Arquitectura muy acoplada:** una arquitectura con mucho acoplamiento hace que los despliegues requieran coordinar a muchos equipos de distintas áreas.

### Métricas de flujo

Algunas métricas indirectas, como el número de líneas de código que llegan a producción, dan una visión incompleta del flujo de valor. Es mejor usar métricas de flujo:

- **Velocidad del flujo:** el número de elementos completados en un periodo determinado; acelera la entrega de valor.
- **Eficiencia del flujo:** la proporción del tiempo que los elementos pasan avanzando activamente en el proceso.
- **Tiempo de flujo:** el tiempo total que tarda un elemento en ir de principio a fin.
- **Carga del flujo:** el número de elementos activos o en espera dentro del flujo de valor.
- **Distribución del flujo:** los tipos de trabajo que dominan el flujo.

### Lead time

El lead time es una de las métricas más usadas en la industria para medir la eficiencia de un sistema. Empieza cuando se crea un ticket o una solicitud del cliente y termina cuando se completa.

Las empresas con lead times demasiado largos suelen tener problemas en producción por falta de trazabilidad de los errores: cuando un problema llega a los desarrolladores, puede que ya no recuerden el código donde se originó.

### Completo y preciso

Otra métrica que da visibilidad sobre el flujo tecnológico es el porcentaje de "completo y preciso". Indica con qué frecuencia, como porcentaje del tiempo, quienes reciben el trabajo más adelante en el flujo de valor pueden continuar sin tener que pedir cambios o información adicional.

Una forma sencilla de obtener esta métrica es preguntar a los receptores del flujo de valor si la información o el artefacto que reciben está completo, y qué porcentaje del tiempo dedican a pedir información adicional.

---

## La Segunda Vía: principios de retroalimentación

La Segunda Vía se centra en crear ciclos de retroalimentación rápidos y amplificados que fluyen de derecha a izquierda dentro del flujo de valor.

Los sistemas complejos deben tener en cuenta los siguientes principios:

- El trabajo complejo se gestiona de forma que permita exponer los problemas de diseño y de operación.
- Los problemas
