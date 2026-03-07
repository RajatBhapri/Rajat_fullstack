module.exports = {
  apps: [
    {
      name: "robust-api-runner",
      script: "dist/server.js",
      instances: "max",
      exec_mode: "cluster",
      watch: false,
    },
  ],
};
