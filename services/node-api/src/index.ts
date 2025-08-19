import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { createHealthCheck } from '@monorepo/utils';
import { getConfig, servicePorts } from '@monorepo/config';
import { ApiResponse, User, CreateUserRequest, HealthCheck } from '@monorepo/types';

const app = express();
const config = getConfig();
const PORT = process.env.PORT || servicePorts['node-api'] || 4000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock data
let users: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin' as any,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'user' as any,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Health check endpoint
app.get('/health', (req, res) => {
  const health: HealthCheck = createHealthCheck('node-api');
  res.json(health);
});

// API endpoints
app.get('/', (req, res) => {
  const response: ApiResponse = {
    success: true,
    message: 'Node.js API service is running',
    timestamp: new Date().toISOString()
  };
  res.json(response);
});

app.get('/api/users', (req, res) => {
  const response: ApiResponse<User[]> = {
    success: true,
    data: users,
    timestamp: new Date().toISOString()
  };
  res.json(response);
});

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);
  
  if (!user) {
    const response: ApiResponse = {
      success: false,
      error: 'User not found',
      timestamp: new Date().toISOString()
    };
    return res.status(404).json(response);
  }

  const response: ApiResponse<User> = {
    success: true,
    data: user,
    timestamp: new Date().toISOString()
  };
  res.json(response);
});

app.post('/api/users', (req, res) => {
  const createUserData: CreateUserRequest = req.body;
  
  // Basic validation
  if (!createUserData.email || !createUserData.firstName || !createUserData.lastName) {
    const response: ApiResponse = {
      success: false,
      error: 'Missing required fields: email, firstName, lastName',
      timestamp: new Date().toISOString()
    };
    return res.status(400).json(response);
  }

  const newUser: User = {
    id: (users.length + 1).toString(),
    email: createUserData.email,
    firstName: createUserData.firstName,
    lastName: createUserData.lastName,
    role: createUserData.role || 'user' as any,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  users.push(newUser);

  const response: ApiResponse<User> = {
    success: true,
    data: newUser,
    message: 'User created successfully',
    timestamp: new Date().toISOString()
  };
  res.status(201).json(response);
});

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    const response: ApiResponse = {
      success: false,
      error: 'User not found',
      timestamp: new Date().toISOString()
    };
    return res.status(404).json(response);
  }

  users.splice(userIndex, 1);

  const response: ApiResponse = {
    success: true,
    message: 'User deleted successfully',
    timestamp: new Date().toISOString()
  };
  res.json(response);
});

// Metrics endpoint
app.get('/metrics', (req, res) => {
  const metrics = {
    service: 'node-api',
    version: '1.0.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage(),
    requests: {
      total: 0, // In a real app, you'd track this
      errors: 0
    }
  };
  res.json(metrics);
});

// 404 handler
app.use('*', (req, res) => {
  const response: ApiResponse = {
    success: false,
    error: 'Endpoint not found',
    timestamp: new Date().toISOString()
  };
  res.status(404).json(response);
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  const response: ApiResponse = {
    success: false,
    error: config.debug ? err.message : 'Internal server error',
    timestamp: new Date().toISOString()
  };
  res.status(500).json(response);
});

app.listen(PORT, () => {
  console.log(`🚀 Node.js API service running on port ${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`📊 Metrics: http://localhost:${PORT}/metrics`);
  console.log(`👥 Users API: http://localhost:${PORT}/api/users`);
});