import Link from "next/link";
import Layout from "../../components/Layout";
import dbConnect from "../../lib/dbConnect";
import getProduct from "../../lib/getProduct";
import getUser from "../../lib/getUser";

export default function Product(product) {
  console.log(product.product[0]);


  return (
    <Layout>
      <h1>Home Page</h1>
      <p>
        This is the home page and it is protected. Only authenticated users can
        access this page.
      </p>

      <Link href={`/products/${product.product[0]._id}`}>
        <a>{product.product[0]._id}</a>
      </Link>
      <br />
      <Link href={`/products/${product.product[1]._id}`}>
        <a>{product.product[1]._id}</a>
      </Link>
      <br />
      <Link href={`/products/${product.product[2]._id}`}>
        <a>{product.product[2]._id}</a>
      </Link>

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

export async function getServerSideProps() {
  await dbConnect();
  const product = await getProduct();
  const user = await getUser();
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
      product,
    },
  };
}
