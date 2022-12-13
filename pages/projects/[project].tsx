import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Title from "../../components/Title";
import filterData from "../../filterData";
import caselist from "../../data/case.json";
import { websiteUrl } from "../../websiteUrl";

type ClickProp = {
    handleClick: () => void;
};
const MenuBtn: React.FC<ClickProp> = ({ handleClick }) => {
    return (
        <div
            className="w-8 h-8 md:w-10 md:h-10 m-1 bg-primary relative duration-200 cursor-pointer hover:bg-accent grid grid-cols-3 grid-rows-3 p-2.5 gap-0.5"
            onClick={handleClick}
        >
            <div className=" bg-lightgary"></div>
            <div className=" bg-lightgary"></div>
            <div className=" bg-lightgary"></div>
            <div className=" bg-lightgary"></div>
            <div className=" bg-lightgary"></div>
            <div className=" bg-lightgary"></div>
            <div className=" bg-lightgary"></div>
            <div className=" bg-lightgary"></div>
            <div className=" bg-lightgary"></div>
        </div>
    );
};
const PreBtn: React.FC<ClickProp> = ({ handleClick }) => {
    return (
        <div
            className="w-8 h-8 md:w-10 md:h-10 m-1 md:m-2 bg-primary relative duration-200 cursor-pointer hover:bg-accent"
            onClick={handleClick}
        >
            <div className="w-4 md:w-5 rounded-lg border border-lightgary bg-lightgary absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 "></div>
            <div className="w-2 md:w-3 rounded-lg border border-lightgary bg-lightgary -rotate-45 absolute top-[46%] left-[35%] transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
    );
};
const NextBtn: React.FC<ClickProp> = ({ handleClick }) => {
    return (
        <div
            className="w-8 h-8 md:w-10 md:h-10 m-1 md:m-2 bg-primary relative duration-200 cursor-pointer hover:bg-accent"
            onClick={handleClick}
        >
            <div className="w-4 md:w-5 rounded-lg border border-lightgary bg-lightgary absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 "></div>
            <div className="w-2 md:w-3 rounded-lg border border-lightgary bg-lightgary rotate-45 absolute top-[46%] right-[6%] transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
    );
};
const Project: React.FC = () => {
    const router = useRouter();
    const id = router.query.project as string;
    const filterDataList = filterData({ id })[0];
    const nextID = caselist.findIndex((item) => item.id === id) + 1;
    const preID = caselist.findIndex((item) => item.id === id) - 1;
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
            <div className="relative pt-28 pb-4 px-4 sm:pt-16 sm:px-4 md:px-3 lg:px-2 flex flex-col items-start justify-center max-w-screen-xl m-auto  bg-white">
                <Title left={true}>{filterDataList.name}</Title>
                <div className="flex md:flex-col items-center absolute right-4 md:top-16">
                    {preID < 0 ? (
                        ""
                    ) : (
                        <PreBtn
                            handleClick={() =>
                                router.push(`/projects/${caselist[preID].id}`)
                            }
                        />
                    )}
                    <MenuBtn handleClick={() => router.push("/projects/")} />
                    {nextID > caselist.length - 1 ? (
                        ""
                    ) : (
                        <NextBtn
                            handleClick={() =>
                                router.push(`/projects/${caselist[nextID].id}`)
                            }
                        />
                    )}
                </div>
            </div>
            <section className="pb-4 px-4 sm:px-4 md:px-3 lg:px-2 flex flex-col items-start justify-center text-base text-primary tracking-widest md:text-lg max-w-screen-xl m-auto bg-white">
                <div className="md:w-11/12">{filterDataList.info}</div>
                <div className="my-5 border-lightgary w-full max-w-screen-md">
                    <div className="flex flex-wrap border-y-[1px]">
                        <div className="font-black w-24 m-1 border-lightgary">
                            風格
                        </div>
                        <div className="m-1">{filterDataList.style}</div>
                    </div>
                    <div className="flex flex-wrap border-b-[1px]">
                        <div className="font-black w-24 m-1 border-lightgary">
                            格局
                        </div>
                        <div className="m-1">{filterDataList.pattern}</div>
                    </div>
                    <div className="flex flex-wrap border-b-[1px]">
                        <div className="font-black w-24 m-1 border-lightgary">
                            坪數
                        </div>
                        <div className="m-1">{filterDataList.ping}</div>
                    </div>
                    <div className="flex flex-wrap border-b-[1px]">
                        <div className="font-black w-24 m-1 border-lightgary">
                            施作項目
                        </div>
                        <div className="m-1">{filterDataList.act}</div>
                    </div>
                </div>
            </section>
            <section className="pb-4 px-4 sm:px-4 md:px-3 lg:px-2 flex flex-col items-start justify-center text-base text-primary tracking-widest max-w-screen-xl m-auto bg-white">
                {filterDataList.img.map((item) => {
                    return (
                        <Image
                            key={`${filterDataList.id}-${item.id}`}
                            className="object-cover mb-2 w-full h-auto"
                            src={`${websiteUrl}/case/${filterDataList.id}/${item.name}`}
                            alt={item.title}
                            width="0"
                            height="0"
                            sizes="100vw"
                            placeholder="blur"
                            blurDataURL={`${item.blurURL}`}
                        />
                    );
                })}
            </section>
            <section className="p-8 px-4 sm:p-4 md:p-3 lg:px-2 flex flex-row items-center justify-center text-base text-primary tracking-widest max-w-screen-xl m-auto bg-white">
                {preID < 0 ? (
                    ""
                ) : (
                    <PreBtn
                        handleClick={() =>
                            router.push(`/projects/${caselist[preID].id}`)
                        }
                    />
                )}
                <MenuBtn handleClick={() => router.push("/projects/")} />
                {nextID > caselist.length - 1 ? (
                    ""
                ) : (
                    <NextBtn
                        handleClick={() =>
                            router.push(`/projects/${caselist[nextID].id}`)
                        }
                    />
                )}
            </section>
        </div>
    );
};

export default Project;
