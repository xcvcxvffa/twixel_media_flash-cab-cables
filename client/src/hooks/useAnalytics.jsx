import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return "Tablet";
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return "Mobile";
    return "Desktop";
};

const getBrowser = () => {
    const ua = navigator.userAgent;
    if (ua.indexOf("Firefox") > -1) return "Firefox";
    if (ua.indexOf("SamsungBrowser") > -1) return "Samsung Browser";
    if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) return "Opera";
    if (ua.indexOf("Trident") > -1) return "Internet Explorer";
    if (ua.indexOf("Edge") > -1 || ua.indexOf("Edg") > -1) return "Edge";
    if (ua.indexOf("Chrome") > -1) return "Chrome";
    if (ua.indexOf("Safari") > -1) return "Safari";
    return "Unknown";
};

// Simple random session ID generator (lives for the duration of the tab)
const getSessionId = () => {
    let sid = sessionStorage.getItem('analytics_session_id');
    if (!sid) {
        sid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem('analytics_session_id', sid);
    }
    return sid;
};

const useAnalytics = () => {
    const location = useLocation();
    const { settings } = useSettings();

    // Custom Analytics (Local tracking)
    useEffect(() => {
        const trackPageView = async () => {
            try {
                // Wait a tiny bit for the document.title to update if it's set by another hook
                setTimeout(async () => {
                    const payload = {
                        page_url: window.location.pathname,
                        page_title: document.title,
                        referrer: document.referrer,
                        device_type: getDeviceType(),
                        browser: getBrowser(),
                        session_id: getSessionId()
                    };

                    await fetch('/api/analytics/track', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });
                }, 500);
            } catch (error) {
                // Ignore tracking errors
                console.error("Analytics tracking failed:", error);
            }
        };

        trackPageView();
    }, [location.pathname]);
};

export default useAnalytics;
