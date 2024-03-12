import { FastifyInstance } from "fastify";
import Nourrain_Class from "../classes/nourrain";
import { createOneInterfaceSchema, getOneInterfaceSchema, joinInterfaceSchema } from "../validators/nourrain";

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

  router.post("/new", async (req, reply) => {
    console.log("Handling nourrainRoutes /new");
    try {
      const { name, description } = createOneInterfaceSchema.parse(req.body);
      await Nourrain_Class.createOne(name, description, req.headers.authorization!);
      reply.status(201);
    } catch (error) {
      console.error(error);
      reply.status(500).send(error);
    }
  });

  router.patch("/join", async (req, reply) => {
    console.log("Handling nourrainRoutes /join");
    try {
      const { code } = joinInterfaceSchema.parse(req.body);
      await Nourrain_Class.join(code, req.headers.authorization!);
      reply.status(200);
    } catch (error) {
      console.error(error);
      reply.status(500).send(error);
    }
  });
}

module.exports = nourrainRoutes;
