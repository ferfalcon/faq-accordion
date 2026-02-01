import type { FastifyPluginAsync } from "fastify";

const healthRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get("/healthz", async () => {
    return { ok: true };
  });
};

export default healthRoute;