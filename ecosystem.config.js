module.exports = {
  apps: [
    {
      name: "Lindero-Web-Frontend",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
};
