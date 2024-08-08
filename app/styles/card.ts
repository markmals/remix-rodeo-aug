import { cva } from "./cva"

export const card = cva({
    base: [
        "flex",
        "flex-col",
        // "divide-y",
        // "divide-gray-200",
        "overflow-hidden",
        "rounded-lg",
        "bg-white",
        "text-center",
        "shadow",
    ],
})
