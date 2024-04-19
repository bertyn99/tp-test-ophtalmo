import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

prisma.$connect();
console.info("Mongodb: Connected");

export default prisma;