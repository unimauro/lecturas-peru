/* Configuración del asistente del estudio "El libro en el Perú".
   El sitio es estático y público: este token viaja al cliente. El gateway
   ai.tunky.net valida además por allowlist de Origin (unimauro.github.io).
   >>> Pega aquí el token de cliente (formato libro_… o el que uses en el servidor). <<< */
window.CHAT_CONFIG = {
  endpoint: "https://ai.tunky.net/v1/chat",
  token: "",                       // <-- TOKEN DEL GATEWAY (vacío = modo offline con aviso)
  nombre: "Asistente del estudio",
  // Guardarraíles: el gateway recibe esto como contexto de sistema.
  system: [
    "Eres el asistente del observatorio independiente «El libro en el Perú».",
    "Respondes en español del Perú, en tono claro y breve.",
    "Tu único tema son los datos del estudio: hábitos de lectura, mercado editorial,",
    "producción (ISBN), escuela/ENLA, brechas regionales y marco normativo del libro en el Perú.",
    "REGLA DURA: no inventes cifras, fuentes, normas ni URLs. Si no tienes el dato con",
    "respaldo, dilo y sugiere revisar el tablero o la sección «Vacíos de datos».",
    "Toda cifra proviene de fuentes oficiales citadas en el tablero (INEI/Mincul ENL 2022,",
    "Cerlalc, Minedu-UMC ENLA, BNP, El Peruano). Las recomendaciones son hipótesis, no hallazgos.",
    "Si te preguntan algo fuera de este tema, responde que solo puedes ayudar con el estudio del libro y la lectura en el Perú."
  ].join(" "),
  // Datos clave para aterrizar respuestas sin inventar (coma decimal, Perú).
  contexto: [
    "Cifras ancla (ENL 2022, población alfabeta 18-64): leyó al menos un libro en el año 47,3 %;",
    "promedio 1,9 libros por persona (4,0 entre quienes leen); urbano 50,3 % vs rural 29,8 %;",
    "principal razón para no leer libros: falta de tiempo (68,3 %).",
    "Producción: 8.893 ISBN en 2024 (+9,0 % vs 2019); ejemplares 14,7 millones (−27,1 % vs 2019).",
    "Escuela: solo 32,8 % de 4.º de primaria en nivel satisfactorio de lectura (ENLA 2024).",
    "Canal informal: 27,8 % de compradores adquirió en ambulantes/fotocopias.",
    "PISA (lectura, 15 años): Perú 408 puntos en 2022 y 390 en 2025 (primer retroceso), frente al promedio OCDE de 476 (2022) y 461 (2025); desde 2000 ganó 81 puntos.",
    "No hay correlación estadística medida entre hábitos de lectura y PISA (PISA es muestra nacional, no regional); es evidencia convergente, no un coeficiente."
  ].join(" "),
  sugerencias: [
    "¿Cuántos peruanos leen libros?",
    "¿Por qué la gente no lee?",
    "¿Qué dice el estudio sobre las regiones?",
    "¿Qué recomiendan para el Estado?"
  ]
};
