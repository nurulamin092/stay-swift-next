import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials'
import mongoClientPromise from "./database/mongoClientPromise";
import { userModel } from "./models/user-model";
import bcrypt from "bcryptjs"
export const { handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    adapter: MongoDBAdapter(mongoClientPromise, { databaseName: process.env.ENVIRONMENT }),
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                if (credentials == null) {
                    return null
                }
                try {
                    const user = await userModel.findOne({ email: credentials.email })
                    console.log("User and Password:..", user);
                    if (user) {
                        // const isMatch = user.email === credentials.email;
                        const isMatch = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );
                        if (isMatch) {
                            return user;
                        } else {
                            throw new Error(`Email or Password mismatch`)
                        }
                    } else {
                        throw new Error(`User can't found`)
                    }
                } catch (error) {
                    throw new Error(error)
                }
            }
        })
        ,
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.AUTH_SECRET,
})