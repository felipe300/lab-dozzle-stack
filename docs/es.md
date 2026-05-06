# Docker Observability Lab (Español)

## Descripción general

Este proyecto es un laboratorio de observabilidad contenerizado diseñado para simular un entorno similar a producción utilizando buenas prácticas de DevOps.

Incluye:

- aplicación en Bun
- reverse proxy con Nginx
- base de datos PostgreSQL
- capa de caché con Redis
- Dozzle para logs en tiempo real
- Portainer para gestión de contenedores
- orquestación con Docker Compose

El objetivo es mejorar habilidades de debugging, monitoreo y administración de infraestructura.

## Arquitectura

```text
Cliente
   ↓
Nginx Reverse Proxy
   ↓
Aplicación Bun
   ↓
PostgreSQL + Redis

Capa de monitoreo:
- Dozzle
- Portainer
```

## Componentes principales

### Aplicación Bun

Servicio backend simple con:

- `/health`
- `/debug`
- `/error`

Estos endpoints ayudan a probar monitoreo y observabilidad.

### Nginx

Funciona como reverse proxy para la aplicación Bun y simula un flujo de tráfico más realista.

### PostgreSQL

Base de datos relacional persistente con soporte de volúmenes Docker.

### Redis

Capa de caché para futuras mejoras y una arquitectura más realista.

### Dozzle

Permite visualizar logs de contenedores Docker en tiempo real desde el navegador.

Útil para:

- debugging
- seguimiento de errores
- monitoreo de requests
- observabilidad en vivo

### Portainer

Interfaz web para la gestión de contenedores.

Útil para:

- administrar servicios
- revisar estado de contenedores
- ver volúmenes y redes
- reiniciar servicios

## Por qué este proyecto

Este proyecto fue creado como un laboratorio DevOps orientado a portafolio para demostrar:

- conocimiento de Docker
- redes entre contenedores
- prácticas de observabilidad
- orquestación de servicios
- pensamiento de infraestructura

Está pensado para oportunidades como Junior DevOps / Cloud Engineer.

## Mejoras futuras

Próximas mejoras:

- despliegue en AWS EC2
- infraestructura con Terraform
- aprovisionamiento con Ansible
- CI/CD con GitHub Actions
- HTTPS con reverse proxy
- monitoreo con Prometheus + Grafana
