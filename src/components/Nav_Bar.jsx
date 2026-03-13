import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";

const Nav_Bar = () => {

    const nav = useNavigate();
    const location = useLocation();

    const cursorRef = useRef(null);

    useEffect(() => {
        const path = location.pathname;

        if (path === "/") cursorRef.current?.focus();
        else if (path === "/write") cursorRef.current?.focus();
        else if (path === "/AllReviews") cursorRef.current?.focus();
        else if (path === "/HashTag") cursorRef.current?.focus();
        else if (path === "/Util") cursorRef.current?.focus();

    }, [location.pathname]);

    return (
        <div className="Nav_Button">
            <div className="">
                <button ref={cursorRef} onClick={() => nav("/Home")}>
                    Home
                </button>
            </div>
            <div className="">
                <button ref={cursorRef} onClick={() => nav("/Write")}>
                    Write
                </button>
            </div>
            <div className="">
<<<<<<< HEAD
                <button ref={cursorRef} onClick={() => nav("/Moive")}>
                    Moive
                </button>
            </div>
            <div className="">
                <button ref={cursorRef} onClick={() => nav("/Book")}>
                    Book
                </button>
            </div>
            <div className="">
=======
                <button ref={cursorRef} onClick={() => nav("/AllReviews")}>
                    AllReviews
                </button>
            </div>
            <div className="">
>>>>>>> origin/ReviewList
                <button ref={cursorRef} onClick={() => nav("/HashTag")}>
                    HashTag
                </button>
            </div>
            <div className="">
                <button ref={cursorRef} onClick={() => nav("/Util")}>
                    Util
                </button>
            </div>

        </div>
    );
};

export default Nav_Bar;

