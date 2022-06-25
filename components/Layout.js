import Link from "next/link";
import { useRouter } from "next/router";
import { removeCookies } from "cookies-next";
import { useState } from "react";

export default function Layout({ role, children }) {
  const router = useRouter();

  const [log, setLog] = useState(false);

  const signoutHandler = () => {
    setLog(true)
    removeCookies("token");
    router.push("/signin");
  };
  return (
    <>
      <nav>
        <Link href="/">
          <a>Home Page</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/products">
          <a>Products</a>
        </Link>


        

        {/* <Link href="/signin">
          <a>SignIn</a>
        </Link> */}
        <Link href="/add">
          <a>Add</a>
        </Link>

        {role ? <button onClick={signoutHandler}>Sign out</button> : <Link href="/signin">
          <a>Signin</a>
        </Link>}


      </nav>

      <section>{children}</section>
    </>
  );
}

