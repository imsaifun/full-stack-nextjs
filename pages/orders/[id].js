import Layout from "../../components/Layout";
import dbConnect from "../../lib/dbConnect";
import getOrderById from "../../lib/getOrderById";
import getUser from "../../lib/getUser";

export default function OrderDetails(product) {
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

      {/* <button onClick={signoutHandler}>Sign out</button> */}
    </Layout>
  );
}

// export async function getServerSideProps({ params }) {
//     await dbConnect()

//     const product = await Product.findById(params.id).lean()
//     product._id = product._id.toString()

//     const allProducts = JSON.stringify(product)
//     const pizza = JSON.parse(allProducts)

//     return { props: { pizza } }

// }


export async function getServerSideProps({ req,res, params }) {
  await dbConnect();
  const order = await getOrderById(params.id);
  const user = await getUser(req,res);
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
      order,
    },
  };
}
