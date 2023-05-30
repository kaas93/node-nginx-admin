import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import config from "../config/config";
import { LocalVhost } from "./vhost.model";
import { VhostsRepository } from "./vhosts.repository";

const { vhostsPath } = config;

type FsVhostsRepository = VhostsRepository & { initialize(): void }

export const fsVhostsRepository: FsVhostsRepository = {
    initialize() {
        if (!existsSync(vhostsPath)) mkdirSync(vhostsPath, { recursive: true });
    },

    list(): LocalVhost[] {
        const list = readdirSync(vhostsPath);
        return list.map(name => {
            const body = readFileSync(`${vhostsPath}/${name}`, 'utf-8');
            return { name, body };
        });
    },
    create(name: string, body: string): void {
        writeFileSync(`${vhostsPath}/${name}`, body, { flag: "wx" });
    },
    update(name: string, body: string): void {
        writeFileSync(`${vhostsPath}/${name}`, body, { flag: "w" });
    },
    delete(name: string): void {
        unlinkSync(`${vhostsPath}/${name}`);
    }
}