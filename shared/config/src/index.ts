/**
 * Shared configuration for the monorepo
 */

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl?: boolean;
}

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
}

export interface AppConfig {
  name: string;
  version: string;
  port: number;
  env: 'development' | 'staging' | 'production';
  debug: boolean;
  cors: {
    origin: string[];
    credentials: boolean;
  };
  database: DatabaseConfig;
  redis: RedisConfig;
  jwt: {
    secret: string;
    expiresIn: string;
  };
  monitoring: {
    enabled: boolean;
    endpoint?: string;
  };
}

/**
 * Default configuration
 */
export const defaultConfig: Partial<AppConfig> = {
  env: 'development',
  debug: true,
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
    credentials: true
  },
  monitoring: {
    enabled: false
  }
};

/**
 * Environment-specific configurations
 */
export const environments = {
  development: {
    ...defaultConfig,
    debug: true,
    database: {
      host: 'localhost',
      port: 5432,
      database: 'monorepo_dev',
      username: 'dev_user',
      password: 'dev_password',
      ssl: false
    },
    redis: {
      host: 'localhost',
      port: 6379
    }
  },
  staging: {
    ...defaultConfig,
    env: 'staging' as const,
    debug: false,
    cors: {
      origin: ['https://staging.example.com'],
      credentials: true
    },
    monitoring: {
      enabled: true,
      endpoint: 'https://monitoring.staging.example.com'
    }
  },
  production: {
    ...defaultConfig,
    env: 'production' as const,
    debug: false,
    cors: {
      origin: ['https://example.com'],
      credentials: true
    },
    monitoring: {
      enabled: true,
      endpoint: 'https://monitoring.example.com'
    }
  }
};

/**
 * Get configuration for the current environment
 */
export function getConfig(env: string = process.env.NODE_ENV || 'development'): Partial<AppConfig> {
  return environments[env as keyof typeof environments] || environments.development;
}

/**
 * Service ports configuration
 */
export const servicePorts = {
  'react-app': 3000,
  'vue-app': 3001,
  'angular-app': 3002,
  'node-api': 4000,
  'python-api': 4001,
  'go-service': 4002,
  'java-service': 4003
};

/**
 * API endpoints configuration
 */
export const apiEndpoints = {
  health: '/health',
  metrics: '/metrics',
  docs: '/docs'
};