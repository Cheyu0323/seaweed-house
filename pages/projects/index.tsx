import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Header from "../../components/Header";
import Title from "../../components/Title";
import Footer from "../../components/Footer";
import ScrolltopBtn from "../../components/ScrolltopBtn";
import caselist from "../../case-data.json";
import filterData from "../../filterData";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { websiteUrl } from "../../websiteUrl";
import gsap from "gsap";

type CaseList = {
    id: string;
    name: string;
    style: string;
    pattern: string;
    ping: string;
    info: string;
    act: string;
    img: Array<{
        id: number;
        title: string;
        name: string;
    }>;
};

type ItemProp = {
    item: CaseList;
};

const SwitchItem: React.FC = () => {
    const [nowIndex, setNowIndex] = useState(0);
    const [isPre, setIsPre] = useState<boolean>(false);
    const imageRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.timeline({ ease: "power4.out" })
                .set("#image", { transformOrigin: isPre ? "right" : "left" })
                .set("#info", { transformOrigin: isPre ? "right" : "left" })
                .fromTo(
                    "#image",
                    { scaleX: window.innerWidth > 768 ? 0 : 1, opacity: 0 },
                    { scaleX: 1, opacity: 1, duration: 0.5 },
                    isPre ? 0.1 : 0
                )
                .fromTo(
                    "#info",
                    { scaleX: window.innerWidth > 768 ? 0 : 1, opacity: 0 },
                    { scaleX: 1, opacity: 1, duration: 0.5 },
                    isPre ? 0 : 0.1
                );
        }, imageRef);

        return () => ctx.revert();
    }, [nowIndex]);

    const handleSwitchClick = (index: number) => {
        if (index === 4) {
            setNowIndex(0);
            return;
        }
        if (index < 0) {
            setNowIndex(4 - 1);
            return;
        }
        setNowIndex(index);
    };

    return (
        <section
            className="py-4 px-4 max-w-screen-xl m-auto relative md:pb-8 md:px-8 bg-white"
            ref={imageRef}
        >
            <div
                id="image"
                className="relative z-20 w-full pointer-events-none md:w-8/12"
            >
                <Image
                    className="object-cover w-full h-auto"
                    src={`${websiteUrl}/case/${caselist[nowIndex].id}/${caselist[nowIndex].img[0].name}`}
                    alt={caselist[nowIndex].img[0].title}
                    width="0"
                    height="0"
                    sizes="100vw"
                />
            </div>
            <div className="flex flex-col items-center md:absolute md:right-8 md:top-[22%] lg:top-[43%] md:items-start md:w-5/12 md:z-10">
                <div
                    id="info"
                    className="flex flex-col items-center w-full bg-lightgary md:items-start md:pl-32 lg:pl-44 md:pr-8 md:py-5"
                >
                    <div className=" text-xl pt-4 font-semibold tracking-widest my-1 md:text-2xl">
                        {caselist[nowIndex].name}
                    </div>
                    <div className="font-semibold text-base tracking-widest md:text-lg">
                        {caselist[nowIndex].style}
                        <span className=" text-secondary mx-1">|</span>
                        {caselist[nowIndex].pattern}
                        <span className=" text-secondary mx-1">|</span>
                        {caselist[nowIndex].ping}
                    </div>
                    <div className="mt-6 w-10/12 text-gray-500 leading-7 tracking-wider md:w-full md:mt-4 h-24 min-h-24 max-h-24 overflow-y-auto">
                        {caselist[nowIndex].info}
                    </div>
                    <div
                        className=" text-base font-semibold tracking-wide mt-4 cursor-pointer mb-2 md:text-lg"
                        onClick={() => {
                            router.push(`/projects/${caselist[nowIndex].id}`);
                        }}
                    >
                        READ MORE
                    </div>
                </div>
                <div className="flex bg-white w-full pt-3 justify-center md:absolute md:top-[-25%] md:right-4 md:bg-transparent md:w-auto">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="text-primary w-10 h-10 p-2 cursor-pointer duration-200 md:w-12 md:h-12"
                        onClick={() => {
                            handleSwitchClick(nowIndex - 1);
                            setIsPre(true);
                        }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="text-primary w-10 h-10 p-2 cursor-pointer duration-200 md:w-12 md:h-12"
                        onClick={() => {
                            handleSwitchClick(nowIndex + 1);
                            setIsPre(false);
                        }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                    </svg>
                </div>
            </div>
        </section>
    );
};

const Item: React.FC<ItemProp> = ({ item }) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.timeline({ ease: "power4.out" }).fromTo(
                itemRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0 }
            );
        }, itemRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            className="flex flex-col items-center group relative bg-white"
            ref={itemRef}
        >
            <div className="w-full relative overflow-hidden">
                <div className="w-full h-full z-[8] absolute top-0 left-0 bg-primary opacity-0 group-hover:opacity-60 duration-200 cursor-pointer"></div>
                <button
                    className="absolute z-[8] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border opacity-0 border-white rounded bg-transparent py-1 px-3 text-white duration-200 text-sm group-hover:opacity-100 hover:bg-accent"
                    onClick={() => {
                        router.push(`/projects/${item.id}`);
                    }}
                >
                    view
                </button>
                <Image
                    className="object-cover w-full h-auto duration-200 group-hover:scale-125"
                    src={`${websiteUrl}/case/${item.id}/${item.img[0].name}`}
                    alt={item.img[0].title}
                    width="0"
                    height="0"
                    sizes="100vw"
                />
            </div>
            <div className=" text-lg font-semibold text-primary tracking-widest my-1 duration-200 group-hover:text-accent">
                {item.name}
            </div>
            <div className="font-semibold text-sm tracking-widest text-primary">
                {item.style}
                <span className=" text-secondary mx-1">|</span>
                {item.pattern}
                <span className=" text-secondary mx-1">|</span>
                {item.ping}
            </div>
        </div>
    );
};

const Projects: React.FC = () => {
    const [page, setPage] = useState<number>(0);
    const [style, setStyle] = useState<string>("");
    const [pattern, setPattern] = useState<string>("");
    const [ping, setPing] = useState<string>("");

    const [filterCaseData, setFilterCaseData] =
        useState<Array<CaseList>>(caselist);

    useEffect(() => {
        setFilterCaseData(filterData({ style, pattern, ping }));
        setPage(0);
    }, [style, pattern, ping]);

    let output = [];
    for (let index = 0; index < Math.ceil(filterCaseData.length / 9); index++) {
        output.push(
            <div
                key={index}
                onClick={() => {
                    setPage(index);
                }}
                className={`w-8 h-8 mx-1 duration-200 hover:text-accent text-center leading-8 cursor-pointer ${
                    page === index
                        ? "border border-lightgary bg-primary text-white"
                        : "text-primary"
                }`}
            >
                {index + 1}
            </div>
        );
    }
    return (
        <div>
            <Head>
                <title>海草家居</title>
                <meta
                    name="description"
                    content="海草家居 | 系統櫃 | 板材 | 統包"
                />
                <link rel="icon" href={`${websiteUrl}/seawead.ico`} />
            </Head>
            <Header />
            <div className="pt-28 pb-4 px-8 sm:pt-16 flex flex-col items-center justify-center">
                <Title>實際案例</Title>
            </div>
            <SwitchItem />
            <section className="max-w-screen-xl m-auto relative md:pb-8 md:px-4  bg-white">
                <div className="p-4 flex items-center justify-start md:justify-start flex-wrap sticky top-28 md:top-14 py-3 z-[9] bg-white w-full">
                    <div className="flex flex-col w-6 h-4 justify-between items-center">
                        <span className="w-full h-1 border border-lightgary bg-lightgary rounded-lg"></span>
                        <span className="w-10/12 h-1 border border-lightgary bg-lightgary rounded-lg"></span>
                        <span className="w-6/12 h-1 border border-lightgary bg-lightgary rounded-lg"></span>
                    </div>
                    <div className=" relative">
                        <div className=" absolute pointer-events-none z-20 w-0 h-0 right-[20px] top-3 border-t-[11px] border-x-[8px] border-b-0 border-t-accent border-x-transparent border-b-transparent "></div>
                        <select
                            className="mx-2 px-2 py-1 border-primary border w-24 rounded appearance-none"
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                setStyle(e.target.value);
                            }}
                        >
                            <option value="default">風格</option>
                            <option value="北歐風">北歐風</option>
                            <option value="無印風">無印風</option>
                            <option value="工業風">工業風</option>
                        </select>
                    </div>
                    <div className=" relative">
                        <div className=" absolute pointer-events-none z-20 w-0 h-0 right-[20px] top-3 border-t-[11px] border-x-[8px] border-b-0 border-t-accent border-x-transparent border-b-transparent "></div>
                        <select
                            className="mx-2 px-2 py-1 border-primary border w-24 rounded appearance-none"
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                setPattern(e.target.value);
                            }}
                        >
                            <option value="default">格局</option>
                            <option value="1房">1房</option>
                            <option value="2房">2房</option>
                            <option value="3房">3房</option>
                            <option value="4房以上">4房以上</option>
                        </select>
                    </div>
                    <div className=" relative">
                        <div className=" absolute pointer-events-none z-20 w-0 h-0 right-[20px] top-3 border-t-[11px] border-x-[8px] border-b-0 border-t-accent border-x-transparent border-b-transparent "></div>
                        <select
                            className="mx-2 px-2 py-1 border-primary border w-28 rounded appearance-none"
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                setPing(e.target.value);
                            }}
                        >
                            <option value="default">坪數</option>
                            <option value="20坪以下">20坪以下</option>
                            <option value="20-30坪">20-30坪</option>
                            <option value="30-40坪">30-40坪</option>
                            <option value="40坪以上">40坪以上</option>
                        </select>
                    </div>
                </div>
                {filterCaseData.length !== 0 ? (
                    <div className="p-4 grid md:grid-cols-2 lg:grid-cols-3 my-5 gap-x-2 gap-y-5">
                        {filterCaseData
                            .slice(page * 9, (page + 1) * 9)
                            .map((item) => (
                                <Item key={item.id} item={item} />
                            ))}
                    </div>
                ) : (
                    <div className="p-4 my-5 text-center font-extrabold text-lg text-accent w-full">
                        無資料
                    </div>
                )}

                <div className="flex justify-center p-2">{output}</div>
            </section>
            <Footer />
            <ScrolltopBtn />
        </div>
    );
};

export default Projects;
