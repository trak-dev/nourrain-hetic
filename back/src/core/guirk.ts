import { GuirkPricing } from "../models/guirk_pricing.model";

export default class Guirk_Core {

    static async getAll() {
        return GuirkPricing.findAll();
    }
}
