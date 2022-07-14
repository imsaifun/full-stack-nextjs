import * as React from "react"

import axios from "axios"
import { getSession, signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import { GoogleLoginButton } from "react-social-login-buttons"



function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [conPassword, setConPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const router = useRouter()

  const { data: session } = useSession()

  const cookies = parseCookies

  useEffect(() => {
    if (session) {
      toast.success("Login Success")
      router.push("/")
    }

    if (cookies?.user) {
      router.push("/")
    }
  }, [router])

  const SubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if (password !== conPassword) {
        toast.error("passwords do not match!")
        // console.log("passwords do not match")
        return
      }

      const user = cookies?.user
        ? JSON.parse(cookies.user)
        : session?.user
        ? session?.user
        : ""

      console.log(email, password, firstName, lastName)

      const { data } = await axios.post(
        `/api/user/register`,
        { email, password, firstName, lastName }
      )

      toast.success(data?.message)
    } catch (error) {
      console.log(error.response)
      toast.error(error.response.data.error)
    }
  }

  return (
    <>
          <form
            onSubmit={SubmitHandler}
          >
                <input
                  
                  name="firstName"
                  required
                  
                  id="firstName"
                  
                  
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  required
                  
                  id="lastName"
                  
                  name="lastName"
                  
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
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
                <input
                  margin="normal"
                  required
                  
                  name="confirm password"
                  
                  type="password"
                  id="confirm password"
                  
                  value={conPassword}
                  onChange={(e) => setConPassword(e.target.value)}
                />
              <GoogleLoginButton onClick={() => signIn("google")} />

            <button
              type="submit"
              
            >
              Sign Up
            </button>
            <br />
                <Link href="/src/user/login" passHref>
                  Already have an account? Sign in
                </Link>
          </form>
        
        
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
export default Register
