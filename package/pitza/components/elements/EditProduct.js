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
            router.replace(`/admin/products/`)
           
        } catch (error) {
            console.log(error);
        }
    };




    return (
        <>
            <div className="edit-modal">
                <div className="edit-modal-content">



                    <form onSubmit={event => {
                        event.preventDefault();
                    }}>
                        <div className="mb-20">
                            <label className="form-label">Title</label>
                            <input
                                onChange={(e) => onInputChange(e)}
                                value={title}
                                name="title"
                                type="text"
                                required
                                // placeholder="title"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-20">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                name="desc"
                                type="text"
                                // placeholder="Desc"
                                value={desc}
                                onChange={(e) => onInputChange(e)}
                            // required
                            />
                        </div>
                        {/* <div className="mb-20">
                        <label className="form-label">Address</label>
                        <input className="form-control"
                            type="text"
                            name="rating"
                            // placeholder="rating"
                            value={rating}
                            onChange={(e) => onInputChange(e)}
                        // required
                        />
                        </div> */}
                        <button className="btn btn-primary"
                            onClick={() => handleEdit(item._id)}
                        >Submit</button>
                        {/* <a className="text-primary ms-20"
                            onClick={() => handleRemove(productId)}
                        >Remove</a> */}
                    </form>

                </div></div>




            {/* <button onClick={signoutHandler}>Sign out</button> */}
        </>
    );
}
