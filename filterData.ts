import caselist from "./case-data.json";

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

type FilterDataProp = {
    id?: string;
    style?: string;
    pattern?: string;
    ping?: string;
};

const filterData = ({ id, style, pattern, ping }: FilterDataProp) : Array<CaseList> => {
    return caselist.filter(
        (item) =>
            (id !== undefined && id !== "" ? item.id === id : item.id != "") &&
            (style !== undefined && style !== ""
                ? item.style === style
                : item.style != "") &&
            (pattern !== undefined && pattern !== ""
                ? item.pattern === pattern
                : item.pattern != "") &&
            (ping !== undefined && ping !== ""
                ? item.ping === ping
                : item.ping != "")
    );
};

export default filterData;
