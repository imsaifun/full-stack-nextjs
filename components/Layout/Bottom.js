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
                                <h4 className="widget-title">Company</h4>
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
                                <h4 className="widget-title">Employee</h4>
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                        <ul>
                                            <li>
                                                <Link href="/employee"><a>Employee</a></Link>
                                            </li>
                                            <li>
                                                <Link href="/employee/1"><a>Employee details</a></Link>
                                            </li>
                                            <li>
                                                <Link href="/404"><a>Error</a></Link>
                                            </li>
                                            <li>
                                                <Link href="/"><a>Activity</a></Link>
                                            </li>

                                        </ul>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                        <ul>
                                            <li>
                                                <Link href="/blog"><a>Blog</a></Link>
                                            </li>
                                            <li>
                                                <Link href="/blog/1"><a>Blog details</a></Link>
                                            </li>
                                            <li>
                                                <Link href="/signin"><a>Signin</a></Link>
                                            </li>
                                            <li>
                                                <Link href="/signup"><a>Signup</a></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Bottom;