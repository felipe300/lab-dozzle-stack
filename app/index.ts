const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);
    console.log(`[${new Date().toISOString()}] Request: ${req.method} ${url.pathname}`);

    if (url.pathname === "/error") {
      console.error("!!! Error simulado para probar Dozzle");
      return new Response("Error detectado", { status: 500 });
    }

    return new Response("Hola desde Bun!");
  },
});

console.log(`🚀 Servidor corriendo en http://localhost:${server.port}`);
