import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Layout from "../../components/Layout";
import dbConnect from "../../lib/dbConnect";
import getProduct from "../../lib/getProduct";
import getUser from "../../lib/getUser";

export default function ProductSingle(product,user) {
  const myProduct = product.product
  console.log(myProduct);

  const [productList, setProductList] = useState(myProduct);
  // const router = useRouter();

  const handleDelete = async (id) => {
    console.log(id);

    try {
      const res = await axios.delete(`/api/products/${id}`);
      setProductList(productList.filter((pizza) => pizza._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>

      <h1>Product Page</h1>

      {productList.map((item, i) => (
        <div key={i}>
          <Link href={`/products/${item._id}`}>
            <a>{item._id}</a>
          </Link>
          <button
            onClick={() => handleDelete(item._id)}
          >
            Delete
          </button>
        </div>
      ))}



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
      user
    },
  };
}
