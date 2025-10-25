import { addKeyword, EVENTS } from "@builderbot/bot";

// Flujo principal: menú
const servicioFlow = addKeyword([EVENTS.WELCOME])
    .addAnswer('¡Hola! 🌟 Escribe una palabra clave para continuar:')
    .addAnswer(`Opciones disponibles:
- Escribe *1* para 🏡🏢📐diseño y planos .
- Escribe *2* para Licencia de construccion y demolicion.
- Escribe *3* para Diseño y calculo estructural.
- Escribe *4* para Levantamiento Topografico.
- Escribe *5* para Inscripcion a Sunarp
- Escribe *6* para mas servicios
`);

// Flujo para servicios
const planoFlow = addKeyword(['1'])
    .addAnswer('Creamos planos precisos y personalizados para tu proyecto 🏡🏢. ¡Lleva tus ideas del papel a la realidad!',
      {
        media:"./assets/WhatsApp Video.mp4"
      }
    );
    

// Flujo para productos
const construccionFlow = addKeyword(['2'])
    .addAnswer('📦 Tenemos un catálogo variado de productos. ¡Pide el PDF para más info!');

// Flujo para contacto
const estructuralFlow = addKeyword(['3'])
    .addAnswer('💬 Un asesor se comunicará contigo pronto.');

// Flujo para web
const LevantamientoFlow = addKeyword(['4'])
    .addAnswer('🌐 Puedes visitar nuestra web aquí: https://grupojjc.com.pe');
const SunarpFlow = addKeyword(['5'])
  .addAnswer('🌐 Puedes visitar nuestra web aquí: https://grupojjc.com.pe');

const masFlow = addKeyword(['6'])
    .addAnswer('Conoce todo lo que ofrecemos 🛠️🏗️. Te compartimos nuestro brochure 📘 para que explores cada opción.',
      {
        media:"./assets/Brochure Montes de Oca.pdf"
      }
    );

export {
  servicioFlow,
  planoFlow,
  construccionFlow,
  estructuralFlow,
  LevantamientoFlow,
  SunarpFlow,
  masFlow
    
};
