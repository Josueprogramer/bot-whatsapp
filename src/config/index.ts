import "dotenv/config";

export const config = {
  PORT: process.env.PORT ?? 8080,
  //META
  jwtToken: process.env.jwtToken,
  numberId: process.env.numberId,
  verifyToken: process.env.verifyToken,
  version: "v22.0" // 👉 si no pones en .env, usa v20.0
};
