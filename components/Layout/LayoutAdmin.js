import PageHead from "./PageHead";
import PageTitle from "./PageTitle";
import Sidebar from "./Sidebar";
import cookie from "js-cookie";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../../redux/action/userAction";
import Header from "./Header";
import HeaderLanding from "./HeaderLanding";
import Bottom from "./Bottom";
import Footer from "./Footer";
const Layout = ({
    role,
    children,
    headTitle,
    pageTitle,
    pageTitleSub,
    pageClass,
    parent,
    child, }) => {
    const cookies = parseCookies()
    const router = useRouter()
    const [isUser, setIsUser] = useState("")
    // const [isLoggedIn, setisLoggedIn] = useState(true)


    const { data: session } = useSession()
    const dispatch = useDispatch()

    const user = cookies?.user
        ? JSON.parse(cookies.user)
        : session?.user
            ? session?.user
            : ""

    useEffect(() => {
        session ? setIsUser(session.user) : setIsUser(user)

        if (user) {
            dispatch(loadUser(user.email, user))
        }
    }, [router, setIsUser])

    const [height, setHeight] = useState();

    // const router = useRouter();
    useEffect(() => {
        setHeight(window.screen.height);

        // if (user) {
        //   setisLoggedIn(true)
        // }
        if (!user && role) {
            router.push("/user/login")
        }
    }, []);




    const logoutHandler = async () => {
        if (session) {
            signOut()
        }
        cookie.remove("token")
        cookie.remove("user")
        // setisLoggedIn(false)
        setIsUser("")
        // router.reload(window.location.pathname)
        router.push("/user/login")
    }
    return (
        <>
            {/* <div className="container">
        <Header isUser={isUser} logoutHandler={logoutHandler} />
        {children}
      </div> */}





            <PageHead headTitle={headTitle} />

            <div id="main-wrapper" className={pageClass}>

                {!role ? (
                    <HeaderLanding isUser={isUser}  role={role} logoutHandler={logoutHandler} />
                ) : (
                    <>
                        <Header isUser={isUser} role={role} logoutHandler={logoutHandler} />
                        <Sidebar logoutHandler={logoutHandler} />
                    </>
                )}


                {/* <Header isUser={isUser} logoutHandler={logoutHandler} />
                <Sidebar logoutHandler={logoutHandler} /> */}


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
            </div>




        </>
    )
}

export default Layout


