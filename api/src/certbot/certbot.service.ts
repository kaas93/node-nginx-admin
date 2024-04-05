import { commandExecutor, CommandExecutor } from "../command-executor/command-executor";

class CertbotService {
    constructor(private commandExecutor: CommandExecutor) { }

    secureVhost(...domainNames: string[]) {
        const domainNameOptions = domainNames.map(it => `-d ${it}`);
        this.commandExecutor.execute(`sudo certbot --nginx --redirect ${domainNameOptions.join(' ')}`);
    }
}

export const certbotService = new CertbotService(commandExecutor);