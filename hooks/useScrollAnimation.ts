import { useEffect, useRef } from 'react';

export function useScrollAnimation(options = {}) {
    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                // Remove and re-add the class to re-trigger animation
                entry.target.classList.remove('animate-in-view');
                // Trigger reflow to restart animation
                void (entry.target as HTMLElement).offsetWidth;
                entry.target.classList.add('animate-in-view');
            } else {
                // Remove class when not in view so animation can retrigger
                entry.target.classList.remove('animate-in-view');
            }
        }, {
            threshold: 0.1,
            ...options,
        });

        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [options]);

    return elementRef;
}
