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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { votes, fingerprint } = req.body || {};

  // Validate fingerprint — expect 64-char hex (SHA-256)
  if (!fingerprint || !/^[a-f0-9]{64}$/.test(fingerprint)) {
    return res.status(400).json({ error: 'Invalid fingerprint' });
  }

  // Validate votes object
  if (!votes || typeof votes !== 'object') {
    return res.status(400).json({ error: 'Missing votes' });
  }

  for (const measure of VALID_MEASURES) {
    if (votes[measure] !== 'yes' && votes[measure] !== 'no') {
      return res.status(400).json({ error: `Invalid vote for ${measure}: must be "yes" or "no"` });
    }
  }

  // Check if already voted
  const alreadyVoted = await redis.sismember(VOTERS_KEY, fingerprint);
  if (alreadyVoted) {
    const results = await getResults();
    return res.status(409).json({ error: 'Already voted', ...results });
  }

  // Record votes using pipeline
  const pipe = redis.pipeline();
  for (const measure of VALID_MEASURES) {
    pipe.hincrby(VOTES_KEY, `${measure}:${votes[measure]}`, 1);
  }
  pipe.sadd(VOTERS_KEY, fingerprint);
  await pipe.exec();

  const results = await getResults();
  return res.status(200).json(results);
}

async function getResults() {
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

  return { results, totalVoters };
}
