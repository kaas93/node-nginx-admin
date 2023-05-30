import { CommandExecutor } from "./command-executor";

export const dummyCommandExecutor: CommandExecutor = {
    async execute(command: string) {
        console.log(`execute command "${command}"`);

        return { result: "top" };
    }
}