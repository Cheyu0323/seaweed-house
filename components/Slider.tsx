import Image from "next/image";
import React, { useState, useEffect } from "react";
import customLoader from "../ts/customLoader"
import caselist from "../data/case.json";
import websiteUrl from "../ts/websiteUrl";

const Slider = () => {
    const [nowIndex, setNowIndex] = useState<number>(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setNowIndex((prevIndex) =>
                prevIndex === 6 ? (prevIndex = 0) : prevIndex + 1
            );
        }, 8000);
        return () => clearInterval(intervalId);
    }, []);

    const handleSlideClick = (index: number) => {
        if (index === 7) {
            setNowIndex(0);
            return;
        }
        if (index < 0) {
            setNowIndex(7 - 1);
            return;
        }
        setNowIndex(index);
    };

    return (
        <section className="w-full h-screen group overflow-hidden relative select-none">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="absolute left-3 top-2/4 text-primary w-10 h-10 p-2 z-10 sm:w-16 sm:h-16 sm:p-4 sm:left-6 border-primary border-solid border rounded-full cursor-pointer duration-200 hover:text-black hover:border-black sm:opacity-0 group-hover:opacity-100"
                onClick={() => {
                    handleSlideClick(nowIndex - 1);
                }}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                />
            </svg>
            {caselist.slice(0, 7).map((item, index) => {
                return (
                    <Image
                        key={item.id}
                        className={` object-cover transition-opacity ease-in-out duration-700 w-full h-full ${
                            index === nowIndex ? "opacity-1" : "opacity-0"
                        } `}
                        src={`${websiteUrl}/case/${item.id}/${item.img[0].name}`}
                        alt={item.img[0].title}
                        fill
                        loader={customLoader}
                        placeholder="blur"
                        blurDataURL={`${item.img[0].blurURL}`}
                    />
                );
            })}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="absolute right-3 top-2/4 text-primary w-10 h-10 p-2 z-10 sm:w-16 sm:h-16 sm:p-4 sm:right-6 border-primary border-solid border rounded-full cursor-pointer duration-200 hover:text-black hover:border-black sm:opacity-0 group-hover:opacity-100"
                onClick={() => {
                    handleSlideClick(nowIndex + 1);
                }}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
            </svg>
            <div className="flex absolute bottom-2 w-full justify-center">
                {caselist.slice(0, 7).map((item, index) => {
                    return (
                        <span
                            key={"dot-" + item.id}
                            onClick={() => handleSlideClick(index)}
                            className={`w-[8px] h-[8px] m-0.5 shadow-sm rounded-full cursor-pointer ${
                                index === nowIndex
                                    ? "bg-primary"
                                    : "bg-secondary"
                            }`}
                        ></span>
                    );
                })}
            </div>
        </section>
    );
};

export default Slider;
