import { addKeyword, EVENTS } from "@builderbot/bot";
import { menuFlow } from "./menuFlow";


const mainFlow = addKeyword([EVENTS.WELCOME, "hola", "Hola"])
  .addAnswer("👋 Hola, bienvenido a *Urbanica*! ¿Quieres ver nuestro menú?")
  .addAction((_, ctx) => ctx.gotoFlow(menuFlow));

const inactividadFlow = addKeyword([EVENTS.WELCOME])
  .addAnswer("¡Hola! 👋 Estoy aquí para ayudarte.")
  .addAction(async (_, { state, flowDynamic }) => {
    await state.update({ startTime: Date.now() });
    setTimeout(async () => {
      const lastTime = await state.get("lastInteraction") || await state.get("startTime");
      const now = Date.now();
      if (now - lastTime >= 60000) {
        await flowDynamic([
          { body: "🌟 ¡Sigo aquí por si necesitas algo! ¿Te puedo ayudar con algo más?" }
        ]);
      }
    }, 60000);
  });

const anyMessageFlow = addKeyword([EVENTS.ACTION])
  .addAction(async (_, { state }) => {
    await state.update({ lastInteraction: Date.now() });
  });

export { mainFlow, inactividadFlow, anyMessageFlow };
