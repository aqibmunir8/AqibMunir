/**
 * Visitor Telemetry & Analytics Service
 * Captures comprehensive visitor metrics and sends them securely to Supabase.
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://wbldtzvpwvsownwoebsj.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndibGR0enZwd3Zzb3dud29lYnNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2OTE5MDEsImV4cCI6MjEwNDI2NzkwMX0.S2y9eNNASEqceqah8ipUFbh5rOCW3HJYd8e1AuDXpQw';

interface GeoData {
  ip?: string;
  country_name?: string;
  region?: string;
  city?: string;
  postal?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  org?: string;
}

// Generate persistent Visitor ID & ephemeral Session ID
function getOrSetId(storage: Storage, key: string): string {
  try {
    let id = storage.getItem(key);
    if (!id) {
      id = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `id-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      storage.setItem(key, id);
    }
    return id;
  } catch {
    return `fallback-${Date.now()}`;
  }
}

// Parse Browser & OS from User-Agent
function parseUserAgent(): {
  deviceType: string;
  osName: string;
  osVersion: string;
  browserName: string;
  browserVersion: string;
} {
  const ua = navigator.userAgent;
  let deviceType = 'Desktop';
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    deviceType = 'Tablet';
  } else if (/Mobile|iPhone|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle/i.test(ua)) {
    deviceType = 'Mobile';
  }

  // OS Detection
  let osName = 'Unknown OS';
  let osVersion = '';
  if (/Windows NT 10.0/i.test(ua)) { osName = 'Windows'; osVersion = '10/11'; }
  else if (/Windows NT 6.3/i.test(ua)) { osName = 'Windows'; osVersion = '8.1'; }
  else if (/Windows NT 6.1/i.test(ua)) { osName = 'Windows'; osVersion = '7'; }
  else if (/Mac OS X ([0-9_]+)/i.test(ua)) {
    osName = 'macOS';
    osVersion = (RegExp.$1 || '').replace(/_/g, '.');
  } else if (/Android ([0-9.]+)/i.test(ua)) {
    osName = 'Android';
    osVersion = RegExp.$1;
  } else if (/iPhone OS ([0-9_]+)/i.test(ua)) {
    osName = 'iOS';
    osVersion = (RegExp.$1 || '').replace(/_/g, '.');
  } else if (/Linux/i.test(ua)) {
    osName = 'Linux';
  }

  // Browser Detection
  let browserName = 'Unknown Browser';
  let browserVersion = '';
  if (/Edg\/([0-9.]+)/i.test(ua)) {
    browserName = 'Edge';
    browserVersion = RegExp.$1;
  } else if (/Chrome\/([0-9.]+)/i.test(ua)) {
    browserName = 'Chrome';
    browserVersion = RegExp.$1;
  } else if (/Firefox\/([0-9.]+)/i.test(ua)) {
    browserName = 'Firefox';
    browserVersion = RegExp.$1;
  } else if (/Version\/([0-9.]+).*Safari/i.test(ua)) {
    browserName = 'Safari';
    browserVersion = RegExp.$1;
  } else if (/OPR\/([0-9.]+)/i.test(ua)) {
    browserName = 'Opera';
    browserVersion = RegExp.$1;
  }

  return { deviceType, osName, osVersion, browserName, browserVersion };
}

// Fetch IP & Geolocation info (with timeout)
async function fetchGeoData(): Promise<GeoData> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3500);

  try {
    // Primary: ipapi.co
    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fallback if blocked
  }

  try {
    // Fallback: ipwho.is
    const fallbackRes = await fetch('https://ipwho.is/');
    if (fallbackRes.ok) {
      const data = await fallbackRes.json();
      return {
        ip: data.ip,
        country_name: data.country,
        region: data.region,
        city: data.city,
        postal: data.postal,
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone?.id,
        org: data.connection?.isp || data.connection?.org
      };
    }
  } catch {
    // Graceful silent fallback
  }

  return {};
}

// Send payload to Supabase
async function sendToSupabase(payload: Record<string, unknown>, updateId?: string): Promise<string | null> {
  try {
    const url = updateId
      ? `${SUPABASE_URL}/rest/v1/visitor_telemetry?id=eq.${updateId}`
      : `${SUPABASE_URL}/rest/v1/visitor_telemetry`;

    const method = updateId ? 'PATCH' : 'POST';

    const res = await fetch(url, {
      method,
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': updateId ? 'return=minimal' : 'return=representation'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) return null;

    if (!updateId) {
      const data = await res.json();
      return data?.[0]?.id || null;
    }
    return updateId;
  } catch (err) {
    console.debug('Telemetry error:', err);
    return null;
  }
}

/**
 * Initialize visitor telemetry collection.
 * Tracks initial visit data, scroll depth, and session duration.
 */
export function initVisitorTelemetry() {
  if (typeof window === 'undefined') return;

  const startTime = Date.now();
  let maxScrollPercentage = 0;
  let recordId: string | null = null;

  // Track max scroll depth
  const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const currentPercent = Math.round((window.scrollY / totalHeight) * 100);
      if (currentPercent > maxScrollPercentage) {
        maxScrollPercentage = Math.min(100, Math.max(0, currentPercent));
      }
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Gather visitor data asynchronously
  (async () => {
    try {
      const visitorId = getOrSetId(localStorage, 'site_visitor_id');
      const sessionId = getOrSetId(sessionStorage, 'site_session_id');

      const { deviceType, osName, osVersion, browserName, browserVersion } = parseUserAgent();
      const urlParams = new URLSearchParams(window.location.search);
      const geo = await fetchGeoData();

      // Network connection details
      const navConn = (navigator as unknown as { connection?: { effectiveType?: string; type?: string; downlink?: number; rtt?: number } }).connection;

      const payload = {
        visitor_id: visitorId,
        session_id: sessionId,
        visited_at: new Date().toISOString(),

        // Geo & IP
        ip_address: geo.ip || null,
        country: geo.country_name || null,
        region: geo.region || null,
        city: geo.city || null,
        postal_code: geo.postal || null,
        latitude: geo.latitude || null,
        longitude: geo.longitude || null,
        timezone: geo.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
        isp: geo.org || null,

        // Navigation & Source
        current_url: window.location.href,
        pathname: window.location.pathname,
        referrer: document.referrer || 'direct',
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_term: urlParams.get('utm_term'),
        utm_content: urlParams.get('utm_content'),

        // Device, OS & Browser
        device_type: deviceType,
        os_name: osName,
        os_version: osVersion,
        browser_name: browserName,
        browser_version: browserVersion,
        user_agent: navigator.userAgent,
        language: navigator.language,
        languages: navigator.languages ? Array.from(navigator.languages) : [navigator.language],

        // Hardware & Display
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        device_pixel_ratio: window.devicePixelRatio || 1,
        color_depth: window.screen.colorDepth || 24,
        device_memory: (navigator as unknown as { deviceMemory?: number }).deviceMemory || null,
        hardware_concurrency: navigator.hardwareConcurrency || null,
        max_touch_points: navigator.maxTouchPoints || 0,

        // Network Quality
        connection_type: navConn?.type || null,
        effective_connection_type: navConn?.effectiveType || null,
        downlink: navConn?.downlink || null,
        rtt: navConn?.rtt || null,

        duration_seconds: 0,
        max_scroll_percentage: 0,

        raw_payload: {
          screen: {
            availWidth: window.screen.availWidth,
            availHeight: window.screen.availHeight,
            orientation: window.screen.orientation?.type
          },
          performance: {
            pageLoadTimeMs: Math.round(performance.now())
          },
          cookiesEnabled: navigator.cookieEnabled,
          doNotTrack: navigator.doNotTrack
        }
      };

      recordId = await sendToSupabase(payload);
    } catch (err) {
      console.debug('Failed to record initial telemetry:', err);
    }
  })();

  // Update duration and scroll percentage on exit / background
  const updateEngagement = () => {
    if (!recordId) return;
    const durationSeconds = Math.round((Date.now() - startTime) / 1000);

    // Use navigator.sendBeacon or PATCH
    const updatePayload = JSON.stringify({
      duration_seconds: durationSeconds,
      max_scroll_percentage: maxScrollPercentage
    });

    const updateUrl = `${SUPABASE_URL}/rest/v1/visitor_telemetry?id=eq.${recordId}`;

    fetch(updateUrl, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: updatePayload,
      keepalive: true
    }).catch(() => {});
  };

  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      updateEngagement();
    }
  });
  window.addEventListener('beforeunload', updateEngagement);
}
