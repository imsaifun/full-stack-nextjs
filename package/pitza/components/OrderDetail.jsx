import { useState } from "react";


const OrderDetail = ({ total, createOrder, user, handleCash }) => {

    const [customer, setCustomer] = useState("");
    const [address, setAddress] = useState("");

    // console.log(customer);

    const handleClick = () => {
        createOrder({ address, customer, total, method: 0 });
    };

    return (
        <>
            <div className="order-modal">
                <div className="order-modal-content">

                    <h4 className="card-title mb-20">You will pay ${total} after delivery.</h4>
                    <div className="mb-20">
                        <label className="form-label">Name</label>
                        <input
                            className="form-control"
                            placeholder="John Doe"
                            type="text"
                            value={user.name}
                            readonly
                            onChange={(e) => setCustomer(user.name)}
                        />
                    </div>
                    <div className="mb-20">
                        <label className="form-label">Phone Number</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="+1 234 567 89"
                        />
                    </div>
                    <div className="mb-20">
                        <label className="form-label">Address</label>
                        <textarea
                            className="form-control"
                            rows={5}
                            placeholder="Elton St. 505 NY"
                            type="text"

                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleClick}>
                        Order Now
                    </button>
                    <a className="text-danger ms-30" onClick={handleCash}>Cancel</a>
                </div>
            </div>
        </>
    );
};

export default OrderDetail;