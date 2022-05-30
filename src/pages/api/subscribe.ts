import { query } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { FaUndoAlt } from "react-icons/fa";
import { fauna } from "../../services/fauna";
import { stripe } from "../../services/stripe";

type User = {
  ref: {
    id: string;
  };
  data: {
    stripe_customer_id: string;
  };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
  // obtem dados do usuário    
    const session = await getSession({ req });

    //busca o usuário no banco 
    const user = await fauna.query<User>(
      query.Get(
        query.Match(
          query.Index("user_by_email"),
          query.Casefold(session.user.email)
        )
      )
    );

    //verifica se o usuário existe, se não cria no stripe
    let customerId = user.data.stripe_customer_id;
    if (!customerId) {
      // criação de uma conta para o usuário assinante
      const stripeCostumer = await stripe.customers.create({
        email: session.user.email,
        // metada
      });

      await fauna.query(
        query.Update(query.Ref(query.Collection("users"), user.ref.id), {
          data: {
            stripe_customer_id: stripeCostumer.id,
          },
        })
      );

      customerId = stripeCostumer.id
    }

    
//página de subscribe do stripe
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      //id do preço estático por ser apenas um
      line_items: [
        {
          price: "price_1L0VsJBdqTQ4k7Y2q0jIAEP3",
          quantity: 1,
        },
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    res.status(200).json({ sessionId: stripeCheckoutSession.id });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};
