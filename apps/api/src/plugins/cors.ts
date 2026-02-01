import type { FastifyPluginAsync } from "fastify";
import type { FastifyCorsOptions } from "@fastify/cors";

import fp from "fastify-plugin";
import cors from "@fastify/cors";

const allowedOrigins = new Set(
  (process.env.CORS_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
);

const isAllowedOrigin = (origin?: string) => {
  if (!origin) return true;   // allow curl / health checks
  if (origin === "null") return false;
  return allowedOrigins.has(origin);
};

const originHandler: NonNullable<FastifyCorsOptions["origin"]> = (origin, cb) => {
  if (isAllowedOrigin(origin)) return cb(null, true)
  return cb(new Error(`CORS: origin not allowed (${origin})`), false);
};

const corsPlugin: FastifyPluginAsync = async (fastify) => {
  await fastify.register(cors, 
    { origin: originHandler }
  );
};

export default fp(corsPlugin);