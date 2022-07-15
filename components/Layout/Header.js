
import Link from "next/link"
export default function Header({ isUser, logoutHandler }) {


  return (
    <>



      <Link href="/" passHref>
        <h3 >
          AuthApp
        </h3>
      </Link>
      <Link href="/user/profile" passHref>
        <a className="btn btn-primary">{isUser && isUser.name}</a>
      </Link>


      {isUser ? (
        <>
          <button className="btn btn-primary" onClick={logoutHandler}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/user/login" passHref>
            <a className="btn btn-primary">Login</a>
          </Link>
          <br />
          <Link href="/user/register" passHref>
            <a className="btn btn-primary">Register</a>
          </Link>
        </>
      )}

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
