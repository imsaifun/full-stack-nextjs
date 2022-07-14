
import Layout from "../components/Layout/Layout";
import { useSession, signIn, signOut } from "next-auth/react"

export default function HomePage() {

    const { data: session } = useSession()
    console.log(session)
    if (session) {
      return (
        <>
          <h1>Home</h1>
          {/* Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button> */}
        </>
      )
    }

    return (
        <Layout pageClass="front">

            <div className="section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <h1>Home Page</h1>
                        </div>
                    </div>
                </div>
            </div>



        </Layout>
    );
}

// export async function getServerSideProps({ req, res }) {
//   await dbConnect();
//   const user = await getUser(req, res);
//   if (!user) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/signin",
//       },
//       props: {},
//     };
//   }
//   return {
//     props: {
//       user,
//     },
//   };
// }
