import { FastifyInstance, FastifyRequest } from "fastify";
import Guirk_Class from "../classes/guirk";
import { createCheckoutInterfaceSchema } from "../validators/guirk";

async function guirkRoutes(router: FastifyInstance) {
    router.get("/all", async (req, reply) => {
        console.log("Handling guirkRoutes /all");
        try {
            const allGuirkPricing = await Guirk_Class.getAll();
            reply.status(200).send(allGuirkPricing);
        } catch (error) {
            console.error(error);
            reply.status(500).send(error);
        }
    });

    router.post("/create-checkout", async (req, reply) => {
      console.log("Handling guirkRoutes /create-checkout");
      try {
        const { id } = createCheckoutInterfaceSchema.parse(req.body);
        const clientSecret = await Guirk_Class.createCheckout(id);
        reply.status(200).send({ client_secret: clientSecret });
      } catch (error) {
        console.error(error);
        reply.status(500).send(error);
      }
    });
}

module.exports = guirkRoutes;
