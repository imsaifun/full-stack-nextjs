import axios from "axios"
import cookie from "js-cookie"
import { getSession, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import * as React from "react"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Layout from "../../components/Layout/LayoutAdmin"
import { loadUser } from "../../redux/action/userAction"
import store from "../../redux/store"



function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const cookies = parseCookies()

  const { data: session } = useSession()

  // useEffect(() => {
  //   if (session) {
  //     toast.success("Login Success")
  //     router.push("/")
  //   }

  //   if (cookies?.user) {
  //     router.push("/")
  //   }
  // }, [router, session])

  const SubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.post(
        `/api/user/login`,
        { email, password },
        config
      )

      toast.success(data.message)
      cookie.set("token", data?.token)
      cookie.set("user", JSON.stringify(data?.user))
      router.push("/admin")
    } catch (error) {
      toast.error(error.response.data.error)
    }
  }

  return (
    <>

      <Layout pageClass="front">



        <h1 component="h1" variant="h5">
          Sign in
        </h1>
        <form
          onSubmit={SubmitHandler}
        >
          <input
            required
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />




          <button
            type="submit"
          >
            Sign In
          </button>
          <br />

          <Link href="/user/forget" passHref>
            Forgot password?
          </Link>

          <br />

          <Link href="/user/register" passHref>
            {"Don't have an account? Sign Up"}
          </Link>

        </form>
      </Layout>
    </>
  )
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context)

//   return {
//     props: {
//       session,
//     },
//   }
// }

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req }) => {
//       const session = await getSession({ req })
//       const cookies = parseCookies()

//       const user = cookies?.user ? JSON.parse(cookies.user) : session?.user

//       await store.dispatch(loadUser(user?.email, user))

//       return {
//         props: {
//           session,
//         },
//       }
//     }
// )

export async function getServerSideProps(req) {
  const session = await getSession({ req })
  const cookies = parseCookies()

  const user = cookies?.user ? JSON.parse(cookies.user) : session?.user

  await store.dispatch(loadUser(user?.email, user))

  return {
    props: {
      session,
    },
  }
}


export default Login
