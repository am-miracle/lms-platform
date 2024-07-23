const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    await db.$connect();

    try {
        await db.category.createMany({
            data: [
                {
                    name: "Computer Science",
                },
                {
                    name: "Photography",
                },
                {
                    name: "Filming",
                },
                {
                    name: "Music",
                },
                {
                    name: "Art",
                },
                {
                    name: "Sports",
                },
                {
                    name: "Accounting",
                },
                {
                    name: "Other",
                },
            ]
        });
        console.log("Success")
    } catch (error) {
        console.log("Error seeding the database categories", error)
    } finally {
        await db.$disconnect()
    }
}

main()