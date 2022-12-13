import Header from "./Header";
import Footer from "./Footer";
import ScrolltopBtn from "./ScrolltopBtn";
import { ReactElement } from "react";

type LayoutProp = {
    children: ReactElement;
};
const Layout: React.FC<LayoutProp> = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <ScrolltopBtn />
            <Footer />
        </>
    );
};

export default Layout;
