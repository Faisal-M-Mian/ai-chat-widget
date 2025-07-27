import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { chatMessageSchema } from "@shared/schema";
import path from "path";
import express from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({ 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // Serve widget files
  app.use('/widget.js', express.static(path.resolve(import.meta.dirname, '../public/widget.js')));
  app.use('/widget.css', express.static(path.resolve(import.meta.dirname, '../public/widget.css')));
  
  // Enable CORS for widget usage
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
      return;
    }
    
    next();
  });

  // Secure webhook proxy endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      // Validate request body
      const { message, sessionId } = chatMessageSchema.parse(req.body);
      
      // Security check: only allow n8n.datagen.agency webhooks
      const webhookUrl = "https://n8n.datagen.agency/webhook/9372fce5-575c-40f3-8039-2524c8c0b080";
      
      if (!webhookUrl.includes("n8n.datagen.agency")) {
        return res.status(403).json({ 
          error: "Forbidden: Invalid webhook domain" 
        });
      }

      // Forward message to n8n webhook
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          sessionId: sessionId || `session_${Date.now()}`,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!webhookResponse.ok) {
        throw new Error(`Webhook responded with status: ${webhookResponse.status}`);
      }

      const data = await webhookResponse.text();
      
      res.json({
        response: data || "I received your message, but I don't have a response right now. Please try again.",
        sessionId: sessionId || `session_${Date.now()}`,
      });
      
    } catch (error) {
      console.error('Chat API error:', error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Invalid message format",
          details: error.errors 
        });
      }
      
      res.status(500).json({ 
        error: "Failed to process your message. Please try again." 
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
