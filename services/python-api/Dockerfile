# Multi-stage build for Python API
FROM python:3.11-slim AS builder

WORKDIR /app

# Copy requirements and install dependencies
COPY services/python-api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Production image
FROM python:3.11-slim AS production

WORKDIR /app

# Create non-root user
RUN addgroup --gid 1001 --system python && \
    adduser --system --uid 1001 python

# Copy dependencies from builder
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Copy application code
COPY --chown=python:python services/python-api/src ./src

USER python

EXPOSE 4001

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4001/health || exit 1

CMD ["python", "src/app.py"]