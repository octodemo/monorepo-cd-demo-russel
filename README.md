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

## 🛠️ Infrastructure

### Docker & Container Support

The repository includes comprehensive Docker support with multi-stage builds:

```bash
# Build and run with Docker Compose
docker-compose -f infrastructure/docker/docker-compose.yml up

# Build individual services
docker build -t react-app -f apps/react-app/Dockerfile .
docker build -t node-api -f services/node-api/Dockerfile .
docker build -t python-api -f services/python-api/Dockerfile .
```

### Kubernetes Deployment

Kubernetes manifests for production deployment:

```bash
# Deploy to Kubernetes
kubectl apply -f infrastructure/kubernetes/

# Monitor deployments
kubectl get pods -n monorepo
kubectl get services -n monorepo
```

### Terraform Infrastructure

Infrastructure as Code using Terraform modules:

```bash
# Initialize and plan
cd infrastructure/terraform/environments/dev
terraform init
terraform plan

# Apply infrastructure
terraform apply
```

**Modules included:**
- VPC with public/private subnets
- ECS cluster for container orchestration
- RDS for database management
- Security groups and networking

## 📊 Monitoring & Observability

### Health Checks

All services include standardized health check endpoints:

```bash
# Check service health
curl http://localhost:3000/health  # React App
curl http://localhost:4000/health  # Node.js API
curl http://localhost:4001/health  # Python API
```

### Metrics Collection

Services expose metrics for monitoring:

```bash
curl http://localhost:4000/metrics  # Node.js API metrics
curl http://localhost:4001/metrics  # Python API metrics
```

### Docker Compose Monitoring Stack

The Docker Compose setup includes:
- **Prometheus**: Metrics collection
- **Grafana**: Metrics visualization
- **PostgreSQL**: Database services
- **Redis**: Caching layer

Access monitoring:
- Grafana: http://localhost:3001 (admin/admin)
- Prometheus: http://localhost:9090

## 🔄 Adding New Services

The monorepo structure makes it easy to add new services:

1. **Create service directory**:
   ```bash
   mkdir -p services/my-new-service/src
   # or for apps
   mkdir -p apps/my-new-app/src
   ```

2. **Add package.json** following existing patterns

3. **Update root package.json** to include the new workspace

4. **Create Dockerfile** for containerization

5. **Add Kubernetes manifests** in `infrastructure/kubernetes/`

6. **Update CI/CD workflow** - automatic detection in most cases!

### Supported Technologies

The monorepo supports multiple technology stacks:

- **Frontend**: React, Vue.js, Angular
- **Backend**: Node.js, Python, Go, Java
- **Databases**: PostgreSQL, Redis
- **Infrastructure**: Docker, Kubernetes, Terraform
- **CI/CD**: GitHub Actions with advanced workflows

## 🎯 Key Benefits

- ✅ **Intelligent Change Detection**: Only builds and deploys what changed
- ✅ **Dependency-Aware Builds**: Rebuilds dependent services automatically
- ✅ **Parallel Processing**: Fast deployments with concurrent builds
- ✅ **Multi-Technology Support**: Mix and match languages and frameworks
- ✅ **Infrastructure as Code**: Terraform modules for repeatable deployments
- ✅ **Container-First**: Docker and Kubernetes ready
- ✅ **Security Built-in**: Automated vulnerability scanning
- ✅ **Scalable Architecture**: Proven patterns for enterprise use

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

## 📚 Complete Implementation Summary

This repository demonstrates a **production-ready monorepo** with comprehensive deployment patterns:

### 🎯 What's Included

1. **Three Shared Libraries** with TypeScript:
   - `@monorepo/utils` - Common utility functions
   - `@monorepo/config` - Environment configurations
   - `@monorepo/types` - TypeScript type definitions

2. **Frontend Applications**:
   - React app with TypeScript (✅ **Production Ready**)
   - Vue.js app structure (🚧 **Template Ready**)
   - Angular app structure (🚧 **Template Ready**)

3. **Backend Services**:
   - Node.js/Express API with TypeScript (✅ **Production Ready**)
   - Python Flask API (✅ **Production Ready**)
   - Go microservice structure (🚧 **Template Ready**)
   - Java Spring Boot structure (🚧 **Template Ready**)

4. **Infrastructure as Code**:
   - Docker multi-stage builds for all services
   - Kubernetes manifests with proper health checks
   - Terraform modules for AWS deployment
   - Docker Compose with monitoring stack

5. **Advanced CI/CD Pipeline**:
   - Intelligent change detection using git diff
   - Dynamic deployment matrices
   - Security scanning with Trivy
   - Parallel builds and deployments
   - Multi-environment support

### 🚀 Quick Start Commands

```bash
# Clone and setup
git clone https://github.com/octodemo/monorepo-cd-demo-russel.git
cd monorepo-cd-demo-russel
npm install

# Build everything
npm run build

# Start with Docker
docker-compose -f infrastructure/docker/docker-compose.yml up

# Deploy to Kubernetes
kubectl apply -f infrastructure/kubernetes/

# Provision infrastructure
cd infrastructure/terraform/environments/dev
terraform init && terraform plan
```

### 🔄 Testing Change Detection

The CI/CD system intelligently detects changes:

```bash
# Test 1: Modify shared library (rebuilds everything)
echo "export const newUtil = () => 'updated';" >> shared/utils/src/index.ts
git add . && git commit -m "Update shared utils" && git push

# Test 2: Modify single service (rebuilds only that service)
echo "// Updated comment" >> services/node-api/src/index.ts
git add . && git commit -m "Update node-api" && git push

# Test 3: Modify multiple services (parallel deployment)
echo "// Updated" >> apps/react-app/src/App.tsx
echo "// Updated" >> services/python-api/src/app.py
git add . && git commit -m "Update frontend and backend" && git push
```

Watch the GitHub Actions tab to see selective deployments in action!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the existing patterns
4. Test the change detection works correctly
5. Update documentation if needed
6. Submit a pull request

## 📚 References & Resources

- [Monorepo Best Practices](https://blog.logrocket.com/creating-separate-monorepo-ci-cd-pipelines-github-actions/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Multi-stage Builds](https://docs.docker.com/develop/dev-best-practices/dockerfile_best-practices/)

---

**🎉 This comprehensive demo shows how modern monorepo patterns enable efficient, scalable, and secure deployment workflows for multi-technology teams!**