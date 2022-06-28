import Order from "../models/order";

export default async function getOrder() {

    try {
        let order = await Order.find();
        order = JSON.parse(JSON.stringify(order));
        return order;
    } catch (error) {
        return null;
    }
}
