import { Router } from "express";
import { prisma } from "../prisma";
import { z } from "zod";
import { requireAuth, requireRole, AuthenticatedRequest } from "../middleware/auth";

const router = Router();

const upsertSchema = z.object({
  title: z.string().min(3),
  provider: z.string().optional(),
  description: z.string().optional(),
  link: z.string().url().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

router.get("/", async (_req, res) => {
  try {
    const items = await prisma.certificationProgram.findMany({ orderBy: { createdAt: "desc" } });
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: "Failed to load certifications" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await prisma.certificationProgram.findUnique({ where: { id: String(req.params.id) } });
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: "Failed to load certification" });
  }
});

router.post("/", requireAuth as any, requireRole(["ADMIN", "EMPLOYER"]) as any, async (req: AuthenticatedRequest, res) => {
  const parsed = upsertSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const data = parsed.data as any;
  const item = await prisma.certificationProgram.create({
    data: {
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    },
  });
  res.status(201).json(item);
});

router.patch("/:id", requireAuth as any, requireRole(["ADMIN", "EMPLOYER"]) as any, async (req, res) => {
  const id = String(req.params.id);
  const parsed = upsertSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const data = parsed.data as any;
  try {
    const item = await prisma.certificationProgram.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      },
    });
    res.json(item);
  } catch {
    res.status(404).json({ error: "Not found" });
  }
});

router.delete("/:id", requireAuth as any, requireRole(["ADMIN", "EMPLOYER"]) as any, async (req, res) => {
  const id = String(req.params.id);
  try {
    await prisma.certificationProgram.delete({ where: { id } });
    res.status(204).send();
  } catch {
    res.status(404).json({ error: "Not found" });
  }
});

export default router;


