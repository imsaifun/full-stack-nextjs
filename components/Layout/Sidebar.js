import Link from "next/link";
import { useRouter } from "next/router";

function Sidebar() {
    const router = useRouter();
    return (
        <>
            <div className="sidebar">
                <div className="brand-logo">
                    <Link href="/dashboard">
                        <a className="full-logo">
                            <img src="./images/logo.png" alt="" />
                        </a>
                    </Link>
                </div>
                <div className="menu">
                    <ul>
                        <li className={router.pathname == "/dashboard" ? "active" : ""}>
                            <Link href="/dashboard">
                                <a>
                                    <span>
                                        <i className="ri-layout-grid-fill"></i>
                                    </span>
                                    <span className="nav-text">Dashboard</span>
                                </a>
                            </Link>
                        </li>
                        <li className={router.pathname == "/bids" ? "active" : ""}>
                            <Link href="/bids">
                                <a>
                                    <span>
                                        <i className="ri-briefcase-line"></i>
                                    </span>
                                    <span className="nav-text">Bids</span>
                                </a>
                            </Link>
                        </li>
                        <li className={router.pathname == "/saved" ? "active" : ""}>
                            <Link href="/saved">
                                <a>
                                    <span>
                                        <i className="ri-heart-line"></i>
                                    </span>
                                    <span className="nav-text">Saved</span>
                                </a>
                            </Link>
                        </li>
                        <li
                            className={
                                router.pathname == "/wallet" ? "active" : ""
                            }
                        >
                            <Link href="/wallet">
                                <a>
                                    <span>
                                        <i className="ri-wallet-line"></i>
                                    </span>
                                    <span className="nav-text">Wallet</span>
                                </a>
                            </Link>
                        </li>
                        <li
                            className={
                                router.pathname == "/settings"
                                    ? "active"
                                    : ""
                            }
                        >
                            <Link href="/settings">
                                <a>
                                    <span>
                                        <i className="ri-settings-3-line"></i>
                                    </span>
                                    <span className="nav-text">Settings</span>
                                </a>
                            </Link>
                        </li>
                        <li
                            className={
                                router.pathname == "/signin"
                                    ? "active"
                                    : " logout"
                            }
                        >
                            <Link href="/signin">
                                <a>
                                    <span>
                                        <i className="ri-logout-circle-line"></i>
                                    </span>
                                    <span className="nav-text">Signout</span>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>
        </>
    );
}
export default Sidebar;
