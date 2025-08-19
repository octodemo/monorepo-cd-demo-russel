# Monorepo Continuous Delivery Demo - Solution #2

This repository demonstrates **Solution #2** from the DEV.to article "Implementing Continuous Delivery for GitHub Monorepos and Microservices with GitHub Actions". This approach uses `git diff` to intelligently detect which microservices have changed and deploy only those services.

## 🏗️ Architecture Overview

```
root/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Smart deployment workflow
├── package.json                # Root workspace configuration
├── README.md                   # This file
└── services/
    ├── service-a/              # User Management Service (Port 3001)
    ├── service-b/              # Order Processing Service (Port 3002)
    └── service-c/              # Notification Service (Port 3003)
```

## 🚀 How Solution #2 Works

1. **Change Detection**: Uses `git diff` to identify which service directories have been modified
2. **Conditional Deployment**: Only deploys services that actually changed
3. **Parallel Processing**: Multiple changed services deploy simultaneously
4. **Efficiency**: Avoids unnecessary deployments, saving time and resources

## 📋 Services

| Service | Purpose | Port | Endpoints |
|---------|---------|------|-----------|
| service-a | User Management | 3001 | `/`, `/health`, `/users` |
| service-b | Order Processing | 3002 | `/`, `/health`, `/orders` |
| service-c | Notification Service | 3003 | `/`, `/health`, `/notifications` |

## 🔧 Getting Started

### Prerequisites
- Node.js 20+
- Docker (optional, for containerization)
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

3. **Start all services**:
   ```bash
   npm run start:all
   ```

4. **Or start individual services**:
   ```bash
   npm run start:service-a
   npm run start:service-b
   npm run start:service-c
   ```

### Testing the Services

- **Service A**: http://localhost:3001
- **Service B**: http://localhost:3002  
- **Service C**: http://localhost:3003

Health checks available at `/health` endpoint for each service.

## 🤖 CI/CD Workflow

The GitHub Actions workflow (`.github/workflows/deploy.yml`) implements the following logic:

```yaml
# Simplified workflow logic:
1. Checkout code with full history
2. Detect changed services using git diff
3. Create deployment matrix for changed services only
4. Deploy services in parallel
5. Report deployment status
```

### Triggering Deployments

- **Automatic**: Push to `main` branch
- **Manual**: Use "Run workflow" button in GitHub Actions

### Testing Change Detection

1. **Modify a single service**:
   ```bash
   echo "console.log('Updated!');" >> services/service-a/index.js
   git add . && git commit -m "Update service-a"
   git push
   ```

2. **Check Actions tab** - Only service-a should deploy!

3. **Modify multiple services**:
   ```bash
   echo "// Updated" >> services/service-a/index.js
   echo "// Updated" >> services/service-b/index.js
   git add . && git commit -m "Update service-a and service-b"
   git push
   ```

4. **Check Actions tab** - Both services should deploy in parallel!

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