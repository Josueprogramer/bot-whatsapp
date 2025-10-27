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

  // 🧩 Builderbot ya crea el servidor en este punto
  httpServer(+PORT);

  // ✅ Endpoint para la verificación inicial de Meta
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === config.verifyToken) {
    console.log("✅ Webhook verificado correctamente por Meta");
    res.status(200).send(challenge);
  } else {
    console.error("❌ Verificación de Webhook fallida");
    res.sendStatus(403);
  }
});


  // ⚡ Endpoint para recibir mensajes de Meta
  app.post("/webhook", async (req, res) => {
    try {
      res.sendStatus(200);
      await handleCtx(req.body);
    } catch (err) {
      console.error("❌ Error en handleCtx:", err);
    }
  });
};

main();
