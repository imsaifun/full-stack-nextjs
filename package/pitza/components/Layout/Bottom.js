import Link from "next/link";

const Bottom = () => {
    return (
        <>
            <div className="bottom section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-7 col-sm-8">
                            <div className="bottom-logo">
                                <img
                                    className="pb-15"
                                    src="/images/logow.png"
                                    alt=""
                                />

                                <p>
                                    Pitza is a unique and beautiful
                                    collection of UI elements that are all
                                    flexible and modular. A complete and
                                    customizable solution to building the
                                    website of your dreams.
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-5 col-sm-4 col-6">
                            <div className="bottom-widget">
                                <h4 className="widget-title">About us</h4>
                                <ul>
                                    <li>
                                        <Link href="/"><a>Home</a></Link>
                                    </li>
                                    <li>
                                        <Link href="/about"><a>About</a></Link>
                                    </li>
                                    <li>
                                        <Link href="/jobs"><a>Jobs</a></Link>
                                    </li>
                                    <li>
                                        <Link href="/jobs/software-engineer"><a>Job Details</a></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6">
                            <div className="bottom-widget">
                                <h4 className="widget-title">Hot Menu</h4>
                                <ul>
                                    <li>
                                        <Link href="/pricing"><a>Pricing</a></Link>
                                    </li>
                                    <li>
                                        <Link href="/contact"><a>Contact</a></Link>
                                    </li>
                                    <li>
                                        <Link href="/company"><a>Company</a></Link>
                                    </li>
                                    <li>
                                        <Link href="/company/1"><a>Company Details</a></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-8 col-sm-8">
                            <div className="bottom-widget">
                                <h4 className="widget-title">Opening Hours</h4>
                                <ul>
                                    <li>
                                        <a>Monday : 09.00am-10.00pm</a>
                                    </li>
                                    <li>
                                        <a>Monday : 09.00am-10.00pm</a>
                                    </li>
                                    <li>
                                        <a>Monday : 09.00am-10.00pm</a>
                                    </li>
                                    <li>
                                        <a>Monday : 09.00am-10.00pm</a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Bottom;