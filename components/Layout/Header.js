import Link from "next/link";
import CartCounter from "../CartCounter";
// import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
// const ThemeSwitch = dynamic(() => import('../elements/ThemeSwitch'), {
//     ssr: false
// })
function Header({ signoutHandler }) {
    return (
        <>
            <div className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-12">
                            <div className="header-content">
                                <div className="header-left">
                                    <div className="brand-logo">
                                        <Link href="/">
                                            <a className="mini-logo">
                                                <img
                                                    src="/images/logo.png"
                                                    alt=""
                                                />
                                            </a>
                                        </Link>
                                    </div>
                                    {/* <div className="search">
                                        <form action="#">
                                            <span>
                                                <i className="ri-search-line"></i>
                                            </span>
                                            <input
                                                type="text"
                                                placeholder="Search Here"
                                            />
                                        </form>
                                    </div> */}
                                </div>

                                <div className="header-right">


                                    {/* <ThemeSwitch /> */}

                                    <Link href="/cart" passHref>
                                        <a className="mx-20"><CartCounter /></a>
                                    </Link>
                                    <button onClick={signoutHandler}>Sign out</button>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Header;
