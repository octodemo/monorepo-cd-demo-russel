# Comprehensive Monorepo Deployment Patterns Demo

This repository demonstrates **modern monorepo deployment patterns** with comprehensive CI/CD practices for multi-technology stacks. It showcases intelligent change detection, selective deployment, dependency-aware builds, and real-world deployment patterns.

## 🏗️ Architecture Overview

```
root/
├── .github/
│   └── workflows/
│       └── ci-cd.yml           # Comprehensive CI/CD pipeline
├── apps/                       # Frontend Applications
│   ├── react-app/              # React TypeScript App (Port 3000)
│   ├── vue-app/                # Vue.js App (Port 3001)
│   └── angular-app/            # Angular App (Port 3002)
├── services/                   # Backend Services
│   ├── node-api/               # Node.js/Express API (Port 4000)
│   ├── python-api/             # Python Flask API (Port 4001)
│   ├── go-service/             # Go Microservice (Port 4002)
│   └── java-service/           # Java Spring Boot (Port 4003)
├── shared/                     # Shared Libraries
│   ├── utils/                  # Common utilities
│   ├── config/                 # Configuration packages
│   ├── types/                  # TypeScript type definitions
│   └── ui-components/          # Shared React components
├── infrastructure/             # Infrastructure as Code
│   ├── terraform/              # Terraform modules
│   ├── kubernetes/             # Kubernetes manifests
│   └── docker/                 # Docker configurations
├── docs/                       # Documentation
└── package.json                # Root workspace configuration
```

## 🚀 Key Features

1. **Intelligent Change Detection**: Uses `git diff` to identify modified components
2. **Selective Deployment**: Only deploys services that actually changed
3. **Dependency-Aware Builds**: Rebuilds dependent services when shared libraries change
4. **Parallel Processing**: Multiple services deploy simultaneously for faster CI/CD
5. **Multi-Environment Support**: Development, staging, and production configurations
6. **Security Scanning**: Automated vulnerability detection and quality gates
7. **Multi-Technology Stack**: React, Vue, Angular, Node.js, Python, Go, Java

## 📋 Services & Applications

### Frontend Applications
| Application | Technology | Port | Status | Description |
|-------------|------------|------|--------|-------------|
| react-app | React + TypeScript | 3000 | ✅ Ready | Modern React application with shared utilities |
| vue-app | Vue.js 3 | 3001 | 🚧 Coming Soon | Vue.js application with Composition API |
| angular-app | Angular 16+ | 3002 | 🚧 Coming Soon | Angular application with standalone components |

### Backend Services
| Service | Technology | Port | Status | Description |
|---------|------------|------|--------|-------------|
| node-api | Node.js + Express | 4000 | ✅ Ready | RESTful API with TypeScript |
| python-api | Python + Flask | 4001 | 🚧 Coming Soon | Python API with FastAPI/Flask |
| go-service | Go + Gin | 4002 | 🚧 Coming Soon | High-performance Go microservice |
| java-service | Java + Spring Boot | 4003 | 🚧 Coming Soon | Enterprise Java service |

### Shared Libraries
| Library | Purpose | Status |
|---------|---------|--------|
| @monorepo/utils | Common utility functions | ✅ Ready |
| @monorepo/config | Configuration management | ✅ Ready |
| @monorepo/types | TypeScript type definitions | ✅ Ready |
| @monorepo/ui-components | Shared React components | 🚧 Coming Soon |

## 🔧 Getting Started

### Prerequisites
- Node.js 20+
- Docker & Docker Compose (optional, for containerization)
- Git

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/octodemo/monorepo-cd-demo-russel.git
   cd monorepo-cd-demo-russel
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build shared libraries**:
   ```bash
   npm run build --workspace=shared/utils
   npm run build --workspace=shared/config
   npm run build --workspace=shared/types
   ```

4. **Start all services**:
   ```bash
   npm run start:all
   ```

5. **Or start individual services**:
   ```bash
   # Frontend
   npm run start --workspace=apps/react-app
   
   # Backend
   npm run dev --workspace=services/node-api
   ```

### Testing the Services

- **React App**: http://localhost:3000
- **Node.js API**: http://localhost:4000

Health checks available at `/health` endpoint for each service.

### Using Docker

```bash
# Build and start all services
npm run docker:up

# Build specific service
docker build -t react-app -f apps/react-app/Dockerfile .
docker build -t node-api -f services/node-api/Dockerfile .

# Run with Docker Compose
docker-compose -f infrastructure/docker/docker-compose.yml up
```

## 🤖 CI/CD Workflow

The GitHub Actions workflow (`.github/workflows/ci-cd.yml`) implements advanced deployment patterns:

```yaml
# Advanced workflow features:
1. Intelligent change detection using git diff
2. Dynamic deployment matrix generation
3. Shared library dependency management
4. Parallel builds and deployments
5. Security scanning with Trivy
6. Multi-environment deployment support
7. Rollback mechanisms and health checks
```

### Key Workflow Jobs

- **detect-changes**: Analyzes git diff to determine what changed
- **build-shared**: Builds shared libraries when needed
- **test-and-build**: Runs tests and builds for changed services
- **security-scan**: Performs vulnerability scanning
- **deploy**: Deploys services to target environments

### Triggering Deployments

- **Automatic**: Push to `main` branch
- **Manual**: Use "Run workflow" button in GitHub Actions
- **Pull Request**: Builds and tests (no deployment)

### Testing Change Detection

1. **Modify a shared library**:
   ```bash
   echo "export const newUtil = () => 'new';" >> shared/utils/src/index.ts
   git add . && git commit -m "Update shared utils"
   git push
   ```
   Result: All dependent services rebuild and deploy

2. **Modify a specific service**:
   ```bash
   echo "// Updated" >> services/node-api/src/index.ts
   git add . && git commit -m "Update node-api"
   git push
   ```
   Result: Only the node-api service deploys

3. **Modify multiple services**:
   ```bash
   echo "// Updated" >> apps/react-app/src/App.tsx
   echo "// Updated" >> services/node-api/src/index.ts
   git add . && git commit -m "Update react-app and node-api"
   git push
   ```
   Result: Both services deploy in parallel

## 🐳 Docker Support

Each service includes a Dockerfile optimized for production:

```bash
# Build specific service
docker build -t service-a ./services/service-a

# Run service
docker run -p 3001:3001 service-a
```

## 📊 Monitoring

All services include health check endpoints:

```bash
# Check service health
curl http://localhost:3001/health
curl http://localhost:3002/health  
curl http://localhost:3003/health
```

Response format:
```json
{
  "status": "healthy",
  "service": "service-a",
  "version": "1.0.0",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🔄 Adding New Services

1. **Create service directory**:
   ```bash
   mkdir services/service-d
   ```

2. **Add package.json, index.js, Dockerfile, README.md** (follow existing patterns)

3. **Update root package.json** with new scripts

4. **The workflow automatically detects new services** - no changes needed!

## 🎯 Key Benefits of Solution #2

- ✅ **Efficient**: Only deploys what changed
- ✅ **Fast**: Parallel deployment of multiple services
- ✅ **Scalable**: Easy to add new services
- ✅ **Reliable**: Git-based change detection
- ✅ **Transparent**: Clear logging of what's being deployed

## 🛠️ Troubleshooting

### Common Issues

1. **No services detected as changed**:
   - Ensure changes are in `services/` directory
   - Check git history is available (fetch-depth: 0)

2. **Service won't start**:
   - Check port conflicts
   - Verify dependencies are installed
   - Check service logs

3. **Docker build fails**:
   - Ensure Dockerfile syntax is correct
   - Check base image availability

### Debug Commands

```bash
# Check which services would be detected as changed
git diff --name-only HEAD~1 HEAD | grep '^services/' | cut -d'/' -f2 | sort | uniq

# Test individual service
cd services/service-a
npm start

# Check service health
curl -f http://localhost:3001/health || echo "Service not healthy"
```

## 📚 References

- [Original DEV.to Article](https://dev.to/koseimori/implementing-continuous-delivery-for-github-monorepos-and-microservices-with-github-actions-50i8)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Monorepo Best Practices](https://blog.logrocket.com/creating-separate-monorepo-ci-cd-pipelines-github-actions/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the change detection works correctly
5. Submit a pull request

---

**Happy coding!** 🎉 This demo shows how Solution #2 makes monorepo CI/CD efficient and scalable.