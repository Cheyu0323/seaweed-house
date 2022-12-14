import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import Title from "../components/Title";
import FliterIcon from "../components/FliterIcon";
import BrandInfo from "../components/BrandInfo";
import NumberCount from "../components/NumberCount";
import materials from "../data/materials.json";
import brand from "../data/brand.json";
import customLoader from "../ts/customLoader"
import React, { useState, useEffect } from "react";

type TextureItemProp = {
    imagePath: string;
    title: string;
};
const TextureItem: React.FC<TextureItemProp> = ({ imagePath, title }) => {
    return (
        <div className="relative overflow-hidden">
            <Image
                className="object-cover w-full h-[200px] sm:h-[250px] md:h-[300px]"
                src={"texture/" + imagePath}
                alt={title}
                width="0"
                height="0"
                sizes="100vw"
                loader={customLoader}
            />
            <span className=" text-xs md:text-sm text-primary absolute bg-white bottom-0 w-full h-8 text-center leading-8">
                {title}
            </span>
        </div>
    );
};

type MaterialsType = Array<{
    id: string;
    serial: string;
    name: string;
    type: string;
    brand: string;
    series: string;
    img: string;
}>;

type FilterSelectProp = {
    options: Array<string>;
    handleChangeSelect: (e: string) => void;
};

const FilterSelect: React.FC<FilterSelectProp> = ({
    options,
    handleChangeSelect,
}) => {
    return (
        <div className="py-2">
            {options.length <= 1 ? (
                ""
            ) : (
                <div className="flex items-center justify-start flex-wrap py-2 bg-white w-full">
                    <FliterIcon />
                    <div className=" relative">
                        <div className=" absolute pointer-events-none z-20 w-0 h-0 right-[13px] top-3 border-t-[11px] border-x-[8px] border-b-0 border-t-accent border-x-transparent border-b-transparent "></div>
                        <select
                            className="mx-1 px-1 py-1 border-primary border w-28 rounded appearance-none bg-white text-primary"
                            onChange={(
                                e: React.ChangeEvent<HTMLSelectElement>
                            ) => {
                                handleChangeSelect(e.target.value);
                            }}
                        >
                            <option value="??????">??????</option>
                            {options.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

const Introduction: React.FC = () => {
    const [boardPage, setBoardPage] = useState<number>(0);
    const [board_brand, setBoard_brand] = useState<string>("");
    const [board_series, setBoard_series] = useState<string>("");
    const [board_filter, setBoard_filter] = useState<MaterialsType>(
        materials.filter((item) => item.type === "board")
    );
    const [board_select, setBoard_select] = useState<Array<string>>([]);
    useEffect(() => {
        if (board_brand === "") return;
        setBoard_filter(
            materials.filter(
                (item) => item.brand === board_brand && item.type === "board"
            )
        );
        setBoard_select(
            materials
                .filter(
                    (item) => item.brand == board_brand && item.type === "board"
                )
                .filter(
                    (item, index, arr) =>
                        arr.findIndex((s) => item.series === s.series) === index
                )
                .map((item) => item.series)
        );
        setBoardPage(0);
    }, [board_brand]);
    useEffect(() => {
        if (board_series === "") return;
        setBoard_filter(
            materials.filter((item) =>
                item.brand === board_brand &&
                item.type === "board" &&
                board_series === "??????"
                    ? item.series !== ""
                    : item.series === board_series
            )
        );
        setBoardPage(0);
    }, [board_series]);

    const [stonePage, setStonePage] = useState<number>(0);
    const [stone_brand, setStone_brand] = useState<string>("");
    const [stone_series, setStone_series] = useState<string>("");
    const [stone_filter, setStone_filter] = useState<MaterialsType>(
        materials.filter((item) => item.type === "stone")
    );
    const [stone_select, setStone_select] = useState<Array<string>>([]);
    useEffect(() => {
        if (stone_brand === "") return;
        setStone_filter(
            materials.filter(
                (item) => item.brand === stone_brand && item.type === "stone"
            )
        );
        setStone_select(
            materials
                .filter(
                    (item) => item.brand == stone_brand && item.type === "stone"
                )
                .filter(
                    (item, index, arr) =>
                        arr.findIndex((s) => item.series === s.series) === index
                )
                .map((item) => item.series)
        );
        setStonePage(0);
    }, [stone_brand]);
    useEffect(() => {
        if (stone_series === "") return;
        setStone_filter(
            materials.filter((item) =>
                item.brand === stone_brand &&
                item.type === "stone" &&
                stone_series === "??????"
                    ? item.series !== stone_series
                    : item.series === stone_series
            )
        );
        setStonePage(0);
    }, [stone_series]);

    const [floorPage, setFloorPage] = useState<number>(0);
    const [floor_brand, setFloor_brand] = useState<string>("");
    const [floor_series, setFloor_series] = useState<string>("");
    const [floor_filter, setFloor_filter] = useState<MaterialsType>(
        materials.filter((item) => item.type === "floor")
    );
    const [floor_select, setFloor_select] = useState<Array<string>>([]);
    useEffect(() => {
        if (floor_brand === "") return;
        setFloor_filter(
            materials.filter(
                (item) => item.brand === floor_brand && item.type === "floor"
            )
        );
        setFloor_select(
            materials
                .filter(
                    (item) => item.brand == floor_brand && item.type === "floor"
                )
                .filter(
                    (item, index, arr) =>
                        arr.findIndex((s) => item.series === s.series) === index
                )
                .map((item) => item.series)
        );
        setFloorPage(0);
    }, [floor_brand]);
    useEffect(() => {
        if (floor_series === "") return;
        setFloor_filter(
            materials.filter((item) =>
                item.brand === floor_brand &&
                item.type === "floor" &&
                floor_series === "??????"
                    ? item.series !== floor_series
                    : item.series === floor_series
            )
        );
        setFloorPage(0);
    }, [floor_series]);

    return (
        <div className="bg-white">
            <Head>
                <title>????????????</title>
                <meta
                    name="description"
                    content="???????????? | ????????? | ?????? | ??????"
                />
                <link rel="icon" href={`seawead.ico`} />
            </Head>
            <div className="pt-28 pb-4 px-8 sm:pt-16 flex flex-col items-center justify-center bg-white">
                <Title>????????????</Title>
            </div>
            <section className="max-w-screen-md m-auto relative px-4 pb-4 md:pb-8 bg-white flex flex-wrap justify-around items-center">
                <span className="cursor-pointer relative text-primary tracking-wider my-1 font-medium md:text-lg group">
                    <Link href="introduction/#board" scroll={false}>
                        <span className=" relative z-10">????????????</span>
                    </Link>
                    <span className="absolute z-[9] bottom-0 right-[-3px] bg-accent rounded-full w-3 h-3 duration-200 opacity-0 group-hover:opacity-100"></span>
                </span>
                <span className=" text-lightgary">|</span>
                <span className="cursor-pointer relative text-primary tracking-wider my-1 font-medium md:text-lg group">
                <Link href="introduction/#stone" scroll={false}>
                    <span className=" relative z-10">??????</span>
                    </Link>
                    <span className="absolute z-[9] bottom-0 right-[-3px] bg-accent rounded-full w-3 h-3 duration-200 opacity-0 group-hover:opacity-100"></span>
                </span>
                <span className=" text-lightgary">|</span>
                <span className="cursor-pointer relative text-primary tracking-wider my-1 font-medium md:text-lg group">
                <Link href="introduction/#floor" scroll={false}>
                    <span className=" relative z-10">??????</span>
                    </Link>
                    <span className="absolute z-[9] bottom-0 right-[-3px] bg-accent rounded-full w-3 h-3 duration-200 opacity-0 group-hover:opacity-100"></span>
                </span>
                <span className=" text-lightgary">|</span>
                <span className="cursor-pointer relative text-primary tracking-wider my-1 font-medium md:text-lg group">
                <Link href="introduction/#warranty" scroll={false}>
                    <span className=" relative z-10">????????????</span>
                    </Link>
                    <span className="absolute z-[9] bottom-0 right-[-3px] bg-accent rounded-full w-3 h-3 duration-200 opacity-0 group-hover:opacity-100"></span>
                </span>
            </section>
            <section className="relative mb-8 px-4 md:px-3 lg:px-2 flex flex-col items-start justify-center max-w-screen-xl m-auto bg-white">
                <Title left={true} my={true}>
                    ????????????
                </Title>
                <div
                    id="board"
                    className="grid grid-cols-2 auto-rows-max md:flex mt-2 mb-4 w-full"
                >
                    <span
                        className={`cursor-pointer tracking-widest mr-1 md:pr-10 relative md:after:content-['|'] after:absolute after:right-4 after:top-0 after:text-lightgary ${
                            board_brand === "Egger"
                                ? "text-accent font-semibold"
                                : "text-primary"
                        }`}
                        onClick={() => {
                            setBoard_brand("Egger");
                        }}
                    >
                        Egger
                    </span>
                    <span
                        className={`cursor-pointer tracking-widest mr-1 md:pr-10 relative md:after:content-['|'] after:absolute after:right-4 after:top-0 after:text-lightgary ${
                            board_brand === "Cleaf"
                                ? "text-accent font-semibold"
                                : "text-primary"
                        }`}
                        onClick={() => {
                            setBoard_brand("Cleaf");
                        }}
                    >
                        Cleaf
                    </span>
                    <span
                        className={`cursor-pointer tracking-widest mr-1 md:pr-10 relative md:after:content-['|'] after:absolute after:right-4 after:top-0 after:text-lightgary ${
                            board_brand === "HorngChang"
                                ? "text-accent font-semibold"
                                : "text-primary"
                        }`}
                        onClick={() => {
                            setBoard_brand("HorngChang");
                        }}
                    >
                        HorngChang
                    </span>
                    <span
                        className={`cursor-pointer tracking-widest mr-1 md:pr-10 relative md:after:content-['|'] after:absolute after:right-4 after:top-0 after:text-lightgary ${
                            board_brand === "Kaindl"
                                ? "text-accent font-semibold"
                                : "text-primary"
                        }`}
                        onClick={() => {
                            setBoard_brand("Kaindl");
                        }}
                    >
                        Kaindl
                    </span>
                    <span
                        className={`cursor-pointer tracking-widest mr-1 md:pr-10 relative md:after:content-['|'] after:absolute after:right-4 after:top-0 after:text-lightgary ${
                            board_brand === "LongLand"
                                ? "text-accent font-semibold"
                                : "text-primary"
                        }`}
                        onClick={() => {
                            setBoard_brand("LongLand");
                        }}
                    >
                        LongLand
                    </span>
                    <span
                        className={`cursor-pointer tracking-widest mr-1 md:pr-10 relative ${
                            board_brand === "JangMei"
                                ? "text-accent font-semibold"
                                : "text-primary"
                        }`}
                        onClick={() => {
                            setBoard_brand("JangMei");
                        }}
                    >
                        JangMei
                    </span>
                </div>
                <BrandInfo
                    data={brand.filter((item) => item.name === board_brand)[0]}
                />
                {board_brand === "" ? (
                    ""
                ) : (
                    <FilterSelect
                        options={board_select}
                        handleChangeSelect={setBoard_series}
                    />
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 w-full">
                    {board_filter
                        .slice(boardPage * 8, (boardPage + 1) * 8)
                        .map((item) => (
                            <TextureItem
                                key={item.id}
                                imagePath={
                                    item.type +
                                    "/" +
                                    item.brand +
                                    "/" +
                                    item.img
                                }
                                title={item.serial + " " + item.name}
                            />
                        ))}
                </div>
                <NumberCount
                    maxPage={Math.ceil(board_filter.length / 8)}
                    nowIndex={boardPage}
                    setPage={setBoardPage}
                />
            </section>

            <section
                id="stone"
                className="relative mb-8 px-4 md:px-3 lg:px-2 flex flex-col items-start justify-center max-w-screen-xl m-auto bg-white"
            >
                <Title left={true} my={true}>
                    ??????
                </Title>
                <div className="grid grid-cols-2 auto-rows-max md:flex mt-2 mb-4 w-full">
                    <span
                        className={`cursor-pointer tracking-widest mr-1 md:pr-10 relative md:after:content-['|'] after:absolute after:right-4 after:top-0 after:text-lightgary ${
                            stone_brand === "SamsungRadianz"
                                ? "text-accent font-semibold"
                                : "text-primary"
                        }`}
                        onClick={() => {
                            setStone_brand("SamsungRadianz");
                        }}
                    >
                        ???????????????
                    </span>
                    <span
                        className={`cursor-pointer tracking-widest mr-1 md:pr-10 relative ${
                            stone_brand === "CaesarStone"
                                ? "text-accent font-semibold"
                                : "text-primary"
                        }`}
                        onClick={() => {
                            setStone_brand("CaesarStone");
                        }}
                    >
                        ????????????
                    </span>
                </div>
                <BrandInfo
                    data={brand.filter((item) => item.name === stone_brand)[0]}
                />
                {stone_brand === "" ? (
                    ""
                ) : (
                    <FilterSelect
                        options={stone_select}
                        handleChangeSelect={setStone_series}
                    />
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 w-full">
                    {stone_filter
                        .slice(stonePage * 8, (stonePage + 1) * 8)
                        .map((item) => (
                            <TextureItem
                                key={item.id}
                                imagePath={
                                    item.type +
                                    "/" +
                                    item.brand +
                                    "/" +
                                    item.img
                                }
                                title={item.serial + " " + item.name}
                            />
                        ))}
                </div>
                <NumberCount
                    maxPage={Math.ceil(stone_filter.length / 8)}
                    nowIndex={stonePage}
                    setPage={setStonePage}
                />
            </section>

            <section
                id="floor"
                className="relative mb-8 px-4 md:px-3 lg:px-2 flex flex-col items-start justify-center max-w-screen-xl m-auto bg-white"
            >
                <Title left={true} my={true}>
                    ??????
                </Title>
                <div className="grid grid-cols-2 auto-rows-max md:flex mt-2 mb-4 w-full">
                    <span
                        className={`cursor-pointer tracking-widest mr-1 md:pr-10 relative md:after:content-['|'] after:absolute after:right-4 after:top-0 after:text-lightgary ${
                            floor_brand === "Egger"
                                ? "text-accent font-semibold"
                                : "text-primary"
                        }`}
                        onClick={() => {
                            setFloor_brand("Egger");
                        }}
                    >
                        Egger
                    </span>
                    <span
                        className={`cursor-pointer tracking-widest mr-1 md:pr-10 relative ${
                            floor_brand === "SwissKrono"
                                ? "text-accent font-semibold"
                                : "text-primary"
                        }`}
                        onClick={() => {
                            setFloor_brand("SwissKrono");
                        }}
                    >
                        SwissKrono
                    </span>
                </div>
                <BrandInfo
                    data={brand.filter((item) => item.name === floor_brand)[0]}
                />
                {floor_brand === "" ? (
                    ""
                ) : (
                    <FilterSelect
                        options={floor_select}
                        handleChangeSelect={setFloor_series}
                    />
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 w-full">
                    {floor_filter
                        .slice(floorPage * 8, (floorPage + 1) * 8)
                        .map((item) => (
                            <TextureItem
                                key={item.id}
                                imagePath={
                                    item.type +
                                    "/" +
                                    item.brand +
                                    "/" +
                                    item.img
                                }
                                title={item.serial + " " + item.name}
                            />
                        ))}
                </div>
                <NumberCount
                    maxPage={Math.ceil(floor_filter.length / 8)}
                    nowIndex={floorPage}
                    setPage={setFloorPage}
                />
            </section>
            <section
                id="warranty"
                className="relative pb-8 px-4 md:px-3 lg:px-2 flex flex-col items-start justify-center max-w-screen-xl m-auto bg-white"
            >
                <Title left={true} my={true}>
                    ????????????
                </Title>
                <div className="my-3 tracking-widest">
                    <div className="my-3">
                        <div className=" text-black text-lg font-semibold">
                            ????????????
                        </div>
                        <div className=" text-primary text-base my-1">
                            ???????????????????????????????????????????????????????????????:
                        </div>
                        <li className=" text-primary">
                            ???????????????????????????????????????????????????????????????????????????
                        </li>
                    </div>
                    <div className="my-3">
                        <div className=" text-black text-lg font-semibold">
                            ????????????
                        </div>
                        <li className=" text-primary">
                            ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                        </li>
                    </div>
                    <div className="my-3">
                        <div className=" text-black text-lg font-semibold">
                            ?????????????????????????????????
                        </div>
                        <li className=" text-primary">
                            ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                        </li>
                        <li className=" text-primary">
                            ?????????????????????????????????????????????????????????????????????????????????
                        </li>
                    </div>
                    <div className=" text-primary text-base my-1">
                        ?????????????????????????????????????????????????????????????????????????????????
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Introduction;
