import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import EditProduct from "../../../components/elements/EditProduct";
import Products from "../../../components/elements/Products";
import Layout from "../../../components/Layout/LayoutAdmin";
import dbConnect from "../../../lib/dbConnect";
import getProduct from "../../../lib/getProduct";

import { toast } from "react-toastify";

export default function ProductSingle({ product }) {
     const [productList, setProductList] = useState(product);
    const [productId, setProductId] = useState("");
    const handleId = async (id) => {
        setProductId(id)
    };
    const handleDelete = async (id) => {

        // console.log(id);

        try {
            const res = await axios.delete(`/api/products/${id}`);
            setProductList(productList.filter((pizza) => pizza._id !== id));
            
            toast.success("Delete success")
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout pageClass={"admin"} role="admin">
            <div className="section-padding">
                <div className="container">
                    <div className="row">
                        {product.map((item, i) => (
                            <div className="col-xl-3" key={i}>
                                <div className="card">
                                    <div className="card-body">
                                        <Link href={`/products/${item._id}`}>
                                            <a>
                                                <img src={item.img} alt="" className="img-fluid card-img-top" />

                                                {/* {item._id} */}
                                            </a>
                                        </Link>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h4 className="card-title">{item.title}</h4>
                                                <span className="rating">
                                                    {item.rating == 5 && (
                                                        <>
                                                            <i className="bi bi-star-fill"></i>
                                                            <i className="bi bi-star-fill"></i>
                                                            <i className="bi bi-star-fill"></i>
                                                            <i className="bi bi-star-fill"></i>
                                                            <i className="bi bi-star-fill"></i>
                                                        </>)}
                                                    {item.rating == 4 && (
                                                        <>
                                                            <i className="bi bi-star-fill"></i>
                                                            <i className="bi bi-star-fill"></i>
                                                            <i className="bi bi-star-fill"></i>
                                                            <i className="bi bi-star-fill"></i>
                                                            <i className="bi bi-star"></i>
                                                        </>)}
                                                    {item.rating == 3 && (
                                                        <>
                                                            <i className="bi bi-star-fill"></i>
                                                            <i className="bi bi-star-fill"></i>
                                                            <i className="bi bi-star-fill"></i>
                                                            <i className="bi bi-star"></i>
                                                            <i className="bi bi-star"></i>
                                                        </>)}
                                                    {item.rating == 2 && (
                                                        <>
                                                            <i className="bi bi-star-fill"></i>
                                                            <i className="bi bi-star-fill"></i>
                                                            <i className="bi bi-star"></i>
                                                            <i className="bi bi-star"></i>
                                                            <i className="bi bi-star"></i>
                                                        </>)}
                                                    {item.rating == 1 && (
                                                        <>
                                                            <i className="bi bi-star-fill"></i>
                                                            <i className="bi bi-star"></i>
                                                            <i className="bi bi-star"></i>
                                                            <i className="bi bi-star"></i>
                                                            <i className="bi bi-star"></i>
                                                        </>)}
                                                    {!item.rating == null}
                                                </span>
                                            </div>
                                            <h4>{item.prices[0].price}</h4>
                                        </div>

                                        
                                        
                                        <button className="btn btn-danger mb-10 me-30"
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            Delete
                                        </button>
                                        <button className="btn btn-warning mb-10"
                                            onClick={() => handleId(item._id)}
                                        >
                                            Edit
                                        </button>
                                        {/* <br /> */}
                                    </div>
                                </div>


                                {productId === item._id && <EditProduct item={item} productId={productId}/>}

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps() {
    await dbConnect();
    const product = await getProduct();
    return {
        props: {
            product
        },
    };
}
