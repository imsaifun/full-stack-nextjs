import dbConnect from "../../../dbConnect"
import User from "../../../models/userModel"

dbConnect()

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      const { email } = req.body

      // console.log(email, password, firstName, lastName)

      const user = await User.findOne({ email: email })

      user.password = undefined

      return res.status(200).send(user)
    }
  } catch (err) {
    console.log(err)
  }
}
