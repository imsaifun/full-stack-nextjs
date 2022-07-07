import Layout from "../components/Layout/Layout";

export default function About() {


  return (
    <Layout>
      <h1>About Page</h1>
      
      
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
