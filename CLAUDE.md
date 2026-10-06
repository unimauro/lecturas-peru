# CLAUDE.md: reglas del proyecto

Proyecto: sitio estático sobre el libro y la lectura en el Perú, con dashboard, recomendaciones y datos abiertos. Spec de trabajo: `SPEC_CLAUDE_CODE.md`.

## Reglas
- Contenido en español (Perú), con coma decimal y punto de miles.
- Toda cifra referencia un `id` de `docs/data/datos.json → fuentes`. Sin fuente no hay cifra: va a `vacios`.
- No estimar, no interpolar, no inventar URLs ni normas.
- Los cálculos propios van solo en `calculos.json`, generados por `build/build_data.py`.
- Marca neutral: sin logos ni nombres de consultoras.
- No hacer push, crear repos ni cambiar GitHub sin confirmación del usuario.
- Trabajar por fases y detenerse a reportar al final de cada una.

## Comandos
```bash
python3 build/build_data.py   # datos
node build/gen_docx.js        # Word
node build/gen_html.js        # recomendaciones.html
python3 build/validate.py     # integridad (debe terminar en 0)
python3 build/shots.py        # capturas QA en qa/
```

## Convenciones técnicas
- Sitio en `/docs`, sin frameworks. Chart.js 4.4.1 UMD desde cdnjs.
- Cada `<canvas>` va dentro de `<div class="lienzo" style="height:Npx">`.
- Rutas relativas en scripts.
- El contenido del documento vive solo en `build/contenido.js`. Word y HTML se generan desde ahí.
