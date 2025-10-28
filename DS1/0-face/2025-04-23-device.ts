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

  const screenWidth = win?.innerWidth || 0;
  const screenHeight = win?.innerHeight || 0;
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

    // Set CSS custom property for scaling
    document.documentElement.style.setProperty(
      "--scaling-factor-mobile",
      scalingFactor.toFixed(3)
    );

    console.log(
      `[DS one] Mobile device detected - ${deviceInfo.deviceType} (${deviceInfo.screenWidth}x${deviceInfo.screenHeight}), scaling factor: ${scalingFactor.toFixed(2)}`
    );
  } else {
    // Desktop - no scaling
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty(
        "--scaling-factor-mobile",
        "1"
      );
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
}
