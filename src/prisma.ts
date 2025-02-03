import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }    // globalThis es un objeto global en Node.js y navegadores.

export const prisma =                                                        // Se usa para almacenar la instancia de PrismaClient, 
  globalForPrisma.prisma || new PrismaClient()                               // evitando que se creen múltiples conexiones a la base de datos cuando hay recarga en caliente en Next.js (modo desarrollo).

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma