import { Router } from "express";
import { prisma } from "../prisma";
import { z } from "zod";
import { requireAuth, AuthenticatedRequest } from "../middleware/auth";

const router = Router();

router.get("/me", requireAuth as any, async (req: AuthenticatedRequest, res) => {
  const apps = await prisma.application.findMany({
    where: { applicantId: req.user!.userId },
    include: { job: { include: { company: true } } },
    orderBy: { createdAt: "desc" },
  });
  res.json(apps);
});

const applySchema = z.object({ jobId: z.string().cuid(), coverLetter: z.string().optional() });

router.post("/", requireAuth as any, async (req: AuthenticatedRequest, res) => {
  const parsed = applySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { jobId, coverLetter } = parsed.data;
  try {
    const app = await prisma.application.create({
      data: { jobId, applicantId: req.user!.userId, coverLetter },
    });
    res.status(201).json(app);
  } catch (e) {
    return res.status(409).json({ error: "You already applied or job not found" });
  }
});

export default router;


