
// import { removeCookies } from "cookies-next";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import Bottom from "./Bottom";
// import Footer from "./Footer";
// import Header from "./Header";
// import HeaderLanding from "./HeaderLanding";
// import PageHead from "./PageHead";
// import PageTitleLanding from "./PageTitleLanding";
// import PageTitle from "./PageTitle";
// import Sidebar from "./Sidebar";


// export default function Layout({
//     role,
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

    
//     const signoutHandler = () => {
//         removeCookies("token");
//         router.push("/signin");
//     };



//     return (
//         <>

//             <PageHead headTitle={headTitle} />


//             <div id="main-wrapper" className={pageClass}>

//                 {!role ? (
//                     <HeaderLanding role={role} signoutHandler={signoutHandler} />
//                 ) : (
//                     <>
//                         <Header role={role} signoutHandler={signoutHandler} />
//                         <Sidebar signoutHandler={signoutHandler} />
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




//                 {!role ? (
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

//                 {!role ? (<><Bottom /></>) : (null)}

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
const Layout = ({ children }) => {
  const cookies = parseCookies()
  const router = useRouter()
  const [isUser, setIsUser] = useState("")
  

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

  const logoutHandler = async () => {
    if (session) {
      signOut()
    }
    cookie.remove("token")
    cookie.remove("user")
    // setisLoggedIn(false)
    setIsUser("")
    router.push("/user/login")
  }
  return (
    <>
      <div className="container">
        <Header isUser={isUser} logoutHandler={logoutHandler} />
        {children}
      </div>
    </>
  )
}

export default Layout


