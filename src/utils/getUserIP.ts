// Get user's IP address for anonymous voting
let cachedIP: string | null = null;

export async function getUserIP(): Promise<string> {
  if (cachedIP) {
    return cachedIP;
  }

  try {
    // Try multiple IP services for reliability
    const services = [
      'https://api.ipify.org?format=json',
      'https://api64.ipify.org?format=json',
      'https://ipapi.co/json/',
    ];

    for (const service of services) {
      try {
        const response = await fetch(service);
        const data = await response.json();
        const ip = data.ip || data.query;
        if (ip) {
          cachedIP = ip;
          return ip;
        }
      } catch (e) {
        // Try next service
        continue;
      }
    }

    // Fallback: generate a session-based ID (less reliable but works)
    const sessionId = sessionStorage.getItem('anonymous_session_id') || 
      `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('anonymous_session_id', sessionId);
    cachedIP = sessionId;
    return sessionId;
  } catch (error) {
    // Ultimate fallback
    const fallbackId = sessionStorage.getItem('anonymous_session_id') || 
      `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('anonymous_session_id', fallbackId);
    cachedIP = fallbackId;
    return fallbackId;
  }
}

