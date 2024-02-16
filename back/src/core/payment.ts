import Stripe from "stripe";
import config from "../config";

export default class Payment_Core {
  static stripeApi() {
    if(!config.stripePrivateKey) {
      throw "Stripe private key is empty";
    }
    return new Stripe(config.stripePrivateKey, {
      apiVersion: '2023-10-16',
    });
  }

  static async createCheckout(euroAmount: number): Promise<String | null> {
    const paymentIntent = await this.stripeApi().paymentIntents.create({
      amount: euroAmount * 100,
      currency: 'eur',
      payment_method_types: ['card'],
    });
    return paymentIntent.client_secret;
  }
}
