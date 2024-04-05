import { FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";
import { certbotService } from "../certbot/certbot.service";
import { vhostsService } from "../vhosts/vhosts.service";
import { wordpressService } from "../wordpress/wordpress.service";

export const getVhosts = async (_: FastifyRequest<GetVhostRequest>, reply: FastifyReply) => {
    reply.status(200).send(await vhostsService.getVhosts());
};

interface GetVhostRequest extends RouteGenericInterface {
    Params: {
        id: string;
    };
}

export const getVhost = async (request: FastifyRequest<GetVhostRequest>, reply: FastifyReply) => {
    const { params: { id } } = request;
    if (!id) return { statusCode: 400, body: "No vhost id provided!" };

    reply.status(200).send(await vhostsService.getVhost(id));
};

interface CreateVhostRequest extends RouteGenericInterface {
    Body: {
        name: string;
        body: string;
    };
}

export const createVhost = async (request: FastifyRequest<CreateVhostRequest>, reply: FastifyReply) => {
    const { name, body } = request.body;
    if (!name) return { statusCode: 400, body: "No vhost name provided!" };
    if (!body) return { statusCode: 400, body: "No vhost body provided!" };
    await vhostsService.createVhost(name, body);

    reply.status(200);
};

interface UpdateVhostRequest extends RouteGenericInterface {
    Params: {
        id: string;
    };
    Body: {
        name: string;
        body: string;
    };
}

export const updateVhost = async (request: FastifyRequest<UpdateVhostRequest>, reply: FastifyReply) => {
    const { id } = request.params;
    const { name, body } = request.body;
    if (!id) return { statusCode: 400, body: "No vhost id provided!" };
    if (!name) return { statusCode: 400, body: "No vhost name provided!" };
    if (!body) return { statusCode: 400, body: "No vhost body provided!" };

    await vhostsService.updateVhost(id, name, body)

    reply.status(200).send();
};

interface DeleteVhostRequest extends RouteGenericInterface {
    Params: {
        id: string;
    };
}

export const deleteVhost = async (request: FastifyRequest<DeleteVhostRequest>, reply: FastifyReply) => {
    const { id } = request.params;
    if (!id) return { statusCode: 400, body: "No vhost id provided!" };

    await vhostsService.deleteVhost(id);
    reply.status(200);
};

interface SecureVhostRequest extends RouteGenericInterface {
    Params: {
        id: string;
    };
}

export const secureVhost = async (request: FastifyRequest<SecureVhostRequest>, reply: FastifyReply) => {
    const { id } = request.params;
    if (!id) return { statusCode: 400, body: "No vhost id provided!" };
    const vhost = vhostsService.getVhost(id);
    if (!vhost) return { statusCode: 400, body: "No vhost found for given id!" }

    await certbotService.secureVhost(vhost.name, `www.${vhost.name}`);
    reply.status(200);
};

interface InstallWordpressRequest extends RouteGenericInterface {
    Params: {
        id: string;
    };
}

export const installWordpress = async (request: FastifyRequest<InstallWordpressRequest>, reply: FastifyReply) => {
    const { id } = request.params;
    if (!id) return { statusCode: 400, body: "No vhost id provided!" };
    const vhost = vhostsService.getVhost(id);
    if (!vhost) return { statusCode: 400, body: "No vhost found for given id!" }

    await wordpressService.installOn(vhost)
}