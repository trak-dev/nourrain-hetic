import Guirk_Core from "../core/guirk";
import { GuirkPricing } from "../models/guirk_pricing.model";
import Payment_Core from "../core/payment";

export default class Guirk_Class {
    static async getAll() {
        return Guirk_Core.getAll();
    }

    static async createCheckout(guirkPricingId: number): Promise<String | null> {
      if(!guirkPricingId) {
        throw "Invalid 'id' param";
      }
      // retrieve Guirk pricing
      const guirk = await GuirkPricing.findOne({ where: { id: guirkPricingId }});
      if(!guirk) {
        throw `Guirk with id '${guirkPricingId}' has not been found`;
      }
      return Payment_Core.createCheckout(guirk.amount);
    }
}
