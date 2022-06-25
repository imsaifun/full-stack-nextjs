import Layout from "../components/Layout";
import dbConnect from "../lib/dbConnect";
import getProduct from "../lib/getProduct";

export default function HomePage(user) {
  console.log(user);
 

  return (
    <Layout>
      <h1>Home Page</h1>
      <p>
        This is the home page and it is protected. Only authenticated users can
        access this page.
      </p>

      {/* <p>
        <strong>Name</strong>: {user.name}
      </p>
      <p>
        <strong>Email</strong>: {user.email}
      </p> */}

      {/* <button onClick={signoutHandler}>Sign out</button> */}
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  await dbConnect();
  const product = await getProduct(req, res);
  return {
    props: {
      product,
    },
  };
}
