import { text, sqliteTable, real, integer } from "drizzle-orm/sqlite-core"

export const Cart = sqliteTable("cart", {
    id: text("id").primaryKey().notNull(),
    user: text("user").notNull(),
    name: text("name").notNull(),
    price: real("price").notNull(),
    count: integer("count").notNull(),
})
