import { CommandExecutor as CommandExecutor } from "./command-executor";
import { exec } from "shelljs";

export const shellCommandExecutor: CommandExecutor = {
    async execute(command: string) {
        console.log(`!!! Executing command: "${command}"`);
        const { code, stdout, stderr } = await exec(command)
        if (code !== 0) throw `Executing command failed: ${stderr}`;

        return { result: stdout };
    },
}
