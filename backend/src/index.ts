import { app, logger } from "./app";

const server = app.listen(process.env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = process.env;
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});

const onCloseSignal = () => {
  logger.info("sigint received, shutting down");
  server.close(() => {
    logger.info("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10).unref(); // Force shutdown after 10s
};
// /10000

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
