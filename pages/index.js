
import Layout from "../components/Layout/Layout";

export default function HomePage() {

  const signoutHandler = () => {
    Cookies.remove("token");
    router.push("/signin");
  };

  return (
    <Layout  pageClass={"front"}>
      <h1>Home Page</h1>
      
      

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
