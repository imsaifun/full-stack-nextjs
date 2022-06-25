import Layout from "../../components/Layout";
import dbConnect from "../../lib/dbConnect";
// import Product from "../../models/Product";
import getProductById from "../../lib/getProductById";
// import getUser from "../../lib/getUser";

export default function ProductDetails(product) {
  console.log(product);


  return (
    <Layout>
      <h1>Home Page</h1>
      <p>
        This is the home page and it is protected. Only authenticated users can
        access this page.
      </p>

      <p>
        <strong>Name</strong>: {product.product._id}
   
      </p>
    </Layout>
  );
}


export async function getServerSideProps({ params }) {
    await dbConnect();
    const product = await getProductById(params.id);
    // const user = await getUser();
    // if (!user) {
    //   return {
    //     redirect: {
    //       permanent: false,
    //       destination: "/signin",
    //     },
    //     props: {},
    //   };
    // }
    return {
      props: {
        product,
      },
    };
  }
