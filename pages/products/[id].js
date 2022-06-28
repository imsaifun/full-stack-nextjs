import Layout from "../../components/Layout";
import dbConnect from "../../lib/dbConnect";
// import Product from "../../models/Product";
import getProductById from "../../lib/getProductById";
// import getUser from "../../lib/getUser";

export default function ProductDetails(product, user) {

    return (
        <Layout role={user}>
            <h1>Product Details</h1>
            <p>
                This is the home page and it is protected. Only authenticated users can
                access this page.
            </p>

            <p>
                <strong>Name</strong>: {product.product.title}
                <br />
                <br />
                <strong>Name</strong>: {product.product._id}
                <br />
                <br />

                <button>Add to Cart</button>

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
