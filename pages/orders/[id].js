import Layout from "../../components/Layout/LayoutAdmin";
import dbConnect from "../../lib/dbConnect";
import getOrderById from "../../lib/getOrderById";

export default function OrderDetails({ order }) {
    const status = order.status
    // console.log(status);



    return (
        <Layout pageClass="admin" role="admin">

            <div className="row">
                <div className="col-12">
                    <h4 className="card-title mb-30">Order Status</h4>
                    <div className="card">
                        <div className="card-body  py-50">
                            <ul class="tab-steps--list">
                                <li class={status <= 4 && status >= 0 && "active"}>Ordered</li>
                                <li class={status <= 4 && status >= 1 && "active"}>Preparing</li>
                                <li class={status <= 4 && status >= 2 && "active"}>On the way</li>
                                <li class={status <= 4 && status >= 3 && "active"}>Delivered</li>
                                <li class={status <= 4 && status >= 4 && "active"}>Completed</li>
                            </ul>

                            <div className="row justify-content-center text-center">
                                <div className="col-xl-3">
                                    <span>Buyer Name</span>
                                    <h4>{order.customer}</h4>
                                </div>
                                <div className="col-xl-3">
                                    <span>Delivery Address</span>
                                    <h4>{order.address}</h4>
                                </div>
                                <div className="col-xl-3">
                                    <span>Order Price</span>
                                    <h4>{order.total}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </Layout>
    );
}



export async function getServerSideProps({ req, res, params }) {
    await dbConnect();
    const order = await getOrderById(params.id);
    return {
        props: {
            order,
        },
    };
}
