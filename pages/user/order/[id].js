import Layout from "../../../components/Layout/LayoutAdmin";
import dbConnect from "../../../lib/dbConnect";
import getOrderById from "../../../lib/getOrderById";

export default function OrderDetails({ order }) {
  console.log(order.status);
  const status = order.status


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

      {/* <ul class="progressbar"> */}
      <ul class="tab-steps--list">
        <li class={status <= 4 && status >= 0 && "active"}>Ordered</li>
        <li class={status <= 4 && status >= 1 && "active"}>Preparing</li>
        <li class={status <= 4 && status >= 2 && "active"}>On the way</li>
        <li class={status <= 4 && status >= 3 && "active"}>Delivered</li>
        {/* <li class={status <= 4 && status >= 4 && "active"}>Completed</li> */}
      </ul>

            {/* <li class="active" data-step="1"></li>
            <li  data-step="2"></li>
            <li  data-step="3"></li>
            <li  data-step="4"></li>
         </ul> */}

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
