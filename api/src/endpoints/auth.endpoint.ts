import { FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";
import config from "../config/config";

interface AuthRequest extends RouteGenericInterface {
    Body: {
        password: string;
    };
}

export const auth = async (request: FastifyRequest<AuthRequest>, reply: FastifyReply) => {
    const { password } = request.body;

    if (password != config.password) return reply.status(401).send("Invalid password!");
    return { token: request.server.jwt.sign({ "authenticated": true }, { expiresIn: "30d" }) };
}