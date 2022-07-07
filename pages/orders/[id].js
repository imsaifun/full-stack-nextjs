import Layout from "../../components/Layout/LayoutFront";
import dbConnect from "../../lib/dbConnect";
import getOrderById from "../../lib/getOrderById";
import getUser from "../../lib/getUser";

export default function OrderDetails(order, user) {
  console.log(order.order);


  return (
    <Layout role={user}>
      <h1>Order Details</h1>

      <p>
        <strong>Name</strong>: {order.order.customer}
        <br />
        <strong>Address</strong>: {order.order.address}
        <br />
        <strong>Price</strong>: {order.order.total}

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


export async function getServerSideProps({ req, res, params }) {
  await dbConnect();
  const order = await getOrderById(params.id);
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
      order,
    },
  };
}
