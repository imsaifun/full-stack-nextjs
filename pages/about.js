import { removeCookies } from "cookies-next";
import Layout from "../components/Layout";
import getUser from "../lib/getUser";
import { useRouter } from "next/router";
import dbConnect from "../lib/dbConnect";

export default function About(user) {
  console.log(user);
  const router = useRouter();

  const signoutHandler = () => {
    removeCookies("token");
    router.push("/signin");
  };

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
