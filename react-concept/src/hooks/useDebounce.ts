import { useCallback, useRef } from "react"

export const useDebounce = (fn: Function, delay: number) => {
    const timerId = useRef<NodeJS.Timeout>();

    const debounce = useCallback(function(...args: any[]) {
        clearTimeout(timerId.current);
        timerId.current = setTimeout(() => {
            // eslint-disable-next-line
            const context = this;
            fn.apply(context, args);
        }, delay) ;
    }, [delay]);
    
    return debounce;
}