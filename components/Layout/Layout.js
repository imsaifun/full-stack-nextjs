
import { removeCookies } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Bottom from "./Bottom";
import Footer from "./Footer";
import Header from "./Header";
import HeaderLanding from "./HeaderLanding";
import PageHead from "./PageHead";
import PageTitleLanding from "./PageTitleLanding";
import PageTitle from "./PageTitle";
import Sidebar from "./sidebar";


export default function Layout({
    role,
    children,
    headTitle,
    pageTitle,
    pageTitleSub,
    pageClass,
    parent,
    child,
}) {

    const [height, setHeight] = useState();

    const router = useRouter();
    useEffect(() => {
        setHeight(window.screen.height);
    }, []);

    const signoutHandler = () => {
        removeCookies("token");
        router.push("/signin");
    };



    return (
        <>

            <PageHead headTitle={headTitle} />


            <div id="main-wrapper" className={pageClass}>

                {!role ? (
                    <HeaderLanding role={role} />
                ) : (
                    <>
                        <Header role={role} signoutHandler={signoutHandler} />
                        <Sidebar signoutHandler={signoutHandler} />
                    </>
                )}



                {pageTitle && (
                    <PageTitleLanding
                        pageTitle={pageTitle}
                        pageTitleSub={pageTitleSub}
                        parent={parent}
                        child={child}
                    />
                )}




                {!role ? (
                    <>
                        {children}
                    </>
                ) : (
                    <>
                        <div className="content-body" style={{ minHeight: height - 122 }}>
                            <div className="container">
                                {pageTitle && (
                                    <PageTitle
                                        pageTitle={pageTitle}
                                        pageTitleSub={pageTitleSub}
                                        parent={parent}
                                        child={child}
                                    />
                                )}
                                {children}
                            </div>
                        </div>
                    </>
                )}

                {!role ? (<><Bottom /></>) : (null)}

                <Footer />
                {/* <ThemeSwitch /> */}
            </div>



        </>
    );
}

