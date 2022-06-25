import axios from "axios";
import { useState } from "react";

export default function EditProduct(id) {
console.log(id);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [prices, setPrices] = useState("");
  // const router = useRouter();

  const handleEdit = async (e, idx) => {
    // e.preventDefault();
    try {
      const res = await axios.put(`/api/products/${idx}`,{
        title
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
     
     <form>
        <input
          type="text"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        {/* <button onClick={handleEdit}>Submit</button> */}
        <button
            onClick={() => handleEdit(id)}
          >Submit</button>
      </form>

      

      {/* <button onClick={signoutHandler}>Sign out</button> */}
    </>
  );
}
