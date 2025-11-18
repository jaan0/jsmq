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
} from "@shared/schema";
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
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private services: Map<string, Service>;
  private portfolioProjects: Map<string, PortfolioProject>;
  private orders: Map<string, Order>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.portfolioProjects = new Map();
    this.orders = new Map();
    this.contactMessages = new Map();
    
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

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = { 
      ...insertService,
      badge: insertService.badge ?? null,
      id,
      createdAt: new Date()
    };
    this.services.set(id, service);
    return service;
  }

  async updateService(id: string, updates: Partial<InsertService>): Promise<Service | undefined> {
    const existing = this.services.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.services.set(id, updated);
    return updated;
  }

  async deleteService(id: string): Promise<boolean> {
    return this.services.delete(id);
  }

  async getAllPortfolioProjects(): Promise<PortfolioProject[]> {
    return Array.from(this.portfolioProjects.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getPortfolioProject(id: string): Promise<PortfolioProject | undefined> {
    return this.portfolioProjects.get(id);
  }

  async createPortfolioProject(insertProject: InsertPortfolioProject): Promise<PortfolioProject> {
    const id = randomUUID();
    const project: PortfolioProject = { 
      ...insertProject, 
      id,
      createdAt: new Date()
    };
    this.portfolioProjects.set(id, project);
    return project;
  }

  async updatePortfolioProject(id: string, updates: Partial<InsertPortfolioProject>): Promise<PortfolioProject | undefined> {
    const existing = this.portfolioProjects.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.portfolioProjects.set(id, updated);
    return updated;
  }

  async deletePortfolioProject(id: string): Promise<boolean> {
    return this.portfolioProjects.delete(id);
  }

  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = { 
      ...insertOrder,
      id,
      status: 'pending',
      createdAt: new Date()
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrderStatus(id: string, update: UpdateOrderStatus): Promise<Order | undefined> {
    const existing = this.orders.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...update };
    this.orders.set(id, updated);
    return updated;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getContactMessage(id: string): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { 
      ...insertMessage,
      id,
      read: false,
      createdAt: new Date()
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async markMessageAsRead(id: string): Promise<boolean> {
    const message = this.contactMessages.get(id);
    if (!message) return false;
    
    message.read = true;
    this.contactMessages.set(id, message);
    return true;
  }
}

export const storage = new MemStorage();
