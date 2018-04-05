import app from './src/app/index';
import http from 'http';
import Socket from './src/socket';
import getLogger from './src/logging';
import config from './config';

const logger = getLogger(__filename);
const httpServer = http.Server(app);
// const io = Socket(httpServer);

httpServer.listen(config.appPort, function () {
    logger.info('App has been started. Listening on port %d' , config.appPort);
});