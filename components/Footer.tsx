import React from "react";
import Image from "next/image";
import seawead from "../public/seawead.png"
import customLoader from "../ts/customLoader"

const Footer: React.FC = () => {
    return (
        <footer className="w-full h-36 bg-primary flex flex-col justify-center items-center">
            <div className="w-20">
                <Image
                    src={seawead}
                    alt="海草家居"
                    width={115}
                    height={38}
                    loader={customLoader}
                />
            </div>
            <span className="mt-2 text-sm text-secondary tracking-wider">opyright@2022 Create by 海草家居</span>
        </footer>
    );
};

export default Footer;
