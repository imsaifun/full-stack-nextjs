import Layout from "../../components/Layout/LayoutAdmin";
import dbConnect from "../../lib/dbConnect";
import getOrderById from "../../lib/getOrderById";

export default function OrderDetails({order}) {
  console.log(order);


  return (
    <Layout pageClass="admin" role="admin">
      <h1>Order Details</h1>

      <p>
        <strong>Name</strong>: {order.customer}
        <br />
        <strong>Address</strong>: {order.address}
        <br />
        <strong>Price</strong>: {order.total}

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
  return {
    props: {
      order,
    },
  };
}
