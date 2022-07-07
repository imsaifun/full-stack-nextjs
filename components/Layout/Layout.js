
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
            {/* <nav>
        <Link href="/">
          <a>Home Page</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/products">
          <a>Products</a>
        </Link>
        <Link href="/todo">
          <a>Todo</a>
        </Link>




        <Link href="/admin">
          <a>dashboard</a>
        </Link>
        <Link href="/add">
          <a>Add</a>
        </Link>
        <Link href="/admin/profile">
          <a>Profile</a>
        </Link>

        {role ?
          (<button onClick={signoutHandler}>Sign out</button>)
          :
          (<Link href="/signin">
            <a>Signin</a>
          </Link>)
        }

        <Link href="/cart" passHref>
          <div><CartCounter /></div>
        </Link>
      </nav> */}

            {/* {!role ? () : ()} */}

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

