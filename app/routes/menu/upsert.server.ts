import { eq } from "drizzle-orm"
import { db } from "~/data/db.server"
import { menu } from "~/data/menu.server"
import { Cart } from "~/data/schema.server"

export async function upsert(id: string) {
    let cartItems = await db.query.cart.findMany()
    let menuItem = menu
        .map(section => section.items)
        .flat()
        .find(item => item.id === id)!

    let alreadyExistsInCart = cartItems.map(item => item.id).includes(menuItem.id)

    if (alreadyExistsInCart) {
        let cartItem = cartItems.find(item => item.id === menuItem.id)!
        await db
            .update(Cart)
            .set({ count: cartItem.count + 1 })
            .where(eq(Cart.id, menuItem.id))
    } else {
        await db.insert(Cart).values({
            id: menuItem.id,
            user: "me",
            name: menuItem.name,
            price: menuItem.price,
            count: 1,
        })
    }
}
