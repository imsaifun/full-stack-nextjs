import Layout from "../../components/Layout/Layout";
// import Product from "../../models/Product";
import dbConnect from "../../lib/dbConnect";
import getProductById from "../../lib/getProductById";

// import { useDispatch } from "react-redux";

// import { useState } from "react";
// import { addToCart } from "../../redux/cartSlice";

export default function ProductDetails(product, user) {
    // const pizza = product.product
    // console.log(pizza);

    // const [price, setPrice] = useState(pizza.prices[0].price);
    // const [size, setSize] = useState(0);
    // const [quantity, setQuantity] = useState(1);
    // const [extras, setExtras] = useState([]);
    // const dispatch = useDispatch();

    // // console.log(pizza.prices[0]);
    // // console.log(price);

    // const changePrice = (number) => {
    //     setPrice(price + number);
    // };

    // const handleSize = (sizeIndex) => {
    //     const difference = pizza.prices[sizeIndex].price - pizza.prices[size].price;
    //     setSize(sizeIndex);
    //     changePrice(difference);
    // };

    // const handleChange = (e, option) => {
    //     const checked = e.target.checked;

    //     if (checked) {
    //         changePrice(option.price);
    //         setExtras((prev) => [...prev, option]);
    //     } else {
    //         changePrice(-option.price);
    //         setExtras(extras.filter((extra) => extra._id !== option._id));
    //     }
    // };

    // const handleClick = () => {
    //     dispatch(addToCart({ ...pizza, extras, price, quantity }));
    // };

    return (
        <Layout>



            {/* <div className="section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <img src={pizza.img} alt="" className="img-fluid" />
                        </div>
                        <div className="col-xl-6">
                            <br />
                            <strong>Name</strong>: {pizza.title}
                            <br />
                            <br />
                            

                            <div onClick={() => handleSize(0)}>
                                <img src="/images/size.png" width={20} alt="" />
                                <span>Small</span>
                            </div>
                            <br />
                            <div onClick={() => handleSize(1)}>
                                <img src="/images/size.png" width={20} alt="" />
                                <span>Medium</span>
                            </div>
                            <br />
                            <div onClick={() => handleSize(2)}>
                                <img src="/images/size.png" width={20} alt="" />
                                <span>Large</span>
                            </div>
                            <br />
                            <br />
                            <div>
                                {pizza.extraOptions.map((option) => (
                                    <div key={option._id}>
                                        <input
                                            type="checkbox"
                                            id={option.text}
                                            name={option.text}
                                            onChange={(e) => handleChange(e, option)}
                                        />
                                        <label htmlFor="double">{option.text}</label>
                                    </div>
                                ))}
                            </div>

                            <br />
                            <h2>${price}</h2>

                            <br />
                            <div>
                                <input
                                    className="form-control"
                                    onChange={(e) => setQuantity(e.target.value)}
                                    type="number"
                                    defaultValue={1}
                                />
                                <br />
                                <button className="btn btn-primary mt-20" onClick={handleClick}>Add to Cart</button>
                            </div>
                        </div>
                    </div>



                </div>
            </div> */}
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
