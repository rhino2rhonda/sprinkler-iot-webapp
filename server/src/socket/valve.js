import ValveService from './../service/valve';
import getLogger from '../logging';
import config from '../../config';

const logger = getLogger(__filename);

export default function (io) {

    logger.info("Registering periodic valve info updates for all clients at interval %d", config.socketClientUpdateInterval);
    setInterval(() => {
        const numConnectedClients = Object.keys(io.sockets.sockets).length;// TODO: filter out /valve
        if(!numConnectedClients) {
            logger.debug("Skipping periodic valve info update as no clients are connected", {numConnectedClients});
            return;
        }
        logger.debug("Performing periodic valve info update for %d client(s)", numConnectedClients);
        ValveService.getValveInfo(1, (err, valveInfo) => {
            if (err) {
                logger.error("Periodic valve info update failed due to error. Clients will not be communicated.");
            } else {
                const valveInfoString = JSON.stringify(valveInfo);
                logger.debug("Performing periodic valve info update to all clients", {valveInfoString});
                io.emit('valve-info', valveInfoString);
            }
        });
    }, config.socketClientUpdateInterval);

}
