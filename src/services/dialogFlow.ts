// src/dialogFlow.ts
import { addKeyword } from "@builderbot/bot";
import { deepSeekChat } from "../services/aiDeep"; // ✅


export const dialogFlow = addKeyword(["IA", "inteligencia", "pregunta"])
  .addAction(async (ctx, { flowDynamic }) => {
    await flowDynamic("🤖 Estoy pensando una buena respuesta...");
    const answer = await deepSeekChat(ctx.body);
    await flowDynamic(answer);
  });

