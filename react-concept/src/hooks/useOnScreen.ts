import { useCallback, useEffect, useState } from "react";

export const useOnScreen = (el: HTMLElement) => {
    const [isOnScreen, setIsOnScreen] = useState(false);

    const observerCb: IntersectionObserverCallback = useCallback((entry) => {
        entry.forEach(e => {
            setIsOnScreen(e.isIntersecting);
        })
    }, [isOnScreen]);

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver(observerCb, {
            root: null, 
            rootMargin: "0px",
            threshold: 0.1
        });

        intersectionObserver.observe(el);

        return () => intersectionObserver.disconnect();
    }, [el]);

    return isOnScreen;
}