# WALDYR'S Lubricentro — Sitio web

Sitio web de la tienda **WALDYR'S**, lubricentro especializado en aceites de motor para autos, motos, camiones y maquinaria, ubicado en San Román, Juliaca, Puno, Perú.

Es un sitio **100% estático** (HTML, CSS y JavaScript puro), sin frameworks ni pasos de compilación, listo para abrir en VS Code y publicar en GitHub Pages.

## Estructura del proyecto

```
waldyrs/
├── index.html         Página de inicio (hero + recomendador de aceite + destacados)
├── productos.html      Catálogo de aceites con filtros por categoría
├── servicios.html       Servicios del taller + preguntas frecuentes
├── nosotros.html        Historia, valores y ubicación
├── contacto.html        Formulario de contacto + mapa
├── css/
│   └── style.css         Todos los estilos del sitio
├── js/
│   └── main.js           Menú móvil, filtros, recomendador, formulario, animaciones
├── images/
│   └── favicon.svg
└── README.md
```

## Cómo abrirlo en Visual Studio Code

1. Descomprime este archivo `.zip` en una carpeta de tu computadora.
2. Abre VS Code → `Archivo > Abrir carpeta...` → selecciona la carpeta `waldyrs`.
3. Instala la extensión **Live Server** (de Ritwick Dey) desde el panel de extensiones.
4. Haz clic derecho sobre `index.html` → **"Open with Live Server"**.
5. El sitio se abrirá en tu navegador y se actualizará automáticamente cada vez que guardes un cambio.

No necesitas instalar Node.js, ni correr `npm install`: todo funciona directamente en el navegador.

## Cómo subirlo a GitHub

Desde la terminal integrada de VS Code (`Ctrl + ñ` o `Terminal > Nueva terminal`), dentro de la carpeta `waldyrs`:

```bash
git init
git add .
git commit -m "Primer commit: sitio WALDYR'S Lubricentro"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/waldyrs.git
git push -u origin main
```

Reemplaza `TU-USUARIO` por tu usuario de GitHub y `waldyrs` por el nombre real del repositorio que crees en GitHub.

### Publicarlo gratis con GitHub Pages

1. En tu repositorio de GitHub, ve a `Settings > Pages`.
2. En "Source", selecciona la rama `main` y la carpeta `/ (root)`.
3. Guarda. En un par de minutos tu sitio estará disponible en:
   `https://TU-USUARIO.github.io/waldyrs/`

## Datos que debes personalizar antes de publicar

Busca y reemplaza estos valores de ejemplo en todo el proyecto:

- **Número de WhatsApp**: `51900000000` aparece en `index.html`, `productos.html`, `servicios.html`, `nosotros.html`, `contacto.html` y en `js/main.js` (variable `numeroWhatsapp`). Reemplázalo por el número real del negocio, con código de país sin espacios ni símbolos (ej. `51987654321`).
- **Correo de contacto**: `contacto@waldyrs.pe` en `contacto.html`.
- **Dirección exacta**: el mapa usa una búsqueda genérica de "San Román, Juliaca, Puno". Si quieres un pin exacto, reemplaza la URL del `<iframe>` por el link de "Insertar mapa" de Google Maps buscando la dirección exacta del local.
- **Precios**: los productos muestran "Consultar precio"; puedes reemplazarlo por precios reales si lo deseas.
- **Redes sociales**: el ícono de Facebook en el footer enlaza a `#`; cámbialo por el link real de la página del negocio.

## Funcionalidades interactivas incluidas

- **Recomendador de aceite** en la página de inicio: el usuario elige tipo de vehículo y estado del motor, y recibe una recomendación de viscosidad con una animación tipo medidor.
- **Filtros de catálogo** en Productos, por categoría de aceite.
- **Acordeón de preguntas frecuentes** en Servicios.
- **Formulario de contacto** que arma un mensaje y lo envía por WhatsApp.
- **Menú responsivo** con hamburguesa en móvil.
- **Animaciones de aparición** al hacer scroll (respetan la preferencia de "reducir movimiento" del sistema).
- **Botón flotante de WhatsApp** visible en todo el sitio.

## Compatibilidad

Sitio responsivo probado en resoluciones de escritorio, tablet y móvil. Funciona en cualquier navegador moderno (Chrome, Edge, Firefox, Safari).
