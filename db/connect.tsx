import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cachedConn: typeof mongoose | null = null;
let cachedPromise: Promise<typeof mongoose> | null = null;

async function dbConnect() {
  if (cachedConn) return cachedConn;

  if (!cachedPromise) {
    cachedPromise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  try {
    cachedConn = await cachedPromise;
  } catch (e) {
    cachedPromise = null;
    throw e;
  }

  return cachedConn;
}

export default dbConnect;
