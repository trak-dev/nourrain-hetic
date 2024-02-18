import Stripe from "stripe";
import config from "../config";
import { FastifyRequest } from "fastify";
import { GuirkPurchase } from "../models/guirk_purchase.model";
import { User } from "../models/user.model";
import { GuirkPricing } from "../models/guirk_pricing.model";

export default class Payment_Core {
  static stripeApi() {
    if(!config.stripePrivateKey) {
      throw "Stripe private key is empty";
    }
    return new Stripe(config.stripePrivateKey, {
      apiVersion: '2023-10-16',
    });
  }

  static async createCheckout(euroAmount: number): Promise<Stripe.PaymentIntent> {
    return this.stripeApi().paymentIntents.create({
      amount: euroAmount * 100,
      currency: 'eur',
      payment_method_types: ['card'],
    });
  }

  static async handleWebhook(request: FastifyRequest): Promise<void> {
    let event = null;
    // Get the signature sent by Stripe
    const rawRequestBody: any = request.rawBody;
    const signature: any = request.headers['stripe-signature'];
    try {
      event = this.stripeApi().webhooks.constructEvent(
        rawRequestBody,
        signature,
        config.stripeSecretWebhook,
      );
    } catch (err) {
      console.log(`Webhook signature verification failed, error=${err}`);
      throw "Webhook signature verification failed";
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.id} (${paymentIntent.amount} EUR) was successful`);

        // check that payment not already handled
        const guirkPurchase = await GuirkPurchase.findOne({where: {stripe_id: paymentIntent.id }});
        if(!guirkPurchase || guirkPurchase.is_handled) {
          console.error(`Guirk purchase not valid, guirkPurchaseExists=${!!guirkPurchase}, isHandled=${guirkPurchase?.is_handled}`);
          throw "Invalid conditions";
        }

        // increment user amount and set purchase as handled
        const user = await User.findOne({ where: {id: guirkPurchase.user_id} });
        if(!user) {
          console.error(`Unknown user, id=${guirkPurchase.user_id}`);
          throw "Unknown user";
        }
        const guirkPack = await GuirkPricing.findOne({ where: {id: guirkPurchase.guirk_id} });
        if(!guirkPack) {
          console.error(`Unknown Guirk pack, id=${guirkPurchase.guirk_id}`);
          throw "Unknown Guirk pack";
        }
        user.wallet = user.wallet ? user.wallet + guirkPack.amount : guirkPack.amount;
        await user.save();

        guirkPurchase.is_handled = true;
        await guirkPurchase.save();

        break;
      default:
        // Unexpected event type
        console.warn(`Unhandled event type ${event.type} for ID '${event.id}'`);
    }
  }
}
