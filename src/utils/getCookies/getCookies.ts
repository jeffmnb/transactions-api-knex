import { randomUUID } from "crypto"
import { GetCookies } from "./getCookies.types"

export const getCookies = ({
  req,
  res,
  createCookie,
}: GetCookies): { session_id: string | undefined } => {
  let { session_id } = req.cookies

  if (!session_id && createCookie) {
    session_id = randomUUID()

    res.cookie("session_id", session_id, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
  }

  return { session_id }
}
