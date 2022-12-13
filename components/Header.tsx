import Link from "next/link";
import Image from "next/image";
import React from "react";
import { selectMenuState, setMenuStatus } from "../slices/menu";
import { useDispatch, useSelector } from "react-redux";
import { websiteUrl } from "../websiteUrl";

const Nav: React.FC = () => {
	const isMenuClick = useSelector(selectMenuState);
    return (
        <nav className={`absolute w-full top-24 left-0 ${isMenuClick ? "h-auto" : "h-0"} transition-height duration-500 overflow-hidden bg-white sm:bg-inherit sm:relative sm:top-0 sm:w-auto sm:h-auto text-primary`}>
            <ul className="flex flex-col px-3 sm:flex-row">
                <li className="m-2 tracking-widest text-sm sm:text-base sm:font-semibold duration-200 hover:text-accent">
                    <Link href="/">主頁</Link>
                </li>
                <li className="m-2 tracking-widest text-sm sm:text-base sm:font-semibold duration-200 hover:text-accent">
                    <Link href="/#about" scroll={false}>關於海草</Link>
                </li>
                <li className="m-2 tracking-widest text-sm sm:text-base sm:font-semibold duration-200 hover:text-accent">
                    <Link href="/projects">實際案例</Link>
                </li>
                <li className="m-2 tracking-widest text-sm sm:text-base sm:font-semibold duration-200 hover:text-accent">
                    <Link href="/#service" scroll={false}>服務流程</Link>
                </li>
                <li className="m-2 tracking-widest text-sm sm:text-base sm:font-semibold duration-200 hover:text-accent">
                    <Link href="/introduction" scroll={false}>五星建材</Link>
                </li>
                <li className="m-2 tracking-widest text-sm sm:text-base sm:font-semibold duration-200 hover:text-accent">
                    <Link href="/#contact" scroll={false}>聯絡我們</Link>
                </li>
            </ul>
        </nav>
    );
};

const NavBtn: React.FC = () => {
	const isMenuClick = useSelector(selectMenuState);
	const dispatch = useDispatch()
	const handleMenuClick = () => {
		dispatch(setMenuStatus(!isMenuClick))
	}

    return (
        <div className="w-[15px] h-[10px] sm:hidden flex flex-col justify-between items-end" onClick={handleMenuClick}>
            <div className="w-full h-[1px] bg-black"></div>
            <div className="w-full h-[1px] bg-black"></div>
            <div className="w-full h-[1px] bg-black"></div>
        </div>
    );
};

const Header: React.FC = () => {
    return (
        <header className="w-full py-10 px-5 sm:p-4 md:p-3 lg:p-2 shadow fixed bg-white z-50">
            <div className="flex justify-between items-center w-full max-w-screen-xl m-auto">
                <div className="w-20">
                    <Image
                        src={`${websiteUrl}/seawead.png`}
                        alt="海草家居 Logo"
                        width={115}
                        height={38}
                        priority
                    />
                </div>
                <NavBtn />
                <Nav />
            </div>
        </header>
    );
};

export default Header;
