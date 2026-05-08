import { beforeAll, describe, expect, it } from "bun:test";

type HealthResponse = {
  status: string;
  app: string;
  database: string;
  redis: string;
  timestamp: string;
};

type DebugResponse = {
  environment: string;
  port: number;
  databaseHost: string;
  redisHost: string;
};

describe("Health Check Endpoint", () => {
  let healthResponse: Response;
  let healthBody: HealthResponse;

  beforeAll(async () => {
    healthResponse = await fetch("http://localhost:3000/health");
    healthBody = (await healthResponse.json()) as HealthResponse;
  });

  it("should return application health status", () => {
    expect(healthResponse.status).toBe(200);

    expect(healthBody.status).toBe("ok");
    expect(healthBody.app).toBe("docker-observability-lab");
    expect(healthBody.database).toBeDefined();
    expect(healthBody.redis).toBeDefined();
    expect(healthBody.timestamp).toBeDefined();
  });

  it("should return debug information", async () => {
    const response = await fetch("http://localhost:3000/debug");

    expect(response.status).toBe(200);

    const body = (await response.json()) as DebugResponse;

    expect(body.environment).toBeDefined();
    expect(body.port).toBeDefined();
    expect(body.databaseHost).toBeDefined();
    expect(body.redisHost).toBeDefined();
  });

  it("should simulate an application error", async () => {
    const response = await fetch("http://localhost:3000/error");

    expect(response.status).toBe(500);

    const text = await response.text();

    expect(text).toBe("Error detectado");
  });
});
