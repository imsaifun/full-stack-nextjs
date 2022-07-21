import Layout from "../../components/Layout/LayoutAdmin";
import dbConnect from "../../lib/dbConnect";
import getOrderById from "../../lib/getOrderById";

export default function OrderDetails({ order }) {
    const status = order.status
    console.log(status);

    return (
        <Layout pageClass="admin" role="admin">
            <h1>Order Details</h1>

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <ul class="tab-steps--list">
                                <li class={status <= 4 && status >= 0 && "active"}>Ordered</li>
                                <li class={status <= 4 && status >= 1 && "active"}>Preparing</li>
                                <li class={status <= 4 && status >= 2 && "active"}>On the way</li>
                                <li class={status <= 4 && status >= 3 && "active"}>Delivered</li>
                                <li class={status <= 4 && status >= 4 && "active"}>Completed</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <p>
                <strong>Name</strong>: {order.customer}
                <br />
                <strong>Address</strong>: {order.address}
                <br />
                <strong>Price</strong>: {order.total}

            </p>

            <br />
            <br />
            <br />
            <br />

            {/* <ul class="progressbar">
        <li class={status <= 4 && status >= 0 && "active"}>Ordered</li>
        <li class={status <= 4 && status >= 1 &&  "active"}>Preparing</li>
        <li class={status <= 4 && status >= 2 &&  "active"}>On the way</li>
        <li class={status <= 4 && status >= 3 &&  "active"}>Delivered</li>
        <li class={status <= 4 && status >= 4 &&  "active"}>Completed</li>
      </ul> */}



            {/* <ol class="steps">
        <li class={status <= 4 && status >= 0 && "step is-complete"} data-step="1">
          Ordered
        </li>
        <li class="step is-active" data-step="2">
          Preparing
        </li>
        <li class="step" data-step="3">
          On the way
        </li>
        <li class="step" data-step="4">
          Delivered
        </li>
        <li class="step" data-step="4">
          Completed
        </li>
      </ol> */}

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
