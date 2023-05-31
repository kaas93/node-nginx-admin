module.exports = (config, _env) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias["@mui/material"] = "@mui/joy";
    return config;
};
