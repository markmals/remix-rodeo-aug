export type MenuItem = {
    id: string
    name: string
    price: number
    image: {
        src: string
        alt: string
    }
}

export type MenuSection = {
    name: string
    items: MenuItem[]
}

export type Menu = MenuSection[]

export const menu: Menu = [
    {
        name: "Totopos con Salsa",
        items: [
            {
                id: "5a9a736c-3159-4145-abd3-c1c1626ad45c",
                name: "Chips & Guacamole",
                price: 3.99,
                image: { src: "guac.jpg", alt: "Guacamole" },
            },
            {
                id: "9a18c5e0-0c0b-4a0f-9c7b-1df109be436b",
                name: "Chips & Queso",
                price: 2.99,
                image: { src: "queso.jpg", alt: "Queso" },
            },
            {
                id: "21c32f8c-79af-4846-9c4b-ca9666db6ab8",
                name: "Chips & Salsa",
                price: 1.99,
                image: { src: "salsa.jpg", alt: "Salsa" },
            },
        ],
    },
    {
        name: "Tacos",
        items: [
            {
                id: "117166e5-4c7f-47a1-a55e-a450b89fd0fc",
                name: "Al Pastor",
                price: 3.49,
                image: { src: "al-pastor.jpg", alt: "Al pastor tacos" },
            },
            {
                id: "1ccfc659-bfce-41d3-89d2-80edd873f309",
                name: "Barbacoa",
                price: 4.99,
                image: { src: "barbacoa.jpg", alt: "Barbacoa tacos" },
            },
            {
                id: "e427298d-8559-4899-8839-9708bed4e2e4",
                name: "Fried Avocado",
                price: 2.49,
                image: { src: "fried-avocado.jpg", alt: "Fried avocado tacos" },
            },
        ],
    },
    {
        name: "Dulces",
        items: [
            {
                id: "4dc47e64-5c8d-4dae-8ddc-f98d6bd7b098",
                name: "Churros (6)",
                price: 3.99,
                image: { src: "churros.jpg", alt: "" },
            },
        ],
    },
]
