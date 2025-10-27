import express from "express";
import { createBot, MemoryDB as Database } from "@builderbot/bot";
import { provider } from "./provider";
import { config } from "./config";
import templates from "./templates";
import path from "path";
import fs from "fs";

// 📂 Directorio de logs
const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}
const logPath = path.join(logDir, "core.class.log");
const logStream = fs.createWriteStream(logPath, { flags: "a" });

// 🎯 Redirigir console.log a archivo + consola
const originalLog = console.log;
console.log = function (...args) {
  logStream.write("[LOG] " + args.join(" ") + "\n");
  originalLog.apply(console, args);
};

const app = express();
app.use(express.json());

const PORT = config.PORT || 8080;

const main = async () => {
  const { handleCtx, httpServer } = await createBot({
    flow: templates,
    provider: provider,
    database: new Database(),
  });

  // ✅ 1️⃣ Endpoint de verificación de Webhook (obligatorio para Meta)
  app.get("/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === config.verifyToken) {
      console.log("✅ WEBHOOK VERIFICADO CORRECTAMENTE!");
      res.status(200).send(challenge);
    } else {
      console.log("❌ Error verificando webhook");
      res.sendStatus(403);
    }
  });

  // ✅ 2️⃣ Endpoint para recibir mensajes
  app.post("/webhook", async (req, res) => {
    console.log("📩 Webhook recibido:", JSON.stringify(req.body, null, 2));

    // ⚡ Meta necesita una respuesta rápida
    res.sendStatus(200);

    try {
      await handleCtx(req.body); // procesa el mensaje con Builderbot
    } catch (err) {
      console.error("❌ Error en handleCtx:", err);
    }
  });

  // 🛜 Levantar servidor Express
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`[GET]: http://localhost:${PORT}/webhook`);
    console.log(`[POST]: http://localhost:${PORT}/webhook`);
  });

  // 🚀 Iniciar el bot internamente
  httpServer(+PORT);
};

main();
