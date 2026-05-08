export async function saveUserSession(redisClient: any, userId: string, token: string) {
  await redisClient.set(`session:${userId}`, token);
}
