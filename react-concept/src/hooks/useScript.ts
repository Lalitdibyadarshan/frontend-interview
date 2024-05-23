import { useEffect, useState } from "react";

export const useScript = (src: string) => {
    const [status, setStatus] = useState("idle");

   useEffect(() => {
        let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;

        const updateStatus = (e: Event) => {
            script.setAttribute("data-status", e.type);
            setStatus(e.type);
        }


        if (script) {
            setStatus(script.dataset["status"] as string);
        } else {
            script = document.createElement("script") as HTMLScriptElement;
            script.src = src;
            script.async = true;
    
            document.body.appendChild(script);

            script.addEventListener("load", updateStatus);
            script.addEventListener("error", updateStatus);
        }

        return () => {
            script.removeEventListener("load", updateStatus);
            script.removeEventListener("error", updateStatus);
        }
   }, []);

   return status;
}