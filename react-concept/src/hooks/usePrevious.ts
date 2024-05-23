import { useEffect, useRef } from "react"

export const usePrevious = (value: number) => {
    const ref = useRef<number>();
    console.log("new value", value);

    useEffect(() => {
        ref.current = value;
        console.log("updating in hook")
    }, [value]);

    console.log("after hook", ref.current)
    return ref.current;
}