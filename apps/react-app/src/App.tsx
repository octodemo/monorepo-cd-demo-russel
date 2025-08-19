import React, { useState, useEffect } from 'react';
import { formatDate, generateId } from '@monorepo/utils';
import { ApiResponse, User, HealthCheck } from '@monorepo/types';
import './App.css';

interface AppState {
  users: User[];
  healthStatus: HealthCheck | null;
  loading: boolean;
}

function App() {
  const [state, setState] = useState<AppState>({
    users: [],
    healthStatus: null,
    loading: true
  });

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUsers: User[] = [
          {
            id: generateId(),
            email: 'john.doe@example.com',
            firstName: 'John',
            lastName: 'Doe',
            role: 'user' as any,
            createdAt: formatDate(new Date()),
            updatedAt: formatDate(new Date())
          }
        ];

        const healthCheck: HealthCheck = {
          status: 'healthy',
          service: 'react-app',
          version: '1.0.0',
          timestamp: formatDate(new Date()),
          uptime: 3600
        };

        setState({
          users: mockUsers,
          healthStatus: healthCheck,
          loading: false
        });
      } catch (error) {
        console.error('Failed to load data:', error);
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    loadData();
  }, []);

  if (state.loading) {
    return (
      <div className="App">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Monorepo React App</h1>
        <p>Demonstrating comprehensive monorepo deployment patterns</p>
      </header>

      <main className="App-main">
        <section className="health-section">
          <h2>Health Status</h2>
          {state.healthStatus && (
            <div className={`health-card ${state.healthStatus.status}`}>
              <div className="health-status">
                <span className="status-indicator"></span>
                {state.healthStatus.status.toUpperCase()}
              </div>
              <div className="health-details">
                <p><strong>Service:</strong> {state.healthStatus.service}</p>
                <p><strong>Version:</strong> {state.healthStatus.version}</p>
                <p><strong>Uptime:</strong> {state.healthStatus.uptime}s</p>
                <p><strong>Timestamp:</strong> {state.healthStatus.timestamp}</p>
              </div>
            </div>
          )}
        </section>

        <section className="users-section">
          <h2>Users</h2>
          <div className="users-grid">
            {state.users.map(user => (
              <div key={user.id} className="user-card">
                <h3>{user.firstName} {user.lastName}</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Created:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="features-section">
          <h2>Monorepo Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🔄 Change Detection</h3>
              <p>Intelligent deployment of only modified services</p>
            </div>
            <div className="feature-card">
              <h3>📦 Shared Libraries</h3>
              <p>Common utilities and types across all services</p>
            </div>
            <div className="feature-card">
              <h3>🚀 CI/CD Pipeline</h3>
              <p>Automated testing, building, and deployment</p>
            </div>
            <div className="feature-card">
              <h3>🏗️ Multi-Framework</h3>
              <p>React, Vue, Angular, Node.js, Python, Go, Java</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;