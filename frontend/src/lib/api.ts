// Universal API client configured for local development and Ngrok tunnel
export const DEFAULT_NGROK_URL = 'https://resurface-exert-reaffirm.ngrok-free.dev';

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || DEFAULT_NGROK_URL
).replace(/\/+$/, '');

export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/+$/, '');

/**
 * Universal fetch wrapper for API calls to backend/ngrok
 * Automatically attaches:
 * - 'ngrok-skip-browser-warning': 'true' to bypass Ngrok free tier interstitial page
 * - 'Content-Type': 'application/json' for POST requests with body
 */
export async function apiFetch(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = endpoint.startsWith('http://') || endpoint.startsWith('https://')
    ? endpoint
    : `${API_BASE_URL}${cleanEndpoint}`;

  const headers: Record<string, string> = {
    'ngrok-skip-browser-warning': 'true',
    ...(options.headers as Record<string, string> || {}),
  };

  if (options.body && typeof options.body === 'string' && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  return fetch(url, {
    ...options,
    headers,
  });
}

/**
 * URL for Admin CSV export download link
 */
export function getExportUrl(): string {
  return `${API_BASE_URL}/api/admin/export`;
}
