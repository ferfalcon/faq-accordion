import type { FastifyPluginAsync } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { faqCreateSchema, faqListSchema, faqSchema } from "../schemas/faq.schema";

const toFaqDto = (r: {
  id: string;
  sortOrder: number;
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
}) => ({
  ...r,
  createdAt: r.createdAt.toISOString(),
  updatedAt: r.updatedAt.toISOString(),
});

const faqsRoute: FastifyPluginAsync = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();

  f.get(
    "/faqs",
    {
      schema: {
        tags: ["faqs"],
        summary: "List active FAQs",
        response: {
          200: faqListSchema,
        },
      },
    },
    async () => {
      const rows = await fastify.prisma.faq.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
        select: {
          id: true,
          sortOrder: true,
          question: true,
          answer: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return rows.map(toFaqDto);
    }
  );

  f.post(
    "/faqs",
    {
      schema: {
        tags: ["faqs"],
        summary: "Create a FAQ",
        body: faqCreateSchema,
        response: {
          201: faqSchema,
        },
      },
    },
    async (request, reply) => {
      // request.body is now typed + validated by Fastify before handler runs
      const last = await fastify.prisma.faq.findFirst({
        orderBy: { sortOrder: "desc" },
        select: { sortOrder: true },
      });

      const nextSortOrder = (last?.sortOrder ?? 0) + 1;

      const faq = await fastify.prisma.faq.create({
        data: { ...request.body, sortOrder: nextSortOrder },
        select: {
          id: true,
          sortOrder: true,
          question: true,
          answer: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return reply.code(201).send(toFaqDto(faq));
    }
  );
};

export default faqsRoute;