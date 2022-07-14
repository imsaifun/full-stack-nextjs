import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import GoogleProvider from "next-auth/providers/google"
// import clientPromise from "../../../lib/mongodb"
import dbConnect from '../../../lib/dbConnect'

export default NextAuth({
  adapter: MongoDBAdapter(dbConnect),
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
})
