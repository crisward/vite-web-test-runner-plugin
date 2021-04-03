if(!process.stdin.isTTY) process.stdin.isTTY = true
const vite = require("vite");

module.exports = function () {
  let server;

  return {
    name: "vite-plugin",

    async serverStart({ app }) {
      server = await vite.createServer({
        clearScreen: false,
      });
      await server.listen();
      const port = server.config.server.port;
      app.use((ctx, next) => {
        ctx.redirect(`http://localhost:${port}${ctx.originalUrl}`);
        return;
      });
    },

    async serverStop() {
      return server.close();
    },
  };
};
