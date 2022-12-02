import React, { useEffect, useState } from "react";

const ScrolltopBtn = () => {
    const [scrollTop, setScrollTop] = useState<boolean>(true);
    useEffect(() => {
        const onScroll = (e: Event) => {
            window.scrollY === 0 ? setScrollTop(true) : setScrollTop(false);
        };
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleScrolltop = () => {
        document.body.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div
            className={`fixed bottom-16 right-3 z-20 w-10 h-10 sm:w-14 sm:h-14 sm:right-10 p-5 rounded-full border border-secondary duration-200 cursor-pointer group hover:bg-primary hover:border-primary ${
                scrollTop ? "opacity-0" : "opacity-100"
            }`}
            onClick={handleScrolltop}
        >
            <svg
                version="1.1"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 fill-secondary sm:w-8 sm:h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
                <polyline points="256,101 105,252 256,101 407,252   " />
                <polyline points="256,260 105,411 256,260 407,411   " />
                <g>
                    <path d="M407,260c-2.048,0-4.095-0.781-5.657-2.343L256,112.314L110.657,257.657c-3.124,3.123-8.189,3.123-11.313,0     C97.781,256.095,97,254.047,97,252s0.781-4.095,2.343-5.657l151-151c3.125-3.124,8.19-3.123,11.314,0l151,151     c3.124,3.124,3.124,8.189,0,11.314C411.095,259.219,409.048,260,407,260z" />
                </g>
                <g>
                    <path d="M407,419c-2.048,0-4.095-0.781-5.657-2.343L256,271.313L110.657,416.657c-3.124,3.123-8.189,3.123-11.313,0     C97.781,415.095,97,413.048,97,411s0.781-4.095,2.343-5.657l151-151c3.125-3.124,8.19-3.124,11.314,0l151,151     c3.124,3.125,3.124,8.189,0,11.314C411.095,418.219,409.048,419,407,419z" />
                </g>
            </svg>
        </div>
    );
};

export default ScrolltopBtn;
