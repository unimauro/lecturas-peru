# Spec: Estudio del mercado del libro y la lectura en el Perú

Versión 1.0, 6 de octubre de 2026.

## 1. Objetivo

Construir un diagnóstico verificable del ecosistema del libro en el Perú. El diagnóstico debe servir para dos cosas:

- Orientar políticas públicas de fomento de la lectura.
- Orientar estrategias de innovación de negocio para editoriales, imprentas, librerías, vendedores, escritores y aficionados.

## 2. Destinatarios

| Actor | Qué necesita del estudio |
|---|---|
| Estado (Mincul, Minedu, BNP, gobiernos regionales y locales) | Brechas priorizadas, evidencia sobre el Plan Lector e indicadores de seguimiento |
| Editoriales e imprentas | Tamaño y dinámica de la oferta, formatos y segmentos en crecimiento |
| Librerías y vendedores | Canales de compra, competidores (incluido el informal) y barreras del lector |
| Escritores | Cómo eligen los lectores, autoedición y canales |
| Colegios, mediadores y aficionados | Prácticas lectoras escolares y del hogar, rol de las bibliotecas |

## 3. Preguntas de investigación

1. ¿Cuánto y qué leen los peruanos? Incluye preferencias, formatos y frecuencia.
2. ¿Cómo varía la lectura por zona (urbano/rural), región, sexo, edad y nivel educativo?
3. ¿Cuánto cuesta leer y cuánto gasta el lector? ¿Por qué canales compra?
4. ¿Cómo está la oferta editorial (títulos, formatos, agentes, ejemplares) y quiénes compiten?
5. ¿Compiten las redes sociales con la lectura de libros? ¿Cómo?
6. ¿Funcionaron los planes lectores escolares, en particular los de lecturas livianas?
7. ¿Qué políticas públicas y qué estrategias de negocio se desprenden de la evidencia?

## 4. Alcance

- **Geográfico:** nacional, con desagregación urbano/rural, por región natural y por departamento cuando la fuente lo permite.
- **Temporal:** 2019-2026. Cada cifra indica su año.
- **Fuera de alcance en v1.0:** levantamiento primario (encuestas o entrevistas), procesamiento de microdatos de la ENL y ranking departamental de lectura.

## 5. Fuentes y jerarquía

1. Estadística oficial: INEI, Mincul, Minedu (UMC) y BNP.
2. Organismos internacionales con datos de agencias ISBN (Cerlalc).
3. Investigación académica.
4. Declaraciones gremiales en prensa (CPL). Se marcan como no auditadas.
5. Estimaciones privadas (DataReportal). Se marcan como estimación.

## 6. Reglas de calidad

- Ninguna cifra sin fuente. Cada valor del dataset referencia un `id` de `docs/data/datos.json → fuentes`.
- No se estiman valores faltantes. Se registran en `vacios`.
- Los cálculos propios se identifican como tales y se reproducen en `build/build_data.py → calculos.json`.
- Las normas cuya vigencia no se verificó en El Peruano se marcan "por verificar".
- Las recomendaciones de negocio se presentan como hipótesis a validar con pilotos.

## 7. Indicadores núcleo

| Indicador | Fuente |
|---|---|
| % que leyó al menos un libro; promedio de libros al año | ENL |
| Brecha urbano-rural | ENL (cálculo) |
| Tipo de lector por frecuencia | ENL |
| Razones de lectura y de no lectura | ENL |
| Gasto anual y canal de compra | ENL |
| ISBN por formato y tipo de agente; ejemplares declarados | Cerlalc / BNP |
| Nivel satisfactorio en lectura | ENLA |
| Uso de biblioteca escolar y motivos de no uso | ENL |
| Usuarios de redes sociales | DataReportal |

## 8. Entregables

| Entregable | Ubicación |
|---|---|
| Dashboard web | `docs/index.html` |
| Recomendaciones (web) | `docs/recomendaciones.html` |
| Documento editable | `docs/descargas/Estudio_Mercado_Libro_Peru_2026.docx` |
| Datos abiertos | `docs/data/` (JSON y CSV) |
| Flujo de trabajo y actualización | `FLUJO.md` |

## 9. Criterios de aceptación

- [x] Cada gráfico y tabla muestra su fuente con enlace.
- [x] La pregunta sobre el Plan Lector tiene una respuesta explícita basada en la evidencia disponible.
- [x] Las recomendaciones cubren el Estado y los cinco grupos de actores privados.
- [x] El sitio funciona sin backend y es publicable en GitHub Pages desde `/docs`.
- [x] El dashboard funciona en móvil y en modo oscuro.
- [ ] Ranking departamental de lectura (pendiente v1.1).
- [ ] Validación de la vigencia de la Ley 32542 en El Peruano (pendiente).
