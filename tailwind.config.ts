import type { Config } from "tailwindcss"
import forms from "@tailwindcss/forms"

export default {
    content: ["./app/**/*.tsx", "./app/styles/**/*.ts"],
    theme: {
        extend: {},
    },
    plugins: [forms()],
} satisfies Config
