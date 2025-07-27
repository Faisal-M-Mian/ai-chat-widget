import { z } from "zod";

export const chatMessageSchema = z.object({
  message: z.string().min(1, "Message cannot be empty").max(1000, "Message too long"),
  sessionId: z.string().optional(),
});

export const webhookResponseSchema = z.object({
  response: z.string(),
  sessionId: z.string().optional(),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type WebhookResponse = z.infer<typeof webhookResponseSchema>;
