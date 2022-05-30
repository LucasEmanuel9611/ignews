import { signIn, useSession } from "next-auth/react";
import api from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import { SignInButton } from "../SignInButton";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId?: string;
}

export function SubscribeButton(props: SubscribeButtonProps) {
  const { data: session } = useSession();

  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    //se logado --> criação da checkout session
    try {
      const response = await api.post("/subscribe");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe Now
    </button>
  );
}
