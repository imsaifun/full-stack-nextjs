
import Layout from "../components/Layout/Layout";

export default function HomePage() {

    const signoutHandler = () => {
        Cookies.remove("token");
        router.push("/signin");
    };

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
