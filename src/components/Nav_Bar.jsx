import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";

const Nav_Bar = () => {

    const nav = useNavigate();
    const location = useLocation();

    const homeRef = useRef(null);
    const writeRef = useRef(null);
    const moiveRef = useRef(null);
    const bookRef = useRef(null);
    const hashtagRef = useRef(null);
    const utilRef = useRef(null);

    useEffect(() => {
        const path = location.pathname;

        if (path === "/") homeRef.current?.focus();
        else if (path === "/write") writeRef.current?.focus();
        else if (path === "/Moive") moiveRef.current?.focus();
        else if (path === "/Book") bookRef.current?.focus();
        else if (path === "/HashTag") hashtagRef.current?.focus();
        else if (path === "/Util") hashtagRef.current?.focus();

    }, [location.pathname]);

    return (
        <div className="Nav_Button">
            <div className="">
                <button ref={homeRef} onClick={() => nav("/Home")}>
                    Home
                </button>
            </div>
            <div className="">
                <button ref={writeRef} onClick={() => nav("/Write")}>
                    Write
                </button>
            </div>
            <div className="">
                <button ref={moiveRef} onClick={() => nav("/Moive")}>
                    Moive
                </button>
            </div>
            <div className="">
                <button ref={bookRef} onClick={() => nav("/Book")}>
                    Book
                </button>
            </div>
            <div className="">
                <button ref={hashtagRef} onClick={() => nav("/HashTag")}>
                    HashTag
                </button>
            </div>
            <div className="">
                <button ref={utilRef} onClick={() => nav("/Util")}>
                    Util
                </button>
            </div>

        </div>
    );
};

export default Nav_Bar;

