import { Link, useLoaderData } from "@remix-run/react"
import { loader } from "~/root"

const navigation = [
    { name: "Menu", href: "/menu" },
    { name: "Reservations", href: "/reservations" },
    { name: "About", href: "/about" },
]

export function NavBar() {
    let { cartCount } = useLoaderData<typeof loader>()

    return (
        <header className="sticky top-0 border-b border-black/15 bg-white">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 flex flex-row gap-2 p-1.5 hover:opacity-75">
                        <span className="sr-only">Taco Palace</span>
                        <span className="text-3xl">🌮</span>
                        <span className="text-2xl font-bold">Taco Palace</span>
                    </Link>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map(item => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-700"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="ml-5 flex items-center justify-end gap-x-6">
                    <Link
                        to="/cart"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Cart{" "}
                        {!!cartCount && (
                            <span className="ml-1 rounded-full bg-white px-2 py-1 text-indigo-500">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </nav>
        </header>
    )
}
