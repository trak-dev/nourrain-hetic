import { FastifyInstance } from "fastify";
import { registerUserSchema, RegisterUserInput, loginInterface, loginInterfaceSchema } from "../validators/user";
import User_Classe from "../classes/users";

async function userRoutes(router: FastifyInstance) {
    router.post<{ Body: RegisterUserInput }>("/register", async (req, reply) => {
        console.log("Handling userRoutes /register");
        try {
            const user = registerUserSchema.parse(req.body);
            const userTokenAndId = await User_Classe.register(user);
            reply.status(200).send(userTokenAndId);
        } catch (error) {
            console.error(error);
            reply.status(500).send(error);
        }
    });

    router.post<{ Body: loginInterface }>("/login", async (req, reply) => {
      console.log("Handling userRoutes /login");
        try {
            const { email, password } = loginInterfaceSchema.parse(req.body);
            const userToken = await User_Classe.login(email, password);
            reply.status(200).send(userToken);
        } catch (error) {
            console.error(error);
            reply.status(500).send(error);
        }
    });

    router.get("/me", async (req, reply) => {
      console.log("Handling userRoutes /me");
        try {
            const me = await User_Classe.me(
                req.headers.authorization!
            );
            reply.status(200).send(me);
        } catch (error) {
            console.error(error);
            reply.status(500).send(error);
        }
    });
}

module.exports = userRoutes;
