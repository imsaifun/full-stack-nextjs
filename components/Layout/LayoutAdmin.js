
// import { removeCookies } from "cookies-next";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
import Bottom from "./Bottom";
import Footer from "./Footer";
// import Header from "./Header";
import HeaderLanding from "./HeaderLanding";
import PageHead from "./PageHead";
import PageTitleLanding from "./PageTitleLanding";
import PageTitle from "./PageTitle";
import Sidebar from "./Sidebar";


// export default function Layout({
//     isUser,
//     children,
//     headTitle,
//     pageTitle,
//     pageTitleSub,
//     pageClass,
//     parent,
//     child,
// }) {

//     const [height, setHeight] = useState();

//     const router = useRouter();
//     useEffect(() => {
//         setHeight(window.screen.height);
//     }, []);


//     const logoutHandler = () => {
//         removeCookies("token");
//         router.push("/signin");
//     };



//     return (
//         <>

//             <PageHead headTitle={headTitle} />


//             <div id="main-wrapper" className={pageClass}>

//                 {!isUser ? (
//                     <HeaderLanding isUser={isUser} logoutHandler={logoutHandler} />
//                 ) : (
//                     <>
//                         <Header isUser={isUser} logoutHandler={logoutHandler} />
//                         <Sidebar logoutHandler={logoutHandler} />
//                     </>
//                 )}



//                 {pageTitle && (
//                     <PageTitleLanding
//                         pageTitle={pageTitle}
//                         pageTitleSub={pageTitleSub}
//                         parent={parent}
//                         child={child}
//                     />
//                 )}




//                 {!isUser ? (
//                     <>
//                         {children}
//                     </>
//                 ) : (
//                     <>
//                         <div className="content-body" style={{ minHeight: height - 122 }}>
//                             <div className="container">
//                                 {pageTitle && (
//                                     <PageTitle
//                                         pageTitle={pageTitle}
//                                         pageTitleSub={pageTitleSub}
//                                         parent={parent}
//                                         child={child}
//                                     />
//                                 )}
//                                 {children}
//                             </div>
//                         </div>
//                     </>
//                 )}

//                 {!isUser ? (<><Bottom /></>) : (null)}

//                 <Footer />
//                 {/* <ThemeSwitch /> */}
//             </div>



//         </>
//     );
// }

import Header from "./Header"
import cookie from "js-cookie"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { loadUser } from "../../redux/action/userAction"
import Wrapper from "../auth/wrapper";
import { reset } from "../../redux/cartSlice";
const Layout = ({
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
    // if (!user) {
    //   router.push("/user/login")
    // }
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


          <Header isUser={isUser} logoutHandler={logoutHandler} />
          <Sidebar logoutHandler={logoutHandler} />


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
  )
}

export default Layout


