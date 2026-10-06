// Contenido único: se usa para el .docx y para recomendaciones.html
// Convenciones: {p:"texto"} párrafo; {ul:[...]} lista; {tabla:{cols:[], filas:[[]], anchos:[]}}; {h2}/{h3}; {nota:"..."}
const datos = require(require('path').join(__dirname,'..','docs','data','datos.json'));
const F = datos.fuentes;

const CORTA = {ENL22:"ENL 2022",ENL22P:"Mincul, ENL 2022",CERLALC26:"Cerlalc 2026",ENLA24:"Minedu, ENLA 2024",ENLA24B:"ENLA 2024",ENLA24C:"ENLA 2024",ENLA24D:"ENLA 2024",ENLA25:"Minedu, ENLA 2025",DR26:"DataReportal 2026",GES24:"Gestión 2024",GES25:"Gestión 2025",AND19:"Andina 2019",AND18:"Andina 2018",FIL26:"El Peruano 2026",FIL25:"Caretas 2025",L31893:"Ley 31893",L31893B:"DS 058-2024-EF",L32542:"Ley 32542",BNP19:"BNP 2019",BNP25:"BNP 2025",BNP26:"BNP 2026",IEP25:"IEP 2025",GESN:"Gestión",GESFIL:"Gestión 2025",PL1:"UCV 2014",PL2:"UNJFSC 2024",PL3:"Minedu-UGEL 07",CHAK26:"Chakiñan 2026"};
const c = (...ids) => "(" + ids.map(i=>CORTA[i]||i).join("; ") + ")";

const doc = {
 titulo: "El libro y la lectura en el Perú",
 subtitulo: "Diagnóstico del mercado y recomendaciones de política pública e innovación por actor",
 fecha: "Octubre de 2026",
 secciones: [
 {h2:"1. Resumen ejecutivo", bloques:[
  {p:"Este documento resume la evidencia pública disponible al 6 de octubre de 2026 sobre hábitos de lectura, mercado editorial y políticas del libro en el Perú, y propone medidas para el Estado, la industria y los creadores. Cada cifra indica su fuente. Donde no hubo dato verificable, se deja constancia del vacío y no se estima."},
  {h3:"Hallazgos principales"},
  {ul:[
   "Se lee mucho, pero poco en libros. El 82,7 % de la población alfabeta de 18 a 64 años leyó contenidos digitales el mes anterior y el 47,3 % leyó al menos un libro en el año. El promedio es de 1,9 libros por persona al año y de 4,0 entre quienes leen libros "+c("ENL22","ENL22P")+".",
   "La brecha es territorial y educativa. Leyó libros el 50,3 % de la población urbana frente al 29,8 % de la rural, y el 75,0 % de quienes tienen educación universitaria "+c("ENL22")+".",
   "La barrera declarada es el tiempo, no el precio. El 68,3 % de quienes no leen libros lo atribuye a falta de tiempo; la falta de dinero aparece en 8,6 % de las razones de no lectura general "+c("ENL22")+".",
   "La oferta editorial se recupera, el volumen impreso no. En 2024 se asignaron 8.893 ISBN (9,0 % más que en 2019), pero los ejemplares declarados (14,7 millones) siguen 27,1 % por debajo de 2019 "+c("CERLALC26")+". Cálculo propio sobre datos de la fuente.",
   "El canal informal compite directamente. El 27,8 % de quienes compraron libros lo hizo en ambulantes o puntos de libros fotocopiados; el 64,6 % en librerías físicas "+c("ENL22")+".",
   "La escuela no tiene la infraestructura básica. Entre los escolares que no participaron en actividades de biblioteca escolar, el 59,4 % indicó que su colegio no tiene biblioteca y el 20,7 % que no funciona "+c("ENL22")+". Solo el 32,8 % de estudiantes de 4.º de primaria alcanzó nivel satisfactorio en lectura en 2024 "+c("ENLA24")+".",
   "No hay evaluación de impacto del Plan Lector. No se puede afirmar que los planes lectores con lecturas livianas hayan funcionado o fallado; la evidencia peruana ubicada es local y metodológicamente débil "+c("PL1","PL2")+"."
  ]},
  {h3:"Recomendaciones prioritarias"},
  {ul:[
   "Garantizar bibliotecas escolares funcionando antes de rediseñar el contenido del Plan Lector.",
   "Evaluar el Plan Lector con un diseño que permita atribuir resultados, usando la ENLA como medición.",
   "Aplicar la siguiente ENL según la periodicidad de la Ley 31053, con un módulo de uso del tiempo y de lectura en redes.",
   "Llevar ferias y bibliotecas a donde está la población: el 41,6 % no va a ferias porque no las conoce.",
   "Ofrecer libro legal accesible (ediciones económicas, digital, impresión bajo demanda) para competir con la fotocopia, en paralelo a la fiscalización."
  ]}
 ]},

 {h2:"2. Alcance y método", bloques:[
  {p:"Ámbito nacional, con desagregación urbano-rural, por región natural y por departamento cuando la fuente lo permite. Periodo de referencia 2019-2026; cada cifra indica su año."},
  {p:"Fuentes priorizadas en este orden: estadística oficial (INEI, Mincul, Minedu, BNP), organismos internacionales con datos de agencias ISBN (Cerlalc), análisis académico, y declaraciones gremiales reportadas por prensa. Estas últimas se marcan como tales porque no son estadística auditada."},
  {p:"Limitaciones: la ENL 2022 tiene un margen de error de 3 a 5 puntos con 95 % de confianza "+c("ENL22")+". No se encontró una ENL posterior publicada. Las estimaciones de tamaño de mercado disponibles son de 2017 y 2019. Las recomendaciones de negocio son propuestas del estudio, formuladas como hipótesis a validar con pilotos."}
 ]},

 {h2:"3. Diagnóstico", bloques:[
  {h3:"3.1 Hábitos de lectura"},
  {tabla:{cols:["Indicador","Valor","Fuente"],anchos:[5200,1600,2226],filas:[
   ["Leyó contenidos digitales (mes anterior)","82,7 %","ENL 2022"],
   ["Leyó periódicos (mes anterior)","63,4 %","ENL 2022"],
   ["Leyó al menos un libro (12 meses)","47,3 %","ENL 2022"],
   ["Leyó revistas (mes anterior)","22,5 %","ENL 2022"],
   ["Lector frecuente de libros (al menos semanal)","38,3 %","ENL 2022"],
   ["No lector de libros","54,2 %","ENL 2022"],
   ["Promedio de libros al año, toda la población alfabeta 18-64","1,9","Mincul, ENL 2022"],
   ["Promedio de libros al año, lectores de libros","4,0 (urbano 4,1; rural 2,5)","ENL 2022"],
   ["Hogares sin libros / con 1 a 10 libros","4,8 % / 42,7 %","ENL 2022"]]}},
  {p:"La lectura de libros es mayor en mujeres (51,5 %) que en hombres (43,2 %) y en jóvenes de 18 a 29 años (58,9 %). El estrato socioeconómico alto alcanza 68,2 % "+c("ENL22")+". La ENL mide frecuencia, no minutos diarios: no existe dato oficial de tiempo de lectura."},

  {h3:"3.2 Preferencias de lectura"},
  {p:"El 36,3 % leyó principalmente literatura (novela, cuento, poesía, historieta) y el 31,1 % textos escolares o universitarios. Las mujeres leen libros infantiles en mayor proporción (28,2 % frente a 11,9 %), asociado a que el 34,1 % de ellas lee para apoyar el estudio o entretenimiento de sus hijos "+c("ENL22")+"."},
  {p:"El libro se elige por el tema (68,5 %), por el título (23,8 %) o por recomendación de un amigo o familiar (23,3 %). La principal razón para leer libros es el placer (44,8 %), seguida del estudio personal (33,3 %). Del total de libros leídos, el 63,1 % fue impreso y el 36,9 % digital "+c("ENL22")+"."},

  {h3:"3.3 Costo y gasto"},
  {p:"El gasto promedio anual en libros de quienes los adquirieron fue de S/ 170: S/ 177 en zona urbana y S/ 96 en rural "+c("ENL22")+". El gremio reportó en 2024 un rango de precios de S/ 15 a S/ 70 "+c("GES24")+". El 50,0 % de la población consiguió libros en el año, pagados o gratuitos, y de ellos el 60,4 % los compró "+c("ENL22")+"."},
  {p:"Libros y e-books están exonerados de IGV por la Ley 31893 y su reglamento (DS 058-2024-EF), que además dan reintegro de IGV a editoriales y exoneran del impuesto a la renta las regalías de autor desde 2024 "+c("L31893","L31893B")+". Según una fuente especializada, la Ley 32542 prorroga las exoneraciones de los Apéndices I y II del IGV hasta el 31 de diciembre de 2028 "+c("L32542")+". Esto debe verificarse en el texto oficial publicado en El Peruano antes de usarlo como vigente."},

  {h3:"3.4 Mercado y oferta editorial"},
  {tabla:{cols:["Año","ISBN total","Impreso","Digital","Comerciales","Autores-editores","Ejemplares (M)"],anchos:[900,1300,1200,1100,1400,1600,1526],filas:
    datos.datos.isbn.anios.map((a,k)=>[String(a),datos.datos.isbn.total[k].toLocaleString('es-PE'),datos.datos.isbn.impreso[k].toLocaleString('es-PE'),datos.datos.isbn.digital[k].toLocaleString('es-PE'),datos.datos.isbn.comercial[k].toLocaleString('es-PE'),datos.datos.isbn.autor_editor[k].toLocaleString('es-PE'),(datos.datos.isbn.ejemplares[k]/1e6).toFixed(1).replace('.',',')])}},
  {nota:"Fuente: Cerlalc 2026, con datos de la Agencia Peruana del ISBN. Los ejemplares de 2019 incluyen grandes tirajes educativos."},
  {p:"En 2024, el Perú registró 2,6 ISBN por cada 10.000 habitantes, frente a 4,1 de Colombia, 4,6 de Chile y 6,8 de Argentina "+c("CERLALC26")+". En 2024 los títulos digitales fueron el 19,5 % del total; las editoriales comerciales el 48,4 % y los autores-editores el 14,3 %. Cálculos propios sobre datos de Cerlalc."},
  {p:"Sobre el tamaño del mercado solo hay estimaciones gremiales: cerca de S/ 890 millones en 2017, incluyendo importaciones "+c("AND18")+", y cerca de S/ 700 millones en 2019 "+c("AND19")+". No son comparables entre sí ni hay cifra pública reciente. En 2024 el gremio señaló que la venta online representaba el 15 % de la facturación de las librerías y que las imprentas operaban cerca del 50 % de su capacidad instalada "+c("GES24")+". A inicios de 2025, asociados de la Cámara Peruana del Libro reportaron caídas de facturación de 2 % a 6 % "+c("GES25")+"."},
  {p:"La FIL Lima es el principal termómetro comercial: vendió S/ 17,7 millones en 2022 y S/ 18,5 millones en 2023 "+c("GES24")+"; en 2025 superó los 540 mil asistentes "+c("FIL25")+" y en 2026, en su nueva sede, superó los 400 mil visitantes y los S/ 18 millones en transacciones "+c("FIL26")+"."},

  {h3:"3.5 Competidores y sustitutos"},
  {tabla:{cols:["Segmento","Actores y evidencia","Fuente"],anchos:[2200,5000,1826],filas: datos.datos.competidores.map(x=>[x.segmento,x.actores,CORTA[x.fuente]])}},
  {p:"No existen cuotas de mercado públicas por editorial o librería. El análisis competitivo es, por tanto, cualitativo."},

  {h3:"3.6 Escuela y Plan Lector"},
  {p:"El 78,7 % de menores de 0 a 17 años leyó o le leyeron libros en el año, pero solo el 34,5 % de escolares de 3 a 17 años participó en actividades de biblioteca escolar. Entre quienes no participaron, el 59,4 % indicó que no hay biblioteca en su colegio y el 20,7 % que no funciona. El 14,8 % de 6 a 17 años participa en clubes de lectura "+c("ENL22")+"."},
  {p:"Resultados de aprendizaje: 32,8 % de 4.º de primaria y 24,9 % de 6.º de primaria en nivel satisfactorio en 2024 "+c("ENLA24","ENLA24B")+"; 11,3 % de 5.º de secundaria en 2025. Los resultados de 4.º de primaria se mantuvieron estables en 2025, con mejoras en zona rural "+c("ENLA25")+". Loreto tuvo el resultado más bajo en 4.º de primaria en 2024, con 12,8 % "+c("ENLA24")+"."},
  {p:"Sobre la pregunta de si los planes lectores con lecturas livianas ayudaron: no se encontró evaluación de impacto nacional. Los estudios peruanos ubicados son tesis locales. Una usó pre-test y post-test sin grupo de control con 20 niños "+c("PL1")+"; otra es descriptiva y no experimental "+c("PL2")+". Ambas reportan resultados positivos, pero su diseño no permite atribuir causalidad. Tampoco se encontró evidencia peruana que compare lecturas livianas con lecturas exigentes. La conclusión honesta es que no se sabe, y que la falta de bibliotecas escolares es una restricción previa más evidente."},

  {h3:"3.7 Competencia de las redes sociales"},
  {p:"El 74,3 % lee mensajes de WhatsApp y el 71,3 % textos en Facebook; el 62,4 % lee WhatsApp varias veces al día "+c("ENL22")+". En octubre de 2025 había 28,3 millones de identidades en redes sociales en el Perú, equivalentes al 81,6 % de la población "+c("DR26")+". No se obtuvo una cifra verificable de minutos diarios en redes para Perú."},
  {p:"Lectura del estudio: la competencia es por tiempo y atención. La misma población que declara no tener tiempo para libros lee mensajería varias veces al día. Al mismo tiempo, la recomendación entre pares (23,3 %) y el hábito de comentar lo leído (82,4 % de lectores) "+c("ENL22")+" hacen de las redes un canal de difusión aprovechable."},

  {h3:"3.8 Regiones"},
  {p:"La lectura general es de 93,6 % en la costa, 90,5 % en la sierra y 89,4 % en la selva "+c("ENL22")+". Fuera de Lima, Arequipa, Junín, Puno y La Libertad concentraron el 51,3 % de los títulos registrados en 2019 "+c("BNP19")+". Es un dato antiguo, útil como referencia estructural. El IEP señala que el mercado del libro sigue muy concentrado en Lima y que las ventas significativas se reducen a pocos distritos "+c("IEP25")+". Los 24 informes departamentales de la ENL 2022 permitirían un ranking por departamento; no se incorporaron en esta versión."},

  {h3:"3.9 Marco normativo"},
  {tabla:{cols:["Norma","Contenido","Fuente"],anchos:[2300,5000,1726],filas: datos.datos.marco_normativo.map(x=>[x.norma,x.contenido,CORTA[x.fuente]])}}
 ]},

 {h2:"4. Recomendaciones de política pública", bloques:[
  {p:"Cada medida se vincula con el problema que atiende y la evidencia que la sustenta. Responsables y horizontes son propuestas del estudio."},
  {tabla:{cols:["Medida","Problema y evidencia","Responsable","Indicador"],anchos:[2500,3000,1600,1926],filas:[
   ["Biblioteca escolar operativa en cada institución educativa, con dotación y responsable","59,4 % de quienes no usan biblioteca escolar dice que no existe; 20,7 % que no funciona (ENL 2022)","Minedu, DRE, UGEL, gobiernos regionales","% de IE con biblioteca operativa; participación en biblioteca escolar (línea base 34,5 %)"],
   ["Evaluación de impacto del Plan Lector","Sin evaluación nacional; estudios locales sin grupo de control","Minedu (UMC) con Mincul","Estudio publicado con grupo de comparación; preguntas de plan lector en cuestionarios de la ENLA"],
   ["Siguiente ENL con módulo de uso del tiempo y lectura en redes, con microdatos abiertos","Ley 31053 fija periodicidad trienal; no se halló ENL posterior a 2022; no hay dato de minutos de lectura","Mincul e INEI","ENL publicada; microdatos en datos abiertos"],
   ["Ferias y bibliotecas itinerantes focalizadas en zona rural y Amazonía","41,6 % no conoce ferias; 38,7 % no tiene biblioteca cerca; ferias rurales 4,1 % (ENL 2022)","Mincul (DLL), BNP, municipalidades","Asistencia a ferias (línea base 14,0 %) y a bibliotecas (6,5 %)"],
   ["Compras públicas de libros a editoriales nacionales y regionales, con catálogo transparente y títulos en lenguas originarias","Ley 31053 contempla compras públicas; 15,3 % aprendió a hablar en lengua nativa (ENL 2022)","Mincul, BNP, Minedu","Títulos y ejemplares adquiridos por región y lengua"],
   ["Estrategia contra la fotocopia que combine fiscalización y oferta legal accesible","27,8 % compra en ambulantes o fotocopias (ENL 2022)","Indecopi, CPL, Mincul","Participación del canal informal en la próxima ENL"],
   ["Transparencia y evaluación de los beneficios tributarios antes de su vencimiento","Exoneraciones vigentes; prórroga a 2028 por verificar (Ley 32542)","MEF, Sunat, Mincul","Reporte anual de beneficiarios y costo fiscal"],
   ["Bibliotecas digitales y alfabetización digital crítica","36,9 % de los libros leídos ya es digital; uso de bibliotecas digitales 12,0 % (ENL 2022)","BNP, Minedu","Usuarios activos de bibliotecas digitales públicas"]]}}
 ]},

 {h2:"5. Estrategias de innovación por actor", bloques:[
  {nota:"Las estrategias de esta sección son propuestas del estudio, formuladas como hipótesis. Se recomienda validarlas con pilotos pequeños y medibles antes de escalar."},
  {h3:"5.1 Editoriales"},
  {ul:[
   "Descubribilidad por tema. Como el 68,5 % elige por tema, conviene invertir en metadatos, categorías claras y catálogos temáticos en tiendas online y ferias.",
   "Ediciones económicas y de bolsillo de títulos de alta rotación para disputar el segmento que hoy compra fotocopias.",
   "Lanzamiento simultáneo impreso y digital: un tercio de los libros leídos es digital y los e-books están exonerados de IGV.",
   "Coediciones y presencia en ferias regionales con los nodos editoriales de Arequipa, Junín, Puno y La Libertad.",
   "Líneas infantiles y de apoyo escolar dirigidas a madres y cuidadores, el grupo que más lee para acompañar a hijos."
  ]},
  {h3:"5.2 Imprentas y empresas gráficas"},
  {ul:[
   "Impresión bajo demanda y tiradas cortas para autores-editores, segmento que creció 33 % en ISBN entre 2019 y 2024 (cálculo propio sobre Cerlalc), aprovechando capacidad ociosa declarada.",
   "Paquete integral para autores: diseño, corrección, trámite de ISBN y depósito legal (ya disponible en línea en la BNP), impresión y distribución.",
   "Servicios para compras públicas y bibliotecas regionales, con capacidad de producir en lenguas originarias.",
   "Exportación de servicios gráficos a mercados de la región con los que existen acuerdos comerciales."
  ]},
  {h3:"5.3 Librerías y vendedores"},
  {ul:[
   "Omnicanalidad: la venta online ya era el 15 % de la facturación de librerías en 2024 (dato gremial). Integrar inventario, despacho a provincias y recojo en tienda.",
   "Puntos de venta en rutas cotidianas (centros comerciales, estaciones, mercados) para responder a la barrera de tiempo.",
   "Comunidad: clubes de lectura, presentaciones y alianzas con creadores de contenido lector, aprovechando que la recomendación entre pares pesa 23,3 %.",
   "Libro usado formal y canje como alternativa barata y legal a la fotocopia.",
   "Vendedores informales: ruta de formalización como distribuidores de ediciones económicas legales, con márgenes atractivos."
  ]},
  {h3:"5.4 Escritores"},
  {ul:[
   "Autoedición profesional: ISBN en línea, depósito legal y distribución en tiendas online para llegar fuera de Lima.",
   "Construcción de comunidad digital propia antes y después del lanzamiento.",
   "Circuito de ferias regionales y bibliotecas, no solo la FIL Lima.",
   "Revisar con un contador la exoneración del impuesto a la renta sobre regalías vigente desde 2024."
  ]},
  {h3:"5.5 Aficionados, clubes y mediadores"},
  {ul:[
   "Clubes de lectura en colegios, bibliotecas municipales y espacios comunitarios, hoy con baja participación escolar (14,8 %).",
   "Lectura compartida en el hogar: el 95,0 % de hogares con menores realizó al menos una actividad de fomento, base sobre la cual construir programas.",
   "Reseñas y recomendaciones en redes como forma de mediación, dado que comentar lo leído es la actividad más frecuente de los lectores (82,4 %)."
  ]}
 ]},

 {h2:"6. Hoja de ruta", bloques:[
  {tabla:{cols:["Horizonte","Estado","Industria y creadores"],anchos:[1600,3800,3626],filas:[
   ["0 a 12 meses","Diagnóstico de bibliotecas escolares; diseño de la evaluación del Plan Lector; verificar vigencia de beneficios tributarios; calendario de ferias regionales","Pilotos de ediciones económicas; servicio de impresión bajo demanda; tienda online con despacho nacional"],
   ["1 a 3 años","Dotación de bibliotecas escolares priorizando Amazonía y zona rural; siguiente ENL con módulo de tiempo; compras públicas transparentes","Coediciones regionales; red de puntos de venta en rutas cotidianas; comunidades de lectores"],
   ["3 a 5 años","Resultados de la evaluación del Plan Lector; ajuste de la PNLLB al 2030; decisión sobre beneficios tributarios con evidencia","Escalar lo que funcionó en pilotos; exportación de contenidos y servicios gráficos"]]}}
 ]},

 {h2:"7. Indicadores de seguimiento", bloques:[
  {tabla:{cols:["Indicador","Línea base","Fuente","Frecuencia"],anchos:[3800,1700,2000,1526],filas:[
   ["% población 18-64 que leyó al menos un libro","47,3 % (2022)","ENL","Trienal"],
   ["Brecha urbano-rural en lectura de libros","20,5 puntos (2022)","ENL (cálculo)","Trienal"],
   ["Promedio de libros leídos al año","1,9 (2022)","ENL","Trienal"],
   ["% escolares que participa en biblioteca escolar","34,5 % (2022)","ENL","Trienal"],
   ["% 4.º primaria en nivel satisfactorio en lectura","32,8 % (2024)","ENLA","Anual"],
   ["ISBN asignados","8.893 (2024)","Cerlalc / BNP","Anual"],
   ["% ISBN digitales","19,5 % (2024)","Cerlalc (cálculo)","Anual"],
   ["% compradores en canal informal","27,8 % (2022)","ENL","Trienal"],
   ["Asistencia a ferias del libro","14,0 % (2022)","ENL","Trienal"]]}}
 ]},

 {h2:"8. Vacíos de información", bloques:[
  {ul: datos.vacios}
 ]}
 ]
};

module.exports = {doc, F, CORTA};
