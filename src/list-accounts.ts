import { prisma } from "./lib/prisma";

async function main() {
  const entityTypes = await prisma.corsairEntity.groupBy({
    by: ['entityType'],
    _count: true,
  });
  console.log("Entity Type Counts:", entityTypes);

  const thread = await prisma.corsairEntity.findFirst({
    where: {
      entityType: "threads",
    },
  });
  console.log("=== THREAD DATA ===");
  console.dir(thread, { depth: null });

  const message = await prisma.corsairEntity.findFirst({
    where: {
      entityType: "messages",
    },
  });
  console.log("=== MESSAGE DATA ===");
  console.dir(message, { depth: null });
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
