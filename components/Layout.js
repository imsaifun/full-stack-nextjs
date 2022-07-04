import Link from "next/link";
import { useRouter } from "next/router";
import { removeCookies } from "cookies-next";
import { useState } from "react";
import { useSelector } from "react-redux";
import CartCounter from "./CartCounter";

export default function Layout({ role, children }) {
  const router = useRouter();
  const quantity = useSelector((state) => state.cart.quantity);

  const signoutHandler = () => {
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
      </nav>

      <section>{children}</section>
    </>
  );
}

