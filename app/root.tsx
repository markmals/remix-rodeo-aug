import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react"
import { NavBar } from "./components/NavBar"
import type { LinksFunction, MetaFunction } from "@remix-run/node"
import stylesheet from "~/styles/style.css?url"
import { db } from "./data/db.server"

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: stylesheet },
    { rel: "icon", type: "image/png", href: "favicon.png" },
]

export const meta: MetaFunction = () => {
    return [{ title: "Taco Palace" }]
}

export async function loader(): Promise<{ cartCount?: number }> {
    let cartItems = await db.query.cart.findMany()

    if (!cartItems.length) return {}

    return {
        cartCount: cartItems
            .map(i => i.count)
            .reduce((prevCount, itemCount) => prevCount + itemCount),
    }
}

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body className="h-full bg-slate-50">
                <NavBar />
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

export default function App() {
    return <Outlet />
}
