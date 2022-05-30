import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { signIn } from "next-auth/react";
import { query as q } from "faunadb";

import { fauna } from "../../../services/fauna";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "read:user",
        },
      },
    }),
    // ...add more providers here
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      const { email } = user;

      console.log(user);

      try {
        //se não existe 
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                //casefold --> lowercase
                q.Match(q.Index("user_by_email"), q.Casefold(user.email))
              )
            ),
            //se não se 
            q.Create(q.Collection("users"), { data: { email } }),
             //se não se 
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )
          )
        );

        return true;
      } catch (err) {
        return false;
      }
    },
  },
});
