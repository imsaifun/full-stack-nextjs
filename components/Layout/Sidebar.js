import Link from "next/link";
import { useRouter } from "next/router";

function Sidebar({ signoutHandler }) {
    const router = useRouter();
    return (
        <>
            <div className="sidebar">
                <div className="brand-logo">
                    <Link href="/admin">
                        <a className="full-logo">
                            <img src="/images/logo.png" alt="" />
                        </a>
                    </Link>
                </div>
                <div className="menu">
                    <ul>
                        <li className={router.pathname == "/admin" ? "active" : ""}>
                            <Link href="/admin">
                                <a>
                                    <span>
                                        <i className="ri-layout-grid-fill"></i>
                                    </span>
                                    <span className="nav-text">Admin</span>
                                </a>
                            </Link>
                        </li>
                        <li className={router.pathname == "/admin/add" ? "active" : ""}>
                            <Link href="/admin/add">
                                <a>
                                    <span>
                                        <i className="ri-briefcase-line"></i>
                                    </span>
                                    <span className="nav-text">Add</span>
                                </a>
                            </Link>
                        </li>
                        <li className={router.pathname == "/admin/profile" ? "active" : ""}>
                            <Link href="/admin/profile">
                                <a>
                                    <span>
                                        <i className="ri-heart-line"></i>
                                    </span>
                                    <span className="nav-text">Profile</span>
                                </a>
                            </Link>
                        </li>
                        {/* <li
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
                        </li> */}
                        <li
                            className={
                                router.pathname == "/signin"
                                    ? "active"
                                    : " logout"
                            }
                        >

                            <a onClick={signoutHandler}>
                                <span>
                                    <i className="ri-logout-circle-line"></i>
                                </span>
                                <span className="nav-text">Signout</span>
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </>
    );
}
export default Sidebar;
