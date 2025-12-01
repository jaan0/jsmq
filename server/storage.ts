import {
  type User,
  type InsertUser,
  type Service,
  type InsertService,
  type PortfolioProject,
  type InsertPortfolioProject,
  type Order,
  type InsertOrder,
  type ContactMessage,
  type InsertContactMessage,
  type UpdateOrderStatus
} from "@shared/schema.ts";
import {
  type SiteSettings,
  type UpdateSiteSettings
} from "@shared/siteSettings.ts";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getAllServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: string, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: string): Promise<boolean>;

  getAllPortfolioProjects(): Promise<PortfolioProject[]>;
  getPortfolioProject(id: string): Promise<PortfolioProject | undefined>;
  createPortfolioProject(project: InsertPortfolioProject): Promise<PortfolioProject>;
  updatePortfolioProject(id: string, project: Partial<InsertPortfolioProject>): Promise<PortfolioProject | undefined>;
  deletePortfolioProject(id: string): Promise<boolean>;

  getAllOrders(): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: string, update: UpdateOrderStatus): Promise<Order | undefined>;

  getAllContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: string): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markMessageAsRead(id: string): Promise<boolean>;

  getSiteSettings(): Promise<SiteSettings | null>;
  updateSiteSettings(data: UpdateSiteSettings): Promise<SiteSettings>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private services: Map<string, Service>;
  private portfolioProjects: Map<string, PortfolioProject>;
  private orders: Map<string, Order>;
  private contactMessages: Map<string, ContactMessage>;
  private siteSettings: SiteSettings | null;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.portfolioProjects = new Map();
    this.orders = new Map();
    this.contactMessages = new Map();
    this.siteSettings = null;

    this.seedInitialData();
  }

  private seedInitialData() {
    const defaultAdmin: User = {
      id: randomUUID(),
      username: 'admin',
      password: '$2a$10$GZK8Q8YJZkZ0Q8YJZkZ0Q8YJZkZ0Q8YJZkZ0Q8YJZkZ0Q8YJZkZ0Q',
    };
    this.users.set(defaultAdmin.id, defaultAdmin);
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.username === username);
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = randomUUID();
    const newUser: User = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }

  // Service methods
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(service: InsertService): Promise<Service> {
    const id = randomUUID();
    const newService: Service = {
      ...service,
      badge: service.badge ?? null,
      imageUrl: service.imageUrl ?? null,
      id,
      createdAt: new Date()
    };
    this.services.set(id, newService);
    return newService;
  }

  async updateService(id: string, service: Partial<InsertService>): Promise<Service | undefined> {
    const existing = this.services.get(id);
    if (!existing) return undefined;

    const updated: Service = { ...existing, ...service };
    this.services.set(id, updated);
    return updated;
  }

  async deleteService(id: string): Promise<boolean> {
    return this.services.delete(id);
  }

  // Portfolio methods
  async getAllPortfolioProjects(): Promise<PortfolioProject[]> {
    return Array.from(this.portfolioProjects.values());
  }

  async getPortfolioProject(id: string): Promise<PortfolioProject | undefined> {
    return this.portfolioProjects.get(id);
  }

  async createPortfolioProject(project: InsertPortfolioProject): Promise<PortfolioProject> {
    const id = randomUUID();
    const newProject: PortfolioProject = {
      ...project,
      projectUrl: project.projectUrl ?? null,
      id,
      createdAt: new Date()
    };
    this.portfolioProjects.set(id, newProject);
    return newProject;
  }

  async updatePortfolioProject(id: string, project: Partial<InsertPortfolioProject>): Promise<PortfolioProject | undefined> {
    const existing = this.portfolioProjects.get(id);
    if (!existing) return undefined;

    const updated: PortfolioProject = { ...existing, ...project };
    this.portfolioProjects.set(id, updated);
    return updated;
  }

  async deletePortfolioProject(id: string): Promise<boolean> {
    return this.portfolioProjects.delete(id);
  }

  // Order methods
  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const newOrder: Order = {
      ...order,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.orders.set(id, newOrder);
    return newOrder;
  }

  async updateOrderStatus(id: string, update: UpdateOrderStatus): Promise<Order | undefined> {
    const existing = this.orders.get(id);
    if (!existing) return undefined;

    const updated: Order = { ...existing, status: update.status };
    this.orders.set(id, updated);
    return updated;
  }

  // Contact Message methods
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async getContactMessage(id: string): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const newMessage: ContactMessage = {
      ...message,
      id,
      read: false,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }

  async markMessageAsRead(id: string): Promise<boolean> {
    const message = this.contactMessages.get(id);
    if (!message) return false;

    message.read = true;
    this.contactMessages.set(id, message);
    return true;
  }

  // Site Settings methods
  async getSiteSettings(): Promise<SiteSettings | null> {
    return this.siteSettings;
  }

  async updateSiteSettings(data: UpdateSiteSettings): Promise<SiteSettings> {
    if (!this.siteSettings) {
      // Initialize with defaults if not exists
      const { defaultSiteSettings } = await import("@shared/siteSettings.ts");
      this.siteSettings = {
        ...defaultSiteSettings,
        id: randomUUID(),
        updatedAt: new Date(),
      };
    }

    this.siteSettings = {
      ...this.siteSettings,
      ...data,
      updatedAt: new Date(),
    };

    return this.siteSettings;
  }
}

import { MongoStorage } from './mongodb.ts';

// Initialize storage based on environment
async function initStorage(): Promise<IStorage> {
  const dbUrl = process.env.DATABASE_URL;

  if (dbUrl) {
    console.log('Initializing MongoDB storage...');
    const mongoStorage = new MongoStorage(dbUrl);
    await mongoStorage.connect();
    return mongoStorage;
  } else {
    console.log('Using in-memory storage (no DATABASE_URL found)');
    return new MemStorage();
  }
}

// Export a promise that resolves to the storage instance
export const storagePromise = initStorage();

// For backward compatibility, export a storage object that will be populated
let storageInstance: IStorage;
export const storage = new Proxy({} as IStorage, {
  get(_target, prop) {
    if (!storageInstance) {
      throw new Error('Storage not initialized. Use await storagePromise first.');
    }
    return (storageInstance as any)[prop];
  }
});

// Initialize the storage instance
storagePromise.then(instance => {
  storageInstance = instance;
}).catch(err => {
  console.error('Failed to initialize storage:', err);
  process.exit(1);
});
