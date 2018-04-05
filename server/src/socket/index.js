import SocketServer from 'socket.io';
import addValveHandlers from './valve';
import getLogger from '../logging';

const logger = getLogger(__filename);

export default function(httpServer) {
    const io = SocketServer(httpServer);
    logger.info("Socket server has been initialized");

    io.on('connection', socket => {
        logger.info("User connected: %s", socket.id);
    });

    addValveHandlers(io);
    logger.info("Socket handlers have been initialized");

    return io;
}