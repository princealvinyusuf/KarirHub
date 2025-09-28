import { Router } from "express";
import { prisma } from "../prisma";
import { z } from "zod";
import { requireAuth, requireRole, AuthenticatedRequest } from "../middleware/auth";

const router = Router();

router.get("/", async (req, res) => {
  const q = String((req.query.q as string) ?? "").trim();
  const jobs = await prisma.job.findMany({
    where: q
      ? {
          isActive: true,
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
          ],
        }
      : { isActive: true },
    include: { company: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(jobs);
});

router.get("/:id", async (req, res) => {
  const job = await prisma.job.findUnique({ where: { id: String(req.params.id) }, include: { company: true } });
  if (!job) return res.status(404).json({ error: "Not found" });
  res.json(job);
});

const createJobSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  location: z.string().optional(),
  employmentType: z.string().optional(),
  salaryMin: z.number().int().nonnegative().optional(),
  salaryMax: z.number().int().nonnegative().optional(),
  companyId: z.string().cuid(),
});

router.post("/", requireAuth as any, requireRole(["EMPLOYER", "ADMIN"]) as any, async (req: AuthenticatedRequest, res) => {
  const parsed = createJobSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const job = await prisma.job.create({ data: parsed.data });
  res.status(201).json(job);
});

router.patch("/:id", requireAuth as any, requireRole(["EMPLOYER", "ADMIN"]) as any, async (req, res) => {
  const id = String(req.params.id);
  const data = req.body as Record<string, unknown>;
  try {
    const job = await prisma.job.update({ where: { id }, data });
    res.json(job);
  } catch {
    res.status(404).json({ error: "Not found" });
  }
});

router.delete("/:id", requireAuth as any, requireRole(["EMPLOYER", "ADMIN"]) as any, async (req, res) => {
  const id = String(req.params.id);
  try {
    await prisma.job.delete({ where: { id } });
    res.status(204).send();
  } catch {
    res.status(404).json({ error: "Not found" });
  }
});

export default router;


