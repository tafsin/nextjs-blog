import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';
const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
             email: { label: 'Email', type: 'email', placeholder: 'Enter Email' },
             password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {
              if(!credentials?.email || !credentials || !credentials.password) return null;
              const user = users.find((item)=>item.email===credentials.email)
              if (user?.password===credentials.password) {
                return user
              } else {
               return null
              }
            }
          })
    ],
    secret: process.env.NEXTAUTH_SECRET
}
export default NextAuth(authOptions)
