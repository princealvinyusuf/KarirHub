import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordEmployer = await bcrypt.hash("employer123", 10);
  const passwordSeeker = await bcrypt.hash("seeker123", 10);

  const employer = await prisma.user.upsert({
    where: { email: "employer@karirhub.dev" },
    update: {},
    create: {
      email: "employer@karirhub.dev",
      fullName: "Demo Employer",
      passwordHash: passwordEmployer,
      role: Role.EMPLOYER,
    },
  });

  const seeker = await prisma.user.upsert({
    where: { email: "seeker@karirhub.dev" },
    update: {},
    create: {
      email: "seeker@karirhub.dev",
      fullName: "Demo Seeker",
      passwordHash: passwordSeeker,
      role: Role.JOB_SEEKER,
    },
  });

  const company = await prisma.company.upsert({
    where: { id: "seed-company" },
    update: {},
    create: {
      id: "seed-company",
      name: "KarirHub Demo Co",
      description: "A demo company for KarirHub",
      ownerId: employer.id,
    },
  });

  const titles = [
    "Frontend Engineer (Ionic)",
    "Backend Engineer (Node.js)",
    "Fullstack Engineer",
  ];

  for (const [i, title] of titles.entries()) {
    await prisma.job.upsert({
      where: { id: `seed-job-${i}` },
      update: {},
      create: {
        id: `seed-job-${i}`,
        title,
        description: `${title} at ${company.name}. Build the next-gen job portal.`,
        location: "Remote",
        employmentType: "Full-time",
        salaryMin: 1000 + i * 250,
        salaryMax: 2000 + i * 300,
        companyId: company.id,
      },
    });
  }

  // Seed certification programs
  await prisma.certificationProgram.createMany({
    data: [
      {
        title: "Ionic Developer Certification",
        provider: "Ionic Academy",
        description: "Certification for building mobile apps with Ionic.",
        link: "https://ionic.io/academy",
      },
      {
        title: "Node.js Professional",
        provider: "OpenJS Foundation",
        description: "Professional-level Node.js certification.",
        link: "https://openjsf.org/certification/",
      },
    ],
    skipDuplicates: true,
  });

  console.log({ employer: employer.email, seeker: seeker.email, company: company.name });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


