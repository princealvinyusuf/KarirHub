import { Router } from "express";
import { prisma } from "../prisma";
import { z } from "zod";
import { requireAuth, requireRole, AuthenticatedRequest } from "../middleware/auth";

const router = Router();

router.get("/", async (_req, res) => {
  const companies = await prisma.company.findMany({ orderBy: { createdAt: "desc" } });
  res.json(companies);
});

router.get("/:id", async (req, res) => {
  const company = await prisma.company.findUnique({ where: { id: String(req.params.id) } });
  if (!company) return res.status(404).json({ error: "Not found" });
  res.json(company);
});

const createCompanySchema = z.object({ name: z.string().min(2), description: z.string().optional() });

router.post("/", requireAuth as any, requireRole(["EMPLOYER", "ADMIN"]) as any, async (req: AuthenticatedRequest, res) => {
  const parsed = createCompanySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const company = await prisma.company.create({ data: { ...parsed.data, ownerId: req.user!.userId } });
  res.status(201).json(company);
});

export default router;


