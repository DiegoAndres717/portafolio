import { Prisma } from "@prisma/client";

export const demoServices: Prisma.ServiceCreateManyInput[] = [
    {   
        id: 1,
        name: "Consultoria",
        description: "A 30-minute consultation to discuss your project.",
        status: 'INACTIVE',
        adminId: 1
    },
    {
        id: 2,
        name: "Desarrollo Web",
        description: "Full-stack web development services.",
        status: 'INACTIVE',
        adminId: 1
    },
    {
        id: 3,
        name: "Mantenimiento Sitio Web",
        description: "Website maintenance and support.",
        status: 'INACTIVE',
        adminId: 1
    },
];