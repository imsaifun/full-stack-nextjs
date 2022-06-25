import Layout from "../components/Layout";
import dbConnect from "../lib/dbConnect";
import getUser from "../lib/getUser";

export default function About(user) {


  return (
    <Layout role={user}>
      <h1>About Page</h1>
      
      
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  await dbConnect();
  const user = await getUser(req, res);
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
      props: {},
    };
  }
  return {
    props: {
      user,
    },
  };
}
