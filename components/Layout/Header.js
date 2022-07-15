import cookie from "js-cookie"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { loadUser } from "../../redux/action/userAction"
export default function ButtonAppBar() {
  const cookies = parseCookies()
  const router = useRouter()
  const [userState, setUserState] = useState("")
  // const [isLoggedIn, setisLoggedIn] = useState(true)

  const { data: session } = useSession()
  const dispatch = useDispatch()

  // const profile = useSelector((state) => state.profile)
  // const { loading, error, dbUser } = profile

  const user = cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
      ? session?.user
      : ""

  // console.log(userState)
  useEffect(() => {
    session ? setUserState(session.user) : setUserState(user)

    if (user) {
      dispatch(loadUser(user.email, user))
    }
  }, [router, setUserState])
  // useEffect(() => {
  //   if (user) {
  //     setisLoggedIn(true)
  //   }
  //   if (!user) {
  //     router.push("/user/login")
  //   }
  // }, [isLoggedIn])

  const logoutHandler = async () => {
    if (session) {
      signOut()
    }
    cookie.remove("token")
    cookie.remove("user")
    // setisLoggedIn(false)
    setUserState("")
    router.push("/user/login")
  }

  return (
    <>

      <Link href="/"passHref>
        <h3 >
          AuthApp
        </h3>
      </Link>
      <Link href="/user/profile" passHref>
        <a className="btn btn-primary">{userState && userState.name}</a>
      </Link>
      {/* <Link href="/user/author" passHref>
        <button className="btn btn-primary">Author</button>
      </Link> */}

      <div>
        {userState ? (
          <>
            <button className="btn btn-primary" onClick={logoutHandler}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/user/login"passHref>
              <a className="btn btn-primary">Login</a>
            </Link>
            <br />
            <Link href="/user/register"passHref>
              <a className="btn btn-primary">Register</a>
            </Link>
          </>
        )}
      </div>
    </>

  )
}








// import Link from "next/link";
// import CartCounter from "../CartCounter";
// import { useState } from "react";
// // import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
// // const ThemeSwitch = dynamic(() => import('../elements/ThemeSwitch'), {
// //     ssr: false
// // })
// function Header({ signoutHandler, role }) {
//     const [isToggled, setToggled] = useState(false);
//     const toggleTrueFalse = () => setToggled(!isToggled);
//     return (
//         <>

//             <div className="header">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-xl-12">
//                             <div className="navigation">
//                                 <nav className="navbar navbar-expand-lg navbar-light">
//                                     <div className="brand-logo">
//                                         <Link href="/"><a>
//                                             <img src="/images/logo.png" alt="" className="logo-primary" />
//                                         </a></Link>
//                                     </div>
//                                     {/* <div className="search">
//                                         <form>
//                                             <span><i className="ri-search-line"></i></span>
//                                             <input type="text" placeholder="Search Here" />
//                                         </form>
//                                     </div> */}
//                                     <button className="navbar-toggler" type="button" onClick={toggleTrueFalse}>
//                                         <span className="navbar-toggler-icon"></span>
//                                     </button>
//                                     <div className={isToggled ? "collapse navbar-collapse show" : "collapse navbar-collapse"}>
//                                         <ul className="navbar-nav ms-auto">


//                                             <li className="nav-item dropdown">
//                                                 <Link href="/"><a className="nav-link">Home
//                                                 </a>
//                                                 </Link>
//                                             </li>
//                                             <Link href="/cart" passHref>
//                                                 <a className="mx-20"><CartCounter /></a>
//                                             </Link>

//                                         </ul>
//                                     </div>

//                                     <div className="signin-btn">
//                                         <a className="btn btn-primary" onClick={signoutHandler}>Sign out</a>
//                                     </div>
//                                 </nav>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>



//         </>
//     );
// }
// export default Header;
