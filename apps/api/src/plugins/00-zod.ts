import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

const zodCompiler: FastifyPluginAsync = async (fastify) => {
  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);
};

export default fp(zodCompiler);