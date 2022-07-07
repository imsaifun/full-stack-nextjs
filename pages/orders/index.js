import Layout from "../../components/Layout/LayoutFront";
import dbConnect from "../../lib/dbConnect";
import getOrder from "../../lib/getOrder";
import getUser from "../../lib/getUser";

const Index = ({ user, orders }) => {
    return (
        <Layout role={user}>


            <div>
                <div>
                    <h1>Orders</h1>
                    <table>
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </tbody>
                        {orders.map((order) => (
                            <tbody key={order._id}>
                                <tr>
                                    <td>{order._id}...</td>
                                    <td>{order.customer}</td>
                                    <td>${order.total}</td>
                                    <td>
                                        {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                                    </td>
                                    {/* <td>{status[order.status]}</td> */}
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
        </Layout>

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
            orders
        },
    };
}

export default Index;