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
  const { handleCtx } = await createBot({
    flow: templates,
    provider: provider,
    database: new Database(),
  });

  // ⚡ Endpoint para verificar el webhook de Meta
  app.get("/webhook", (req, res) => {
    const verifyToken = config.verifyToken;
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === verifyToken) {
      console.log("✅ Webhook verificado correctamente con Meta");
      res.status(200).send(challenge);
    } else {
      console.warn("❌ Falló la verificación del webhook");
      res.sendStatus(403);
    }
  });

  // ⚡ Endpoint para recibir mensajes de WhatsApp
  app.post("/webhook", async (req, res) => {
    try {
      res.sendStatus(200); // responder rápido a Meta
      await handleCtx(req.body); // procesar mensaje
    } catch (err) {
      console.error("❌ Error en handleCtx:", err);
    }
  });

  // 🚀 Iniciar servidor
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  });
};

main();
