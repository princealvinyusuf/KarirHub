import { Router } from "express";
import { requireAuth, AuthenticatedRequest } from "../middleware/auth.js";
import { prisma } from "../prisma.js";

const router = Router();

router.get("/", requireAuth as any, async (req: AuthenticatedRequest, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.userId },
    select: { id: true, email: true, fullName: true, role: true },
  });
  res.json(user);
});

export default router;


