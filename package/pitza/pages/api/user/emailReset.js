import jwt from "jsonwebtoken"
import absoluteUrl from "next-absolute-url"
import dbConnect from "../../../dbConnect"
import { sendEmail } from "../../../helpers/sendMail"
import User from "../../../models/userModel"

dbConnect()

export default async (req, res) => {
  console.log(req.method)
  try {
    if (req.method === "POST") {
      console.log(req.body.dbUser.email)

      const user = await User.findOne({ email: req.body.dbUser.email })

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      })

      console.log(token)

      user.emailToken = token
      await user.save()

      const { origin } = absoluteUrl(req)
      const link = `${origin}/user/email/${token}`

      const message = `<div>Click on the link below to verify your email, if the link is not working then please paste into the browser.</div></br>
    <div>link:${link}</div>`

      // console.log("message", message)

      // console.log("here")

      await sendEmail({
        to: user.email,
        subject: "Password Reset",
        text: message,
      })

      return res.status(200).json({
        message: `Email sent to ${user.email}, please check your email`,
      })
    }
  } catch (error) {
    console.log(error)
  }
}
