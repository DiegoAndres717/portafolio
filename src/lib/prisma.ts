import { PrismaClient } from '@prisma/client';

// Crea una instancia global de PrismaClient para evitar 
// crear una nueva instancia en cada solicitud.
// Más información: https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export { prisma };