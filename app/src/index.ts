import { config } from "./config";

console.log("=== Application Configuration ===");
console.log(`Environment: ${config.app.env}`);
console.log(`App Port: ${config.app.port}`);
console.log(`Database Host: ${config.db.host}`);
console.log(`Redis Host: ${config.redis.host}`);
console.log("=================================");

const server = Bun.serve({
  port: config.app.port,

  fetch(req) {
    try {
      const url = new URL(req.url);

      console.log(`[${new Date().toISOString()}] Request: ${req.method} ${url.pathname}`);

      if (url.pathname === "/error") {
        console.error("!!! Error simulado para probar Dozzle");
        return new Response("Error detectado", { status: 500 });
      }

      if (url.pathname === "/health") {
        return Response.json({
          status: "ok",
          app: "docker-observability-lab",
          database: config.db.host,
          redis: config.redis.host,
          timestamp: new Date().toISOString(),
        });
      }

      if (url.pathname === "/debug") {
        console.warn("⚠ Debug endpoint accessed");

        return Response.json({
          environment: config.app.env,
          port: config.app.port,
          databaseHost: config.db.host,
          redisHost: config.redis.host,
        });
      }

      return new Response("Hola desde Bun + Docker + Dozzle!");
    } catch (error) {
      console.error("Unexpected server error:", error);

      return new Response("Internal Server Error", {
        status: 500,
      });
    }
  },
});

console.log(`🚀 Servidor corriendo en http://localhost:${server.port}`);
