import { FastifyInstance } from "fastify";
import { auth } from "./endpoints/auth.endpoint";
import { getVhosts, getVhost, createVhost, updateVhost, deleteVhost, secureVhost, installWordpress } from "./endpoints/vhosts.endpoint";

import { jwtVerifyRequestHook } from "./plugins";

export const registerRoutes = (server: FastifyInstance) => {
    server
        .post("/api/auth", auth)
        .get("/api/vhosts", { onRequest: [jwtVerifyRequestHook] }, getVhosts)
        .get("/api/vhosts/:id", { onRequest: [jwtVerifyRequestHook] }, getVhost)
        .post("/api/vhosts", { onRequest: [jwtVerifyRequestHook] }, createVhost)
        .put("/api/vhosts/:id", { onRequest: [jwtVerifyRequestHook] }, updateVhost)
        .delete("/api/vhosts/:id", { onRequest: [jwtVerifyRequestHook] }, deleteVhost)
        .post("/api/vhosts/:id/secure", { onRequest: [jwtVerifyRequestHook] }, secureVhost)
        .post("/api/vhosts/:id/wordpress", { onRequest: [jwtVerifyRequestHook] }, installWordpress)
        ;
};