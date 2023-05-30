import { FastifyInstance, FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";
import fastifyJwt from "@fastify/jwt";
import config from "./config/config";
import fastifyCors from "@fastify/cors";

export const registerPlugins = async (server: FastifyInstance) => {
    await server
        .register(fastifyCors, { origin: config.appUrl })
        .register(fastifyJwt, { secret: config.jwtSecret });
};

export const jwtVerifyRequestHook = async <T extends RouteGenericInterface>(request: FastifyRequest<T>, reply: FastifyReply) => {
    try {
        return await request.jwtVerify();
    } catch (err) {
        console.error(err);
        reply.status(401).send("Failed to authorize request!");
    }
};