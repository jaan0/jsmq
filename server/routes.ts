import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.ts";
import {
  insertServiceSchema,
  insertPortfolioProjectSchema,
  insertOrderSchema,
  insertContactMessageSchema,
  updateOrderStatusSchema,
} from "@shared/schema";
import { sendOrderConfirmationEmail } from "./email.ts";
import multer from "multer";
import { uploadBufferToCloudinary } from "./cloudinary.ts";

// Extend Express Request to include multer file
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export async function registerRoutes(app: Express): Promise<Server> {
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: Number(process.env.UPLOAD_MAX_BYTES || 10 * 1024 * 1024),
    },
  });

  app.post("/api/upload", upload.single("file"), async (req: MulterRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const folder = (req.query.folder as string) || undefined;
      const result = await uploadBufferToCloudinary(req.file.buffer, folder);
      res.json({
        url: result.secure_url,
        publicId: result.public_id,
        bytes: result.bytes,
        format: result.format,
      });
    } catch (error) {
      console.error("Failed to upload image:", error);
      res.status(500).json({ error: "Failed to upload image" });
    }
  });

  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.getService(req.params.id);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch service" });
    }
  });

  app.post("/api/services", async (req, res) => {
    try {
      const validated = insertServiceSchema.parse(req.body);
      const service = await storage.createService(validated);
      res.status(201).json(service);
    } catch (error) {
      console.error('Failed to create service:', error);
      res.status(400).json({ error: "Invalid service data", details: error instanceof Error ? error.message : String(error) });
    }
  });

  app.put("/api/services/:id", async (req, res) => {
    try {
      const validated = insertServiceSchema.partial().parse(req.body);
      const service = await storage.updateService(req.params.id, validated);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      console.error('Failed to update service:', error);
      res.status(400).json({ error: "Invalid service data", details: error instanceof Error ? error.message : String(error) });
    }
  });

  app.delete("/api/services/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteService(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Service not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete service" });
    }
  });

  app.get("/api/portfolio", async (req, res) => {
    try {
      const projects = await storage.getAllPortfolioProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch portfolio projects" });
    }
  });

  app.get("/api/portfolio/:id", async (req, res) => {
    try {
      const project = await storage.getPortfolioProject(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.post("/api/portfolio", async (req, res) => {
    try {
      const validated = insertPortfolioProjectSchema.parse(req.body);
      const project = await storage.createPortfolioProject(validated);
      res.status(201).json(project);
    } catch (error) {
      console.error('Failed to create portfolio project:', error);
      res.status(400).json({ error: "Invalid project data", details: error instanceof Error ? error.message : String(error) });
    }
  });

  app.put("/api/portfolio/:id", async (req, res) => {
    try {
      const validated = insertPortfolioProjectSchema.partial().parse(req.body);
      const project = await storage.updatePortfolioProject(req.params.id, validated);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error('Failed to update portfolio project:', error);
      res.status(400).json({ error: "Invalid project data", details: error instanceof Error ? error.message : String(error) });
    }
  });

  app.delete("/api/portfolio/:id", async (req, res) => {
    try {
      const deleted = await storage.deletePortfolioProject(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const { serviceIcon, ...orderData } = req.body;
      const validated = insertOrderSchema.parse(orderData);
      const order = await storage.createOrder(validated);

      // Send confirmation email to customer
      try {
        await sendOrderConfirmationEmail({
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          serviceTitle: order.serviceTitle,
          servicePrice: order.servicePrice,
          orderId: order.id,
          serviceIcon: serviceIcon,
        });
      } catch (emailError) {
        // Log email error but don't fail the order creation
        console.error('Failed to send confirmation email:', emailError);
      }

      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: "Invalid order data" });
    }
  });

  app.patch("/api/orders/:id/status", async (req, res) => {
    try {
      const validated = updateOrderStatusSchema.parse(req.body);
      const order = await storage.updateOrderStatus(req.params.id, validated);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      console.error('Failed to update order status:', error);
      res.status(400).json({ error: "Invalid status data", details: error instanceof Error ? error.message : String(error) });
    }
  });

  app.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact messages" });
    }
  });

  app.post("/api/contact-messages", async (req, res) => {
    try {
      const validated = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validated);
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ error: "Invalid message data" });
    }
  });

  app.patch("/api/contact-messages/:id/read", async (req, res) => {
    try {
      const marked = await storage.markMessageAsRead(req.params.id);
      if (!marked) {
        return res.status(404).json({ error: "Message not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to mark message as read" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
