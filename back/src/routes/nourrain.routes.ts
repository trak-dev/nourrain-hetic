import { FastifyInstance } from "fastify";
import Nourrain_Class from "../classes/nourrain";
import { getOneInterfaceSchema } from "../validators/nourrain";

async function nourrainRoutes(router: FastifyInstance) {

  router.get("/", async (req, reply) => {
    console.log("Handling nourrainRoutes /");
    try {
      const { id } = getOneInterfaceSchema.parse(req.query);
      const nourrain = await Nourrain_Class.getOneById(id, req.headers.authorization!);
      reply.status(200).send(nourrain);
    } catch (error) {
      console.error(error);
      reply.status(500).send(error);
    }
  });


  router.patch("/increment", async (req, reply) => {
    console.log("Handling nourrainRoutes /increment");
    try {
      const { id } = getOneInterfaceSchema.parse(req.query);
      await Nourrain_Class.increment(id, req.headers.authorization!);
      reply.status(200);
    } catch (error) {
      console.error(error);
      reply.status(500).send(error);
    }
  });
}

module.exports = nourrainRoutes;
