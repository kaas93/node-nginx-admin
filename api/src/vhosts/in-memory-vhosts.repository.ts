import { LocalVhost, Vhost } from "./vhost.model";
import { VhostsRepository } from "./vhosts.repository";

type InMemoryVhostsRepository = VhostsRepository & { vhosts: Record<string, LocalVhost> };

export const inMemoryVhostsRepository: InMemoryVhostsRepository = {
    vhosts: {
        "frits": {
            name: "frits",
            body: "een nginx vhost definitie"
        }
    },
    list() {
        return Object.values(this.vhosts);
    },
    create(name: string, body: string): void {
        if (Object.keys(this.vhosts).includes(name)) throw "Vhost already exists!";
        this.vhosts[name] = { name, body };
    },
    update(name: string, body: string): void {
        this.vhosts[name] = { name, body };
    },
    delete(name: string): void {
        delete this.vhosts[name];
    }
}; 