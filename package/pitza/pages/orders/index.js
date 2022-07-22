import Link from "next/link";
import Layout from "../../components/Layout/LayoutAdmin";
import dbConnect from "../../lib/dbConnect";
import getOrder from "../../lib/getOrder";

const Index = ({ orders }) => {
    console.log(orders);
    return (
        <>
            <Layout role="admin" pageClass="admin">


                <h4 className="mb-30 card-title">Orders</h4>
                <div className="card">
                    <div className="card-body">


                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        {/* <th>Id</th> */}
                                        <th>Customer</th>
                                        <th>Total</th>
                                        <th>Payment</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {orders.map((order) => (
                                        <tr key={order._id}>
                                            {/* <td>{order._id}...</td> */}
                                            <td>
                                                <Link href={`/orders/${order._id}`}>
                                                    <a>{order.customer}</a>
                                                </Link>
                                            </td>
                                            <td>${order.total}</td>
                                            <td>
                                                {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                                            </td>
                                            <td>
                                                {order.status === 0 && "Ordered"}
                                                {order.status === 1 && "Preparing"}
                                                {order.status === 2 && "On the way"}
                                                {order.status === 3 && "Delivered"}
                                                {order.status === 4 && "Completed"}
                                            </td>
                                        </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Layout>
        </>

    );
};

// export const getServerSideProps = async (ctx) => {
//   const myCookie = ctx.req?.cookies || "";

//   if (myCookie.token !== process.env.TOKEN) {
//     return {
//       redirect: {
//         destination: "/admin/login",
//         permanent: false,
//       },
//     };
//   }

//   const productRes = await axios.get("/api/products");
//   const orderRes = await axios.get("/api/orders");

//   return {
//     props: {
//       orders: orderRes.data,
//       products: productRes.data,
//     },
//   };
// };

export async function getServerSideProps({ req, res }) {
    await dbConnect();
    const orders = await getOrder();
    return {
        props: {
            orders
        },
    };
}

export default Index;