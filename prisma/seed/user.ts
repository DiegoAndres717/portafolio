import { Prisma } from "@prisma/client";

export const demoAdmin: Prisma.AdminCreateInput[] = [
    {
        firstName: "Diego",
        lastName: "Salas",
        handle: "DiegoSalas",
        password: "admin",
        status: "ACTIVE",
        email: "diegoandress717@gmail",
        company: "DiSa Solutions",
        image: "1722196256550-img-diego.webp",
    },
]