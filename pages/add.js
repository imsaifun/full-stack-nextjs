import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Layout from "../components/Layout";
import dbConnect from "../lib/dbConnect";
import getProduct from "../lib/getProduct";
import getUser from "../lib/getUser";

export default function ProductForm(user) {
  // console.log(product);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [prices, setPrices] = useState("");
  // const router = useRouter();

  const productHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/products", {
        title,
        desc,
        img,
        prices,
      });

      // router.push("/");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Layout role={user}>
     
     <form>
        <input
          type="text"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          type="text"
          placeholder="desc"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
        <input
          type="text"
          placeholder="img"
          onChange={(e) => setImg(e.target.value)}
          value={img}
        />
        <input
          type="text"
          placeholder="prices"
          onChange={(e) => setPrices(e.target.value)}
          value={prices}
        />
        <button onClick={productHandler}>Submit</button>
      </form>

      

      {/* <button onClick={signoutHandler}>Sign out</button> */}
    </Layout>
  );
}

export async function getServerSideProps({req,res}) {
  await dbConnect();
  const product = await getProduct();
  const user = await getUser(req,res);
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
