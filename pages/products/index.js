import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import EditProduct from "../../components/EditProduct";
import Layout from "../../components/Layout";
import dbConnect from "../../lib/dbConnect";
import getProduct from "../../lib/getProduct";
import getUser from "../../lib/getUser";

export default function ProductSingle(product, user) {
  const myProduct = product.product

  const [productList, setProductList] = useState(myProduct);
  const [productId, setProductId] = useState("");
  // const router = useRouter();
  // console.log(productId);

  const handleDelete = async (id) => {

    // console.log(id);

    try {
      const res = await axios.delete(`/api/products/${id}`);
      setProductList(productList.filter((pizza) => pizza._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleId = async (id) => {
    setProductId(id)
  };

  return (
    <Layout role={user}>

      <h1>Product Page</h1>

      {productList.map((item, i) => (
        <div key={i}>
          <Link href={`/products/${item._id}`}>
            <a>
              {item.title} <br /> {item.desc} <br />
              <img src={item.img} alt="" width={100} />
              <br />
              {item._id}
            </a>
          </Link>
          <button
            onClick={() => handleDelete(item._id)}
          >
            Delete
          </button>
          <button
            onClick={() => handleId(item._id)}
          >
            Edit
          </button>
          <br />
          <br />

          {productId === item._id && <EditProduct item={item} />}

        </div>
      ))}
      
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  await dbConnect();
  const product = await getProduct();
  const user = await getUser(req, res);
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
