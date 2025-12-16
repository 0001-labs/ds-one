// 2025-04-23-device.ts
// Device detection and context utilities

export type DeviceType = "mobile" | "tablet" | "desktop";

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchCapable: boolean;
  deviceType: DeviceType;
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
}

/**
 * Comprehensive mobile device detection
 * Combines user agent detection, touch capability, and viewport size
 */
export function detectMobileDevice(): boolean {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return false;
  }

  const nav = navigator as any;
  const win = window as any;
  const ua: string =
    (nav && (nav.userAgent || nav.vendor)) || (win && win.opera) || "";

  // User agent based detection
  const uaMatchesMobile =
    /Mobile|Android|iP(ad|hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)|Windows Phone|Phone|Tablet/i.test(
      ua
    );

  // Touch capability detection
  const touchPoints = (nav && nav.maxTouchPoints) || 0;
  const isTouchCapable = touchPoints > 1;

  // Viewport detection
  const narrowViewport = win
    ? Math.min(win.innerWidth || 0, win.innerHeight || 0) <= 820
    : false;

  return uaMatchesMobile || (isTouchCapable && narrowViewport);
}

/**
 * Get detailed device information
 */
export function getDeviceInfo(): DeviceInfo {
  const isMobile = detectMobileDevice();
  const nav = navigator as any;
  const win = window as any;

  const touchPoints = (nav && nav.maxTouchPoints) || 0;
  const isTouchCapable = touchPoints > 1;

  // Use clientWidth instead of innerWidth to exclude scrollbars
  const screenWidth =
    typeof document !== "undefined"
      ? document.documentElement.clientWidth
      : win?.innerWidth || 0;
  const screenHeight =
    typeof document !== "undefined"
      ? document.documentElement.clientHeight
      : win?.innerHeight || 0;
  const isTablet = isMobile && Math.min(screenWidth, screenHeight) >= 600;

  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile,
    isTouchCapable,
    deviceType: isMobile ? (isTablet ? "tablet" : "mobile") : "desktop",
    userAgent: (nav && (nav.userAgent || nav.vendor)) || "",
    screenWidth,
    screenHeight,
  };
}

/**
 * Initialize device detection and log to console
 */
export function initDeviceDetection(): DeviceInfo {
  const deviceInfo = getDeviceInfo();

  // Calculate and set scaling factor for mobile
  if (deviceInfo.isMobile && typeof document !== "undefined") {
    // Design width: 280px (14 columns × 20px)
    const designWidth = 280;
    const actualWidth = deviceInfo.screenWidth;
    const scalingFactor = actualWidth / designWidth;

    // Set CSS custom property for scaling on html element
    document.documentElement.style.setProperty(
      "--sf",
      scalingFactor.toFixed(3)
    );
    // Also set --sf for backwards compatibility
    document.documentElement.style.setProperty(
      "--sf",
      scalingFactor.toFixed(3)
    );

    // Add .mobile class to html element for CSS targeting
    document.documentElement.classList.add("mobile");
    document.documentElement.classList.remove("desktop");

    console.log(
      `[DS one] Mobile device detected - ${deviceInfo.deviceType} (${deviceInfo.screenWidth}x${deviceInfo.screenHeight}), scaling factor: ${scalingFactor.toFixed(2)}`
    );
  } else {
    // Desktop - no scaling
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty("--sf", "1");
      // Also set --sf for backwards compatibility
      document.documentElement.style.setProperty("--sf", "1");

      // Add .desktop class and remove .mobile class
      document.documentElement.classList.add("desktop");
      document.documentElement.classList.remove("mobile");
    }
    console.log(
      `[DS one] Desktop device detected (${deviceInfo.screenWidth}x${deviceInfo.screenHeight})`
    );
  }

  // Log additional details in development mode
  if (typeof window !== "undefined" && (window as any).DS_ONE_DEBUG) {
    console.log("[DS one] Device Info:", {
      type: deviceInfo.deviceType,
      isMobile: deviceInfo.isMobile,
      isTablet: deviceInfo.isTablet,
      isDesktop: deviceInfo.isDesktop,
      isTouchCapable: deviceInfo.isTouchCapable,
      viewport: `${deviceInfo.screenWidth}x${deviceInfo.screenHeight}`,
      userAgent: deviceInfo.userAgent,
    });
  }

  return deviceInfo;
}

// Auto-initialize when module loads
if (typeof window !== "undefined") {
  // Wait for DOM to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initDeviceDetection();
    });
  } else {
    // DOM is already ready
    initDeviceDetection();
  }

  // Recalculate on resize (debounced)
  let resizeTimeout: any;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      initDeviceDetection();
    }, 100);
  });
}

/**
 * Disable double-tap to zoom in the browser (app-like behavior)
 * Prevents all zoom gestures including double-tap and pinch-to-zoom
 */
export function applike(): void {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }

  // Set viewport meta tag to prevent zoom - this is the most important step
  let viewport = document.querySelector('meta[name="viewport"]');
  if (!viewport) {
    viewport = document.createElement("meta");
    viewport.setAttribute("name", "viewport");
    document.head.appendChild(viewport);
  }
  viewport.setAttribute(
    "content",
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
  );

  // Apply touch-action: pan-x pan-y globally to prevent zoom but allow panning
  const style = document.createElement("style");
  style.id = "ds-one-applike-style";
  style.textContent = `
    * {
      touch-action: pan-x pan-y !important;
      -ms-touch-action: pan-x pan-y !important;
    }
    html, body {
      touch-action: pan-x pan-y !important;
      -ms-touch-action: pan-x pan-y !important;
    }
  `;
  // Remove existing style if present
  const existingStyle = document.getElementById("ds-one-applike-style");
  if (existingStyle) {
    existingStyle.remove();
  }
  document.head.appendChild(style);

  // Track touch events to prevent double-tap zoom
  let lastTouchEnd = 0;
  let touchStartTime = 0;

  const preventZoom = (event: TouchEvent | WheelEvent | Event) => {
    // Prevent pinch zoom (two fingers)
    if (event instanceof TouchEvent) {
      if (event.touches.length > 1) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      const now = Date.now();

      if (event.type === "touchstart") {
        // If touchstart happens within 300ms of last touchend, it's likely a double-tap
        if (now - lastTouchEnd < 300) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        touchStartTime = now;
      } else if (event.type === "touchend") {
        const touchDuration = now - touchStartTime;
        // If this is a quick tap (< 300ms) and happened soon after previous touchend, prevent it
        if (touchDuration < 300 && now - lastTouchEnd < 300) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        lastTouchEnd = now;
      } else if (event.type === "touchmove") {
        // Prevent any touchmove that might trigger zoom
        if (event.touches.length > 1) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
      }
    }

    // Prevent wheel zoom with ctrl/cmd key (common on trackpads)
    if (event instanceof WheelEvent && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
  };

  // Use capture phase to catch events earlier
  const options = { passive: false, capture: true };

  // Prevent all zoom gestures - use capture phase
  document.addEventListener("touchstart", preventZoom, options);
  document.addEventListener("touchmove", preventZoom, options);
  document.addEventListener("touchend", preventZoom, options);
  document.addEventListener("touchcancel", preventZoom, options);

  // Prevent wheel zoom
  document.addEventListener("wheel", preventZoom, options);

  // Prevent gesture events (iOS Safari) - use capture phase
  document.addEventListener(
    "gesturestart",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
    },
    options
  );
  document.addEventListener(
    "gesturechange",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
    },
    options
  );
  document.addEventListener(
    "gestureend",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
    },
    options
  );
}
