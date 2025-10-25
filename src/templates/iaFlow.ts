// src/flows/iaFlow.ts
import { addKeyword, EVENTS } from "@builderbot/bot";
import { deepSeekChat } from "~/services/aiDeep";

export const iaFlow = addKeyword(EVENTS.ACTION).addAction(
  async (ctx, { endFlow }) => {
    try {
      const prompt = ctx.body;
      const answer = await deepSeekChat(prompt);
      return endFlow(answer);
    } catch (error) {
      console.error("Error DeepSeek:", error);
      return endFlow("❌ Lo siento, no pude procesar tu mensaje.");
    }
  }
);


const fallbackFlow = addKeyword(EVENTS.ACTION).addAction(
  async (ctx, { flowDynamic }) => {
    const response = await deepSeekChat(ctx.body);
    await flowDynamic(response);
  }
);
