// src/services/aiDeep.ts

import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const apiKey = process.env.DEEPSEEK_API_KEY;

if (!apiKey) {
  throw new Error("❌ No se encontró la API Key de DeepSeek. Verifica tu .env");
}

// Lee el prompt desde un archivo externo
const promptPath = path.join(process.cwd(), 'assets', 'Prompts', 'prompt_Deepseek.txt');
const systemPrompt = fs.readFileSync(promptPath, 'utf8');

console.log('🧠 Prompt cargado:', systemPrompt); // <- Agrega esto

export const deepSeekChat = async (userMessage: string): Promise<string> => {
  try {
    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.error('❌ Error al usar DeepSeek:', error.response?.data || error.message);
    return 'Lo siento, hubo un problema al conectar con la IA.';
  }
};
