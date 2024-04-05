import { CommandExecutor, commandExecutor } from "../command-executor/command-executor";
import config from "../config/config";
import { Vhost } from "../vhosts/vhost.model";

class WordpressService {
    constructor(private commandExecutor: CommandExecutor) { }

    installOn(vhost: Vhost) {
        this.commandExecutor.execute("wget -O - https://wordpress.org/latest.zip > /tmp/wordpress.zip");
        this.commandExecutor.execute("unzip /tmp/wordpress.zip -d /tmp/wordpress");
        this.commandExecutor.execute(`rm -rf ${config.wwwDir}/${vhost.name}`);
        this.commandExecutor.execute(`mv /tmp/wordpress/wordpress ${config.wwwDir}/${vhost.name}`);
        this.commandExecutor.execute("rm -rf /tmp/wordpress.zip");
        this.commandExecutor.execute("rm -rf /tmp/wordpress/");
    }
}

export const wordpressService = new WordpressService(commandExecutor);