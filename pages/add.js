import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Layout from "../components/Layout";
import dbConnect from "../lib/dbConnect";
import getProduct from "../lib/getProduct";

export default function Product(product) {
  console.log(product);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  // const router = useRouter();

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/products", {
        title,
        desc,
        price,
      });

      // router.push("/");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Layout>
     
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
          placeholder="price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        <button onClick={addProduct}>Submit</button>
      </form>

      

      {/* <button onClick={signoutHandler}>Sign out</button> */}
    </Layout>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  const product = await getProduct();
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
