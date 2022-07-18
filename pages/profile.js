import axios from "axios"
import { useSelector } from "react-redux"
import Layout from "../components/Layout/LayoutAdmin"

const Profile = () => {
  const profile = useSelector((state) => state.profile)
  const { loading, error, dbUser } = profile

  console.log("profile", profile)

  const emailReset = async () => {
    console.log("submit")
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    try {
      const { data } = await axios.post(
        `/api/user/emailReset`,
        { dbUser },
        config
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Layout role="admin" pageClass="admin">

      <h1>Profile </h1>

      {dbUser && (
        <>
          <h3>
            {dbUser.name}
          </h3>
          <h3>
            {dbUser.email}
          </h3>
          <h3>
            {dbUser.validEmail}{" "}
            {dbUser.validEmail === "not" && (
              <button onClick={emailReset}>Send Token</button>
              )}
          </h3>
        </>
      )}
      </Layout>
    </>
  )
}

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

// export async function getServerSideProps(req) {
//   const session = await getSession({ req })
//   const cookies = parseCookies()

//   const user = cookies?.user ? JSON.parse(cookies.user) : session?.user

//   await store.dispatch(loadUser(user?.email, user))

//   return {
//     props: {
//       session,
//     },
//   }
// }


export default Profile
