import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Layout from "../../components/Layout";
import dbConnect from "../../lib/dbConnect";
import getProduct from "../../lib/getProduct";
import getUser from "../../lib/getUser";

export default function ProductSingle(product) {
  const myProduct = product.product
  console.log(myProduct);

  const [productList, setProductList] = useState(myProduct);
  // const router = useRouter();

  const handleDelete = async (id) => {

    try {
      const res = await axios.delete(`/api/products/${id}`);
      setProductList(productList.filter((pizza) => pizza._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

//   const handleDelete = async (id) => {
//     try {
//         const res = await fetch(`/api/products/${id}`, {
//             method: 'DELETE',
//             headers: {
//                 Accept: contentType,
//                 'Content-Type': contentType,
//             },
//             body: JSON.stringify(id),
//         })
//         setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
//         if (!res.ok) {
//             throw new Error(res.status)
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }


  return (
    <Layout>

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

export async function getServerSideProps({req,res}) {
  await dbConnect();
  const user = await getUser({req,res});
  const product = await getProduct();
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
