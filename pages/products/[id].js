import Layout from "../../components/Layout";
// import Product from "../../models/Product";
import dbConnect from "../../lib/dbConnect";
import getProductById from "../../lib/getProductById";
import getUser from "../../lib/getUser";

import { useDispatch } from "react-redux";

import { useState } from "react";
import { addToCart } from "../../redux/cartSlice";

export default function ProductDetails(product, user) {
    const pizza = product.product

    const [price, setPrice] = useState(pizza.prices[0].price);
    const [size, setSize] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [extras, setExtras] = useState([]);
    const dispatch = useDispatch();

    // console.log(pizza.prices[0]);
    // console.log(price);
    
    const changePrice = (number) => {
        setPrice(price + number);
    };

    const handleSize = (sizeIndex) => {
        const difference = pizza.prices[sizeIndex].price - pizza.prices[size].price;
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
        dispatch(addToCart({ ...pizza, extras, price, quantity }));
    };

    return (
        <Layout role={user}>
            <h1>Product Details</h1>
            <p>
                This is the home page and it is protected. Only authenticated users can
                access this page.
            </p>

            <div>
                <img src={`/${pizza.img}`} alt="" width={100} />
                <br />
                <strong>Name</strong>: {pizza.title}
                <br />
                <br />
                {/* <strong>Name</strong>: {pizza._id} */}

                <div onClick={() => handleSize(0)}>
                    <img src="/img/size.png" width={20} alt="" />
                    <span>Small</span>
                </div>
                <br />
                <div onClick={() => handleSize(1)}>
                    <img src="/img/size.png" width={20} alt="" />
                    <span>Medium</span>
                </div>
                <br />
                <div onClick={() => handleSize(2)}>
                    <img src="/img/size.png" width={20} alt="" />
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
                        onChange={(e) => setQuantity(e.target.value)}
                        type="number"
                        defaultValue={1}
                    />
                    <button  onClick={handleClick}>Add to Cart</button>
                </div>

            </div>
        </Layout>
    );
}


export async function getServerSideProps({ params, req, res }) {
    await dbConnect();
    const product = await getProductById(params.id);
    const user = await getUser( req, res );
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
            product,
        },
    };
}
