import "dotenv/config";

export const config = {
  PORT: process.env.PORT ?? 8080,
  // META
  jwtToken: process.env.JWT_TOKEN,
  numberId: process.env.NUMBER_ID,
  verifyToken: process.env.VERIFY_TOKEN,
  version: "v22.0" // o la versión que uses
};
