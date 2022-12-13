type NumberCountProp = {
    maxPage: number;
    nowIndex: number;
    setPage: (page: number) => void;
};
const NumberCount: React.FC<NumberCountProp> = ({
    maxPage,
    nowIndex,
    setPage,
}) => {
    let output = [];
    let startNum = Math.max(
        nowIndex > maxPage - 2 ? maxPage - 3 : nowIndex - 1,
        0
    );
    let endNum = Math.min(nowIndex === 0 ? 3 : nowIndex + 2, maxPage);
    for (let index = startNum; index < endNum; index++) {
        output.push(
            <div
                key={index}
                onClick={() => {
                    setPage(index);
                }}
                className={`w-8 h-8 mx-1 duration-200 hover:text-accent text-center leading-8 cursor-pointer ${
                    nowIndex === index
                        ? "border border-lightgary bg-primary text-white"
                        : "text-primary"
                }`}
            >
                {index + 1}
            </div>
        );
    }
    return (
        <div className="flex justify-center w-full mt-2">
            <div
                className={`relative w-8 h-8 mx-1 duration-200 cursor-pointer border border-lightgary group hover:border-accent ${
                    nowIndex !== 0
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                <p className="duration-200 absolute w-[1.2px] border border-lightgary h-4 rounded-full top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 group-hover:border-accent"></p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="duration-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-lightgary group-hover:text-accent"
                    onClick={() => {
                        setPage(0);
                    }}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                </svg>
            </div>
            <div
                className={`relative w-8 h-8 mx-1 duration-200 cursor-pointer border border-lightgary group hover:border-accent ${
                    nowIndex !== 0
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="duration-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-lightgary group-hover:text-accent"
                    onClick={() => {
                        setPage(nowIndex - 1);
                    }}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                </svg>
            </div>
            {output}
            <div
                className={`relative rotate-180 w-8 h-8 mx-1 duration-200 cursor-pointer border border-lightgary group hover:border-accent ${
                    nowIndex !== maxPage - 1
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="duration-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-lightgary group-hover:text-accent"
                    onClick={() => {
                        setPage(nowIndex + 1);
                    }}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                </svg>
            </div>
            <div
                className={`relative rotate-180 w-8 h-8 mx-1 duration-200 cursor-pointer border border-lightgary group hover:border-accent ${
                    nowIndex !== maxPage - 1
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                <p className="duration-200 absolute w-[1.2px] border border-lightgary h-4 rounded-full top-1/2 right-[70%] transform -translate-y-1/2 group-hover:border-accent"></p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="duration-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-lightgary group-hover:text-accent"
                    onClick={() => {
                        setPage(maxPage - 1);
                    }}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                </svg>
            </div>
        </div>
    );
};
export default NumberCount