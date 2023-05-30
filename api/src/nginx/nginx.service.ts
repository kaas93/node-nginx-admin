import { commandExecutor, CommandExecutor } from "../command-executor/command-executor";

export class NginxService {
    constructor(private nginxCommandExecutor: CommandExecutor) { }

    async reload() {
        await this.nginxCommandExecutor.execute("sudo service nginx reload");
    }

    async test() {
        await this.nginxCommandExecutor.execute("sudo nginx -t");
    }
}

export const nginxService = new NginxService(commandExecutor);