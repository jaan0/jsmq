import { MongoClient, Db, ObjectId } from 'mongodb';
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
import { IStorage } from "./storage.ts";

export class MongoStorage implements IStorage {
  private client: MongoClient;
  private db: Db | null = null;

  constructor(uri: string) {
    this.client = new MongoClient(uri);
  }

  async connect() {
    await this.client.connect();
    this.db = this.client.db('jsmq_webflow');
    console.log('Connected to MongoDB');
  }

  private getDb(): Db {
    if (!this.db) {
      throw new Error('Database not connected');
    }
    return this.db;
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const db = this.getDb();
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    if (!user) return undefined;
    const { _id, ...rest } = user;
    return { ...rest, id: _id.toString() } as User;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const db = this.getDb();
    const user = await db.collection('users').findOne({ username });
    if (!user) return undefined;
    const { _id, ...rest } = user;
    return { ...rest, id: _id.toString() } as User;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const db = this.getDb();
    const result = await db.collection('users').insertOne(insertUser);
    return { ...insertUser, id: result.insertedId.toString() };
  }

  // Service methods
  async getAllServices(): Promise<Service[]> {
    const db = this.getDb();
    const services = await db.collection('services')
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    return services.map(s => {
      const { _id, ...rest } = s;
      return { ...rest, id: _id.toString() } as Service;
    });
  }

  async getService(id: string): Promise<Service | undefined> {
    const db = this.getDb();
    const service = await db.collection('services').findOne({ _id: new ObjectId(id) });
    if (!service) return undefined;
    const { _id, ...rest } = service;
    return { ...rest, id: _id.toString() } as Service;
  }

  async createService(insertService: InsertService): Promise<Service> {
    const db = this.getDb();
    const service = {
      ...insertService,
      badge: insertService.badge ?? null,
      imageUrl: insertService.imageUrl ?? null,
      createdAt: new Date()
    };
    const result = await db.collection('services').insertOne(service);
    return { ...service, id: result.insertedId.toString() };
  }

  async updateService(id: string, updates: Partial<InsertService>): Promise<Service | undefined> {
    const db = this.getDb();
    const result = await db.collection('services').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updates },
      { returnDocument: 'after' }
    );
    if (!result) return undefined;
    const { _id, ...rest } = result;
    return { ...rest, id: _id.toString() } as Service;
  }

  async deleteService(id: string): Promise<boolean> {
    const db = this.getDb();
    const result = await db.collection('services').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  // Portfolio methods
  async getAllPortfolioProjects(): Promise<PortfolioProject[]> {
    const db = this.getDb();
    const projects = await db.collection('portfolio')
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    return projects.map(p => {
      const { _id, ...rest } = p;
      return { ...rest, id: _id.toString() } as PortfolioProject;
    });
  }

  async getPortfolioProject(id: string): Promise<PortfolioProject | undefined> {
    const db = this.getDb();
    const project = await db.collection('portfolio').findOne({ _id: new ObjectId(id) });
    if (!project) return undefined;
    const { _id, ...rest } = project;
    return { ...rest, id: _id.toString() } as PortfolioProject;
  }

  async createPortfolioProject(insertProject: InsertPortfolioProject): Promise<PortfolioProject> {
    const db = this.getDb();
    const project = {
      ...insertProject,
      projectUrl: insertProject.projectUrl ?? null,
      createdAt: new Date()
    };
    const result = await db.collection('portfolio').insertOne(project);
    return { ...project, id: result.insertedId.toString() };
  }

  async updatePortfolioProject(id: string, updates: Partial<InsertPortfolioProject>): Promise<PortfolioProject | undefined> {
    const db = this.getDb();
    const result = await db.collection('portfolio').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updates },
      { returnDocument: 'after' }
    );
    if (!result) return undefined;
    const { _id, ...rest } = result;
    return { ...rest, id: _id.toString() } as PortfolioProject;
  }

  async deletePortfolioProject(id: string): Promise<boolean> {
    const db = this.getDb();
    const result = await db.collection('portfolio').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  // Order methods
  async getAllOrders(): Promise<Order[]> {
    const db = this.getDb();
    const orders = await db.collection('orders')
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    return orders.map(o => {
      const { _id, ...rest } = o;
      return { ...rest, id: _id.toString() } as Order;
    });
  }

  async getOrder(id: string): Promise<Order | undefined> {
    const db = this.getDb();
    const order = await db.collection('orders').findOne({ _id: new ObjectId(id) });
    if (!order) return undefined;
    const { _id, ...rest } = order;
    return { ...rest, id: _id.toString() } as Order;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const db = this.getDb();
    const order = {
      ...insertOrder,
      status: 'pending' as const,
      createdAt: new Date()
    };
    const result = await db.collection('orders').insertOne(order);
    return { ...order, id: result.insertedId.toString() };
  }

  async updateOrderStatus(id: string, update: UpdateOrderStatus): Promise<Order | undefined> {
    const db = this.getDb();
    const result = await db.collection('orders').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: 'after' }
    );
    if (!result) return undefined;
    const { _id, ...rest } = result;
    return { ...rest, id: _id.toString() } as Order;
  }

  // Contact Message methods
  async getAllContactMessages(): Promise<ContactMessage[]> {
    const db = this.getDb();
    const messages = await db.collection('contactMessages')
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    return messages.map(m => {
      const { _id, ...rest } = m;
      return { ...rest, id: _id.toString() } as ContactMessage;
    });
  }

  async getContactMessage(id: string): Promise<ContactMessage | undefined> {
    const db = this.getDb();
    const message = await db.collection('contactMessages').findOne({ _id: new ObjectId(id) });
    if (!message) return undefined;
    const { _id, ...rest } = message;
    return { ...rest, id: _id.toString() } as ContactMessage;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const db = this.getDb();
    const message = {
      ...insertMessage,
      read: false,
      createdAt: new Date()
    };
    const result = await db.collection('contactMessages').insertOne(message);
    return { ...message, id: result.insertedId.toString() };
  }

  async markMessageAsRead(id: string): Promise<boolean> {
    const db = this.getDb();
    const result = await db.collection('contactMessages').updateOne(
      { _id: new ObjectId(id) },
      { $set: { read: true } }
    );
    return result.modifiedCount > 0;
  }
}
