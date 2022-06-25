import Product from "../models/product";

export default async function getProduct(req, res) {

  try {
    let product = await Product.find();
    product = JSON.parse(JSON.stringify(product));
    return product;
  } catch (error) {
    return null;
  }
}
