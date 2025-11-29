import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const adminEmail = 'admin@example.com';

    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail }
    });

    if (!existingAdmin) {
        await prisma.user.create({
            data: {
                email: adminEmail,
                password: 'password123', // In production, hash this!
                role: UserRole.ADMIN
            }
        });
        console.log('Admin user created');
    }

    // Create default custodians
    const custodians = ['Schwab', 'Fidelity', 'Pershing'];
    for (const name of custodians) {
        await prisma.custodian.upsert({
            where: { name },
            update: {},
            create: { name }
        });
    }
    console.log('Custodians seeded');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
