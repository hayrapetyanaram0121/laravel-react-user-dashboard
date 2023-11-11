import React, { useEffect, useRef } from 'react';

const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'visibilitychange'];
const countdown = 300;

export const useInactivityTracker = (fiveMinAction = () => {} , tenMinAction = () => {}) => {
    const fiveMinTimeoutRef = useRef(null);
    const tenMinTimeoutRef = useRef(null);

    useEffect(() => {
        const setCountdown = () => {
            if (fiveMinTimeoutRef.current) {
                clearTimeout(fiveMinTimeoutRef.current);

                if (tenMinTimeoutRef.current) {
                    clearTimeout(tenMinTimeoutRef.current);
                }
            }

            fiveMinTimeoutRef.current = setTimeout(() => {
                fiveMinAction();
                tenMinTimeoutRef.current = setTimeout(() => {
                    tenMinAction();
                }, 2 * countdown * 1000);
            }, countdown * 1000);
        }

        const resetCountdown = () => {
            setCountdown(); // Reset countdown to 5 minutes
        };

        const handleUserActivity = () => {
            resetCountdown();
        };

        for (let event of events) {
            document.addEventListener(event, handleUserActivity);
        }

        if (!fiveMinTimeoutRef.current) {
            setCountdown();
        }

        return () => {
            clearTimeout(fiveMinTimeoutRef.current);
            clearTimeout(tenMinTimeoutRef.current);
            for (let event of events) {
                document.removeEventListener(event, handleUserActivity);
            }
        }
    }, []); 
}