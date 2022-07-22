import dbConnect from '../../../lib/dbConnect'
import Product from '../../../models/product'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const products = await Product.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: products })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const product = await Product.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: product })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}

// export default async function handler(req, res) {
//   await dbConnect();

//   const { title, desc, prices } = req.body;

//   if (req.method === "POST") {
//     const productExist = await Product.findOne({ title });

//     if (productExist)
//       return res.status(422).json({ message: "title already in use!" });

//     const product = new Product({ title, desc, prices});
//     await product.save();

   

//     res.status(201).json(product);
//   } else {
//     res.status(424).json({ message: "Invalid method!" });
//   }
// }
