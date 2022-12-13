import React from "react";

type TitleProp = {
    children: string;
    left?: boolean;
    my?:boolean;
};

const Title: React.FC<TitleProp> = ({ children, left, my }) => {
    return (
        <div className={my ? "" : "my-5"}>
            <div className="text-black text-xl text-center sm:text-2xl tracking-widest font-bold mb-3 sm:mb-4">
                {children}
            </div>
            <div className={`w-[20px] h-[2px] ${left ? "" : "m-auto"} bg-accent`}></div>
        </div>
    );
};

export default Title;
