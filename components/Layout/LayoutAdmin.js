import { removeCookies } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "./Header";
import PageHead from "./PageHead";
import PageTitle from "./PageTitle";
import Sidebar from "./sidebar";
const LayoutAdmin = ({
    headTitle,
    role,
    children,
    pageTitle,
    pageTitleSub,
    pageClass,
    parent,
    child,
}) => {
    const router = useRouter();
    const [height, setHeight] = useState();
    
    const signoutHandler = () => {
        removeCookies("token");
        router.push("/signin");
    };
    useEffect(() => {
        setHeight(window.screen.height);
    }, []);
    return (
        <>
            <PageHead headTitle={headTitle} />
            <div id="main-wrapper" className={pageClass}>
            <Header role={role} signoutHandler={signoutHandler} />
                <Sidebar />

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
            </div>
        </>
    );
};

export default LayoutAdmin;
