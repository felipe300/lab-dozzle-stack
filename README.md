# Docker Observability Lab

Production-like containerized environment built with:

- Bun
- Nginx
- PostgreSQL
- Redis
- Dozzle
- Portainer
- Docker Compose

This project focuses on:

- container orchestration
- observability
- real-time log monitoring
- reverse proxy setup
- service healthchecks
- self-hosted infrastructure
- DevOps practices

## Documentation

### English

See full documentation here:

[docs/en.md](./docs/en.md)

### Español

Ver documentación completa aquí:

[docs/es.md](./docs/es.md)

## Quick Start

```bash
# Start up the lab
docker compose up -d

# Stop the lab
docker compose down
```

Then access:

- App → http://localhost
- Dozzle → http://localhost:8080
- Portainer → https://localhost:9443

## Project Goals

First, this lab was created to simulate a real production-like environment for learning:

- Docker workflows
- infrastructure debugging
- monitoring container logs
- service communication
- cloud-ready deployment patterns

It is designed as a portfolio project for DevOps / Cloud / Platform Engineering roles.

Second, the main focus of this lab is to have real hands-on-experience on Portainer to manage containers, and Dozzle to check and monitoring logs in real-time.

> [!IMPORTANT] Portainer
> This is a "Docker edition", it has some limitations.
> Portainer is a paid services, but they have a free edition, up to 3 nodes or containers in their [website](https://www.portainer.io/pricing).
