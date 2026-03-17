import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const VALID_MEASURES = ['publicBank', 'artsTax', 'infraBond', 'berkSales', 'alamSales', 'parcel'];
const VOTES_KEY = 'votes:2026';
const VOTERS_KEY = 'voters:2026';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const [raw, totalVoters] = await Promise.all([
    redis.hgetall(VOTES_KEY),
    redis.scard(VOTERS_KEY),
  ]);

  const results = {};
  for (const measure of VALID_MEASURES) {
    results[measure] = {
      yes: Number(raw?.[`${measure}:yes`] || 0),
      no: Number(raw?.[`${measure}:no`] || 0),
    };
  }

  return res.status(200).json({ results, totalVoters });
}
