# SPEC para Claude Code: Estudio del libro y la lectura en el Perú

> **Cómo usarlo.** Copia este archivo y `CLAUDE.md` en la raíz del repositorio. Abre Claude Code en esa carpeta y escribe:
> `Lee SPEC_CLAUDE_CODE.md y CLAUDE.md. Ejecuta la Fase 0 y detente a reportar.`
> Avanza fase por fase. Claude Code no debe pasar a la siguiente sin tu confirmación.

---

## 1. Contexto y rol

Actúas como ingeniero de datos y desarrollador front-end en un estudio independiente sobre el ecosistema del libro en el Perú. El producto final es un sitio estático publicado en GitHub Pages con tres partes:

- Un dashboard de indicadores.
- Un documento de recomendaciones en web y en Word (.docx).
- Datos abiertos.

El público son el Estado (Mincul, Minedu, BNP, gobiernos regionales), editoriales, imprentas, librerías, vendedores, escritores y mediadores de lectura.

Idioma de todo el contenido: **español (Perú)**. Formato numérico: coma decimal y punto de miles (`47,3 %`, `8.893`).

## 2. Objetivo

Dejar el repositorio en versión **1.1**, publicado y verificado. Esto implica:

1. Verificar todas las fuentes existentes.
2. Cerrar los pendientes de la v1.0 (sección 8, Fase 3).
3. Agregar el ranking departamental de lectura.
4. Implementar validaciones automáticas de integridad de datos.
5. Publicar en GitHub Pages.

## 3. Reglas no negociables

1. **Ninguna cifra sin fuente.** Cada valor numérico del dataset, del dashboard y del documento debe referenciar un `id` existente en `fuentes`.
2. **No estimar ni completar.** Si un dato no se encuentra o la fuente no es accesible, regístralo en `vacios` con el motivo. No interpoles, no extrapoles, no uses valores "aproximados" sin fuente.
3. **No inventar URLs, normas, autores ni citas.** Si una URL no responde, márcala como rota en el reporte. No la reemplaces por una URL deducida.
4. **Separar dato de cálculo.** Los cálculos propios (variaciones, participaciones, brechas) viven en `calculos.json`, se generan por script y se rotulan "cálculo propio" donde se muestren.
5. **Jerarquía de fuentes:** oficial (INEI, Mincul, Minedu-UMC, BNP, El Peruano) > Cerlalc > académica > gremial en prensa (rotular "declaración gremial, no auditada") > privada (rotular "estimación").
6. **Marca neutral.** Sin logos ni nombres de empresas consultoras. No agregar marca.
7. **Normas:** una norma solo se presenta como vigente si se verificó su texto en El Peruano o en el SPIJ. Si no, se rotula "por verificar".
8. **Recomendaciones de negocio = hipótesis.** No presentarlas como hallazgos.
9. **No hacer `git push`, crear repos ni cambiar configuración de GitHub sin confirmación explícita del usuario.**

## 4. Stack y restricciones técnicas

| Componente | Decisión |
|---|---|
| Sitio | HTML, CSS y JS estáticos en `/docs`. Sin frameworks ni bundler. |
| Gráficos | Chart.js 4.4.1 UMD desde `https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js` |
| Tipografía | Literata (texto) y Archivo (datos) vía Google Fonts, con fallback a Georgia y Arial |
| Datos en el sitio | `docs/data/data.js` (`window.DATA = {...}`) para que funcione también con `file://` |
| Scripts de build | Python 3.10+ (datos y validación) y Node 18+ con el paquete `docx` (Word) |
| QA visual | Playwright (Python) para capturas de escritorio (1280 px) y móvil (390 px) |
| Publicación | GitHub Pages desde la rama `main`, carpeta `/docs`, con `.nojekyll` |

Restricciones:

- Los gráficos de Chart.js deben ir dentro de un contenedor con altura fija (`.lienzo`). Sin esto, se produce un bucle de redimensionamiento.
- Soporte de modo oscuro con `prefers-color-scheme`, foco visible y `prefers-reduced-motion`.
- Rutas relativas en todos los scripts. Nada de rutas absolutas del sistema.

## 5. Estructura objetivo

```
/
├── CLAUDE.md
├── SPEC.md                    # spec funcional del estudio (no tocar salvo checklist)
├── SPEC_CLAUDE_CODE.md        # este archivo
├── FLUJO.md
├── README.md
├── CHANGELOG.md               # nuevo
├── requirements.txt           # nuevo: playwright, requests, pdfplumber
├── package.json               # nuevo: dependencia docx
├── build/
│   ├── build_data.py          # dataset maestro → datos.json, data.js, CSV, calculos.json
│   ├── contenido.js           # contenido único del documento
│   ├── gen_docx.js            # Word
│   ├── gen_html.js            # recomendaciones.html
│   ├── check_links.py         # nuevo
│   ├── validate.py            # nuevo
│   ├── extract_enl_dep.py     # nuevo (Fase 2)
│   └── shots.py               # nuevo (capturas QA)
├── qa/                        # nuevo: reportes y capturas (no publicar)
└── docs/
    ├── .nojekyll
    ├── index.html, recomendaciones.html, estilos.css, app.js
    ├── data/  datos.json, data.js, calculos.json, *.csv
    └── descargas/ Estudio_Mercado_Libro_Peru_2026.docx
```

## 6. Esquema de datos (`docs/data/datos.json`)

```json
{
  "generado": "AAAA-MM-DD",
  "fuentes": {
    "<ID>": {"titulo": "", "entidad": "", "anio": 2022, "tipo": "Oficial|Organismo internacional|Académico|Prensa / gremio|Privado (estimación)|Especializada", "url": "", "estado_url": "ok|rota|no verificada", "verificado": "AAAA-MM-DD"}
  },
  "datos": {
    "<bloque>": {"fuente": "<ID>", "anio": 2022, "nota": "", "items": [["etiqueta", 0.0]]}
  },
  "vacios": [{"tema": "", "motivo": "", "accion_sugerida": ""}]
}
```

Cambios respecto a v1.0:

- Agregar `estado_url` y `verificado` a cada fuente.
- Convertir `vacios` de lista de textos a objetos.
- Agregar el bloque `lectura_departamental`.

## 7. Fuentes semilla (ya incorporadas en v1.0)

Verificar todas en la Fase 1. Las principales son:

| ID | Fuente | URL |
|---|---|---|
| ENL22 | INEI y Mincul, ENL 2022, informe nacional | https://www.inei.gob.pe/media/MenuRecursivo/publicaciones_digitales/Est/Lib1897/libro.pdf |
| CERLALC26 | Cerlalc, Panorama de la actividad editorial 2019-2024 | https://cerlalc.org/wp-content/uploads/2026/07/Panoram-de-la-actividad-editorial-2019-2024_Cerlalc_Agosto.pdf |
| ENLA25 | Minedu-UMC, ENLA 2025, resumen ejecutivo | https://repositorio.minedu.gob.pe/handle/20.500.12799/12773 |
| DR26 | DataReportal, Digital 2026: Peru | https://datareportal.com/reports/digital-2026-peru |
| BNP19 | BNP, producción editorial por departamentos 2019 | https://www.bnp.gob.pe/documentos/bibliografia-peruana/estadisticos/produccion-editorial-por-departamentos-sin-lima-2019.pdf |
| L32542 | ByB Consultores, prórroga de Apéndices IGV a 2028 (por verificar) | https://bybconsultores.pe/impuesto-a-la-renta/comun-igv-renta/prorroga-de-las-exoneraciones-del-igv-vigencia-de-los-apendices-i-y-ii-hasta-el-31-de-diciembre-de-2028/ |

La lista completa está en `build/build_data.py → FUENTES`.

Repositorios a consultar para nuevos datos:

- Portal Perú Lee: https://perulee.pe/content/encuesta-nacional-de-lectura-2022
- Infoartes: https://www.infoartes.pe/encuesta-nacional-de-lectura-2022-2/
- Datos abiertos: https://www.datosabiertos.gob.pe/dataset/encuesta-nacional-de-lectura

## 8. Fases

Al terminar cada fase, reporta con el formato de la sección 11 y espera confirmación.

### Fase 0: Preparación
- Detectar si el repo ya contiene la v1.0 (existe `docs/data/datos.json`). Si no existe, detenerse y pedir el zip de la v1.0. **No reconstruir desde cero.**
- Crear `requirements.txt`, `package.json`, `CHANGELOG.md` y la carpeta `qa/` (agregar `qa/` a `.gitignore`).
- Instalar dependencias y ejecutar `python3 build/build_data.py && node build/gen_docx.js && node build/gen_html.js` para confirmar que el build actual corre.
- **Terminado cuando:** el build corre sin errores y `git status` está limpio tras el primer commit local.

### Fase 1: Verificación de fuentes
- Crear `build/check_links.py`. Debe hacer una petición HTTP a cada `url` (timeout de 20 s, seguir redirecciones, user-agent de navegador) y registrar `estado_url` y `verificado`.
- Generar `qa/reporte_fuentes.md` con una tabla de ID, estado, código HTTP y observación.
- Para cada fuente "Prensa" que cite una cifra oficial, buscar el documento oficial original. Si se encuentra, agregarlo como nueva fuente y re-apuntar la cifra. Ejemplo: ENLA 2024 citada por La República → informe de la UMC.
- **Terminado cuando:** el 100 % de las fuentes tiene `estado_url` y cada cifra ENLA apunta, cuando sea posible, a una fuente de la UMC.

### Fase 2: Ranking departamental de lectura
- Ubicar los 24 informes departamentales de la ENL 2022 (Perú Lee, Infoartes) o los microdatos en Datos Abiertos.
- Crear `build/extract_enl_dep.py` para extraer, por departamento, tres indicadores: el % que leyó libros (18-64), el promedio de libros leídos y el % de asistencia a bibliotecas.
- Si un indicador no está en el informe, dejar `null` y registrar el vacío. **No calcular desde fuentes distintas.**
- Si se usan microdatos, documentar el factor de expansión usado y reportar CV. Un CV mayor a 15 % debe marcarse "referencial", según el criterio del INEI.
- **Terminado cuando:** existe `datos.lectura_departamental` con 25 dominios (24 departamentos + Callao, y Lima Metropolitana / Lima Provincias si la fuente los separa) o un vacío documentado por cada faltante.

### Fase 3: Pendientes de la v1.0
Para cada ítem, verificar, actualizar el dato o el vacío, y anotar en `CHANGELOG.md`.

| Pendiente | Acción |
|---|---|
| Ley 32542 (prórroga IGV a 2028) | Buscar el texto en El Peruano o el SPIJ. Confirmar si el Apéndice I incluye libros. Actualizar `marco_normativo` y quitar "por verificar" solo si se confirma. |
| ENL posterior a 2022 | Buscar en Mincul, INEI y Perú Lee. Si existe, crear un bloque nuevo; **no sobrescribir 2022**. |
| ENLA 2025, 4.º de primaria, % satisfactorio nacional | Obtener la cifra exacta del informe de la UMC. |
| Ventas FIL Lima 2024 y 2025 | Buscar notas de la CPL. Si no hay cifra, mantener el vacío. |
| Tamaño de mercado reciente | Buscar estudios de la CPL o Cerlalc. Si no hay, mantener el vacío. |

### Fase 4: Dashboard
- Agregar la sección "Brechas entre regiones" con un gráfico de barras horizontales de `lectura_departamental`, ordenado de mayor a menor. Resaltar el promedio nacional y la región seleccionada.
- Agregar un selector de indicador departamental (lectura de libros, promedio, bibliotecas).
- Mostrar "referencial" en las barras con CV > 15 %, si aplica.
- Mantener intactos el diseño actual (estante de lomos en el hero, paleta y filtro por actor), el contenido existente y los textos de implicancias, salvo que un dato cambie.
- Cada nuevo gráfico debe tener `figcaption` con fuente enlazada y `aria-label`.
- **Terminado cuando:** no hay errores en consola y las capturas de escritorio y móvil se ven bien.

### Fase 5: Documento
- Actualizar `contenido.js` con los datos nuevos: sección 3.8 Regiones, marco normativo y vacíos.
- Regenerar el Word y el HTML. El Word va en A4, con índice y sin marca.
- Agregar al Word un anexo "Cambios v1.1" con lo de `CHANGELOG.md`.
- **Terminado cuando:** el .docx abre, se convierte a PDF con LibreOffice sin errores y las tablas no se desbordan.

### Fase 6: QA automatizado
Crear `build/validate.py` y que falle (exit 1) si se cumple alguna de estas condiciones:
- Un `fuente` referenciado no existe en `fuentes`.
- Una fuente no se usa en ningún lado (advertencia, no error).
- Un porcentaje está fuera de 0-100.
- Una cifra escrita en `index.html` o en `contenido.js` no aparece en `datos.json` ni en `calculos.json`. Usar una lista blanca de excepciones documentada, por ejemplo años y números de ley.
- `calculos.json` no coincide con su recálculo desde `datos.json`.

Además:
- Crear `build/shots.py` (Playwright) para capturar `index.html` y `recomendaciones.html` en 1280 y 390 px, en modo claro y oscuro, dentro de `qa/`.
- Registrar los errores de consola en `qa/consola.txt`.
- **Terminado cuando:** `validate.py` termina en 0 y no hay errores de consola.

### Fase 7: Publicación (requiere confirmación)
- Preguntar al usuario el nombre del repositorio y si será público.
- Con confirmación, crear y subir el repo con `gh repo create <nombre> --public --source=. --push`.
- Activar GitHub Pages desde la rama `main`, carpeta `/docs`. Si se hace por API con `gh api`, verificar primero la sintaxis vigente en la documentación de GitHub. Si no hay certeza, dar al usuario los pasos manuales: *Settings → Pages → Deploy from a branch → main → /docs*.
- Opcional: agregar `.github/workflows/validate.yml` para correr `validate.py` en cada push.
- **Terminado cuando:** la URL de Pages responde 200 y muestra el dashboard.

### Fase 8: Cierre
- Actualizar `README.md` con la URL publicada y la versión 1.1.
- Actualizar el checklist de `SPEC.md`.
- Entregar un resumen final: qué se verificó, qué cambió, qué vacíos persisten y la URL.

## 9. Criterios de aceptación globales

- [ ] `python3 build/validate.py` termina en 0.
- [ ] Todas las fuentes tienen `estado_url` y fecha de verificación.
- [ ] Existe el ranking departamental o los vacíos están documentados por departamento.
- [ ] Ninguna norma figura como vigente sin verificación oficial.
- [ ] Dashboard sin errores de consola, legible en 390 px y en modo oscuro.
- [ ] El Word se regenera desde `contenido.js` y coincide con la web.
- [ ] El sitio está publicado en GitHub Pages, o se entregaron los pasos manuales si el usuario no autorizó publicar.
- [ ] `CHANGELOG.md` registra cada cifra cambiada con su valor anterior, valor nuevo y fuente.

## 10. Cuándo preguntar y qué no hacer

Preguntar antes de:
- Hacer push, crear un repo o activar Pages.
- Reemplazar una fuente oficial por otra.
- Eliminar un bloque de datos o una sección del sitio.
- Cambiar el diseño visual más allá de lo indicado en la Fase 4.

No hacer:
- Rellenar datos faltantes con promedios, tendencias o valores de otros países.
- Citar una fuente que no se haya abierto y leído.
- Cambiar la marca ni agregar logos.
- Introducir frameworks (React, Vue), bundlers o dependencias de servidor.
- Usar rutas absolutas en scripts.

## 11. Formato de reporte por fase

```
## Fase N: <nombre>
Estado: completada | bloqueada
Hecho:
- ...
Datos cambiados: (ID, valor anterior → nuevo, fuente)
Vacíos nuevos o persistentes:
- ...
Archivos modificados:
- ...
Requiere decisión del usuario:
- ...
```
