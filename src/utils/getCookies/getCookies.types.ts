import { FastifyReply, FastifyRequest } from "fastify"

export type GetCookies = {
  req: FastifyRequest
  res: FastifyReply
  createCookie: boolean
}
