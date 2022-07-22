import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function Sidebar() {
    const router = useRouter();
    const profile = useSelector((state) => state.profile)
    const { dbUser } = profile

    const admin = dbUser && dbUser.isAdmin
    // console.log(admin);
    return (
        <>
            {/* {dbUser.name} */}
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
                        {admin && <li className={router.pathname == "/admin" ? "active" : ""}>
                            <Link href="/admin">
                                <a>
                                    <span>
                                        <i className="bi bi-speedometer"></i>
                                    </span>
                                    <span className="nav-text">Dashboard</span>
                                </a>
                            </Link>
                        </li>}
                        {!admin && <li className={router.pathname == "/user" ? "active" : ""}>
                            <Link href="/user">
                                <a>
                                    <span>
                                        <i className="bi bi-speedometer"></i>
                                    </span>
                                    <span className="nav-text">Dashboard</span>
                                </a>
                            </Link>
                        </li>}
                        {admin && <li className={router.pathname == "/admin/products" ? "active" : ""}>
                            <Link href="/admin/products">
                                <a>
                                    <span>
                                        <i className="bi bi-bag-plus-fill"></i>
                                    </span>
                                    <span className="nav-text">Products</span>
                                </a>
                            </Link>
                        </li>}
                        {admin && <li className={router.pathname == "/admin/products/add" ? "active" : ""}>
                            <Link href="/admin/products/add">
                                <a>
                                    <span>
                                        <i className="bi bi-bag-plus-fill"></i>
                                    </span>
                                    <span className="nav-text">Add</span>
                                </a>
                            </Link>
                        </li>}

                        {admin && <li className={router.pathname == "/orders" ? "active" : ""}>
                            <Link href="/orders">
                                <a>
                                    <span>
                                        <i className="bi bi-receipt"></i>
                                    </span>
                                    <span className="nav-text">Orders</span>
                                </a>
                            </Link>
                        </li>}

                        {/* {admin && <li className={router.pathname == "/admin/profile" ? "active" : ""}>
                            <Link href="/admin/profile">
                                <a>
                                    <span>
                                        <i className="bi bi-person"></i>
                                    </span>
                                    <span className="nav-text">Profile</span>
                                </a>
                            </Link>
                        </li>} */}
                        {!admin && <li className={router.pathname == "/user/order" ? "active" : ""}>
                            <Link href="/user/order">
                                <a>
                                    <span>
                                        <i className="bi bi-receipt"></i>
                                    </span>
                                    <span className="nav-text">Order</span>
                                </a>
                            </Link>
                        </li>}
                        {!admin && <li className={router.pathname == "/profile" ? "active" : ""}>
                            <Link href="/profile">
                                <a>
                                    <span>
                                        <i className="bi bi-person"></i>
                                    </span>
                                    <span className="nav-text">Profile</span>
                                </a>
                            </Link>
                        </li>}
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
                        {/* <li
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
                        </li> */}
                    </ul>
                </div>

            </div>
        </>
    );
}
export default Sidebar;
