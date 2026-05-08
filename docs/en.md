# Docker Observability Lab

## Overview

This project is a containerized observability lab designed to simulate a production-like environment using modern DevOps practices.

It includes:

- Bun application
- Nginx reverse proxy
- PostgreSQL database
- Redis cache layer
- Dozzle for real-time Docker logs
- Portainer for container management
- Docker Compose orchestration

The goal is to improve debugging, monitoring, and infrastructure management skills.

## Architecture

```text
Client
   ↓
Nginx Reverse Proxy
   ↓
Bun Application
   ↓
PostgreSQL + Redis

Monitoring Layer:
- Dozzle
- Portainer
```

## Main Features

### Bun Application

Simple backend service with:

- `/health`
- `/debug`
- `/error`

These endpoints help test monitoring and observability workflows.

### Nginx

Acts as a reverse proxy for the Bun application and simulates production traffic flow.

### PostgreSQL

Persistent relational database with Docker volume support.

### Redis

Cache layer for future improvements and realistic service architecture.

### Dozzle

Provides real-time container log monitoring directly from the browser.

Useful for:

- debugging
- error tracking
- request monitoring
- live observability

### Portainer

Web UI for container management.

Useful for:

- managing services
- checking container health
- viewing volumes and networks
- restarting containers

## Why This Project

This project was built as a portfolio-ready DevOps lab to demonstrate:

- Docker knowledge
- container networking
- observability practices
- service orchestration
- infrastructure thinking

It is intended for Junior DevOps / Cloud Engineer opportunities.

## Future Improvements

Planned upgrades:

- AWS EC2 deployment
- Terraform infrastructure
- Ansible provisioning
- GitHub Actions CI/CD
- HTTPS with reverse proxy
- Prometheus + Grafana monitoring

## Current Test Status

- Redis infrastructure tests: ✅
- Health endpoint tests: ✅
- Integration tests: ✅
- PostgreSQL infrastructure test: ⚠ Investigating Bun + pg handshake issue with Testcontainers
