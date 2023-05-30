module.exports = {
    apps: [
        {
            name: "nginx-admin-api",
            script: "./dist/index.js",
            instances: "2",
        },
    ],
};
