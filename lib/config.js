/**
 * Application-wide configuration.
 * All API calls MUST import API_URL from this file.
 */
const resolvedUrl = process.env.NEXT_PUBLIC_API_URL;

if (!resolvedUrl && typeof window === 'undefined') {
  console.warn(
    '⚠️  NEXT_PUBLIC_API_URL is not set! Falling back to localhost. ' +
    'Set this variable in your Vercel dashboard for production builds.'
  );
}

export const API_URL = resolvedUrl || 'http://127.0.0.1:5000';
