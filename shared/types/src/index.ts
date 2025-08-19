/**
 * Shared TypeScript types for the monorepo
 */

// Common API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// User-related types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator'
}

export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  role?: UserRole;
}

// Order-related types
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export interface CreateOrderRequest {
  items: Omit<OrderItem, 'id'>[];
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  data?: Record<string, any>;
  createdAt: string;
}

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error'
}

export interface CreateNotificationRequest {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
}

// Authentication types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends CreateUserRequest {}

// Health check types
export interface HealthCheck {
  status: 'healthy' | 'unhealthy';
  service: string;
  version: string;
  timestamp: string;
  uptime?: number;
  dependencies?: HealthCheckDependency[];
}

export interface HealthCheckDependency {
  name: string;
  status: 'healthy' | 'unhealthy';
  responseTime?: number;
  error?: string;
}

// Environment types
export type Environment = 'development' | 'staging' | 'production';

// Service types
export type ServiceName = 
  | 'react-app'
  | 'vue-app' 
  | 'angular-app'
  | 'node-api'
  | 'python-api'
  | 'go-service'
  | 'java-service';

// Deployment types
export interface DeploymentInfo {
  service: ServiceName;
  version: string;
  environment: Environment;
  deployedAt: string;
  deployedBy: string;
  commitSha: string;
  status: 'success' | 'failed' | 'in-progress';
}

// Metrics types
export interface ServiceMetrics {
  service: ServiceName;
  timestamp: string;
  cpu: number;
  memory: number;
  requests: number;
  errors: number;
  responseTime: number;
}