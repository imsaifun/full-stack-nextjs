import axios from "axios";
import { useState } from "react";

export default function EditProduct(item) {
  const abc = item.item
  console.log(abc._id);

  const [updateData, setUpdateData] = useState({
    title: abc.title
  });

  const inputHandler = (e) => {
    setUpdateData({ ...updateData, title: e.target.value });
  };

  const handleEdit = async (id) => {
    // e.preventDefault();
    try {
      const res = await axios.put(`/api/products/${id}`, updateData);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>

      <form>
        <input
          onChange={inputHandler}
          // value={abc.title}
          name="title"
          type="text"
          className="form-control"
          placeholder="user name"
        />
        {/* <button onClick={handleEdit}>Submit</button> */}
        <button
          onClick={() => handleEdit(abc._id)}
        >Submit</button>
      </form>



      {/* <button onClick={signoutHandler}>Sign out</button> */}
    </>
  );
}
