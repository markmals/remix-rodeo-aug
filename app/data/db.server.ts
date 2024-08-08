import { drizzle } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"
import { Cart } from "./schema.server"

let url = import.meta.env.TURSO_URL
let authToken = import.meta.env.TURSO_AUTH_TOKEN
if (import.meta.env.DEV) url = "file:./app/data/local.db"

const client = createClient({ url, authToken })
export const db = drizzle(client, { schema: { cart: Cart } })
