import { useState } from "react";

export function useResize() {
    const [mobileView, setMobileView] = useState(false);

    const setResponsiveness = () => {
        return window.innerWidth < 900
            ? setMobileView(true)
            : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

    //   return () => {
    //     window.removeEventListener("resize", () => setResponsiveness());
    //   };

    return mobileView
}