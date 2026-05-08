import { describe, expect, it, beforeAll, afterAll } from "bun:test";
import { RedisContainer, StartedRedisContainer } from "@testcontainers/redis";
import { createClient } from "redis";
import { saveUserSession } from "../src/services/cache.service";

describe("Integration Test - Application + Redis", () => {
  let redis: StartedRedisContainer;
  let redisClient: any;

  beforeAll(async () => {
    redis = await new RedisContainer("redis:7-alpine").start();

    redisClient = createClient({
      url: `redis://${redis.getHost()}:${redis.getMappedPort(6379)}`,
    });

    await redisClient.connect();
  }, 30000);

  afterAll(async () => {
    if (redisClient) await redisClient.disconnect();
    if (redis) await redis.stop();
  });

  it("should persist a user session in Redis", async () => {
    await saveUserSession(redisClient, "123", "jwt-token");

    const stored = await redisClient.get("session:123");

    expect(stored).toBe("jwt-token");
  });
});
