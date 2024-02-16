import fastify from 'fastify';
import cors from '@fastify/cors'
import { Sequelize } from 'sequelize'; 
import config from './config';
import User_Core from './core/users';

// models
import { initUser } from './models/user.model';
import { initNourrain } from './models/nourrain.model';
import { initDonation } from './models/donations.model';
import { initNourrainsUsers } from './models/nourrains_users.model';
import { initJoinQuery } from './models/join_queries.model';
import { initCompanies } from './models/companies.model';
import { initGuirkPricing } from "./models/guirk_pricing.model";
import { initGuirkPurchase } from "./models/guirk_purchase.model";


const dbuser = config.database.user;
const dbHost = config.database.host;
const database = config.database.name;
const password = config.database.password;
const portdb = config.database.port;
const dbSslEnabled = config.database.sslEnabled;
const host = config.host;
const port = config.port;

const dbSsl = {
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    keepAlive: true
  }
};

const sequelize = new Sequelize({
  ...(dbSslEnabled && dbSsl),
  database,
  username: dbuser,
  password: password,
  host: dbHost,
  port: portdb,
  dialect: 'postgres',
  define: {
    timestamps: false,
  }
});

const routesWithoutAuth = ["/users/login", "/users/register"];

const router = fastify({
  // logger: true
});

router.register(cors, {
  // put options here
});

// hook to check auth on every request except the ones in routesWithoutAuth
router.addHook('onRequest', async (request, reply) => {
    try {    
      // no auth needed for some routes
      if (routesWithoutAuth.includes(request.raw.url!)) return;
      // check auth
      if (request.headers.authorization) {
        // check if token is valid
        if (request.headers.authorization.split(' ')[0] && 'Bearer' === request.headers.authorization.split(' ')[0] && request.headers.authorization.split(' ')[1]) {
          request.headers.authorization = request.headers.authorization.split(' ')[1];
            const user = await User_Core.getByToken(request.headers.authorization);
        } else {
          console.error('Invalid token');
          reply.status(403).send({error: "Invalid token"});
        }
      } else {
    console.error("No token");
    reply.status(401).send({ error: "Please provide a token" });
  }
    } catch (error) {
      console.error(error);
      reply.status(500).send({error});
    }
  });

// register the routes
router.register(require('./routes/users.routes'), { prefix: '/users' });
router.register(require('./routes/guirk.routes'), { prefix: '/guirk' });

// start the server
router.listen({ port, host }, async (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // initialize the User 
    initUser(sequelize);
    initNourrain(sequelize);
    initDonation(sequelize);
    initNourrainsUsers(sequelize);
    initJoinQuery(sequelize);
    initGuirkPricing(sequelize);
    initGuirkPurchase(sequelize);
    initCompanies(sequelize);
    console.log("Database initialization done.");
  } catch (error) {
    console.error(error);
  }
});
