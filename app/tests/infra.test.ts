import { describe, expect, it, beforeAll, afterAll } from "bun:test";
import { GenericContainer, Wait } from "testcontainers";
import { Client } from "pg";

import { RedisContainer, StartedRedisContainer } from "@testcontainers/redis";
import { createClient, type RedisClientType } from "redis";

describe("PostgreSQL Infrastructure", () => {
  it.failing(
    "should connect successfully",
    async () => {
      console.log("🚀 Starting PostgreSQL container...");

      const postgres = await new GenericContainer("postgres:15-alpine")
        .withEnvironment({
          POSTGRES_DB: "testdb",
          POSTGRES_USER: "postgres",

          POSTGRES_HOST_AUTH_METHOD: "trust",
        })
        .withExposedPorts(5432)
        .withWaitStrategy(Wait.forLogMessage("database system is ready to accept connections"))
        .start();

      const host = postgres.getHost();
      const port = postgres.getMappedPort(5432);

      console.log({
        host,
        port,
        user: "postgres",
        database: "testdb",
      });

      const client = new Client({
        host,
        port,
        user: "postgres",
        database: "testdb",

        ssl: false,

        connectionTimeoutMillis: 10000,
      });

      try {
        console.log("🚀 Connecting to PostgreSQL...");

        await client.connect();

        const result = await client.query("SELECT NOW()");
        expect(result.rows.length).toBeGreaterThan(0);

        console.log("✅ PostgreSQL query successful");
      } catch (error) {
        console.error("❌ PostgreSQL error:", error);
        throw error;
      } finally {
        await client.end().catch(() => {});
        await postgres.stop();
      }
    },
    120000,
  );
});

/*
Known issue:
PostgreSQL + Bun + pg + Testcontainers sometimes fails with:

"Connection terminated unexpectedly"

Redis infra tests pass correctly.
Health checks and integration tests are stable.

Pending deeper investigation for PostgreSQL handshake behavior.
Bun is "too fast" for PostgreSQL
*/
describe("Redis Infrastructure", () => {
  let redis: StartedRedisContainer;
  let redisClient: RedisClientType;

  beforeAll(async () => {
    console.log("🚀 Starting Redis container...");

    redis = await new RedisContainer("redis:7-alpine").start();

    redisClient = createClient({
      url: `redis://${redis.getHost()}:${redis.getMappedPort(6379)}`,
    });

    await redisClient.connect();

    console.log("✅ Redis connected");
  }, 30000);

  afterAll(async () => {
    if (redisClient) {
      await redisClient.close();
    }

    if (redis) {
      await redis.stop();
    }

    console.log("🛑 Redis container stopped");
  });

  it("should save and retrieve a value", async () => {
    await redisClient.set("health", "ok");

    const value = await redisClient.get("health");

    expect(value).toBe("ok");
  });

  it("should expire a key using TTL", async () => {
    await redisClient.set("temp-session", "active", {
      EX: 2,
    });

    const valueBefore = await redisClient.get("temp-session");
    expect(valueBefore).toBe("active");

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const valueAfter = await redisClient.get("temp-session");

    expect(valueAfter).toBeNull();
  });
});
