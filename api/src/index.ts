
import fastify from "fastify";
import config from "./config/config";
import { registerPlugins } from "./plugins";
import { registerRoutes } from "./routes";
import { fsVhostsRepository } from "./vhosts/fs-vhosts.repository";

if (config.production) fsVhostsRepository.initialize();

const startServer = async () => {
  const server = fastify({ logger: true });

  await registerPlugins(server);
  registerRoutes(server);

  const originalErrorHandler = server.errorHandler;

  server.setErrorHandler((error, request, reply) => {
    request.log.error(error);
    if (error.statusCode === 500) {
      reply.code(500).send({ error: "Oops! Something went wrong :(" });
    } else {
      originalErrorHandler(error, request, reply);
    }
  });

  server.listen({ port: 3030 });
};

startServer();