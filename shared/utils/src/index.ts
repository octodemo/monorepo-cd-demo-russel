/**
 * Shared utility functions for the monorepo
 */

/**
 * Formats a date string to ISO format
 */
export function formatDate(date: Date): string {
  return date.toISOString();
}

/**
 * Generates a unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Validates if a string is a valid email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Delays execution for a specified number of milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Capitalizes the first letter of a string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Debounces a function call
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Health check utility
 */
export interface HealthCheckResult {
  status: 'healthy' | 'unhealthy';
  service: string;
  version: string;
  timestamp: string;
  uptime?: number;
}

export function createHealthCheck(serviceName: string, version: string = '1.0.0'): HealthCheckResult {
  return {
    status: 'healthy',
    service: serviceName,
    version,
    timestamp: formatDate(new Date()),
    uptime: process.uptime()
  };
}