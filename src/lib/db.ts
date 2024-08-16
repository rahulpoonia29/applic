import { PrismaClient } from "@prisma/client";

// Function to create a new PrismaClient instance with appropriate logging
const createPrismaClient = () =>
	new PrismaClient({
		log:
			process.env.NODE_ENV === "development"
				? ["error", "warn"]
				: ["error"],
	});

// Global holder for PrismaClient to ensure a single instance
const globalForPrisma = globalThis as unknown as {
	prismaClient: PrismaClient | undefined;
};

// Initialize or reuse PrismaClient instance
export const prismaClient =
	globalForPrisma.prismaClient ?? createPrismaClient();

// Store the PrismaClient instance in global for development mode
if (process.env.NODE_ENV !== "production")
	globalForPrisma.prismaClient = prismaClient;
