# El libro y la lectura en el Perú

**🌐 Sitio: https://unimauro.github.io/libro-peru/**

Diagnóstico del mercado del libro y de los hábitos de lectura en el Perú. Incluye un dashboard web, recomendaciones de política pública y estrategias de innovación por actor. Cada cifra tiene fuente; lo que no se pudo verificar se declara como vacío.

## Contenido

```
├── README.md
├── SPEC.md                 Objetivos, preguntas, alcance, criterios de calidad
├── FLUJO.md                Flujo de trabajo (diagrama) y calendario de actualización
├── build/                  Scripts para regenerar datos, Word y HTML
│   ├── build_data.py
│   ├── contenido.js
│   ├── gen_docx.js
│   └── gen_html.js
└── docs/                   Sitio publicado en GitHub Pages
    ├── index.html          Dashboard
    ├── recomendaciones.html
    ├── estilos.css, app.js
    ├── data/               datos.json, data.js, CSV, calculos.json
    └── descargas/          Documento en Word (.docx)
```

## Publicar en GitHub Pages

1. Crea un repositorio vacío en GitHub, por ejemplo `libro-peru`.
2. Desde la carpeta descomprimida:

   ```bash
   git init
   git add .
   git commit -m "Estudio mercado del libro Perú v1.0"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/libro-peru.git
   git push -u origin main
   ```

3. En GitHub, ve a **Settings → Pages**. En *Build and deployment* elige **Deploy from a branch**, rama `main` y carpeta `/docs`. Guarda.
4. En uno o dos minutos el sitio queda en `https://TU_USUARIO.github.io/libro-peru/`.

La interfaz de GitHub puede cambiar. Si los nombres de menú no coinciden, consulta la documentación oficial de GitHub Pages.

## Ver en local

Abre `docs/index.html` en el navegador. Los datos están embebidos en `data/data.js`, así que no necesita servidor. Los gráficos usan Chart.js desde cdnjs, por lo que se requiere conexión a internet.

## Regenerar

Ver [FLUJO.md](FLUJO.md#cómo-regenerar).

## Advertencias

- La fuente principal de hábitos de lectura es la ENL 2022. No se encontró una edición posterior publicada.
- Las cifras de tamaño de mercado son declaraciones gremiales (2017 y 2019), no estadística auditada.
- La prórroga de exoneraciones del IGV hasta 2028 (Ley 32542) proviene de una fuente especializada. Debe verificarse en El Peruano.
- Las estrategias de negocio son hipótesis del estudio para validar con pilotos.
- Los datos de terceros conservan sus licencias. La ENL 2022 se publica bajo CC BY-NC-ND 3.0 y exige citar la fuente.
