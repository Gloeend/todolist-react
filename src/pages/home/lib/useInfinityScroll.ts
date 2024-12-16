import {useEffect} from "react";
import {TPromiseFunction} from "@shared/lib/_common.types.ts";

export const useInfinityScroll = (onReachEnd: TPromiseFunction<void>, offset = 100) => {
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.offsetHeight;

            if (scrollTop + windowHeight >= docHeight - offset) {
                void onReachEnd();
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [onReachEnd, offset]);
};