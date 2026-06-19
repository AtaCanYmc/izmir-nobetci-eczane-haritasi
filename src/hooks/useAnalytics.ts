import Plausible from 'plausible-tracker';
import { useEffect } from 'react';

// Plausible setup.
const plausible = Plausible({
    domain: 'izmirnobetcieczaneharitasi.live',
    trackLocalhost: true, // Enables tracking on localhost for testing
});

export const useAnalytics = () => {
    // Automatically track page views
    useEffect(() => {
        plausible.trackPageview();
    }, []);

    // Custom event tracking
    const trackEvent = (eventName: string, props?: Record<string, any>) => {
        plausible.trackEvent(eventName, { props });
    };

    return { trackEvent };
};
