import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Slider from "../components/Slider";
import Title from "../components/Title";
import caselist from "../data/case.json";
import filterData from "../ts/filterData";
import websiteUrl from "../ts/websiteUrl";
import customLoader from "../ts/customLoader"
import gsap from "gsap";
import { useState, useEffect, useRef } from "react";

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
        blurURL: string;
    }>;
};

type ItemProp = {
    item: CaseList;
};

const Item: React.FC<ItemProp> = ({ item }) => {
    const router = useRouter();
    const itemRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.timeline({ ease: "power4.out" }).fromTo(
                itemRef.current,
                { opacity: 0 },
                { opacity: 1 }
            );
        }, itemRef);

        return () => ctx.revert();
    }, []);
    return (
        <div className="relative group overflow-hidden" ref={itemRef}>
            <div className="w-full h-full absolute top-0 left-0 z-10 cursor-pointer duration-200 bg-primary opacity-0 group-hover:opacity-60"></div>
            <div className="w-full h-full absolute top-0 left-0 z-10 cursor-pointer duration-200 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100">
                <span className="text-white text-xl font-light tracking-wider mb-5">
                    {item.name}
                </span>
                <button
                    className="border border-white rounded bg-transparent py-1 px-3 text-white duration-200 text-sm hover:bg-accent"
                    onClick={() => {
                        router.push(`/projects/${item.id}`);
                    }}
                >
                    view
                </button>
            </div>
            <Image
                className="object-cover scale-110 duration-200 group-hover:scale-125 w-full h-auto"
                src={`${websiteUrl}/case/${item.id}/${item.img[0].name}`}
                alt={item.img[0].title}
                width="0"
                height="0"
                sizes="100vw"
                placeholder="blur"
                blurDataURL={`${item.img[0].blurURL}`}
                loader={customLoader}
            />
        </div>
    );
};

const Home: React.FC = () => {
    enum ProjectState {
        "all" = "",
        "nordic" = "北歐風",
        "muji" = "無印風",
        "industry" = "工業風",
    }
    const [projectState, setProjectState] = useState<string>(ProjectState.all);
    const router = useRouter();
    const [filterCaseData, setFilterCaseData] =
        useState<Array<CaseList>>(caselist);
    useEffect(() => {
        setFilterCaseData(filterData({ style: projectState }));
    }, [projectState]);

    const handleChangeProjectState = (type: string) => {
        setProjectState(type);
    };

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
            <Slider />
            <section
                id="about"
                className="pt-10 pb-12 px-8 flex flex-col items-center justify-center bg-white"
            >
                <Title>關於海草</Title>
                <div className="w-20 sm:w-24 my-5">
                    <Image
                        src={`${websiteUrl}/seawead.png`}
                        alt="海草家居 Logo"
                        width={154}
                        height={51}
                        loader={customLoader}
                    />
                </div>
                <div className="text-center text-sm sm:text-base text-primary tracking-wide font-bold my-2 max-w-[550px]">
                    海草有專業的空間規劃師，依照個人喜好與生活習慣，創造室內坪效收納機能，呈現屬於自己「家」的理想，打造乾淨俐落不只為外型美觀，
                    更蘊藏著巧思收納的空間。<br></br>
                    <br></br>
                    以「海」為本，採用歐洲環保建材作為板材，視環境保護為己任，從自然資源永續利用的精神概念出發。
                    <br></br>
                    以「草」為重，致力於滿足顧客需求，您的滿意是我們成長的動力，務必讓您用得安心、深得你心!
                </div>
            </section>
            <section className="pt-10 pb-12 flex flex-col justify-center items-center bg-white">
                <Title>實際案例</Title>
                <div className="flex">
                    <span
                        className={`cursor-pointer mb-3 mx-3 duration-200 ${
                            projectState === ProjectState.all
                                ? "text-accent "
                                : "text-primary"
                        }`}
                        onClick={() => {
                            handleChangeProjectState(ProjectState.all);
                        }}
                    >
                        ALL
                    </span>
                    <span
                        className={`cursor-pointer mb-3 mx-3 duration-200 ${
                            projectState === ProjectState.nordic
                                ? "text-accent"
                                : "text-primary"
                        }`}
                        onClick={() => {
                            handleChangeProjectState(ProjectState.nordic);
                        }}
                    >
                        北歐風
                    </span>
                    <span
                        className={`cursor-pointer mb-3 mx-3 duration-200 ${
                            projectState === ProjectState.muji
                                ? "text-accent"
                                : "text-primary"
                        }`}
                        onClick={() => {
                            handleChangeProjectState(ProjectState.muji);
                        }}
                    >
                        無印風
                    </span>
                    <span
                        className={`cursor-pointer mb-3 mx-3 duration-200 ${
                            projectState === ProjectState.industry
                                ? "text-accent"
                                : "text-primary"
                        }`}
                        onClick={() => {
                            handleChangeProjectState(ProjectState.industry);
                        }}
                    >
                        工業風
                    </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:auto-rows-max md:grid-cols-4">
                    {filterCaseData.slice(0, 8).map((item) => (
                        <Item key={item.id} item={item} />
                    ))}
                </div>
                <button
                    className="my-5 border border-black rounded py-2 px-5 text-center text-sm duration-200 hover:border-white hover:bg-accent hover:text-white text-black"
                    onClick={() => {
                        router.push(`/projects/`);
                    }}
                >
                    SHOW MORE
                </button>
            </section>
            <section id="service" className="pt-10 pb-12 px-8 bg-white">
                <Title>服務流程</Title>
                <div className="relative flex flex-col py-4 m-auto items-start sm:w-5/6 md:w-full md:flex-row max-w-screen-xl">
                    <div className="absolute top-0 left-9 border border-dashed border-secondary bg-secondary/40 h-full w-0 md:h-0 md:w-full md:top-16 md:left-0"></div>
                    <div className="flex items-center mx-1 flex-1 md:flex-col">
                        <div className="relative border border-primary bg-white rounded-full w-16 h-16 md:w-24 md:h-24 group duration-200 hover:bg-accent hover:border-white">
                            <div className=" w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <svg
                                    viewBox="0 0 37 37"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="duration-200 fill-primary group-hover:fill-white"
                                >
                                    <path d="M18.4998 6.9375C10.7915 6.9375 4.20859 11.7321 1.5415 18.5C4.20859 25.2679 10.7915 30.0625 18.4998 30.0625C26.2082 30.0625 32.7911 25.2679 35.4582 18.5C32.7911 11.7321 26.2082 6.9375 18.4998 6.9375ZM18.4998 26.2083C14.2448 26.2083 10.7915 22.755 10.7915 18.5C10.7915 14.245 14.2448 10.7917 18.4998 10.7917C22.7548 10.7917 26.2082 14.245 26.2082 18.5C26.2082 22.755 22.7548 26.2083 18.4998 26.2083ZM18.4998 13.875C15.9407 13.875 13.8748 15.9408 13.8748 18.5C13.8748 21.0592 15.9407 23.125 18.4998 23.125C21.059 23.125 23.1248 21.0592 23.1248 18.5C23.1248 15.9408 21.059 13.875 18.4998 13.875Z" />
                                    <defs>
                                        <clipPath id="clip0_11_166">
                                            <rect width="37" height="37" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                        <div className="p-5 w-[calc(100%-4rem)] md:text-center md:p-4 md:w-full text-primary">
                            <div className="font-bold tracking-wider md:my-1 md:text-lg">
                                參訪及諮詢
                            </div>
                            <div className="text-xs tracking-wider sm:text-sm font-primary md:text-base">
                                讓您看的到摸的到系統櫃產品及五金
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center mx-1 flex-1 md:flex-col">
                        <div className="relative border bg-white  border-primary rounded-full w-16 h-16 md:w-24 md:h-24 group duration-200 hover:bg-accent hover:border-white">
                            <div className=" w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <svg
                                    viewBox="0 0 37 37"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="duration-200 fill-primary group-hover:fill-white"
                                >
                                    <g>
                                        <path d="M25.0367 17.7445L27.4571 15.3241L21.6758 9.54288L19.2554 11.9633L12.8729 5.59621C11.6704 4.39371 9.7125 4.39371 8.51 5.59621L5.58083 8.52538C4.37833 9.72788 4.37833 11.6858 5.58083 12.8883L11.9479 19.2554L4.625 26.5937V32.375H10.4062L17.7446 25.0366L24.1117 31.4037C25.5763 32.8683 27.5496 32.3287 28.4746 31.4037L31.4038 28.4745C32.6063 27.272 32.6063 25.3141 31.4038 24.1116L25.0367 17.7445ZM14.1525 17.0662L7.77 10.6991L10.6837 7.76996L12.6417 9.72788L10.8225 11.5625L12.9963 13.7362L14.8308 11.9016L17.0662 14.137L14.1525 17.0662ZM26.3008 29.23L19.9338 22.8629L22.8629 19.9337L25.0983 22.1691L23.2638 24.0037L25.4375 26.1775L27.2721 24.3429L29.23 26.3008L26.3008 29.23Z" />
                                        <path d="M31.9277 10.8533C32.5289 10.2521 32.5289 9.28083 31.9277 8.67958L28.3202 5.07208C27.5956 4.3475 26.5935 4.625 26.1464 5.07208L23.3252 7.89333L29.1064 13.6746L31.9277 10.8533Z" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_11_177">
                                            <rect width="37" height="37" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                        <div className="p-5 w-[calc(100%-4rem)] md:text-center md:p-4 md:w-full text-primary">
                            <div className="font-bold tracking-wider md:my-1 md:text-lg">
                                實地丈量
                            </div>
                            <div className="text-xs tracking-wider sm:text-sm font-primary md:text-base">
                                由專業人員丈量現場併了解您的需求
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center mx-1 flex-1 md:flex-col">
                        <div className="relative border bg-white  border-primary rounded-full w-16 h-16 md:w-24 md:h-24 group duration-200 hover:bg-accent hover:border-white">
                            <div className=" w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <svg
                                    version="1.1"
                                    viewBox="-0.5 0.5 42 42"
                                    className="duration-200 fill-primary group-hover:fill-white"
                                >
                                    <g>
                                        <path
                                            d="M19.57,29.24L23.33,33c0,0,15.8-15.769,15.79-15.779c1.851-1.859,1.83-2.68,0-4.51c0.01-0.02-1.511-1.51-1.511-1.51
		L19.57,29.24z M17.86,27.529L35.9,9.491l-3.551-3.55L14.31,23.98L17.86,27.529z M30.85,4.441l-1.5-1.5
		c-1.91-1.91-2.59-1.931-4.51,0L9.05,18.721l3.76,3.76L30.85,4.441z M7.55,20.221L0.5,41.5l21.33-7L7.55,20.221z M6.05,30.859
		l5.26,5.262l-7.61,2.26L6.05,30.859z"
                                        />
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div className="p-5 w-[calc(100%-4rem)] md:text-center md:p-4 md:w-full text-primary">
                            <div className="font-bold tracking-wider md:my-1 md:text-lg">
                                設計報價
                            </div>
                            <div className="text-xs tracking-wider sm:text-sm font-primary md:text-base">
                                由您主導生活所需以及動線，依照規劃給予報價
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center mx-1 flex-1 md:flex-col">
                        <div className="relative border bg-white  border-primary rounded-full w-16 h-16 md:w-24 md:h-24 group duration-200 hover:bg-accent hover:border-white">
                            <div className=" w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <svg
                                    viewBox="-64 0 512 512"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="duration-200 fill-primary group-hover:fill-white"
                                >
                                    <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zM64 72c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8V72zm0 64c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8v-16zm192.81 248H304c8.84 0 16 7.16 16 16s-7.16 16-16 16h-47.19c-16.45 0-31.27-9.14-38.64-23.86-2.95-5.92-8.09-6.52-10.17-6.52s-7.22.59-10.02 6.19l-7.67 15.34a15.986 15.986 0 0 1-14.31 8.84c-.38 0-.75-.02-1.14-.05-6.45-.45-12-4.75-14.03-10.89L144 354.59l-10.61 31.88c-5.89 17.66-22.38 29.53-41 29.53H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h12.39c4.83 0 9.11-3.08 10.64-7.66l18.19-54.64c3.3-9.81 12.44-16.41 22.78-16.41s19.48 6.59 22.77 16.41l13.88 41.64c19.77-16.19 54.05-9.7 66 14.16 2.02 4.06 5.96 6.5 10.16 6.5zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z" />
                                </svg>
                            </div>
                        </div>
                        <div className="p-5 w-[calc(100%-4rem)] md:text-center md:p-4 md:w-full text-primary">
                            <div className="font-bold tracking-wider md:my-1 md:text-lg">
                                合約簽訂
                            </div>
                            <div className="text-xs tracking-wider sm:text-sm font-primary md:text-base">
                                建立起家的藍圖，為重視以及保障雙方權益，將進行簽訂合約
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center mx-1 flex-1 md:flex-col">
                        <div className="relative border bg-white  border-primary rounded-full w-16 h-16 md:w-24 md:h-24 group duration-200 hover:bg-accent hover:border-white">
                            <div className=" w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <svg
                                    viewBox="0 0 37 37"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="duration-200 fill-primary group-hover:fill-white"
                                >
                                    <g>
                                        <path d="M29.5076 19.9491C29.5693 19.4866 29.6001 19.0087 29.6001 18.5C29.6001 18.0066 29.5693 17.5133 29.4922 17.0508L32.6218 14.615C32.8993 14.3991 32.9763 13.9829 32.8068 13.6745L29.8468 8.5562C29.6618 8.21703 29.2763 8.10912 28.9372 8.21703L25.2526 9.69703C24.4818 9.1112 23.6647 8.61787 22.7551 8.24787L22.2001 4.33203C22.1384 3.96203 21.8301 3.69995 21.4601 3.69995H15.5401C15.1701 3.69995 14.8772 3.96203 14.8155 4.33203L14.2605 8.24787C13.3509 8.61787 12.5184 9.12662 11.763 9.69703L8.07842 8.21703C7.73925 8.0937 7.35384 8.21703 7.16884 8.5562L4.22425 13.6745C4.03925 13.9983 4.10092 14.3991 4.40925 14.615L7.53884 17.0508C7.46175 17.5133 7.40009 18.022 7.40009 18.5C7.40009 18.9779 7.43092 19.4866 7.508 19.9491L4.37842 22.385C4.10092 22.6008 4.02384 23.017 4.19342 23.3254L7.15342 28.4437C7.33842 28.7829 7.72384 28.8908 8.063 28.7829L11.7476 27.3029C12.5184 27.8887 13.3355 28.382 14.2451 28.752L14.8001 32.6679C14.8772 33.0379 15.1701 33.3 15.5401 33.3H21.4601C21.8301 33.3 22.1384 33.0379 22.1847 32.6679L22.7397 28.752C23.6493 28.382 24.4818 27.8887 25.2372 27.3029L28.9218 28.7829C29.2609 28.9062 29.6463 28.7829 29.8313 28.4437L32.7913 23.3254C32.9763 22.9862 32.8993 22.6008 32.6063 22.385L29.5076 19.9491ZM18.5001 24.05C15.4476 24.05 12.9501 21.5525 12.9501 18.5C12.9501 15.4475 15.4476 12.95 18.5001 12.95C21.5526 12.95 24.0501 15.4475 24.0501 18.5C24.0501 21.5525 21.5526 24.05 18.5001 24.05Z" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_11_213">
                                            <rect width="37" height="37" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                        <div className="p-5 w-[calc(100%-4rem)] md:text-center md:p-4 md:w-full text-primary">
                            <div className="font-bold tracking-wider md:my-1 md:text-lg">
                                工程執行
                            </div>
                            <div className="text-xs tracking-wider sm:text-sm font-primary md:text-base">
                                排定施工進度、進場施工，全程現場監工並回報進度
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center mx-1 flex-1 md:flex-col">
                        <div className="relative border bg-white  border-primary rounded-full w-16 h-16 md:w-24 md:h-24 group duration-200 hover:bg-accent hover:border-white">
                            <div className=" w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <svg
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="710.081 796 200 200"
                                    className="duration-200 fill-primary group-hover:fill-white"
                                >
                                    <g>
                                        <path
                                            d="M757.859,883.623h-31.521c-3.31,0-5.995,2.685-5.995,5.996v100.385c0,3.312,2.685,5.996,5.995,5.996h25.424
		c3.259,0,5.921-2.604,5.995-5.863l0.102-4.605V883.623L757.859,883.623z"
                                        />
                                        <path
                                            d="M874.249,868.261c-15.132,0-40.775,0-40.775,0s1.458-7.302,5.521-39.328C842.448,801.717,823.446,796,811.168,796
		l-41.794,99.999v87.216l21.422,5.784c9.838,2.656,19.988,4.004,30.179,4.004h29.067c11.352,0,21.403-7.374,24.826-18.197
		c9.536-30.143,19.473-61.532,23.368-73.899C904.884,879.802,889.386,868.261,874.249,868.261z"
                                        />
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div className="p-5 w-[calc(100%-4rem)] md:text-center md:p-4 md:w-full text-primary">
                            <div className="font-bold tracking-wider md:my-1 md:text-lg">
                                品質保固
                            </div>
                            <div className="text-xs tracking-wider sm:text-sm font-primary md:text-base">
                                海草提供板材5年、五金1年保固、安裝1年保固
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="building" className="pt-10 pb-12 px-8 bg-white">
                <Title>五星建材</Title>
                <div className="flex flex-col-reverse m-auto sm:flex-row max-w-screen-lg">
                    <div className="relative w-full sm:w-2/3  h-auto">
                        <Image
                            className="object-cover w-11/12 h-auto"
                            src={`${websiteUrl}/case/case11/01.jpg`}
                            alt="實際案例照片"
                            width="0"
                            height="0"
                            sizes="100vw"
                            loader={customLoader}
                        />
                        <button className="absolute bottom-2 right-0 bg-accent font-thin tracking-wider px-5 py-3 text-white text-sm sm:text-base duration-200 hover:text-black" onClick={() => {router.push(`/introduction/`)}}>
                            READ MORE
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-y-6 items-center justify-center my-3 w-full sm:w-1/3 sm:my-0 sm:ml-5 md:ml-8">
                        <div>
                            <div className="inline-block group">
                                <div className="w-10 h-10 md:w-12 md:h-12">
                                    <svg
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 55.867 55.867"
                                        className="fill-primary"
                                    >
                                        <path
                                            d="M55.818,21.578c-0.118-0.362-0.431-0.626-0.808-0.681L36.92,18.268L28.83,1.876c-0.168-0.342-0.516-0.558-0.896-0.558
	s-0.729,0.216-0.896,0.558l-8.091,16.393l-18.09,2.629c-0.377,0.055-0.689,0.318-0.808,0.681c-0.117,0.361-0.02,0.759,0.253,1.024
	l13.091,12.76l-3.091,18.018c-0.064,0.375,0.09,0.754,0.397,0.978c0.309,0.226,0.718,0.255,1.053,0.076l16.182-8.506l16.18,8.506
	c0.146,0.077,0.307,0.115,0.466,0.115c0.207,0,0.413-0.064,0.588-0.191c0.308-0.224,0.462-0.603,0.397-0.978l-3.09-18.017
	l13.091-12.761C55.838,22.336,55.936,21.939,55.818,21.578z"
                                        />
                                    </svg>
                                </div>
                                <div className="relative text-primary tracking-wider my-1 font-medium cursor-default md:text-lg">
                                    <span className="relative z-10">
                                        精選板材
                                    </span>
                                    <span className="absolute z-[9] bottom-0 right-[-3px] bg-accent rounded-full w-3 h-3 duration-200 opacity-0 group-hover:opacity-100"></span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="inline-block group">
                                <div className="w-10 h-10 md:w-12 md:h-12">
                                    <svg
                                        viewBox="0 0 128 128"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="fill-primary"
                                    >
                                        <circle cx="64" cy="49.64" r="20.55" />
                                        <path d="M112.34,47.82a8.26,8.26,0,0,0-1.69-11.73l-3.5-2.54a8.26,8.26,0,0,1-3.38-7.4l.37-4.31a8.26,8.26,0,0,0-7.76-9l-4.32-.24a8.26,8.26,0,0,1-6.84-4.4l-2-3.83A8.26,8.26,0,0,0,71.83,1.07L68.07,3.2a8.26,8.26,0,0,1-8.14,0L56.17,1.07A8.26,8.26,0,0,0,44.79,4.41l-2,3.83a8.26,8.26,0,0,1-6.84,4.4l-4.32.24a8.26,8.26,0,0,0-7.76,9l.37,4.31a8.26,8.26,0,0,1-3.38,7.4l-3.5,2.54a8.26,8.26,0,0,0-1.69,11.73l2.64,3.42a8.26,8.26,0,0,1,1.16,8.05l-1.57,4a8.26,8.26,0,0,0,4.92,10.78l4.07,1.45a8.26,8.26,0,0,1,5.33,6.15L33,85.51,22.61,119.28l16.48-5.16L49.35,128l9.37-30.63a8.26,8.26,0,0,0,10.07.37L78.65,128l10.26-13.88,16.48,5.16L94.75,86.64c.07-.23.13-.45.18-.69l.85-4.24a8.26,8.26,0,0,1,5.33-6.15l4.07-1.45a8.26,8.26,0,0,0,4.92-10.78l-1.57-4a8.26,8.26,0,0,1,1.16-8.05ZM35.45,49.64A28.55,28.55,0,1,1,64,78.19,28.58,28.58,0,0,1,35.45,49.64Z" />
                                    </svg>
                                </div>
                                <div className="relative text-primary tracking-wider my-1 font-medium cursor-default md:text-lg">
                                    <span className="relative z-10">
                                        名牌五金
                                    </span>
                                    <span className="absolute z-[9] bottom-0 right-[-3px] bg-accent rounded-full w-3 h-3 duration-200 opacity-0 group-hover:opacity-100"></span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="inline-block group">
                                <div className="w-10 h-10 md:w-12 md:h-12">
                                    <svg
                                        viewBox="0 0 512 512"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="fill-primary"
                                    >
                                        <path d="M457.074 148.048V147.698C456.874 143.158 456.734 138.368 456.654 133.028C456.405 120.422 451.41 108.374 442.666 99.29C433.921 90.2063 422.072 84.7562 409.484 84.0283C355.074 81.0283 313.054 63.3083 277.104 28.3383L276.804 28.0383C271.206 22.87 263.867 20 256.249 20C248.63 20 241.291 22.87 235.694 28.0383L235.384 28.3383C199.484 63.3383 157.384 80.9983 103.064 84.0283C90.4702 84.7401 78.6116 90.1853 69.8638 99.2724C61.1161 108.359 56.1258 120.417 55.8936 133.028C55.8136 138.328 55.6737 143.168 55.4737 147.698V148.538C54.4137 203.858 53.1039 272.758 76.1739 335.268C88.8639 369.638 108.074 399.528 133.284 424.088C161.994 452.088 199.594 474.268 244.994 490.088C246.503 490.61 248.047 491.028 249.614 491.338C255.586 492.526 261.767 492.091 267.514 490.078C312.914 474.238 350.514 452.018 379.154 424.078C404.344 399.498 423.564 369.608 436.254 335.228C459.404 272.498 458.094 203.488 457.074 148.048ZM362.364 204.988C361.784 210.824 359.196 216.277 355.044 220.418L343.124 232.328L236.754 338.498C235.193 340.047 233.442 341.391 231.544 342.498C226.695 345.317 221.05 346.454 215.488 345.73C209.927 345.007 204.76 342.464 200.794 338.498L155.554 293.328C153.13 290.983 151.197 288.178 149.869 285.077C148.54 281.977 147.842 278.643 147.815 275.27C147.788 271.897 148.434 268.552 149.713 265.431C150.992 262.31 152.88 259.475 155.267 257.091C157.653 254.707 160.49 252.822 163.613 251.547C166.735 250.271 170.081 249.629 173.454 249.66C176.827 249.69 180.16 250.392 183.259 251.724C186.358 253.056 189.161 254.992 191.504 257.418L205.184 271.058C208.787 274.656 213.671 276.677 218.764 276.677C223.856 276.677 228.74 274.656 232.344 271.058V271.058L315.344 188.178L319.044 184.448C322.75 180.742 327.512 178.273 332.676 177.377C337.84 176.482 343.155 177.205 347.892 179.448C352.63 181.69 356.558 185.342 359.14 189.903C361.721 194.465 362.83 199.713 362.314 204.928L362.364 204.988Z" />
                                    </svg>
                                </div>
                                <div className="relative text-primary tracking-wider my-1 font-medium cursor-default md:text-lg">
                                    <span className="relative z-10">
                                        安全認證
                                    </span>
                                    <span className="absolute z-[9] bottom-0 right-[-3px] bg-accent rounded-full w-3 h-3 duration-200 opacity-0 group-hover:opacity-100"></span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="inline-block group">
                                <div className="w-10 h-10 md:w-12 md:h-12">
                                    <svg
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="710.081 796 200 200"
                                        className="fill-primary"
                                    >
                                        <g>
                                            <path
                                                d="M757.859,883.623h-31.521c-3.31,0-5.995,2.685-5.995,5.996v100.385c0,3.312,2.685,5.996,5.995,5.996h25.424
		c3.259,0,5.921-2.604,5.995-5.863l0.102-4.605V883.623L757.859,883.623z"
                                            />
                                            <path
                                                d="M874.249,868.261c-15.132,0-40.775,0-40.775,0s1.458-7.302,5.521-39.328C842.448,801.717,823.446,796,811.168,796
		l-41.794,99.999v87.216l21.422,5.784c9.838,2.656,19.988,4.004,30.179,4.004h29.067c11.352,0,21.403-7.374,24.826-18.197
		c9.536-30.143,19.473-61.532,23.368-73.899C904.884,879.802,889.386,868.261,874.249,868.261z"
                                            />
                                        </g>
                                    </svg>
                                </div>
                                <div className="relative text-primary tracking-wider my-1 font-medium cursor-default md:text-lg">
                                    <span className="relative z-10">
                                        完整保固
                                    </span>
                                    <span className="absolute z-[9] bottom-0 right-[-3px] bg-accent rounded-full w-3 h-3 duration-200 opacity-0 group-hover:opacity-100"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="contact" className="pt-10 pb-12 bg-white">
                <Title>聯絡我們</Title>
                <div className="m-auto max-w-md p-8 text-primary">
                    <div className="text-lg font-bold">海草家居</div>
                    <div>電話: 0000000000</div>
                    <div>地址: 110台北市信義區信義路五段7號89樓</div>
                </div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28920.064276558533!2d121.52969967910154!3d25.0338014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb6e9d93249%3A0xd508f7b3aa02d931!2z5Y-w5YyXMTAx6KeA5pmv5Y-wIFRhaXBlaSAxMDEgb2JzZXJ2YXRvcnk!5e0!3m2!1szh-TW!2stw!4v1669962699030!5m2!1szh-TW!2stw"
                    className="w-full h-[500px]"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </section>
        </div>
    );
};

export default Home;
