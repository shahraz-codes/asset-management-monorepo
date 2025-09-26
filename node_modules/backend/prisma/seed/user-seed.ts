import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10); // 👈 plain text password = admin123

  await prisma.user.create({
    data: {
      email: "admin@tenant.com",
      password: hashedPassword, // store the hash, not plain text
      role: "admin",
      tenantId: "tenant_1"
    },
  });
}

main()
  .then(() => console.log("Seeding done! Default admin: admin@tenant.com / admin123"))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
