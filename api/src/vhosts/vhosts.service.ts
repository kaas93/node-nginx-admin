import { createHash } from "crypto";
import config from "../config/config";
import { NginxService, nginxService } from "../nginx/nginx.service";
import { fsVhostsRepository } from "./fs-vhosts.repository";
import { inMemoryVhostsRepository } from "./in-memory-vhosts.repository";
import { Vhost } from "./vhost.model";
import { VhostsRepository } from "./vhosts.repository";

const { production } = config;

class VhostsService {
    constructor(private vhostsRepository: VhostsRepository, private nginxService: NginxService) { }

    getVhosts(): Vhost[] {
        return this.vhostsRepository.list().map(it => ({ id: this.toId(it.name), ...it }));
    }

    getVhost(id: string): Vhost {
        const vhost = this.getVhosts().find(it => it.id === id);
        if (!vhost) throw "Vhost does not exist";
        return vhost;
    }

    async createVhost(name: string, body: string) {
        if (this.getVhosts().some(it => it.name === name)) throw "Vhost already exists";
        this.vhostsRepository.create(name, body);
        await this.nginxService.reload();
    }

    async updateVhost(id: string, name: string, body: string) {
        if (!this.getVhosts().some(it => it.id === id)) throw "Vhost does not exist";
        this.vhostsRepository.update(name, body);
        await this.nginxService.reload();
    }

    async deleteVhost(id: string) {
        const existingVhost = this.getVhosts().find(it => it.id === id);
        if (!existingVhost) throw "Vhost does not exist";
        this.vhostsRepository.delete(existingVhost.name);
        await this.nginxService.reload();
    }

    private toId(name: string): string {
        return createHash("sha1").update(name).digest("hex");
    }
}

export const vhostsService = new VhostsService(production ? fsVhostsRepository : inMemoryVhostsRepository, nginxService);
