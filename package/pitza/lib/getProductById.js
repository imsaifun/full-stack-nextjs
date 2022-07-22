import Product from "../models/product";

export default async function getProductById(id) {

    try {
        const product = await Product.findById(id)

        const pizza = JSON.parse(JSON.stringify(product))

        return pizza;

    } catch (error) {
        return null;
    }
}
