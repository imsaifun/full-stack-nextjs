import { useState } from "react";

const OrderDetail = ({ total, createOrder, user }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  
  const handleClick = () => {
    console.log(address);

    createOrder({ address,customer, total, method: 0 });
  };

  return (
    <div>
      <div>
        <h1>You will pay $12 after delivery.</h1>
        <div>
          <label>Name Surname</label>
          <input
            placeholder="John Doe"
            type="text"
            // value={user.name}
          onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="+1 234 567 89"

          />
        </div>
        <div>
          <label>Address</label>
          <textarea
            rows={5}
            placeholder="Elton St. 505 NY"
            type="text"

            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button onClick={handleClick}>
          Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;