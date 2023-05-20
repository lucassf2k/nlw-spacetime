import { FastifyInstance } from "fastify"
import { z } from "zod"

import { prisma } from "../lib/prisma"

export async function memoriesRoutes(app: FastifyInstance) {
  app.get("/api/memories", async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createAt: "asc",
      },
    })

    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat("..."),
      }
    })
  })

  app.get("/api/memories/:id", async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return memory
  })

  app.post("/api/memories", async (request) => {
    const bodyShema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodyShema.parse(request.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: "",
      },
    })

    return memory
  })

  app.put("/api/memories", async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { id } = paramsSchema.parse(request.params)
    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    const memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    })

    return memory
  })

  app.delete("/api/memories/:id", async (request) => {
    const paramsShema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsShema.parse(request.params)

    await prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}
