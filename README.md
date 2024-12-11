> [!IMPORTANT]
>
> -   [x] _Herramientas de desarrollo_

---

1. Next.js: lates (v15.0.3) framework de pila completa con librerias React.js y Express.js
2. Shadcn: libreria de componente para el UI/UX preconfigurados.
3. npm: Administrador de paquetes para node
4. Nodejs: version 22.11.0
5. TypeScript: lenguaje de programacion fuertemente tipado.
6. vscode: Editor con configuracion en el archivo settings.json para formato de pagina , tabulados y mas.
7. git: Control de versiones -ramas develop y MyCoursera (Principal)
8. Tailwind : estilos CSS
9. Zustand: Estados locales, Global y/o SessionStorage - LocalStorage
10. gsap: libreria para animaciones
11. swiper: libreira para slider

---

> [!TIPS]
>
> # TECNICAS DE DESARROLLO

---

Se determina que el proyecto requiere interactividad, manejo de estados,
persistencia de la informacion, con diseño responsivo, de alto desempeño.

por lo anterior el proyecto se desarrollara en un sistema de
pre-building en el servidor, lo que dara en la pantalla una sensacion de agilidad.

Para ello se hace uso de paginas desde el servidor que estan nutridas con componentes
que estan servidos en el cliente o sea el navegador, con estos componentes se puede
acceder a las herramientas del window, como el localstorage, sessionStorage, ademas de escuchar
eventos o hacer un queryselector. metodos exclusicos para el navegador.

Esta tecnica consiste en manejar los datos en el servidor y mantenerlos en cache y
servirlos a medida que se requiera.
Sin dejar de acceder a traves de los componentes al navegador.

se usa ademas herramientas de alto desempeno como manejador de estado global como **ZUSTAND**
que junto a **PERSIST** permiten uso de localstorage y sessionStorage simplificando el trabajo.

Para una experiencia de usuario **UX** y generacion rapida de los estilos se uso
**Tailwind CSS**, **GSAP**, **SWIPER** librerias con utilidades preconstruidas para dar animacion
a los elementos.

Por ultimo es necesario destacar que la tecnica de pre-building sirve la pagina
al navegador desde un inicio lo que da ventaja en terminos de **SEO**
pues estos navegadores obtendran la informacion de la aplicacion desde un inicio.

---

> [!CAUTION]
>
> # COMO FUNCIONA ?

Este proyecto hace peticiones a las apis
**cloudinary**, **appwrite**, **themoviedb**, ademas de conectase con **GMAIL** para envio de correo electronico,
el cloudinary se trae los videos de la zona hero, appwrite es una plataforma en la nube (SAAS) que hace las veces
de sistema de autenticacion y base de datos , entre otros servicios que posee.
Por ultimo extraemos la informacion de las peliculas de themoviedb, donde nos permite acceder con validacion, filtrado , ordenamiento
paginacion entre otras ventajas que tiene esta api.

las funciones y metodos con los que se conecta con las apis se ejecutan en el servidor
son invocados en la pagina y sus repuestas se trasladan a los componentes de la pagina.

Estos datos son almacenados en cache para no realizar multiples llamadas a las apis
y se conectan en tiempo de compilacion sin afectar el rendimiento de la aplicacion.

Servidos los datos, se inician a montar los componentes funcionales y no de clases,
pues el proyecto no lo requeria, sin embargo cuenta con una clase **tmdb** que tiene sus metodos
establecidos para conectarse con la api themoviedb. Tambien appwrite nos otorga su clase y poderla instanciar
llamandola como *Client* de la cual podemos extraer los metodos de conexion hacia los diferentes servicios 
como *athenticacion*, *base de datos*, *storage* este ultimo para almacenar documentos u archivos.

-   #### SessionStorage , LocalStorage y Cookies
    Estas nos permiten realizar validaciones tanto en el navegador como en las peticiones al servidor
    exisitiendo varios metodos de validacion , se ejecuto principalmente bajo el uso de *Cookies*
    El uso de *SessionStorage* se dio para abrir un formulario de registro y el *localStorage* para 
    guardar las peliculas *favoritas* este ultimo con mayor persistencia de la informacion.


-   #### Server Component
    La app presenta pocas rutas de navegacion , con la peculiaridad que el sistema de login y register
    estan interceptados para mostrarse solo en un modal. Ademas la app tiene un middleware configurado
    para rutas protegidas, creando asi un sistema seguro.
    
    

```javascript

 /api/ 

```

O sea la base url de este proyecto mas /api/ en estas rutas se crean lo que conocemos como **backend**
siendo de suma relevancia. alli esta la rutas para conectar hacia las diferentes api de terceros.
Estos endpoints devuelven por lo general un objeto JSON con la informacion solicitada.
y se accede con peticiones post o get no directamente desde los componentes en el lado del cliente sino 
desde funciones que se ejecutan en el servidor. Esto con el proposito de realizar validaciones y brindar seguridad
evitando exponer la informacion, puertos o accesos a las apis o bases de datos.

#### Metadatos

El ser prerenderizado nos garantiza configurar los metadatos a nuestro
parecer, sin embargo para este proyecto se usan pocos metadatos
que los podra encontrar en el layout de la app ademas en cada pagina.

Algunos se crean dinamicamente y otros ya se han establecido.

Tambien se crea archivos de respaldo y mayor agilidad en los navegadores 
como lo es el archivo sitemap.ts


---

> [!WARNIG]
>
> # COMO INICIAR ?

El proyecto en el root cuenta con un archvio **.nvmrc** que nos inidica que version de node.js
que se necesita ejecutar, basta con estar en el directorio y ejecutar el comando nvm use,
tambien es necesario alimentar el archivo .env con las variables de entorno que nos entregan
las diferentes apis de terceros como los son appwrite y themoviedb por ello se creo un archivo .env.template
que contiene las variables que son necesarias en el proyecto.

Alimentado este documento ahora es necesario instalar las dependencias
ejecuta **npm i** para esta instalacion.

conseguido este paso construimos con **npm run build** lo que compilara el proyecto
y por ultimo ejecutamos **npm start** por default el proyecto se ejecuta en el puerto 3000.


> [!IMPORTANT]
>
> -   [x] https://inlaze-pearl.vercel.app/

---

El proyecto esta ejecutandose en produccion en 
### https://inlaze-pearl.vercel.app/

alli

- No podras ver la informacion de las peliculas hasta no registrarte y hacer el login
- Cuando te registrar al correo electronico te llegara un email que tendras que validar para poder hacer login
- desde ese correo seras redirigido a la app para continuar visitando el proyecto





