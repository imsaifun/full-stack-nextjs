import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function EditProduct({ item }) {
  const router = useRouter();
  const [updateData, setUpdataData] = useState({
    title: item.title,
    desc: item.desc,
    rating: item.rating
  });

  const { title, desc, rating } = updateData;

  const onInputChange = (e) => {
    // e.preventDefault();
    setUpdataData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleEdit = async (id) => {
    // e.preventDefault();
    try {
      await axios.put(`/api/products/${id}`, updateData);
      toast.success("Update success")
      // router.push(`/products/${id}`)
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>

      <form onSubmit={event => {
        event.preventDefault();
      }}>
        <input
          onChange={(e) => onInputChange(e)}
          value={title}
          name="title"
          type="text"
          required
          // placeholder="title"
          className="form-control"
        />
        <textarea
          className="form-control"
          name="desc"
          type="text"
          // placeholder="Desc"
          value={desc}
          onChange={(e) => onInputChange(e)}
        // required
        />
        <input className="form-control"
          type="text"
          name="rating"
          // placeholder="rating"
          value={rating}
          onChange={(e) => onInputChange(e)}
        // required
        />
        <button
          onClick={() => handleEdit(item._id)}
        >Submit</button>
      </form>



      {/* <button onClick={signoutHandler}>Sign out</button> */}
    </>
  );
}
