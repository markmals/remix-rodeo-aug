import {
    Form,
    useLoaderData,
    ActionFunctionArgs,
    defineRoute,
    Params,
    MetaDescriptor,
    LinkDescriptor,
    AppLoadContext,
    UIMatch,
    MetaMatch as _MetaMatch,
} from "react-router"
import { menu } from "~/data/menu.server"
import { Image } from "@unpic/react"
import { upsert } from "./upsert.server"
import { card } from "~/styles/card"
import { currencyFormatter } from "~/lib/formatters"
import { ReactNode } from "react"
// import { z } from "zod"
// import { parseWithZod } from "@conform-to/zod"

export function loader() {
    return { menu }
}

// export function defineAction<Z extends z.ZodType, R>({
//     input: schema,
//     handler,
// }: {
//     input: Z
//     handler: (input: z.infer<Z>, context: ActionFunctionArgs) => Promise<R>
// }): (args: ActionFunctionArgs) => Promise<R> {
//     return async (context: ActionFunctionArgs): Promise<R> => {
//         let formData = await context.request.formData()
//         // TODO: Catch input parsing error and hand off to the client
//         let parsedInput = parseWithZod(formData, { schema })
//         console.log("parsedInput", parsedInput)
//         return await handler(parsedInput, context)
//     }
// }

// export const action = defineAction({
//     input: z.object({ "add-item-to-cart": z.string() }),
//     async handler({ "add-item-to-cart": itemId }) {
//         await upsert(itemId)
//         return null
//     },
// })

export async function action({ request }: ActionFunctionArgs) {
    let formData = await request.formData()
    let itemId = String(formData.get("add-item-to-cart"))
    await upsert(itemId)

    return null
}

export default function Menu() {
    let { menu } = useLoaderData<typeof loader>()

    return (
        <div className="flex flex-col items-center pt-12">
            <h1 className="text-4xl font-semibold leading-6 text-gray-900">Menu</h1>
            <div className="flex flex-col items-center gap-6 pb-20 pt-12">
                {menu.map(section => (
                    <div className="flex flex-col items-center gap-6" key={section.name}>
                        <h2 className="text-2xl font-semibold leading-6 text-gray-900">
                            {section.name}
                        </h2>
                        <ul role="list" className="grid grid-cols-3 gap-6 px-6">
                            {section.items.map(item => (
                                <li key={item.name} className={card({ className: "col-span-1" })}>
                                    <div className="flex flex-1 flex-col">
                                        {item.image.src && (
                                            <Image
                                                className="h-56"
                                                src={item.image.src}
                                                alt={item.image.alt}
                                                height={250}
                                                width={600}
                                            />
                                        )}
                                        <div className="flex flex-col items-start gap-3 p-6">
                                            <h3 className="text-sm font-medium text-gray-900">
                                                {item.name}
                                            </h3>
                                            <dl className="flex flex-grow flex-col justify-between">
                                                <dt className="sr-only">Title</dt>
                                                <dd className="text-sm text-gray-500">
                                                    {currencyFormatter.format(item.price)}
                                                </dd>
                                            </dl>
                                            <Form method="post">
                                                <button
                                                    type="submit"
                                                    className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                                                    name="add-item-to-cart"
                                                    value={item.id}
                                                >
                                                    Add to Cart
                                                </button>
                                            </Form>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}
