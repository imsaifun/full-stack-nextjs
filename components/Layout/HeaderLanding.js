import { resolveHref } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { useState } from "react";
import CartCounter from "../CartCounter";
// import PageTree from "./RightSidebar";
function Header({ logoutHandler, isUser }) {
    const [isToggled, setToggled] = useState(false);
    const toggleTrueFalse = () => setToggled(!isToggled);
    // const [openClass, setOpenClass] = useState('');

    // const handleOpen = () => {
    //     setOpenClass("open")
    //     // document.querySelector("body").classList.add("overflow-hidden");
    // }


    // const handleRemove = () => {
    //     if (openClass === "open") {
    //         setOpenClass("")
    //     }
    //     // document.querySelector("body").classList.remove("overflow-hidden");
    // }
    return (
        <>
            <div className="header landing">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="navigation">
                                <nav className="navbar navbar-expand-lg navbar-light">
                                    <div className="brand-logo">
                                        <Link href="/"><a>
                                            <img src="/images/logo.png" alt="" className="logo-primary" />
                                        </a></Link>
                                    </div>
                                    {/* <div className="search">
                                        <form>
                                            <span><i className="ri-search-line"></i></span>
                                            <input type="text" placeholder="Search Here" />
                                        </form>
                                    </div> */}
                                    <button className="navbar-toggler" type="button" onClick={toggleTrueFalse}>
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className={isToggled ? "collapse navbar-collapse show" : "collapse navbar-collapse"}>
                                        <ul className="navbar-nav ms-auto">


                                            <li className="nav-item dropdown">
                                                <Link href="/"><a className="nav-link">Home
                                                </a>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link href="/products"><a className="nav-link">Pizzza
                                                </a></Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link href="/about"><a className="nav-link">About
                                                </a>
                                                </Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link href="/contact"><a className="nav-link">Contact
                                                </a>
                                                </Link>
                                            </li>





                                            {isUser && (
                                                <>
                                                    <li className="nav-item">
                                                        <Link href="/admin"><a className="nav-link">Dashboard
                                                        </a></Link>
                                                    </li>
                                                </>
                                            )}

                                        </ul>
                                    </div>


                                    <div className="signin-btn d-flex">
                                        <Link href="/cart" passHref>
                                            <a className="mx-20"><CartCounter /></a>
                                        </Link>
                                        {isUser ? (
                                            <a className="btn btn-primary" onClick={logoutHandler}>
                                                Logout
                                            </a>
                                        ):(<Link href="/user/login" passHref>
                                        <a className="btn btn-primary">Login</a>
                                    </Link>)}
                                    </div>
                                </nav>



                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <PageTree openClass={openClass} handleRemove={handleRemove} /> */}






        </>
    );
}
export default Header;

