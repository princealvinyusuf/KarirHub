import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./env";
import authRoutes from "./routes/auth";
import jobsRoutes from "./routes/jobs";
import companiesRoutes from "./routes/companies";
import applicationsRoutes from "./routes/applications";
import meRoutes from "./routes/me";
import certificationsRoutes from "./routes/certifications";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "karirhub-backend" });
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/companies", companiesRoutes);
app.use("/api/applications", applicationsRoutes);
app.use("/api/me", meRoutes);
app.use("/api/certifications", certificationsRoutes);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(env.PORT, () => {
  console.log(`API listening on http://0.0.0.0:${env.PORT}`);
});


