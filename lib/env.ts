import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  OWNER_EMAIL: z.string().email(),
  GMAIL_USER: z.string().email(),
  GMAIL_APP_PASSWORD: z.string().min(1),
  ADMIN_PASSWORD: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Missing or invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment configuration — check your .env file");
}

export const env = parsed.data;
