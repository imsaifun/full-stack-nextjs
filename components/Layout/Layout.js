import Link from "next/link";
import { useRouter } from "next/router";
import { removeCookies } from "cookies-next";
// import { useState } from "react";
import { useSelector } from "react-redux";
// import CartCounter from "../CartCounter";
import dynamic from 'next/dynamic';
import Bottom from "./Bottom";
import Footer from "./Footer";
import HeaderLanding from "./HeaderLanding";
import PageHead from "./PageHead";
import PageTitleLanding from "./PageTitleLanding";

export default function Layout({ role, children, headTitle,
    pageTitle,
    pageTitleSub,
    pageClass,
    parent,
    child, }) {
    const router = useRouter();
    const quantity = useSelector((state) => state.cart.quantity);

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

            <PageHead headTitle={headTitle} />
            <div id="main-wrapper" className={pageClass}>
                <HeaderLanding />

                {pageTitle && (
                    <PageTitleLanding
                        pageTitle={pageTitle}
                        pageTitleSub={pageTitleSub}
                        parent={parent}
                        child={child}
                    />
                )}


                {children}


                <Bottom />
                <Footer />
                {/* <ThemeSwitch /> */}
            </div>

            {/* <section>{children}</section> */}
        </>
    );
}

