export type Config = {
  port: number;
};

export default () => ({
  port: process.env.PORT || 3001,
  newsApiUrl: process.env.NEWS_API_URL,
  newsApiKey: process.env.NEWS_API_KEY,
  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: process.env.REDIS_PORT || 6379,
} as Config);
