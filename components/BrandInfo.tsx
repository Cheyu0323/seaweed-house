import Image from "next/image";
import { websiteUrl } from "../websiteUrl";

type BrandInfoProp = {
    data: { id: string; name: string; info: string; img: string };
};
const BrandInfo: React.FC<BrandInfoProp> = ({ data }) => {
    return (
        <>
            {data === undefined ? (
                ""
            ) : (
                <div className=" bg-lightgary py-4 px-3 md:py-7 md:px-8 w-full rounded-lg">
                    <div className="flex justify-between items-center mb-3 relative">
                        <div className=" font-semibold tracking-widest md:text-lg">
                            {data.name}
                        </div>
                        <div className="w-20 md:w-28 lg:absolute md:right-0 md:top-0">
                            <Image
                                className=" object-contain object-center md:object-right-top w-full h-10 lg:h-20"
                                src={`barand/${data.img}`}
                                alt={data.name}
                                width="0"
                                height="0"
                                sizes="100vw"
                            />
                        </div>
                    </div>
                    <div className=" text-primary tracking-wider leading-6 text-justify max-w-3xl">
                        {data.info}
                    </div>
                </div>
            )}
        </>
    );
};
export default BrandInfo
