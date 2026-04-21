/**
 * Application-wide configuration.
 * All API calls MUST import API_URL from this file.
 */
const resolvedUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')

export const API_URL = resolvedUrl || '/api'
