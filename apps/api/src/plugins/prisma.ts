import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";

const prismaPlugin: FastifyPluginAsync = async (fastify) => {
  const url = process.env.DATABASE_URL ?? "file:./dev.db";
  
  const adapter = new PrismaBetterSqlite3({ url });
  const prisma = new PrismaClient({ adapter });

  await prisma.$connect();

  fastify.decorate("prisma", prisma);

  fastify.addHook("onClose", async () => {
    await prisma.$disconnect();
  });
};

export default fp(prismaPlugin);