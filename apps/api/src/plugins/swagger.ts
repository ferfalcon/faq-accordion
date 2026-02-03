import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

const swaggerPlugin: FastifyPluginAsync = async (fastify) => {
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: "FAQ Accordion API",
        version: "1.0.0"
      },
    },
    transform: jsonSchemaTransform,
  });

  await fastify.register(swaggerUI, {
    routePrefix: "/docs",
  });

}

export default fp(swaggerPlugin);