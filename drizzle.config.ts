import { defineConfig } from "drizzle-kit"

export default defineConfig({
    schema: "./app/data/schema.server.ts",
    out: "./migrations",
    driver: "libsql",
    dbCredentials: {
        url: "file:./app/data/local.db",
    },
    verbose: true,
    strict: false,
})
