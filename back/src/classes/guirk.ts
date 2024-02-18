import Guirk_Core from "../core/guirk";
import { GuirkPricing } from "../models/guirk_pricing.model";
import Payment_Core from "../core/payment";
import { FastifyRequest } from "fastify";
import { GuirkPurchase } from "../models/guirk_purchase.model";
import User_Core from "../core/users";

export default class Guirk_Class {
    static async getAll() {
        return Guirk_Core.getAll();
    }

    static async createCheckout(guirkPricingId: number, token: string): Promise<String | null> {
      const user = await User_Core.getByToken(token);
      if(!guirkPricingId) {
        throw "Invalid 'id' param";
      }
      // retrieve Guirk pricing
      const guirk = await GuirkPricing.findOne({ where: { id: guirkPricingId }});
      if(!guirk) {
        throw `Guirk with id '${guirkPricingId}' has not been found`;
      }

      const paymentIntent = await Payment_Core.createCheckout(guirk.euro_price);

      // save into db
      await GuirkPurchase.create({
        user_id: user.id,
        guirk_id: guirk.id,
        is_handled: false,
        stripe_id: paymentIntent.id
      });

      return paymentIntent.client_secret;
    }

    static async handleStripeWebhook(request: FastifyRequest): Promise<void> {
      await Payment_Core.handleWebhook(request);
    }
}
