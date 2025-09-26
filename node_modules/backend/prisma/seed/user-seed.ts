import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const tenant = await prisma.tenant.upsert({
    where: { name: "Default Tenant" },
    update: {},
    create: { name: "Default Tenant" },
  });

  await prisma.user.upsert({
    where: { email: "admin@tenant.com" },
    update: {},
    create: {
      email: "admin@tenant.com",
      password: hashedPassword,
      role: "admin",
      tenantId: tenant.id,
    },
  });
}

main()
  .then(() => console.log("Seeding done! Default admin: admin@tenant.com / admin123"))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
