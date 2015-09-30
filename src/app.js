import UWaveServer from './server';

// API
import V1 from '../../u-wave-api-v1/src/api';

// config
import serverConfig from './config/uwave';

const server = new UWaveServer(serverConfig);
const v1 = new V1();

server.on('stopped', () => process.exit(0));
server.on('started', uwave => {
  v1.registerModels(uwave);
  v1.registerWSServer(uwave);
});

server.registerAPI('/v1', v1.getRouter());
server.start();