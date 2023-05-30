import { LocalVhost, Vhost } from "./vhost.model";

export interface VhostsRepository {
    list(): LocalVhost[];
    create(name: string, body: string): void;
    update(name: string, body: string): void;
    delete(name: string): void;
}