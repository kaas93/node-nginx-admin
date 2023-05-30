import config from "../config/config";
import { dummyCommandExecutor } from "./dummy-command-executor";
import { shellCommandExecutor } from "./shell-command-executor";

const { production } = config;

export interface CommandResult {
    result: string;
}

export interface CommandExecutor {
    execute(command: string): Promise<CommandResult>;
}

export const commandExecutor = production ? shellCommandExecutor : dummyCommandExecutor;