import Layout from "../../components/Layout/LayoutAdmin";
// import Product from "../../models/Product";
import dbConnect from "../../lib/dbConnect";
import getProductById from "../../lib/getProductById";

import { useDispatch } from "react-redux";

import { useState } from "react";
import { addToCart } from "../../redux/cartSlice";
import Link from "next/link";

export default function ProductDetails({ product }) {
    // const product = product.product
    console.log(product);

    const [price, setPrice] = useState(product.prices[0].price);
    const [size, setSize] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [extras, setExtras] = useState([]);
    const dispatch = useDispatch();

    // const [open, setOpen] = useState(false);
    // console.log(product.prices[0]);
    // console.log(price);

    const changePrice = (number) => {
        setPrice(price + number);
    };

    const handleSize = (sizeIndex) => {
        const difference = product.prices[sizeIndex].price - product.prices[size].price;
        setSize(sizeIndex);
        changePrice(difference);
    };

    const handleChange = (e, option) => {
        const checked = e.target.checked;

        if (checked) {
            changePrice(option.price);
            setExtras((prev) => [...prev, option]);
        } else {
            changePrice(-option.price);
            setExtras(extras.filter((extra) => extra._id !== option._id));
        }
    };

    const handleClick = () => {
        // setOpen(true)
        dispatch(addToCart({ ...product, extras, price, quantity }));
    };

    return (
        <Layout pageClass="front">


            <div className="product-details">
                <div className="section-padding">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-6">
                                <img src={product.img} alt="" className="img-fluid" />
                            </div>
                            <div className="col-xl-6">
                                <div className="product-details-content">
                                    <h3>{product.title}</h3>
                                    <span className="rating">
                                        {product.rating == 5 && (
                                            <>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                            </>)}
                                        {product.rating == 4 && (
                                            <>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star"></i>
                                            </>)}
                                        {product.rating == 3 && (
                                            <>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star"></i>
                                                <i className="bi bi-star"></i>
                                            </>)}
                                        {product.rating == 2 && (
                                            <>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star"></i>
                                                <i className="bi bi-star"></i>
                                                <i className="bi bi-star"></i>
                                            </>)}
                                        {product.rating == 1 && (
                                            <>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star"></i>
                                                <i className="bi bi-star"></i>
                                                <i className="bi bi-star"></i>
                                                <i className="bi bi-star"></i>
                                            </>)}
                                        {!product.rating == null}
                                    </span>
                                    <p className="desc">
                                        {product.desc}
                                    </p>

                                    <div className="product-sizes d-flex">
                                        <div className="me-20 c-pointer" onClick={() => handleSize(0)}>
                                            <img src="/images/size.png" width={40} alt="" />
                                            <span className="h6 ms-10">Small</span>
                                        </div>
                                        <div className="me-20 c-pointer" onClick={() => handleSize(1)}>
                                            <img src="/images/size.png" width={40} alt="" />
                                            <span className="h6 ms-10">Medium</span>
                                        </div>
                                        <div className="me-20 c-pointer" onClick={() => handleSize(2)}>
                                            <img src="/images/size.png" width={40} alt="" />
                                            <span className="h6 ms-10">Large</span>
                                        </div>
                                    </div>


                                    <div className="extra-option">
                                        {product.extraOptions.map((option) => (
                                            <>
                                                {option && <h5>Extra Option</h5>}
                                                <div class="form-check" key={option._id}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={option.text}
                                                        name={option.text}
                                                        onChange={(e) => handleChange(e, option)}
                                                    />
                                                    <label htmlFor={option.text}>{option.text}</label>
                                                </div>
                                            </>
                                        ))}

                                    </div>



                                    <h3 className="price mb-20">${price}</h3>


                                    <div className="cart-input">
                                        <input
                                            className="form-control"
                                            onChange={(e) => setQuantity(e.target.value)}
                                            type="number"
                                            defaultValue={1}
                                        />

                                        <button className="btn btn-primary mt-30" onClick={handleClick}>Add to Cart</button>

                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </Layout>
    );
}


export async function getServerSideProps({ params, req, res }) {
    await dbConnect();
    const product = await getProductById(params.id);
    // const user = await getUser( req, res );
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
