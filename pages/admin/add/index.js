import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import dbConnect from "../../../lib/dbConnect";
import getProduct from "../../../lib/getProduct";

export default function ProductForm(user) {
    // console.log(product);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState(null);
    const [prices, setPrices] = useState([
        { text: 'small', price: null },
        { text: 'medium', price: null },
        { text: 'large', price: null }
    ]);
    const [extraOptions, setExtraOptions] = useState([]);
    const [extra, setExtra] = useState(null);
    const router = useRouter();

    const changePrice = (e, index) => {
        const currentPrices = prices
        currentPrices[index].price = e.target.value;
        setPrices(currentPrices);
    };

    // console.log(file);

    const handleExtraInput = (e) => {
        setExtra({ ...extra, [e.target.name]: e.target.value });
    };

    const handleExtra = (e) => {
        e.preventDefault();
        setExtraOptions((prev) => [...prev, extra]);
    };



    const productHandler = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "uploads");

        try {
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/imsaifun/image/upload",
                data
            );

            const { url } = uploadRes.data;
            console.log(uploadRes.data);

            await axios.post("/api/products", {
                title,
                desc,
                prices,
                extraOptions,
                img: url,
            });

            router.push("/products");
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Layout pageClass="admin">

            <form>
                <div className="mb-10">
                    <input className="form-control" type="file" onChange={(e) => setFile(e.target.files[0])} required />
                </div>
                <div className="mb-10">
                    <input className="form-control"
                        type="text"
                        placeholder="title"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                </div>

                <div className="mb-10">
                    <input className="form-control"
                        type="number"
                        placeholder="Small"
                        onChange={(e) => changePrice(e, 0)}
                        required
                    />
                </div>
                <div className="mb-10">
                    <input className="form-control"
                        type="number"
                        placeholder="Medium"
                        onChange={(e) => changePrice(e, 1)}
                        required
                    />
                </div>
                <div className="mb-10">
                    <input className="form-control"
                        type="number"
                        placeholder="Large"
                        onChange={(e) => changePrice(e, 2)}
                        required
                    />
                </div>
                <div className="mb-10">
                    <textarea
                        className="form-control"
                        type="text"
                        placeholder="Desc"
                        onChange={(e) => setDesc(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-10">
                    <input className="form-control"
                        type="text"
                        placeholder="Item"
                        name="text"
                        onChange={handleExtraInput}
                        required
                    />
                </div>
                <div className="mb-10">


                    <input className="form-control"
                        type="number"
                        placeholder="Price"
                        name="price"
                        onChange={handleExtraInput}
                        required
                    />
                </div>

                
                <button className="btn btn-success" onClick={handleExtra}>
                    Add
                </button>

                <div>
                    {extraOptions.map((option) => (
                        <span key={option.text}>
                            {option.text}
                        </span>
                    ))}
                </div>

                <button className="btn btn-primary" onClick={productHandler}>Submit</button>
            </form>



            {/* <button onClick={signoutHandler}>Sign out</button> */}
        </Layout>
    );
}

export async function getServerSideProps({ req, res }) {
    await dbConnect();
    const product = await getProduct();
    return {
        props: {
            product,
        },
    };
}
