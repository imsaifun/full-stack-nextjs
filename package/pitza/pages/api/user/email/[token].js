import jwt from "jsonwebtoken"
import dbConnect from "../../../../dbConnect"
import User from "../../../../models/userModel"

dbConnect()

export default async (req, res) => {
  try {
    if (req.method === "PUT") {
      const { token } = req.query

      console.log(token)

      if (token) {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
      }
      if (!token) {
        return res.status(200).json({ message: "no Token" })
      }

      const user = await User.findById(req.user._id)

      if (user) {
        user.validEmail = "yes"
        user.emailToken = undefined
        await user.save()

        return res.status(200).json({ message: "success in updating user" })
      }
    }
  } catch (error) {
    console.log(error)
  }
}
