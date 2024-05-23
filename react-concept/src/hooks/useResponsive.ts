import { useEffect, useState } from "react"
import { useDebounce } from "./useDebounce";

export const useResponsive = () => {
    const [screen, setScreen] = useState({
        isMobile: false,
        isDesktop: false,
        isTablet: false
    });

    const handleResize = useDebounce(() => {
        setScreen({
            isMobile: window.innerWidth < 768,
            isTablet: window.innerWidth > 768 && window.innerWidth < 960,
            isDesktop: window.innerWidth > 960
        })
    }, 200);

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    return screen;
}