import * as dotenv from "dotenv";

const config = dotenv.config().parsed || {};

interface Config {
    appUrl: string;
    jwtSecret: string;
    vhostsPath: string;
    production: boolean;
    password: string;
}

export default Object.assign({}, config, { production: config.production === "true" }) as unknown as Config;
