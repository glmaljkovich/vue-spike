## Descripcion

Vue es una libreria y framework de javascript (JS) para desarrollo de Single Page Applications (SPA).
Utiliza el concepto de Componentes para separar la capa de presentación de la logica de la aplicacion.
Esto permite testear la logica de negocios por separado sin tener que renderizar la aplicacion.
Ademas los componentes son reactivos -- esto es, cambios en el estado (datos) de la aplicacion se
ven reflejados automaticamente en la capa de presentacion.

Al igual que la mayoria de frameworks SPA de JS, Vue usa una representacion interna de la pagina web -- Virtual DOM -- para hacer que las modificaciones sobre la misma sean mas faciles de realizar programaticamente y a su vez sea mas fácil de testear.

Si bien el nucleo del framework solo se encarga de la presentacion y reactividad de los componentes visuales, hay varias librerias oficiales que se encargan de routeo y estado global (patron flux).

## Documentacion

La Documentacion cubre todas las features del framework y sus casos borde. Tambien especifica
en que cosas tiene problemas. Ademas cuenta con la documentacion de la API completa,
muy facil de browsear.

## Estabilidad y actualizacion

Hace varios años que la API no cambia. Y las próxima version no va a salir hasta dentro de un año. Esto es una ventaja contra React y Angular que tienen una version nueva
cada 2 meses. Hay guias de migracion entre versiones, para cuando llegue la proxima.

## Curva de aprendizaje y migracion desde otros frameworks

El framework es facil de usar y no tiene grandes saltos de complejidad ni friccion
para agregar nuevos componentes. Los templates extienden la sintaxis basica de HTML5 sin cambiar la semantica. Por lo cual, con saber HTML ya estamos preparados para escribir templates de Vue. A su vez los componentes soportan estilos en CSS/SASS/LESS por lo cual no hay que hacer transformaciones (ej: a JSX) de una base de estilos anterior para adecuarla a este framework.


## Reactividad

cons: ciertos truquillos que podes hacer con react de injectar cosas sin declararlas como dependencias en vue no se pueden hacer. Asignar elementos a un array por indice no funciona reactivamente, tenes que usar un workaround. No te fuerza a manejar el estado de forma funcional, podes terminar mutandolo directamente si no sabes manejarte bien.


## Server-side rendering y PWA

Si bien Vue no ofrece estas caracteristicas out-of-the-box, existe Nuxt que es un framework con soporte oficial que se encarga de estos dos concerns.

## Soporte

Tienen su propia seccion de stackoverflow, un gitter, issue templates en github, ademas de una comunidad grande de desarrolladores.
