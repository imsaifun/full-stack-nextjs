import Order from "../models/order";

export default async function getOrderById(id) {

  try {
    const order = await Order.findById(id)

    const orderId = JSON.parse(JSON.stringify(order))

    return orderId;

  } catch (error) {
    return null;
  }
}
