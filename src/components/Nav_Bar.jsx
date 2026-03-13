import { useNavigate, useLocation } from "react-router-dom";
import "./Nav_Bar.css";

import HomeImg from "../assets/nav/Home.svg?react";
import WriteImg from "../assets/nav/Write.svg?react";
import ListImg from "../assets/nav/List.svg?react";
import HashtagImg from "../assets/nav/Hashtag.svg?react";
import ProfileImg from "../assets/nav/Profile.svg?react";

const menus = [
    { path: "/", icon: HomeImg, alt: "Home" },
    { path: "/Write", icon: WriteImg, alt: "Write" },
    { path: "/AllReviews", icon: ListImg, alt: "AllReviews" },
    { path: "/HashTag", icon: HashtagImg, alt: "HashTag" },
];

const Nav_Bar = () => {
    const nav = useNavigate();
    const location = useLocation();

    return (
        <div className="nav-bar">
            <div className="nav-menus">
                {menus.map((menu) => {
                    const Icon = menu.icon;  // 컴포넌트로 사용
                    return (
                        <button
                            key={menu.path}
                            className={`nav-btn ${location.pathname === menu.path ? "active" : ""}`}
                            onClick={() => nav(menu.path)}
                        >
                            <Icon />  {/* img 대신 컴포넌트로 렌더링 */}
                        </button>
                    );
                })}
            </div>

            <div className="nav-profile">
                <button
                    className={`nav-btn ${location.pathname === "/Profile" ? "active" : ""}`}
                    onClick={() => nav("/Profile")}
                >
                    <ProfileImg />
                </button>
            </div>
        </div>
    );
};

export default Nav_Bar;