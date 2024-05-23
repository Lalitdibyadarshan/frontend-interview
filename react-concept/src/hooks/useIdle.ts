import { useEffect, useRef, useState } from "react";

const activeEvents = ["mousemove", "mousedown", "pointermove", "touchstart", "keydown", "focus"];
const inactiveEvents = ["blur"];

export const useIdle = (delay: number) => {
    const [isIdle, setIsIdle] = useState(false);
    const timerId = useRef<NodeJS.Timeout>();

    const startTimer = () => {
        timerId.current = setTimeout(() => {
            setIsIdle(true);
        }, delay);
    }

    const resetTimer = () => {
        setIsIdle(false);
        clearTimeout(timerId.current);
        startTimer();
    }

    const notActive = () => {
        setIsIdle(true);
    }

    const setUp = () => {
        activeEvents.forEach(e => {
            window.addEventListener(e, resetTimer);
        });

        inactiveEvents.forEach(e => {
            window.addEventListener(e, notActive);
        });
    };

    const clear = () => {
        activeEvents.forEach(e => {
            window.removeEventListener(e, resetTimer);
        });

        inactiveEvents.forEach(e => {
            window.removeEventListener(e, notActive);
        });
    }

    useEffect(() => {
        setUp();

        return () => clear();
    }, [delay]);

    return isIdle;
}