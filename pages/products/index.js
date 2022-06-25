import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../components/Layout";
import dbConnect from "../../lib/dbConnect";
import getProduct from "../../lib/getProduct";

export default function Product(product) {
  console.log(product);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  const signupHandler = async (e) => {
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
        <button onClick={signupHandler}>Submit</button>
      </form>

      <Link href={`/products/${product.product[0]._id}`}>
        <a>{product.product[0]._id}</a>
      </Link>
      {/* <br />
      <Link href={`/products/${product.product[1]._id}`}>
        <a>{product.product[1]._id}</a>
      </Link>
      <br />
      <Link href={`/products/${product.product[2]._id}`}>
        <a>{product.product[2]._id}</a>
      </Link> */}

      

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
