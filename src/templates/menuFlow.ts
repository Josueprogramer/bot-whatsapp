import { addKeyword, EVENTS } from "@builderbot/bot"
import { servicioFlow } from "../services/servicioFlow";

// Flujo de servicios principal
const menuFlow = addKeyword([EVENTS.ACTION])
  .addAnswer('¡Genial! 🎉 Descubre los servicios y promociones exclusivas que tenemos para ti 🎁')
  .addAnswer('¿En qué te ayudo?', {
    buttons: [
      { body: "Servicios" },
      { body: "Promociones" },
      { body: "Ver Pagina web" },
    ]
  })

// Este flujo detecta el texto del botón y redirige a servicioFlow
const serviciosFlow= addKeyword(["Servicios"])
  .addAnswer('🔄 Te llevo al detalle de servicios...')
  .addAction((_, ctx) => ctx.gotoFlow(servicioFlow)); // redirige al flujo de servicios

// Flujo para "Promociones"
const promocionesFlow = addKeyword(["Promociones"])
  .addAnswer("🎉 Tenemos un 20% de descuento este mes. ¡Aprovecha antes del día 15!")

// Flujo para "Ver Página web"
const paginaWebFlow = addKeyword(["Ver Pagina web"])
  .addAnswer("🌐 Visítanos en: https://grupojjc.com.pe")

// Exportar todos los flujos
export {menuFlow,
  servicioFlow,
  serviciosFlow,
  paginaWebFlow
};
